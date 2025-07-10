import React, { useState } from 'react'
import ScriptLoader from '../../common/ScriptLoader'
import Datatable from '../../components/Datatable';
import env from '../../config/env';
import { Link } from 'react-router-dom';

const ListProduct = () => {
  const [loadAllScript, setLoadAllScript] = useState(false);

  const columnTitles = [
    "Id",
    "Tên sản phẩm",
    "Active",
    "Tuỳ chọn",
  ]

  const columns = [
    {
      className: 'align-content-center',
      data: '_id'
    },
    {
      className: 'align-content-center',
      data: 'name'
    },
    {
      className: 'align-content-center',
      data: 'is_active',
      render: function (data) {
        return data == true ?
          `<i class="menu-icon fa fa-check-circle text-success" />` :
          `<i class="menu-icon fa fa-minus-square text-danger" />`
      }
    },
  ]

  const options = [
    'show', 'edit', 'delete'
  ]



  const arrayCss = [
    "/assets/css/lib/datatable/dataTables.bootstrap.min.css",
  ]
  const arrayScripts = [
    "/assets/js/lib/data-table/datatables.min.js",
    "/assets/js/lib/data-table/dataTables.bootstrap.min.js",
    "/assets/js/lib/data-table/dataTables.buttons.min.js",
    "/assets/js/lib/data-table/buttons.bootstrap.min.js",
    "/assets/js/lib/data-table/jszip.min.js",
    "/assets/js/lib/data-table/vfs_fonts.js",
    "/assets/js/lib/data-table/buttons.html5.min.js",
    "/assets/js/lib/data-table/buttons.print.min.js",
    "/assets/js/lib/data-table/buttons.colVis.min.js",
    "/assets/js/init/datatables-init.js"
  ]


  return (
    <>
      <ScriptLoader arrayCss={arrayCss} arrayScripts={arrayScripts} onLoadAll={() => setLoadAllScript(true)} />
      <div className="animated fadeIn">
        <div className="row ">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <strong className="card-title">Danh sách <span className='text-info'>Sản phẩm</span></strong>
                <Link to="/product/add" className='btn btn-success'>Thêm mới</Link>
              </div>
              <div className="card-body">
                {
                  loadAllScript &&
                  <Datatable ajaxUrl={`${env.VITE_ADMIN_API_URL}/products`} tableId="product-datatable" columnTitles={columnTitles} columns={columns} options={options} endPoint="product" onDelete={true} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListProduct
