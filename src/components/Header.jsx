import { useEffect } from 'react'


const Header = () => {

  // const arrayCss = [
  //   "/assets/css/lib/datatable/dataTables.bootstrap.min.css",
  // ]
  // const arrayScripts = [
  //   "/assets/js/lib/data-table/datatables.min.js",
  //   "/assets/js/lib/data-table/dataTables.bootstrap.min.js",
  //   "/assets/js/lib/data-table/dataTables.buttons.min.js",
  //   "/assets/js/lib/data-table/buttons.bootstrap.min.js",
  //   "/assets/js/lib/data-table/jszip.min.js",
  //   "/assets/js/lib/data-table/vfs_fonts.js",
  //   "/assets/js/lib/data-table/buttons.html5.min.js",
  //   "/assets/js/lib/data-table/buttons.print.min.js",
  //   "/assets/js/lib/data-table/buttons.colVis.min.js",
  //   "/assets/js/init/datatables-init.js",
  // ]
  useEffect(() => {
    
  if ($) {
    const $ = window.$;
    $('#menuToggle').on('click', function (event) {
      var windowWidth = $(window).width();
      if (windowWidth < 1010) {
        $('body').removeClass('open');
        if (windowWidth < 760) {
          $('#left-panel').slideToggle();
        } else {
          $('#left-panel').toggleClass('open-menu');
        }
      } else {
        $('body').toggleClass('open');
        $('#left-panel').removeClass('open-menu');
      }

    });
  }
  return () => {
    $('#menuToggle').off('click');
  };

}, [])


return (
  <header id="header" className="header">
    <div className="top-left">
      <div className="navbar-header">
        <a className="navbar-brand" href="./">
          {/* <img src="/images/logo.png" alt="Logo" /> */}
          HairPhones <strong className='text-success'>Admin</strong>

        </a>
        <a className="navbar-brand hidden" href="./">
          HairPhones <strong className='text-success'>Admin</strong>

          {/* <img src="/images/logo2.png" alt="Logo" /> */}
        </a>
        <a id="menuToggle" className="menutoggle">
          <i className="fa fa-bars" />
        </a>
      </div>
    </div>
    <div className="top-right">
      <div className="header-menu">
        <div className="header-left">
          <button className="search-trigger">
            <i className="fa fa-search" />
          </button>
          <div className="form-inline">
            <form className="search-form">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search ..."
                aria-label="Search"
              />
              <button className="search-close" type="submit">
                <i className="fa fa-close" />
              </button>
            </form>
          </div>
          <div className="dropdown for-notification">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="notification"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-bell" />
              <span className="count bg-danger">3</span>
            </button>
            <div className="dropdown-menu" aria-labelledby="notification">
              <p className="red">You have 3 Notification</p>
              <a className="dropdown-item media" href="#">
                <i className="fa fa-check" />
                <p>Server #1 overloaded.</p>
              </a>
              <a className="dropdown-item media" href="#">
                <i className="fa fa-info" />
                <p>Server #2 overloaded.</p>
              </a>
              <a className="dropdown-item media" href="#">
                <i className="fa fa-warning" />
                <p>Server #3 overloaded.</p>
              </a>
            </div>
          </div>
          <div className="dropdown for-message">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="message"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-envelope" />
              <span className="count bg-primary">4</span>
            </button>
            <div className="dropdown-menu" aria-labelledby="message">
              <p className="red">You have 4 Mails</p>
              <a className="dropdown-item media" href="#">
                <span className="photo media-left">
                  <img alt="avatar" src="/images/avatar/1.jpg" />
                </span>
                <div className="message media-body">
                  <span className="name float-left">Jonathan Smith</span>
                  <span className="time float-right">Just now</span>
                  <p>Hello, this is an example msg</p>
                </div>
              </a>
              <a className="dropdown-item media" href="#">
                <span className="photo media-left">
                  <img alt="avatar" src="/images/avatar/2.jpg" />
                </span>
                <div className="message media-body">
                  <span className="name float-left">Jack Sanders</span>
                  <span className="time float-right">5 minutes ago</span>
                  <p>Lorem ipsum dolor sit amet, consectetur</p>
                </div>
              </a>
              <a className="dropdown-item media" href="#">
                <span className="photo media-left">
                  <img alt="avatar" src="/images/avatar/3.jpg" />
                </span>
                <div className="message media-body">
                  <span className="name float-left">Cheryl Wheeler</span>
                  <span className="time float-right">10 minutes ago</span>
                  <p>Hello, this is an example msg</p>
                </div>
              </a>
              <a className="dropdown-item media" href="#">
                <span className="photo media-left">
                  <img alt="avatar" src="/images/avatar/4.jpg" />
                </span>
                <div className="message media-body">
                  <span className="name float-left">Rachel Santos</span>
                  <span className="time float-right">15 minutes ago</span>
                  <p>Lorem ipsum dolor sit amet, consectetur</p>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="user-area dropdown float-right">
          <a
            href="#"
            className="dropdown-toggle active"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              className="user-avatar rounded-circle"
              src="/images/admin.jpg"
              alt="User Avatar"
            />
          </a>
          <div className="user-menu dropdown-menu">
            <a className="nav-link" href="#">
              <i className="fa fa- user" />
              My Profile
            </a>
            <a className="nav-link" href="#">
              <i className="fa fa- user" />
              Notifications <span className="count">13</span>
            </a>
            <a className="nav-link" href="#">
              <i className="fa fa -cog" />
              Settings
            </a>
            <a className="nav-link" href="#">
              <i className="fa fa-power -off" />
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
)
}

export default Header
