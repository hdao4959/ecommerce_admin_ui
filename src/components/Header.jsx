import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { socket } from '../utils/socket';
import useApi from '../hooks/useApi';
import notificationService from '../services/notificationService';
import env from '../config/env';
import convertTimestamp from '../utils/convertTimestamp';


const Header = () => {
  const account = JSON.parse(sessionStorage.getItem('account'))
  const [countNotiRecent, setCountNotiRecent] = useState(null)
  const [notifications, setNotifications] = useState([]);
  const { loading: loadingNotiRecent, data: dataNotiRecent, fetchApi: fetchNotiRecent } = useApi(notificationService.getNotificationsRecent, true);
  const { data: dataReadNotify, fetchApi: fetchReadNotify } = useApi(notificationService.readNotification)
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


  useEffect(() => {
    socket.on('notification_recent', fetchNotiRecent)
    return () => {
      socket.off('notification_recent', fetchNotiRecent)
    }
  }, [])

  useEffect(() => {
    if (dataNotiRecent?.countUnread) {
      setCountNotiRecent(dataNotiRecent.countUnread)
    }
    if (dataNotiRecent?.notifications) {
      setNotifications(dataNotiRecent.notifications)
    }
  }, [dataNotiRecent])


  const logout = () => {
    sessionStorage.removeItem('token')
    toast.success('Đăng xuất thành công!')
  }


  const handleClickReadNotify = (notifyId) => {
    fetchReadNotify(notifyId)
    fetchNotiRecent()
  }

  const handleScrollNotification = (event) => {
    const { clientHeight, scrollTop, scrollHeight } = event.target

    if (!loadingNotiRecent, clientHeight + scrollTop > scrollHeight - 1) {
      console.log("Load more");
    }


  }

  return (
    <header id="header" className="header">
      <div className="top-left">
        <div className="navbar-header">
          <Link className="navbar-brand" to="./"> HairPhones <strong className='text-success'>Admin</strong></Link>

          <Link className="navbar-brand hidden" to="./">
            HairPhones <strong className='text-success'>Admin</strong>

            {/* <img src="/images/logo2.png" alt="Logo" /> */}
          </Link>
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
            {/* <div className="dropdown for-notification">
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
            </div> */}

            {/* List hiển thị thông báo */}
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
                {
                  countNotiRecent &&
                  <span className="count bg-danger">{countNotiRecent}</span>
                }
              </button>
              <div onScroll={(event) => handleScrollNotification(event)} className="dropdown-menu" aria-labelledby="notification">
                <p className="text-danger">Bạn có {countNotiRecent} thông báo chưa đọc</p>

                <div style={{
                  height: "500px",
                  overflowY: 'auto'
                }}>
                  {
                    notifications?.map(item => (

                      <Link onClick={() => handleClickReadNotify(item?._id)} className={`dropdown-item media  ${item?.is_read ? "" : "bg-secondary"}`} to={`/${item?.reference_type}/${item?.reference_id}`}>
                        <span className="photo media-left">
                          <img alt="avatar" src={`${item?.reference_type == "order" ? `/icon-cart.png` : '/images/avatar/4.jpg'}`} />
                        </span>
                        <div className="message media-body">
                          <div className='align-items-center'>
                            <strong className="name text-truncate text-info" >{item?.title}</strong>
                          </div>
                          <p>{item?.content}</p>
                          <strong className="time">{convertTimestamp(item?.created_at)}</strong>
                        </div>
                      </Link>
                    ))
                  }

                </div>

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
                src={account?.picture || "/avatar_white.png"}
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
              <Link onClick={() => logout()} to="/login" className='nav-link'>
                <i className="fa fa-power -off" />
                Logout</Link>

            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
