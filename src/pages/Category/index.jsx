import React, { useEffect, useState } from 'react'
import ScriptLoader from '../../common/ScriptLoader'
import axiosInstance from '../../utils/axios'

const ListCategory = () => {

  const [arrayCategory, setArrayCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get('/categories');
        setArrayCategory(data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

  }, [])




  const arrayCss = [
    "/assets/css/lib/datatable/dataTables.bootstrap.min.css",
    // 'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800'
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

  ScriptLoader(arrayCss, arrayScripts)

  return (
    <>
      <div className="animated fadeIn">
        <div className="row ">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div>
                  Danh sách<strong className="card-title"> Danh mục sản phẩm</strong>
                </div>
                <a href='/category/add' className='btn btn-success'> Thêm mới</a>

              </div>
              <div className="card-body">
                <table
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
                            <i className='menu-icon fa fa-minus-square text-danger' /> }</td>
                            

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
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default ListCategory
