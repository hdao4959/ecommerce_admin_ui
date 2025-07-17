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

            <li className="menu-title">UI elements</li>
            {/* /.menu-title */}
            <li className="menu-item-has-children dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                <i className="menu-icon fa fa-cogs" />
                Components
              </a>
              <ul className="sub-menu children dropdown-menu">
                {" "}
                <li>
                  <i className="fa fa-puzzle-piece" />
                  <a href="ui-buttons.html">Buttons</a>
                </li>
                <li>
                  <i className="fa fa-id-badge" />
                  <a href="ui-badges.html">Badges</a>
                </li>
                <li>
                  <i className="fa fa-bars" />
                  <a href="ui-tabs.html">Tabs</a>
                </li>
                <li>
                  <i className="fa fa-id-card-o" />
                  <a href="ui-cards.html">Cards</a>
                </li>
                <li>
                  <i className="fa fa-exclamation-triangle" />
                  <a href="ui-alerts.html">Alerts</a>
                </li>
                <li>
                  <i className="fa fa-spinner" />
                  <a href="ui-progressbar.html">Progress Bars</a>
                </li>
                <li>
                  <i className="fa fa-fire" />
                  <a href="ui-modals.html">Modals</a>
                </li>
                <li>
                  <i className="fa fa-book" />
                  <a href="ui-switches.html">Switches</a>
                </li>
                <li>
                  <i className="fa fa-th" />
                  <a href="ui-grids.html">Grids</a>
                </li>
                <li>
                  <i className="fa fa-file-word-o" />
                  <a href="ui-typgraphy.html">Typography</a>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                <i className="menu-icon fa fa-table" />
                Tables
              </a>
              <ul className="sub-menu children dropdown-menu">
                <li>
                  <i className="fa fa-table" />
                  <a href="tables-basic.html">Basic Table</a>
                </li>
                <li>
                  <i className="fa fa-table" />
                  <a href="tables-data.html">Data Table</a>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                <i className="menu-icon fa fa-th" />
                Forms
              </a>
              <ul className="sub-menu children dropdown-menu">
                <li>
                  <i className="menu-icon fa fa-th" />
                  <a href="forms-basic.html">Basic Form</a>
                </li>
                <li>
                  <i className="menu-icon fa fa-th" />
                  <a href="forms-advanced.html">Advanced Form</a>
                </li>
              </ul>
            </li>
            <li className="menu-title">Icons</li>
            {/* /.menu-title */}
            <li className="menu-item-has-children dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                <i className="menu-icon fa fa-tasks" />
                Icons
              </a>
              <ul className="sub-menu children dropdown-menu">
                <li>
                  <i className="menu-icon fa fa-fort-awesome" />
                  <a href="font-fontawesome.html">Font Awesome</a>
                </li>
                <li>
                  <i className="menu-icon ti-themify-logo" />
                  <a href="font-themify.html">Themefy Icons</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="widgets.html">
                {" "}
                <i className="menu-icon ti-email" />
                Widgets{" "}
              </a>
            </li>
            <li className="menu-item-has-children dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                <i className="menu-icon fa fa-bar-chart" />
                Charts
              </a>
              <ul className="sub-menu children dropdown-menu">
                <li>
                  <i className="menu-icon fa fa-line-chart" />
                  <a href="charts-chartjs.html">Chart JS</a>
                </li>
                <li>
                  <i className="menu-icon fa fa-area-chart" />
                  <a href="charts-flot.html">Flot Chart</a>
                </li>
                <li>
                  <i className="menu-icon fa fa-pie-chart" />
                  <a href="charts-peity.html">Peity Chart</a>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                <i className="menu-icon fa fa-area-chart" />
                Maps
              </a>
              <ul className="sub-menu children dropdown-menu">
                <li>
                  <i className="menu-icon fa fa-map-o" />
                  <a href="maps-gmap.html">Google Maps</a>
                </li>
                <li>
                  <i className="menu-icon fa fa-street-view" />
                  <a href="maps-vector.html">Vector Maps</a>
                </li>
              </ul>
            </li>
            <li className="menu-title">Extras</li>
            {/* /.menu-title */}
            <li className="menu-item-has-children dropdown">
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
            </li>
          </ul>
        </div>
        {/* /.navbar-collapse */}
      </nav>
    </aside>
  )
}

export default LeftPanel
