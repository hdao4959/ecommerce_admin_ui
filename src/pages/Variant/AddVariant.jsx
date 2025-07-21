import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios'
import useApi from '../../hooks/useApi'
import productService from '../../services/productService'
import colorService from '../../services/colorService'
import { useNavigate } from 'react-router-dom'
import variantService from '../../services/variantService'
import Ckeditor from '../../components/Ckeditor'
import specificationService from '../../services/specificationService'

const AddVariant = () => {
  const { data: resSpecAllActive } = useApi(specificationService.getAllActive, true);
  const { data: resProductAllActive } = useApi(productService.getAllActive, true);
  const { data: resColorAllActive } = useApi(colorService.getAllActive, true);
  const { response: responseAddVariant, fetchApi: fetchAddVariant } = useApi(variantService.create);
  const navigate = useNavigate()
  const [formVariant, setFormVariant] = useState({
    name: "",
    is_active: false,
    product_id: '',
    description: ''
  })
  const [newSelectId, setNewSelectId] = useState(null)
  const [specs, setSpecs] = useState([]);
  const [productLineActives, setProductLineActives] = useState([]);
  const [colorActives, setColorActives] = useState([]);

  const handleAddSpec = (e, idSpec) => {
    e.preventDefault();
    const spec = resSpecAllActive?.items?.find(spec => spec._id == idSpec);
    if (!spec) {
      alert('Thông số không tồn tại!')
    } else {
      setSpecs(prev => ([
        ...prev,
        {
          _id: spec?._id,
          name: spec?.name,
          value: ""
        }
      ]))
    }
  }

  const handleRemoveSpec = (index) => {
    setSpecs(prev => prev.filter((spec, i) => i != index))
  }

  const handleChangeSpec = (index, value) => {
    setSpecs(prev => prev.map((spec, i) =>
      i == index ?
        {
          ...spec,
          value: value
        } : spec))
  }

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
    const formData = new FormData;
    formData.append('variant', JSON.stringify(formVariant))
    formData.append('specifications', JSON.stringify(specs))
    formData.append('colors', JSON.stringify(formColor))
    formColor?.forEach(color => {
      formData.append('images', color.image)
    });
    fetchAddVariant(formData)
  }

  useEffect(() => {
    if (resProductAllActive) {
      setProductLineActives(resProductAllActive.items);
    }
  }, [resProductAllActive])

  useEffect(() => {
    if (resColorAllActive) {
      setColorActives(resColorAllActive.items.map(color => ({ ...color, price: 0, stock: 0, image: color?.image || null, img: null })))
    }
  }, [resColorAllActive])

  useEffect(() => {
    if (responseAddVariant && responseAddVariant?.success) {
      navigate('/variant')
    }
  }, [responseAddVariant])

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
            <div>
              <span>Chi tiết</span>
              <div>
                <Ckeditor
                  value={formVariant?.description} onChange={(data) => setFormVariant(prev => ({
                    ...prev, description: data
                  }))} />
              </div>
            </div>

            <div className="my-3">
              <h5>Thông số kỹ thuật</h5>
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Thông số</th>
                    <th>Giá trị</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {specs?.length > 0 && specs?.map((spec, index) => (
                    <tr key={index}>
                      <td>{spec.name}</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={spec.value}
                          onChange={(e) => handleChangeSpec(index, e.target.value)}
                        />
                      </td>
                      <td>
                        <button
                          type='button'
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemoveSpec(index)}
                        >
                          🗑 Xoá
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3">
                      <div className="d-flex justify-content-between">
                        <select
                          className="form-control"
                          value={newSelectId || ""}
                          onChange={(e) => setNewSelectId(e.target.value)}
                        >
                          <option value="">-- Chọn thông số --</option>
                          {resSpecAllActive?.items?.map((spec) => (
                            <option key={spec._id} value={spec._id}>
                              {spec.name}
                            </option>
                          ))}
                        </select>
                        <button
                          type='button'
                          className="btn btn-success"
                          onClick={(e) => handleAddSpec(e, newSelectId)}
                          disabled={specs.map(spec => spec._id).includes(newSelectId)}
                        >
                          Thêm
                        </button>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>


            <div className='my-2'>
              <strong>Biến thể</strong>
              <p className='text-danger'>Những màu sắc không có <strong><i>giá</i></strong> hoặc <strong><i>số lượng</i></strong> sẽ không được thêm</p>
              <div>
                <div style={{ maxHeight: "300px", overflowY: 'auto' }}>
                  <table id='table_add_variant' className=' table table-bordered'  >
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
            </div>

          </form>
        </div>
        <div className="card-footer">
          <button className='' style={{ cursor: 'pointer' }} type="submit" onClick={(event) => handleSubmit(event)} >
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
