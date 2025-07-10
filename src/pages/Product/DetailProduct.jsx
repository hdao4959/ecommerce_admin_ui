import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios';
import { Link, useParams } from 'react-router-dom';
import convertTimestamp from '../../utils/convertTimestamp';
import formatPrice from '../../utils/formatPrice.js';
import useApi from '../../hooks/useApi.js';
import productService from '../../services/productService.js';
import env from '../../config/env.js';
const DetailProduct = () => {
  const { id } = useParams();
  const { data: dataProductDetail, fetchApi: fetchProductDetail } = useApi(productService.getDetail);
  const { data: dataVariantsOfProduct, fetchApi: fetchVariantsOfProduct } = useApi(productService.getVariantsOfProduct);
  const [product, setProduct] = useState({});
  const [variants, setVariants] = useState([]);
  const [colorMap, setColorMap] = useState([]);

  useEffect(() => {
    fetchProductDetail(id)
    fetchVariantsOfProduct(id)
  }, [id])

  useEffect(() => {
    if (dataProductDetail) {
      setProduct(dataProductDetail)
    }
  }, [dataProductDetail])

  useEffect(() => {
    if (dataVariantsOfProduct) {
      setVariants(dataVariantsOfProduct?.variants)
      setColorMap(dataVariantsOfProduct?.colorMap)
    }
  }, [dataVariantsOfProduct])


  return (
    <div className='row'>

      <div className='col-12'>
        <div className="card">
          <div className="card-header">
            <strong>Sản phẩm</strong>
          </div>
          <div className="card-body card-block">
            <form
              action="#"
              method="post"
              encType="multipart/form-data"
              className="form-horizontal"
            >

              <div className="row form-group">
                <div className="col col-md-3">
                  <label htmlFor="text-input" className=" form-control-label">
                    Id
                  </label>
                </div>
                <div className="col-12 col-md-9">
                  <input
                    type="text"
                    id="text-input"
                    name="text-input"
                    placeholder="Text"
                    className="form-control"
                    value={product?._id}
                    disabled
                  />
                </div>

              </div>
              <div className="row form-group">
                <div className="col col-md-3">
                  <label htmlFor="text-input" className=" form-control-label">
                    Tên
                  </label>
                </div>
                <div className="col-12 col-md-9">
                  <input
                    type="text"
                    id="text-input"
                    name="text-input"
                    placeholder="Text"
                    className="form-control"
                    value={product?.name}
                    disabled
                  />
                </div>

              </div>
              <div className="row form-group">
                <div className="col col-md-3">
                  <label htmlFor="text-input" className=" form-control-label">
                    Danh mục
                  </label>
                </div>
                <div className="col-12 col-md-9">
                  <input
                    type="text"
                    id="text-input"
                    name="text-input"
                    placeholder="Text"
                    className="form-control"
                    value={(product?.category?.parent?.name ? product?.category?.parent?.name + " / " : "") + product?.category?.name}
                    disabled
                  />
                </div>

              </div>
              <div className="row form-group">
                <div className="col col-md-3">
                  <label htmlFor="text-input" className=" form-control-label">
                    Trạng thái
                  </label>
                </div>
                <div className="col-12 col-md-9">
                  <input
                    type="text"
                    id="text-input"
                    name="text-input"
                    placeholder="Text"
                    className="form-control"
                    value={product?.is_active}
                    disabled
                  />
                </div>
              </div>
              <div className="row form-group">
                <div className="col col-md-3">
                  <label htmlFor="text-input" className=" form-control-label">
                    Ngày tạo
                  </label>
                </div>
                <div className="col-12 col-md-9">
                  <input
                    type="text"
                    id="text-input"
                    name="text-input"
                    placeholder="Text"
                    className="form-control"
                    value={convertTimestamp(product?.created_at)}
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>
          <div className='card-footer'>
            <Link to="/product" className='btn btn-secondary btn-sm mr-2'>Quay lại</Link>
            <Link to={`/product/${id}/edit`} className='btn btn-warning btn-sm'>Chỉnh sửa</Link>
          </div>
        </div>
      </div>
      <div className='col-12'  >
        <div className="card">
          <div className="card-header">
            <strong>Biến thể</strong>
          </div>
          <div className="card-body card-block">
            <table className='table table-striped border' >
              <thead>
                <tr className='text-center'>
                  <th className='align-content-center'>Dung lượng</th>
                  <th className='align-content-center'>Màu sắc</th>
                  <th className='align-content-center'>Giá</th>
                  <th className='align-content-center'>Số lượng</th>
                  <th className='align-content-center'>Hình ảnh</th>
                  <th className='align-content-center'>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {variants?.length > 0 ? variants?.map((variant, index) => (
                  <tr key={index} className='text-center'>
                    <td className='text-success align-content-center'><strong>{variant?.name}</strong></td>
                    <td className='align-content-center'><strong>{colorMap[variant?.variantColor?.color_id]}</strong></td>
                    <td className='align-content-center'><strong className='text-danger'>{formatPrice(variant?.variantColor?.price)}</strong></td>
                    <td className='align-content-center'>{variant?.variantColor?.stock}</td>
                    <td className='align-content-center'><img className='img-fluid' width={50} src={`${env.VITE_SERVER_BASE_URL}/${variant?.variantColor?.img}`} alt="" /></td>
                    <td className='align-content-center'>{variant?.variantColor?.is_active ? <strong className='text-primary'>Active</strong> : <strong className='text-danger'>Not Active</strong>}</td>
                  </tr>
                )) :
                  <tr className='text-center'>
                    <td colspan="6">Không có biến thể nào</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

        </div>
      </div>


    </div>

  )
}

export default DetailProduct
