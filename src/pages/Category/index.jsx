import React, { useEffect, useState } from 'react'
import ScriptLoader from '../../common/ScriptLoader'
import Datatable from '../../components/Datatable';
import env from '../../config/env';

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
        return data == true ? 'Active' : 'Not active'
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
                <a href='/category/add' className='btn btn-success'> Thêm mới</a>
              </div>
              <div className="card-body">
                {
                  loadAllScript &&
                  <Datatable ajaxUrl={`${env.VITE_ADMIN_API_URL}/categories`} tableId="category-datatable" columnTitles={columnTitles} columns={columns} options={['edit', 'show', 'delete']} endPoint="category" onDelete={true} />
                }
                {/* <table
                  id="bootstrap-data-table"
                  className="table table-striped table-bordered"
                >
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Tên</th>

                      <th>Trạng thái</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      arrayCategory.map((category, index) => {
                        return (
                          <tr key={index} className='align-content-center'>
                            <td className='align-content-center'>{category._id}</td>
                            <td className='align-content-center'>{category.name}</td>
                            <td className='text-center align-content-center'>{category.is_active ? <i className='menu-icon fa fa-check-circle text-success' /> :
                              <i className='menu-icon fa fa-minus-square text-danger' />}</td>


                            <td className='align-content-center'>
                              <div className="d-flex justify-content-around">
                                <a href={`/category/${category._id}`} className="btn btn-success" >
                                  Chi tiết
                                </a>
                                <button className='btn btn-secondary'>
                                  <i className='menu-icon fa fa-edit'></i>
                                </button>
                                <button className='btn btn-danger'><i className='menu-icon fa fa-trash-o'> </i></button>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }

                  </tbody>
                </table> */}
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default ListCategory
