import { Link, useLocation } from "react-router-dom"

const LeftPanel = () => {

  const location = useLocation();
  const { pathname } = location

  return (
    <aside id="left-panel" className="left-panel">
      <nav className="navbar navbar-expand-sm navbar-default">
        <div id="main-menu" className="main-menu collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li title="Dashboard" className={`${pathname === '/' ? 'active' : ''}`}>
              <Link to="/">
                <i className="menu-icon fa fa-laptop" />
                Dashboard
              </Link>
            </li>

            <li title="Danh mục sản phẩm" className={`menu-item-has-children dropdown ${pathname === '/category' || pathname === '/category/add' ? "active" : ''}`}>
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false" 
              >
                <i className="menu-icon fa fa-folder" />
                Danh mục sản phẩm
              </a>
              <ul className="sub-menu children dropdown-menu">

                <li className="active">
                  <i className="fa fa-table" />
                  <Link to="/category">Danh sách</Link>
                </li>

                <li>
                  <i className="fa fa-plus" />
                  <Link to="/category/add">Thêm mới</Link>
                </li>
              </ul>
            </li>

            <li title="Dòng sản phẩm" className={`menu-item-has-children dropdown ${pathname === '/product' || pathname === '/product/add' ? 'active' : ''}`}>
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="menu-icon fa fa-folder" />
                Dòng sản phẩm
              </a>
              <ul className="sub-menu children dropdown-menu">

                <li>
                  <i className="fa fa-table" />
                  <Link to="/product">Danh sách</Link>
                </li>

                <li>
                  <i className="fa fa-plus" />
                  <Link to="/product/add">Thêm mới</Link>
                </li>
              </ul>
            </li>
            <li title="Biến thể sản phẩm" className={`menu-item-has-children dropdown ${pathname === '/variant' || pathname === '/variant/add' ? 'active' : ''}`}>
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="menu-icon fa fa-folder" />
                Biến thể sản phẩm
              </a>
              <ul className="sub-menu children dropdown-menu">

                <li>
                  <i className="fa fa-table" />
                  <Link to="/variant">Danh sách</Link>
                </li>

                <li>
                  <i className="fa fa-plus" />
                  <Link to="/variant/add">Thêm mới</Link>
                </li>
              </ul>
            </li>

            <li title="Màu sắc" className={`menu-item-has-children dropdown ${pathname === '/color' || pathname === '/color/add' ? 'active' : ''}`}>
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="menu-icon fa fa-folder" />
                Màu sắc
              </a>
              <ul className="sub-menu children dropdown-menu">

                <li>
                  <i className="fa fa-table" />
                  <Link to="/color">Danh sách</Link>
                </li>

                <li>
                  <i className="fa fa-plus" />
                  <Link to="/color/add">Thêm mới</Link>
                </li>
              </ul>
            </li>
            <li title="Thông số sản phẩm" className={`menu-item-has-children dropdown ${pathname === '/specification' || pathname === '/specification/add' ? 'active' : ''}`}>
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="menu-icon fa fa-folder" />
                Thông số sản phẩm
              </a>
              <ul className="sub-menu children dropdown-menu">

                <li>
                  <i className="fa fa-table" />
                  <Link to="/specification">Danh sách</Link>
                </li>

                <li>
                  <i className="fa fa-plus" />
                  <Link to="/specification/add">Thêm mới</Link>
                </li>
              </ul>
            </li>

            <li title="Đơn hàng" className={`menu-item-has-children dropdown ${pathname === '/order' ? 'active' : ''}`}>
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="menu-icon fa fa-folder" />
                Đơn hàng
              </a>
              <ul className="sub-menu children dropdown-menu">

                <li>
                  <i className="fa fa-table" />
                  <Link to="/order">Danh sách</Link>
                </li>

              </ul>
            </li>

            <li title="Tài khoản người dùng" className={`menu-item-has-children dropdown ${pathname === '/user' || pathname === '/user/add' ? 'active' : ''}`}>
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="menu-icon fa fa-folder" />
                Tài khoản người dùng
              </a>
              <ul className="sub-menu children dropdown-menu">

                <li>
                  <i className="fa fa-table" />
                  <Link to="/user">Danh sách</Link>
                </li>
                <li>
                  <i className="fa fa-plus" />
                  <Link to="/user/add">Thêm mới</Link>
                </li>
              </ul>
            </li>

 
          
            {/* /.menu-title */}
            {/* <li className="menu-item-has-children dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                <i className="menu-icon fa fa-glass" />
                Pages
              </a>
              <ul className="sub-menu children dropdown-menu">
                <li>
                  <i className="menu-icon fa fa-sign-in" />
                  <a href="page-login.html">Login</a>
                </li>
                <li>
                  <i className="menu-icon fa fa-sign-in" />
                  <a href="page-register.html">Register</a>
                </li>
                <li>
                  <i className="menu-icon fa fa-paper-plane" />
                  <a href="pages-forget.html">Forget Pass</a>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
        {/* /.navbar-collapse */}
      </nav>
    </aside>
  )
}

export default LeftPanel
