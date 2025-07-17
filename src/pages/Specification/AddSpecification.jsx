import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import colorService from '../../services/colorService';
import specificationService from '../../services/specificationService';

const AddSpecification = () => {
  const navigate = useNavigate()
  const {response: responseAddSpecification, fetchApi: fetchAddSpecification } = useApi(specificationService.create);
  const [formData, setFormData] = useState({
    name: '',
    is_active: true
  })

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target
    setFormData({
      ...formData,
      [name]: type == 'checkbox' ? checked : value,
    })
  }

  const submitForm = () => {
    fetchAddSpecification(formData)
  }

  useEffect(() => {
    if (responseAddSpecification && responseAddSpecification?.success) {
      navigate('/specification')
    }
  }, [responseAddSpecification])

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          Thêm mới <strong>Thông số sản phẩm</strong>
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
                  Tên thông số
                </label>
              </div>
              <div className="col-12 col-md-9">
                <input
                  type="text"
                  id="text-input"
                  name="name"
                  placeholder="Tên thông số"
                  className="form-control"
                  value={formData.name}
                  onChange={(event) => handleChange(event)}
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
                    <label htmlFor="checkbox1" className="form-check-label ">
                      <input
                        type="checkbox"
                        id="checkbox1"
                        name="is_active"
                        value={false}
                        className="form-check-input"
                        onChange={(event) => handleChange(event)}
                        checked={formData.is_active == true}
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

export default AddSpecification
