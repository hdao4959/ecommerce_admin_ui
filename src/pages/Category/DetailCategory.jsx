import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axios';
import ScriptLoader from '../../common/ScriptLoader';
import categoryService from '../../services/categoryService';
import useApi from '../../hooks/useApi'
const DetailCategory = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([])

  const { data: responseCategory, fetchApi: fetchCategory } = useApi(categoryService.getDetail);
  const { data: responseProductsOfCategory, fetchApi: fetchProductsOfCategory } = useApi(categoryService.getProductsOfCategory);

  const [formData, setFormData] = useState({
    name: '',
    parent_name: "",
    is_active: false
  })

  useEffect(() => {
    fetchCategory(id);
    fetchProductsOfCategory(id);
  }, [])

  useEffect(() => {
    if (responseCategory) {
      setFormData(prev => ({
        ...prev,
        name: responseCategory.name,
        parent_name: responseCategory?.parent?.name || 'Không có danh mục cha',
        is_active: responseCategory.is_active

      }))
    }
    if (responseProductsOfCategory) {
      setProducts(responseProductsOfCategory.products)
    }
  }, [responseCategory, responseProductsOfCategory])


  return (
    <>
      <div className="animated fadeIn">
        <div className="row ">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                Chỉnh sửa <strong>Danh mục sản phẩm</strong>
              </div>
              <form
                className="form-horizontal"
              >
                <div className="card-body card-block">

                  <div className="row form-group">
                    <div className="col col-md-3">
                      <label htmlFor="text-input" className=" form-control-label">
                        Tên danh mục
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input
                        disabled
                        type="text"
                        id="text-input"
                        name="name"
                        placeholder="Text"
                        className="form-control"
                        value={formData.name}
                      />
                      {/* <small className="form-text text-muted">This is a help text</small> */}
                    </div>
                  </div>




                  <div className="row form-group">
                    <div className="col col-md-3">
                      <label htmlFor="select" className=" form-control-label">
                        Danh mục cha
                      </label>
                    </div>
                    <div className="col-12 col-md-9">
                      <select disabled name="parent_id" id="select" className="form-control">
                        <option value="">{formData.parent_name}</option>
                      </select>
                    </div>
                  </div>


                  <div className="row form-group">
                    <div className="col col-md-3">
                      <label className=" form-control-label">Trạng thái</label>
                    </div>
                    <div className="col col-md-9">
                      <div className="form-check">
                        <div className="checkbox">
                          <label htmlFor="checkbox1" className="form-check-label ">
                            <input disabled
                              value={formData.is_active}
                              type="checkbox"
                              id="checkbox1"
                              name="is_active"
                              checked={formData.is_active}
                              className="form-check-input"
                            />
                            Active
                          </label>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className='card-footer'>
                  <Link to='/category' className='btn btn-secondary btn-sm mr-2'>Quay lại</Link>
                  <Link to={`/category/${id}/edit`} className='btn btn-warning btn-sm'>Trang chỉnh sửa</Link>
                </div>
              </form>

            </div>

          </div>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <strong>
                  Danh sách Sản phẩm
                </strong>
              </div>
              <div className="card-body">
                <table className='table table-striped'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Dòng sản phẩm</th>
                      <th>Biến thể</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products.map((product, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{product?.name}</td>
                          <td>{product?.variants?.map((variant, index) => (<span key={index}>{variant.name}|</span>))}</td>
                        </tr>
                      ))
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

export default DetailCategory
