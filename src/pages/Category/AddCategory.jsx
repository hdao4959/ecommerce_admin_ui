import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import categoryService from '../../services/categoryService';

const AddCategory = () => {
  const { data: responseAllCategory, fetchApi: fetchAllCategory } = useApi(categoryService.getAll);
  const { response: resAddCategory, fetchApi: fetchAddCategory } = useApi(categoryService.create);
  const navigate = useNavigate()
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    parent_id: "",
    is_active: false
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  useEffect(() => {
    fetchAllCategory()
  }, [])


  useEffect(() => {
    if (responseAllCategory) {
      setCategories(responseAllCategory.items)
    }
  }, [responseAllCategory])


  const submitForm = async () => {
    fetchAddCategory(formData)
  }

  useEffect(() => {
    if (resAddCategory && resAddCategory.success) {
      navigate('/category')
    }
  }, [resAddCategory])


  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          Thêm mới <strong>Danh mục sản phẩm</strong>
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
                  placeholder="Text"
                  className="form-control"
                  value={formData.name}
                  onChange={(event) => handleChange(event)}
                />
                {/* <small className="form-text text-muted">This is a help text</small> */}
              </div>
            </div>




            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="select" className=" form-control-label">
                  Danh mục cha
                </label>
              </div>
              <div className="col-12 col-md-9">
                <select name="parent_id" id="select" className="form-control" value={formData.parent_id} onChange={(event) => handleChange(event)}>
                  <option value="">--Danh mục cha--</option>
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
                        defaultValue={true}
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
            <a href='/category' type="reset" className="btn btn-secondary btn-sm">
              {/* <i className="fa fa-ban" /> */}
               Quay lại
            </a>
            <button type='submit' className="btn btn-sm">
              <i className="fa fa-dot-circle-o" /> Submit
            </button>
          </div>

        </form>

      </div>

    </div>

  )
}

export default AddCategory
