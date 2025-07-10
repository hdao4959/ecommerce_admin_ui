import React, { useEffect, useState } from 'react'
import ScriptLoader from '../../common/ScriptLoader'
import axiosInstance from '../../utils/axios';
import Datatable from '../../components/Datatable';
import env from '../../config/env';

const ListVariant = () => {
  const [loadAllScript, setLoadAllScript] = useState(false);

  const columnTitles = [
    "#",
    "Id",
    "Tên biến thể",
    "Tên sản phẩm",
    "Active",
    "Tuỳ chọn"
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
      data: 'product.name'
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

  const options = [
    'show', 'edit', 'delete'
  ]

  const showMore = (d) => {
    return `
    <table class='table border'>
    <tbody>
    <tr>
      <td><strong>Id</strong></td>
      <td>${d?._id}</td>
    </tr>
    <tr>
      <td><strong>Tên biến thể</strong></td>
      <td>${d?.name}</td>
    </tr>
    <tr>
      <td><strong>Dòng sản phẩm</strong></td>
      <td>${d?.product?.name}</td>
    </tr>
    <tr>
      <td><strong>Màu sắc</strong></td>
      <td>${d?.variantColor?.map(varColor => (varColor?.color?.name)).join('|')}</td>
    </tr>
    <tr>
      <td><strong>Active</strong></td>
      <td>${d?.is_active == true ?
        `<i class="menu-icon fa fa-check-circle text-success" />` :
        `<i class="menu-icon fa fa-minus-square text-danger" />`
      }</td>
    </tr>
    </tbody>
    </table>
    `
  }
  return (
    <>
      <ScriptLoader arrayCss={arrayCss} arrayScripts={arrayScripts} onLoadAll={() => setLoadAllScript(true)} />
      <div className="animated fadeIn">
        <div className="row ">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <strong className="card-title">Danh sách <span className='text-info'>Biến thể</span></strong>
                <a href='/variant/add' className='btn btn-success'> Thêm mới</a>
              </div>
              <div className="card-body">
                {
                  loadAllScript &&
                  <Datatable
                    ajaxUrl={`${env.VITE_ADMIN_API_URL}/variants`} columnTitles={columnTitles} columns={columns} tableId="variant-datatable" options={options} showMore={showMore} endPoint="variant" onDelete={true} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListVariant
