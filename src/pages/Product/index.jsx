import React, { useEffect, useState } from 'react'
import ScriptLoader from '../../common/ScriptLoader'
import axiosInstance from '../../utils/axios';

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get('/products');
      setProducts(data.data);
    })()
  }, [])
  console.log(products);

  const arrayCss = [
    "/assets/css/lib/datatable/dataTables.bootstrap.min.css",
    'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800'
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
              <div className="card-header">
                Danh sách<strong className="card-title"> Sản phẩm</strong>
              </div>
              <div className="card-body">
                <table
                  id="bootstrap-data-table"
                  className="table table-striped table-bordered"
                >
                  <thead>

                    <tr>
                      <th>Id</th>
                      <th>Tên sản phẩm</th>
                      <th>Trạng thái</th>
                      <th>Tuỳ chọn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => {
                      return (
                        <tr key={index}>
                          <td>{product._id}</td>
                          <td>{product.name}</td>
                          <td>{product.status}</td>
                          <td className='align-content-center'>
                            <div className="d-flex justify-content-around">
                              <a href={`/product/${product._id}`} className="btn btn-success" >
                                Chi tiết
                              </a>
                              <button className='btn btn-secondary'>
                                <i className='menu-icon fa fa-edit'></i>
                              </button>
                              <button className='btn btn-danger'><i className='menu-icon fa fa-trash-o'> </i></button>
                            </div>
                          </td>
                          {/* <td><button className='btn btn-success'>Chi tiết</button></td> */}
                        </tr>
                      )
                    })}

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

export default ListProduct
