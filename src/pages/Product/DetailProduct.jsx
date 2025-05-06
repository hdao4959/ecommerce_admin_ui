import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios';
import { useParams } from 'react-router-dom';
import convertTimestamp from '../../utils/convertTimestamp';

const DetailProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  // const [variantIds, setVariantIds] = useState([]);
  const [variantMap, setVariantMap] = useState([]);
  const [colors, setColors] = useState([]);
  
  useEffect(() => {
    (async () => {
      try {
        
        const { data } = await axiosInstance('/products/' + id);
        const productData = data.data
        setProduct(productData);
        // setVariantIds(productData?.variants?.map(variant => variant._id));
        setColors(productData?.variants?.flatMap(variant => variant?.colors.map(color => color)));
        // const variantIds = productData?.variants?.map(variant => variant._id);

          const variantMap = productData?.variants?.reduce((map, variant) => {
            if(!map[variant._id]) map[variant._id] = {}
            map[variant._id] = variant
            return map
          }, {})
          setVariantMap(variantMap)

          
        
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])

  console.log(variantMap);
  
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
                  {/* <small className="form-text text-muted">This is a help text</small> */}
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
                  {/* <small className="form-text text-muted">This is a help text</small> */}
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
                  {/* <small className="form-text text-muted">This is a help text</small> */}
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
                  {/* <small className="form-text text-muted">This is a help text</small> */}
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
                  {/* <small className="form-text text-muted">This is a help text</small> */}
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
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody >
               
                {colors?.map((color, index) => (
                  <tr key={index} className='text-center'>
                    <td className='text-success'><strong>{variantMap[color?.variant_id]?.name}</strong></td>
                    <td><strong>{color?.name}</strong></td>
                    <td>{color?.price}</td>
                    <td>{color?.stock}</td>
                    <td>{color?.status}</td>
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
