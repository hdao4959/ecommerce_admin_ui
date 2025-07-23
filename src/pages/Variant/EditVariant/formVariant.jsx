import React, { useEffect, useState } from 'react'
import useApi from '../../../hooks/useApi';
import productService from '../../../services/productService';
import Ckeditor from '../../../components/Ckeditor'

const FormVariant = ({ formVariant, setFormVariant }) => {
  const { data: resProductAllActive } = useApi(productService.getAllActive, true);
  const [productLineActives, setProductLineActives] = useState([]);

  const handleChangeVariant = (event) => {
    const { name, value, type, checked } = event.target
    setFormVariant(prev => ({
      ...prev, [name]: type == 'checkbox' ? checked : value
    }))
  }

  useEffect(() => {
    if (resProductAllActive) {
      setProductLineActives(resProductAllActive.items);
    }
  }, [resProductAllActive])
  return (
    <>
      <div className="row form-group">
        <div className="col col-md-3">
          <label htmlFor="select" className=" form-control-label">
            Dòng sản phẩm
          </label>
        </div>
        <div className="col-12 col-md-9">
          <select name="product_id" value={formVariant?.product_id || "" } id="select" className="form-control" onChange={(event) => handleChangeVariant(event)} >
            <option value="">--Dòng sản phẩm--</option>
            {productLineActives && productLineActives?.map((productLine, index) => (
              <option key={index} value={productLine?._id}>{productLine.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row form-group">
        <div className="col col-md-3">
          <label htmlFor="text-input" className=" form-control-label">
            Tên biến thể
          </label>
        </div>
        <div className="col-12 col-md-9">
          <input
            type="text"
            id="text-input"
            name="name"
            value={formVariant.name}
            onChange={(event) => handleChangeVariant(event)}
            placeholder="Tên biến thể"
            className="form-control"
          />
        </div>
      </div>

      <div className="row form-group">
        <div className="col col-md-3">
          <label className=" form-control-label">Trạng thái</label>
        </div>
        <div className="col col-md-9">
          <div className="form-check">
            <div className="checkbox">
              <label htmlFor="checkbox1" className="form-check-label">
                <input
                  type="checkbox"
                  id="checkbox1"
                  name="is_active"
                  value={formVariant.is_active}
                  checked={formVariant.is_active == true}
                  onChange={(event) => handleChangeVariant(event)}
                  className="form-check-input"
                />
                Active
              </label>
            </div>

          </div>
        </div>
      </div>
      <Ckeditor
        value={formVariant?.description} onChange={(data) => setFormVariant(prev => ({
          ...prev, description: data
        }))} />
    </>
  )
}

export default FormVariant
