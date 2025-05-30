import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axios';
import ScriptLoader from '../../common/ScriptLoader';

const ChildrenCategory = () => {
  const [category, setCategory] = useState('')
  const [arrayChildrenCategory, setArrayChildrenCategory] = useState([]);
  const {id} = useParams();
  
  useEffect(() =>{
    const fetchData = async () => {
      try {
        const {data} = await axiosInstance.get('/categories/' + id);
        setArrayChildrenCategory(data.data.childrenCategory)
        setCategory(data.data.parentCategory)
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchData()
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
                Danh mục con của<strong className="card-title">  {category.name}</strong>
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

                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    arrayChildrenCategory.map((category, index) => {
                      return (
                        <tr key={index}>
                          <td>{category._id}</td>
                          <td>{category.name}</td>

                          <td>
                            <div className="d-flex justify-content-around">
                              <a href={`/category/${category._id}`} className="btn btn-success" >
                                Chi tiết
                              </a>
                              <button className='btn btn-secondary'>Sửa</button>
                              <button className='btn btn-danger'>Xoá</button>
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

export default ChildrenCategory
