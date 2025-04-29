import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const navigate =  useNavigate()
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
    (async () => {
      try {
        const { data } = await axiosInstance.get('/categories');
        
        setCategories(data.data)
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])

  const submitForm = async () => {
    const result = await axiosInstance.post('/categories', formData)
    navigate('/category')
  }

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

                    <option  key={index} value={cate._id}>{cate.name}</option>
                  )}

                </select>
              </div>
            </div>


            <div className="row form-group">
          <div className="col col-md-3">
            <label className=" form-control-label">Checkboxes</label>
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
          <button type='submit' className="btn btn-primary btn-sm">
            <i className="fa fa-dot-circle-o" /> Submit
          </button>
          <button type="reset" className="btn btn-danger btn-sm">
            <i className="fa fa-ban" /> Reset
          </button>
        </div>
        
        </form>
        
      </div>

    </div>

  )
}

export default AddCategory
