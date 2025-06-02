import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios'

const AddVariant = () => {

  const [formData, setFormData] = useState({
    name: "",
    is_active: false,
    product_line_id: '',
  })
  const [productLineActives, setProductLineActives] = useState([]);
  const [colorActives, setColorActives] = useState([]);

  const [formColor, setFormColor] = useState([]);

  const handleChangeColor = (indexColor, event) => {
      console.log(indexColor);
    const {name, value, type}  = event.target;
    
    
    
  }
  useEffect(() => {
    (async () => {
      try {
        const productsResponse = await axiosInstance.get('/products?active=1');
        const colorsResponse = await axiosInstance.get('/colors?active=1');
        setProductLineActives(productsResponse.data.data.productLineActives)
        setColorActives(colorsResponse.data.data.colors)
      } catch (error) {
        alert(error.response.message);
      }
    })()
  }, [])

  
  const handleChangeVariant = (event) => {

    const { name, value, type, checked } = event.target
    
    setFormData(prev => ({
      ...prev, [name]: type == 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = () => {
    console.log(formData);
    
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
                <select name="product_line_id" id="select" className="form-control" onChange={(event) => handleChangeVariant(event)} >
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
                  value={formData.name}
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
                        value={formData.is_active}
                        checked={formData.is_active == true}
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
                        <td><input name='price' type="number" className='form-control' min={0} defaultValue={0} onChange={(event) => handleChangeColor(color?._id, event)} /></td>
                        <td><input name='quantity' type="number" className='form-control' min={0} defaultValue={0} onChange={(event) => handleChangeColor(color?._id, event)}/></td>
                        <td><input name='image' type="file" className='form-control' onChange={(event) => handleChangeColor(color?._id, event)}/></td>
                        <td><img src="" alt="Chưa có ảnh"/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </form>
        </div>
        <div className="card-footer">
          <button className='' type="submit" onClick={(event) => handleSubmit(event)} >
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
