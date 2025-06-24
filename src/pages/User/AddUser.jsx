import React, { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi';
import userService from '../../services/userService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone_number: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const { data, fetchApi } = useApi(userService.create);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setForm(prev => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchApi(form)
  }

  useEffect(() => {
    if (data) {
      // toast.success(data?.response?.message)
      setForm({
        name: '',
        phone_number: '',
        email: '',
        password: '',
        confirm_password: ''
      })
      navigate('/user')
    }
  }, [data])

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <strong className='text-info'>Thêm mới tài khoản</strong>
        </div>
        <div className="card-body card-block">
          <form method="post" className="">
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="fa fa-user" />
                </div>
                <input
                  value={form.name}
                  type="text"
                  id="name"
                  onChange={(event) => handleOnChange(event)}
                  name="name"
                  placeholder="Họ và tên"
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="fa fa-phone" />
                </div>
                <input
                  value={form.phone_number}
                  onChange={(event) => handleOnChange(event)}
                  name="phone_number"
                  placeholder="Số điện thoại"
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="fa fa-envelope" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  autoComplete='new-password'

                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="fa fa-asterisk" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete='new-password'
                  placeholder="Mật khẩu"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="fa fa-asterisk" />
                </div>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="Nhập lại mật khẩu"
                  autoComplete='new-password'
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                />
              </div>
            </div>


            <div className="form-actions form-group">
              <button onClick={(event) => handleSubmit(event)} type="submit" className="btn btn-success btn-sm">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default AddUser
