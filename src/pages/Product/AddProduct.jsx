import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import categoryService from '../../services/categoryService';
import productService from '../../services/productService';

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [childrenCategory, setChildrenCategory] = useState([]);

  const { data: dataAllCateActive, fetchApi: fetchAllCateActive } = useApi(categoryService.getAllActive);
  const { data: dataChildrenOfCate, fetchApi: fetchChildrenOfCate } = useApi(categoryService.getChildrentOfCategory)
  const { response: resAddProduct, fetchApi: fetchAddProduct } = useApi(productService.create)
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    child_category_id: '',
    is_active: false,
  });

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: type == 'checkbox' ? checked : value }))
  }

  const selectedParentCategory = (event) => {
    event.preventDefault();

    const idParentCategory = event.target.value
    if (!idParentCategory) {
      // Reset danh sách danh mục con khi danh mục cha chưa chọn
      setChildrenCategory([])
      // Reset selected danh mục con khi thay đổi select danh mục cha
      setFormData(prev => ({ ...prev, child_category_id: '' }));
    } else {
      fetchChildrenOfCate(idParentCategory)
    }
  }

  useEffect(() => {
    fetchAllCateActive();
  }, [])

  useEffect(() => {
    if (dataAllCateActive) {
      setCategories(dataAllCateActive?.items)
    }
  }, [dataAllCateActive])

  useEffect(() => {
    if (dataChildrenOfCate) {
      setChildrenCategory(dataChildrenOfCate?.childrenCategory)
    }
  }, [dataChildrenOfCate])

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchAddProduct(formData)
  }

  useEffect(() => {
    if (resAddProduct && resAddProduct.success) {
      navigate('/product')
    }
  }, [resAddProduct])

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <strong>Thêm mới sản phẩm</strong>
        </div>
        <div className="card-body card-block">
          <form method="post" className="form-horizontal" >
            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="text-input" className=" form-control-label">
                  Tên dòng sản phẩm
                </label>
              </div>
              <div className="col-12 col-md-9">
                <input className="form-control" name="name" type="text" placeholder="Tên sản phẩm"
                  onChange={(event) => handleChange(event)}
                  value={formData.name}
                />
              </div>
            </div>


            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="select" className=" form-control-label">
                  Danh mục cha
                </label>
              </div>
              <div className="col-12 col-md-9">
                <select name="category_id" id="select" className="form-control" onChange={(event) => { selectedParentCategory(event); handleChange(event) }} >
                  <option value="">--Danh mục cha--</option>
                  {categories?.map((cate, index) => (
                    <option key={index} value={cate._id}>{cate.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="selectSm" className=" form-control-label">
                  Danh mục con
                </label>
              </div>
              <div className="col-12 col-md-9">
                <select name="child_category_id" className="form-control-sm form-control"
                  onChange={(event) => handleChange(event)}
                  disabled={!childrenCategory || childrenCategory.length == 0}
                >
                  <option value="">--Danh mục con--</option>
                  {childrenCategory?.map((childCategory, index) => (
                    <option key={index} value={childCategory._id}>{childCategory.name}</option>
                  ))}
                </select>
                {!childrenCategory || childrenCategory.length == 0 && <small className="form-text text-warning">Không có danh mục con</small>}
              </div>
            </div>

            <div className="row form-group">
              <div className="col col-md-3">
                <label className=" form-control-label">Trạng thái</label>
              </div>
              {/* <div className="col col-md-9">
                <div className="form-check">
                  <div className="checkbox">
                    <label htmlFor="checkbox1" className="form-check-label">
                      <input className="form-check-input" name="is_active" type="checkbox"
                        value={formData.is_active}
                        checked={formData.is_active == true}
                        onChange={(event) => handleChange(event)}
                      />
                      Active
                    </label>
                  </div>
                </div>
              </div> */}
            </div>
          </form>
        </div>
        <div className="card-footer">
          <Link to="/product" className='btn btn-secondary btn-sm'>Quay lại</Link>
          <button style={{ cursor: 'pointer' }} type="submit" onClick={(event) => handleSubmit(event)} >
            <i className="fa fa-dot-circle-o" /> Thêm mới
          </button>
        </div>

      </div>

    </div>


  )
}

export default AddProduct
