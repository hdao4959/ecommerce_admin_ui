import React, { useEffect, useState } from 'react'
import ScriptLoader from '../../common/ScriptLoader'
import useApi from '../../hooks/useApi'
import authService from '../../services/authService'
import { useNavigate } from 'react-router-dom'




const Login = () => {
  const navigate = useNavigate()
  const arrayCss = [
    "https://cdn.jsdelivr.net/npm/normalize.css@8.0.0/normalize.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css",
    "https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css",
    "https://cdn.jsdelivr.net/npm/pixeden-stroke-7-icon@1.2.3/pe-icon-7-stroke/dist/pe-icon-7-stroke.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.0/css/flag-icon.min.css",
    "/assets/css/cs-skin-elastic.css",
    "/assets/css/style.css",
  ]

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const { data: loginData, fetchApi: fetchLogin } = useApi(authService.loginWithEmail);

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchLogin(form)
  }

  useEffect(() => {
    if (loginData && loginData.token) {
      sessionStorage.setItem("token", loginData.token)
      sessionStorage.setItem("account", JSON.stringify(loginData.account))
      navigate('/')
    }

  }, [loginData])

  return (
    <>
      <ScriptLoader arrayCss={arrayCss} />

      <div className="sufee-login d-flex align-content-center flex-wrap">
        <div className="container">
          <div className="login-content">
            <div className="login-logo">

              <h1><strong className='text-secondary'>HairPhones</strong> <strong className='text-success'>Admin</strong></h1>
            </div>
            <div className="login-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" name="email" className="form-control" placeholder="Email" value={form.email} onChange={(event) => handleChange(event)} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={(event) => handleChange(event)}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" /> Remember Me
                  </label>
                  <label className="pull-right">
                    <a href="#">Forgotten Password?</a>
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-success btn-flat m-b-30 m-t-30"
                >
                  Sign in
                </button>
                {/* <div className="social-login-content">
                  <div className="social-button">
                    <button
                      type="button"
                      className="btn social facebook btn-flat btn-addon mb-3"
                    >
                      <i className="ti-facebook" />
                      Sign in with facebook
                    </button>
                    <button
                      type="button"
                      className="btn social twitter btn-flat btn-addon mt-2"
                    >
                      <i className="ti-twitter" />
                      Sign in with twitter
                    </button>
                  </div>
                </div>
                <div className="register-link m-t-15 text-center">
                  <p>
                    Don't have account ? <a href="#"> Sign Up Here</a>
                  </p>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Login
