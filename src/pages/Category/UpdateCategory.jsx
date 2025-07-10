import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import categoryService from '../../services/categoryService';

const UpdateCategory = () => {
  const { data: dataCategory, fetchApi: fetchCategory} = useApi(categoryService.getDetail);
  const { data: dataAllCategory, fetchApi: fetchAllCategory } = useApi(categoryService.getAll);
  const { response: resUpdateCategory, fetchApi: fetchUpdateCategory} = useApi(categoryService.update);
 
  const navigate = useNavigate();
  const {id} = useParams();
  const [categories, setCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    parent_id: "",
    is_active: false
  })

  const handleChange = (event) => {
    const {name, value, type, checked} = event.target
    setFormData({
      ...formData,
      [name]: type == 'checkbox' ? checked : value
    })
  }

  useEffect(() => {
    fetchAllCategory()
    fetchCategory(id)
  }, [])


  useEffect(() => {
    if(dataCategory){
      setFormData(prev => ({
        ...prev,
        name: dataCategory.name,
        parent_id: dataCategory.parent_id,
        is_active: dataCategory.is_active
      }))
    }

    if (dataAllCategory) {
      setCategories(dataAllCategory.items.filter(cate => cate?.type !== 'not_delete' && cate._id !== id))
    }
  }, [dataCategory, dataAllCategory])


  const submitForm = async () => {
    fetchUpdateCategory(id, formData)
  }

  useEffect(() => {
    if(resUpdateCategory && resUpdateCategory.success){
      navigate('/category')
    }
  }, [resUpdateCategory])


  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          Chỉnh sửa <strong>Danh mục sản phẩm</strong>
        </div>
        <form
          type='submit' onSubmit={(e) => {
            e.preventDefault()
            submitForm()
          }}
          method="post"
          encType="multipart/form-data"
          className="form-horizontal"
        >
          <div className="card-body card-block">

            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="text-input" className=" form-control-label">
                  Tên danh mục
                </label>
              </div>
              <div className="col-12 col-md-9">
                <input
                  type="text"
                  id="text-input"
                  name="name"
                  placeholder="Tên danh mục"
                  className="form-control"
                  value={formData.name}
                  onChange={(event) => handleChange(event)}
                />
              </div>
            </div>




            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="select" className=" form-control-label">
                  Danh mục cha
                </label>
              </div>
              <div className="col-12 col-md-9">
                <select name="parent_id" id="select" className="form-control" value={formData.parent_id || ''} onChange={(event) => handleChange(event)}>
                  <option value="">--Chọn danh mục cha--</option>
                  {categories.map((cate, index) =>

                    <option key={index} value={cate._id}>{cate.name}</option>
                  )}
                </select>
              </div>
            </div>


            <div className="row form-group">
              <div className="col col-md-3">
                <label className=" form-control-label">Trạng thái</label>
              </div>
              <div className="col col-md-9">
                <div className="form-check">
                  <div className="checkbox">
                    <label htmlFor="checkbox1" className="form-check-label ">
                      <input
                        type="checkbox"
                        id="checkbox1"
                        name="is_active"
                        defaultValue={formData.is_active}
                        checked={formData.is_active}
                        className="form-check-input"
                        onChange={(event) => handleChange(event)}
                      />
                      Active
                    </label>
                  </div>

                </div>
              </div>
            </div>


          </div>

          <div className="card-footer">
            <Link to="/category" className='btn btn-secondary btn-sm'>Quay lại</Link>
            <button type='submit' className="btn btn-primary btn-sm">
              <i className="fa fa-dot-circle-o" /> Chỉnh sửa
            </button>
          </div>

        </form>

      </div>

    </div>

  )
}

export default UpdateCategory
