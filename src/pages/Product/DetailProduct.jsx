import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios';
import { useParams } from 'react-router-dom';
import convertTimestamp from '../../utils/convertTimestamp';
import formatPrice from '../../utils/formatPrice.js';
const DetailProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);



  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance('/products/' + id);
        const productData = data.data
        setProduct(productData);
        setVariants(data.data.variants);
        setColors(data.data.variants.flatMap(variant =>
          variant.colors.map(color =>
            ({ ...color, name_variant: variant.name_variant }))));
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])


  return (
    <div className='row'>

      <div className='col-5'>
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
                    value={product?.status}
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

        </div>
      </div>
      <div className='col-7'  >
        <div className="card">
          <div className="card-header">
            <strong>Biến thể</strong>
          </div>
          <div className="card-body card-block">
            <table className='table border' >
              <thead>
                <tr className='text-center'>
                  <th>Dung lượng</th>
                  <th>Màu sắc</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Hình ảnh</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody >

                {colors?.map((color, index) => (
                  <tr key={index} className='text-center'>
                    <td className='text-success'><strong>{color?.name_variant}</strong></td>
                    <td><strong>{color?.name}</strong></td>
                    <td>{formatPrice(color?.price)}</td>
                    <td>{color?.stock}</td>
                    <td><img src={color?.img} alt="" /></td>
                    <td>{color?.is_active ? <strong className='text-primary'>Active</strong> : <strong className='text-danger'>Not Active</strong>}</td>
                  </tr>
                ))}


              </tbody>
            </table>

          </div>

        </div>
      </div>
    </div>

  )
}

export default DetailProduct
