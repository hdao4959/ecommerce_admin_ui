import React, { useEffect, useState } from 'react'
import ScriptLoader from '../../common/ScriptLoader'
import Datatable from '../../components/Datatable';
import env from '../../config/env';
import { Link } from 'react-router-dom';

const ListCategory = () => {
  const [loadAllScript, setLoadAllScript] = useState(false)

  const columnTitles = [
    "#",
    "Id",
    "Tên",
    "Trạng thái",
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
      data: 'is_active',
      render: function (data) {
        return data == true ?
          `<i class="menu-icon fa fa-check-circle text-success" />` :
          `<i class="menu-icon fa fa-minus-square text-danger" />`
      }
    },
  ]

  const showMore = (d) => {
    return d.children.length > 0 ?
      `
     <table class="table table-striped border">
    <thead>
    <tr>
    <th>#</th>
    <th>Id</th>
    <th>Name</th>
    <th>Active</th>
    <th>Actions</th>
    </tr>
    </thead>
    <tbody>
      ${d.children.map((child, index) => {
        return `<tr>
      <td>${index + 1}</td>
      <td>${child._id}</td>
      <td>${child.name}</td>
      <td>${child.is_active == true ?
            `<i class="menu-icon fa fa-check-circle text-success" />` :
            `<i class="menu-icon fa fa-minus-square text-danger" />`}
      </td>
      <td class="d-flex justify-content-around">
      <a href="/category/${child._id}" class="btn btn-success"><i class="text-light menu-icon fa fa-info-circle"></i></a>
      <a href="/category/${child._id}/edit" class="btn btn-secondary"><i class="menu-icon fa fa-edit"></i></a>
      <button data-id=${child._id} class="btn-delete btn btn-danger"><i class="menu-icon fa fa-trash-o"></i></button>
      </td>
      </tr>`
      }).join('')
      }
    </tbody>
      </table>
   `:
      `Không có danh mục con nào!`
  }

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
              <div className="card-header d-flex justify-content-between align-items-center">
                <div >
                  <strong className="card-title">Danh sách<span className='text-info'>Danh mục sản phẩm</span></strong>
                </div>
                <Link to='/category/add' className='btn btn-success'>Thêm mới</Link>
              </div>
              <div className="card-body">
                {
                  loadAllScript &&
                  <Datatable ajaxUrl={`${env.VITE_ADMIN_API_URL}/categories`} tableId="category-datatable" columnTitles={columnTitles} columns={columns} options={['edit', 'show', 'delete']} showMore={showMore} endPoint="category" onDelete={true} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListCategory
