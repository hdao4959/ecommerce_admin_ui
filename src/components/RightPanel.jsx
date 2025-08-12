import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const RightPanel = () => {
  return (
    <div id="right-panel" className="right-panel">
    <Header/>
    <div className="content">
      <Outlet/>
    </div>
    <div className="clearfix" />
    <footer className="site-footer">
      <div className="footer-inner bg-white">
        <div className="row">
          <div className="col-sm-6">Copyright © 2018 Ela Admin</div>
          <div className="col-sm-6 text-right">
            Designed by <a href="https://colorlib.com">Colorlib</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
  )
}

export default RightPanel
