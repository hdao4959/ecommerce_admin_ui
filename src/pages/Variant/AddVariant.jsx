import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios'

const AddVariant = () => {
  const [formVariant, setFormVariant] = useState({
    name: "",
    is_active: false,
    product_id: '',
  })
  // Danh sách dòng sản phẩm có is_active = true
  const [productLineActives, setProductLineActives] = useState([]);
  // Danh sách màu sắc có is_active = true
  const [colorActives, setColorActives] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const productsResponse = await axiosInstance.get('/products?active=1');
        const colorsResponse = await axiosInstance.get('/colors?active=1');
        setProductLineActives(productsResponse.data.data.products)
        setColorActives(colorsResponse.data.data.colors.map(color => ({ ...color, price: 0, stock: 0, image: color?.image || null, img: null })))
      } catch (error) {
        alert(error.response.message);
      }
    })()
  }, [])

  const handleChangeVariant = (event) => {
    const { name, value, type, checked } = event.target
    setFormVariant(prev => ({
      ...prev, [name]: type == 'checkbox' ? checked : value
    }))
  }

  const handleChangeColor = (idColor, event) => {
    const { name, value, type, files } = event.target;

    setColorActives(prev =>
      prev.map(color => {
        if (color._id == idColor) {
          let newImg = color.img
          if (type == 'file' && files[0]) {
            const oldImg = newImg;
            // Tạo ảnh blob mới
            newImg = URL.createObjectURL(files[0])
            // Xoá ảnh blob cũ
            if (newImg.startsWith('blob:')) URL.revokeObjectURL(oldImg)
          }
          return {
            ...color,
            [name]: type == 'file' ? files[0] : value,
            // Tạo hình ảnh blob
            img: newImg
          }
        } else {
          return color
        }
      }
      ))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formColor = colorActives.filter(color => color.quantity != 0 && color.price != 0).map(color => {
      const cloneColor = { ...color }
      delete cloneColor.img
      delete cloneColor.name
      return cloneColor
    })
    const form = new FormData;
    form.append('variant', JSON.stringify(formVariant))
    form.append('colors', JSON.stringify(formColor))
    formColor?.forEach(color => {
      form.append('images', color.image)
    });
    try {
      const { data } = await axiosInstance.post('/variants', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(data.message);
    } catch (error) {
      alert(error.response.message)
    }
    console.log(form);
  }

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <strong>Thêm mới biến thể</strong>
        </div>
        <div className="card-body card-block">
          <form
            method="post"
            encType="multipart/form-data"
            className="form-horizontal"
          >
            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="select" className=" form-control-label">
                  Dòng sản phẩm
                </label>
              </div>
              <div className="col-12 col-md-9">
                <select name="product_id" id="select" className="form-control" onChange={(event) => handleChangeVariant(event)} >
                  <option value="">--Dòng sản phẩm--</option>
                  {productLineActives?.map((productLine, index) => (
                    <option key={index} value={productLine._id}>{productLine.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="text-input" className=" form-control-label">
                  Tên biến thể
                </label>
              </div>
              <div className="col-12 col-md-9">
                <input
                  type="text"
                  id="text-input"
                  name="name"
                  value={formVariant.name}
                  onChange={(event) => handleChangeVariant(event)}
                  placeholder="Tên biến thể"
                  className="form-control"
                />
                <small className="form-text text-muted">This is a help text</small>
              </div>
            </div>


            <div className="row form-group">
              <div className="col col-md-3">
                <label className=" form-control-label">Trạng thái</label>
              </div>
              <div className="col col-md-9">
                <div className="form-check">
                  <div className="checkbox">
                    <label htmlFor="checkbox1" className="form-check-label">
                      <input
                        type="checkbox"
                        id="checkbox1"
                        name="is_active"
                        value={formVariant.is_active}
                        checked={formVariant.is_active == true}
                        onChange={(event) => handleChangeVariant(event)}
                        className="form-check-input"
                      />
                      Active
                    </label>
                  </div>

                </div>
              </div>
            </div>

            <strong>Biến thể</strong>
            <p className='text-danger'>Những màu sắc không có <strong><i>giá</i></strong> hoặc <strong><i>số lượng</i></strong> sẽ không được thêm mới</p>
            <div>
              <div style={{ maxHeight: "500px", overflowY: 'auto' }}>
                <table id='table_add_variant' className=' table table-striped border'  >
                  <thead>
                    <tr className='text-center' >
                      <th>#</th>
                      <th>Màu sắc</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Hình ảnh</th>
                      <th>Preview</th>
                    </tr>
                  </thead>
                  <tbody id='table_body_add_variant' >
                    {colorActives?.map((color, index) => (
                      <tr key={index} className='text-center' >
                        <th>{index}</th>
                        <td>{color.name}</td>
                        <td><input name='price' type="number" className='form-control' min={0} defaultValue={color.price} onChange={(event) => handleChangeColor(color?._id, event)} /></td>
                        <td><input name='stock' type="number" className='form-control' min={0} defaultValue={color.stock} onChange={(event) => handleChangeColor(color?._id, event)} /></td>
                        <td>
                          <label htmlFor={`file-upload-${color._id}`} className="btn btn-primary btn-sm">
                            Chọn ảnh
                          </label>
                          <input id={`file-upload-${color._id}`} name='image' type="file" className='d-none' onChange={(event) => handleChangeColor(color?._id, event)} /></td>
                        <td><img style={{ width: '50px', height: '50px', objectFit: 'cover' }} src={color.img} alt="Chưa có ảnh" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </form>
        </div>
        <div className="card-footer">
          <button className='' style={{cursor: 'pointer'}} type="submit" onClick={(event) => handleSubmit(event)} >
            <i className="fa fa-dot-circle-o" /> Submit
          </button>
          <button type="reset" >
            <i className="fa fa-ban" /> Reset
          </button>
        </div>


      </div>


    </div>
  )
}

export default AddVariant
