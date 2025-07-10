import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axios';
import useApi from '../../hooks/useApi';
import productService from '../../services/productService';
import categoryService from '../../services/categoryService';

const EditProduct = () => {
  const { data: dataAllCategory, fetchApi: fetchAllCategory } = useApi(categoryService.getAll);
  const { data: dataProductDetail, fetchApi: fetchProductDetail } = useApi(productService.getDetail);
  const { data: dataChildrenOfCate, fetchApi: fetchChildrenOfCate } = useApi(categoryService.getChildrentOfCategory)
  const { data: updateProduct, fetchApi: fetchUpdateProduct } = useApi(productService.update);

  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [childrenCategory, setChildrenCategory] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    is_active: false,
    category_id: '',
    parent_category_id: '',
  });

  useEffect(() => {
    fetchAllCategory()
    fetchProductDetail(id)
  }, [])

  useEffect(() => {
    if (dataAllCategory && dataAllCategory.items) {
      setCategories(dataAllCategory.items);
    }
  }, [dataAllCategory])

  useEffect(() => {
    if (dataProductDetail) {
      setFormData({
        name: dataProductDetail.name,
        is_active: dataProductDetail?.is_active,
        category_id: dataProductDetail?.category_id,
        parent_category_id: dataProductDetail?.category?.parent_id || ""
      })
      handleChangeCategory(dataProductDetail?.category?.parent_id);
    }
  }, [dataProductDetail])

  const handleChangeProduct = (event) => {
    const { type, name, checked, value } = event.target;
    setFormData(prev => ({
      ...prev, [name]: type == "checkbox" ? checked : value
    }))
  }

  const handleChangeCategory = (idCategory) => {
    if (idCategory !== '') {
      fetchChildrenOfCate(idCategory)
    } else {
      setChildrenCategory([])
    }
  }

  useEffect(() => {
    if (dataChildrenOfCate && dataChildrenOfCate?.childrenCategory.length == 0) {
      setFormData(prev => ({
        ...prev, category_id: ''
      }))
    }
    setChildrenCategory(dataChildrenOfCate?.childrenCategory || [])
  }, [dataChildrenOfCate])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formProduct = {
      name: formData.name,
      is_active: formData.is_active,
      category_id: formData.category_id
    }
    fetchUpdateProduct(id, formProduct)
  }



  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <strong>Chỉnh sửa sản phẩm</strong>
        </div>
        <div className="card-body card-block">
          <form
            method="post"
            encType="multipart/form-data"
            className="form-horizontal"
          >

            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="text-input" className=" form-control-label">
                  Tên sản phẩm
                </label>
              </div>
              <div className="col-12 col-md-9">
                <input
                  type="text"
                  id="text-input"
                  name="name"
                  value={formData.name}
                  onChange={(event) => handleChangeProduct(event)}
                  placeholder="Tên sản phẩm"
                  className="form-control"
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
                <select name="parent_category_id" id="select" className="form-control" value={formData.parent_category_id} onChange={(event) => { handleChangeProduct(event); handleChangeCategory(event.target.value) }} >
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
                <select
                  name="category_id"
                  value={formData?.category_id}
                  onChange={(event) => handleChangeProduct(event)}
                  id="selectSm"
                  className="form-control-sm form-control"
                  disabled={!childrenCategory || childrenCategory.length == 0}
                >
                  <option value="">--Danh mục con--</option>
                  {childrenCategory.length > 0 && childrenCategory?.map((childCategory, index) => (
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
              <div className="col col-md-9">
                <div className="form-check">
                  <div className="checkbox">
                    <label htmlFor="checkbox1" className="form-check-label">
                      <input
                        type="checkbox"
                        id="checkbox1"
                        name="is_active"
                        value={formData.is_active}
                        checked={formData.is_active == true}
                        onChange={(event) => handleChangeProduct(event)}
                        className="form-check-input"
                      />
                      Active
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="card-footer">
          <Link className='btn btn-sm btn-secondary' to={'/product'}>Quay lại</Link>
          <button className='btn btn-sm' type="submit" onClick={(event) => handleSubmit(event)} >
            <i className="fa fa-dot-circle-o" /> Chỉnh sửa
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProduct
