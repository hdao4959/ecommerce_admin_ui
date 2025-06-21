import React, { useEffect, useState } from 'react'
import ScriptLoader from '../../common/ScriptLoader'
import axiosInstance from '../../utils/axios';

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get('/products');
      setProducts(data.data.products);
      setLoading(false);
    })()
  }, [])

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

  // ScriptLoader(arrayCss, arrayScripts)

  return (
    <>

      {!loading && (
        <ScriptLoader arrayCss={arrayCss} arrayScripts={arrayScripts} />
      )}

      <div className="animated fadeIn">
        <div className="row ">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <strong className="card-title">Danh sách <span className='text-info'>Sản phẩm</span></strong>
                <a href='/product/add' className='btn btn-success'> Thêm mới</a>

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
                      <th>Active</th>
                      <th>Tuỳ chọn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          <i className="fa fa-spinner fa-spin fa-2x text-primary"></i>
                          <p>Đang tải dữ liệu...</p>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {products.map((product, index) => (
                          <tr key={index}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.is_active ? 'true' : 'false'}</td>
                            <td className='align-content-center'>
                              <div className="d-flex justify-content-around">
                                <a href={`/product/${product._id}`} className="btn btn-success" >
                                  Chi tiết
                                </a>
                                <a href={`/product/${product._id}/edit`} className='btn btn-secondary'>
                                  <i className='menu-icon fa fa-edit'></i>
                                </a>
                                <button className='btn btn-danger'><i className='menu-icon fa fa-trash-o'> </i></button>
                              </div>
                            </td>
                            {/* <td><button className='btn btn-success'>Chi tiết</button></td> */}
                          </tr>
                        )
                        )}
                      </>
                    )}


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
