import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axios';

const EditProduct = () => {
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [childrenCategory, setChildrenCategory] = useState([]);
  const [openVariant, setOpenVariant] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    is_active: false,
    category_id: '',
    parent_category_id: '',
    variants: [
      {
        name_variant: '',
        colors: []
      }
    ]
  });

  useEffect(() => {
    (async () => {
      try {
        const productsResponse = await axiosInstance.get('/products/' + id);
        const categoriesResponse = await axiosInstance.get('/categories');
        setFormData({
          ...productsResponse.data.data,
          parent_category_id: productsResponse?.data?.data?.category?.parent_id || ""
        })
        setCategories(categoriesResponse.data.data)
        handleChangeCategory(productsResponse?.data?.data?.category?.parent_id);
      } catch (error) {
        console.log(error);
      }
    })()


  }, [])

  const handleChangeProduct = (event) => {
    const { type, name, checked, value } = event.target;
    setFormData(prev => ({
      ...prev, [name]: type == "checkbox" ? checked : value
    }))
  }


  const handleChangeCategory = (idCategory) => {

    if (idCategory !== '') {
      (async () => {
        try {
          const childrenCategoryResponse = await axiosInstance.get('/categories/' + idCategory + '/children')
          const childrenCategory = childrenCategoryResponse.data.data.childrenCategory;
          if (childrenCategory.length == 0) {
            setFormData(prev => ({
              ...prev, category_id: ''
            }))
          }
          setChildrenCategory(childrenCategory)
        } catch (error) {
          console.log(error);
        }
      })()
    } else {
      setChildrenCategory([])
    }
  }

  const handleChangeVariant = (index, event) => {
    const { value } = event.target;

    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => i == index ? { ...variant, name_variant: value } : variant)
    }))
    console.log(value);

  }

  const handleChangeColor = (index, variantId, event) => {
    const { type, name, value, files } = event.target
    const file = files?.[0]
    
    let imgPreview = null
    if (file) {
      imgPreview = URL.createObjectURL(file);
    }

    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map(variant => {
        if (variant._id == variantId) {
          const newColors = [...variant.colors]
          newColors[index] = {
            ...newColors[index],
            [name]: type == 'file' ? file : value,
            'img_preview': imgPreview
          }
          return { ...variant, colors: newColors }
        }
        return variant
      })
    }))

    setOpenVariant(prev => {
      const newColors = [...prev.colors];
      newColors[index] = {
        ...newColors[index],
        [name]: type == 'file' ? file : value,
        'img_preview': imgPreview

      }

      return { ...prev, colors: newColors }
    })
    URL.revokeObjectURL(imgPreview)
  }

  const openColorModal = (variantId) => {
    const modalColor = new window.bootstrap.Modal(document.getElementById('modal_color'));
    const variant = formData.variants.find(variant => variant._id == variantId);
    setOpenVariant(variant);
    modalColor.show()
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formProduct = {
        name: formData.name,
        is_active: formData.is_active, 
        category_id: formData.category_id
      }


      const formVariants = new FormData()

  

      formData.variants.forEach((variant, variantId) => {
        formVariants.append(`variants[${variantId}][name_variant]`, variant.name_variant);

        variant.colors.forEach((color, colorId) => {
          // formVariants.append(`variants[${variantId}][colors][${colorId}][id]`, color._id)
          // formVariants.append(`variants[${variantId}][colors][${colorId}][name]`, color.name)
          // formVariants.append(`variants[${variantId}][colors][${colorId}][price]`, color.price)
          // formVariants.append(`variants[${variantId}][colors][${colorId}][stock]`, color.stock)
          formVariants.append(`variants[${variantId}][colors][${colorId}][img]`, color.img ? color.img : null)
        })
      })

      
      const {data} = await axiosInstance.put('/products/' + id + '/updateVariants', formVariants, {
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      });
      console.log(data);
      
    } catch (error) {
      alert(error.response);
    }
  }

      console.log(formData);

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <strong>Thêm mới sản phẩm</strong>
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
                <small className="form-text text-muted">This is a help text</small>
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

            <strong>Biến thể</strong>
            <div>
              {/* <button type='button' className='btn btn-success my-2' onClick={() => addNewRowVariant()}>Thêm biến thể</button> */}
              <div style={{ maxHeight: "300px", overflowY: 'auto' }}>
                <table id='table_add_variant' className=' table table-striped border'  >
                  <thead>
                    <tr className='text-center' >
                      <th>#</th>
                      <th>Tên biến thể</th>
                      <th>Màu sắc</th>
                      <th>...</th>
                    </tr>
                  </thead>
                  <tbody id='table_body_add_variant' >
                    {formData?.variants?.map((variant, index) => (
                      <tr key={index} className='text-center' >
                        <th>{index}</th>
                        <td><input
                          type="text"
                          id=""
                          name="name_variant"
                          placeholder="Tên biến thể"
                          value={variant?.name_variant}
                          onChange={(event) => handleChangeVariant(index, event)}
                          className="form-control"
                        /></td>
                        <td>
                          <button onClick={() => openColorModal(variant._id)} type='button' className='btn btn-primary'>Màu sắc</button>
                        </td>



                        <td>
                          <button onClick={(event) => deleteRowVariant(index, event)} className='btn btn-danger' disabled={index == 0}>
                            <i className='menu-icon fa fa-trash-o' ></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>


              </div>
            </div>


          
          <div className="modal fade" id="modal_color" tabIndex="-1"
          // aria-labelledby="myModalLabel" aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title" id="myModalLabel">Thêm màu sắc</h5>
                </div>

                <div className="modal-body">
                  <table className='table border'>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Tên màu</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Hình ảnh</th>
                        <th>Preview</th>
                        <th>...</th>
                      </tr>
                    </thead>
                    <tbody>
                      {openVariant?.colors?.map((color, index) => (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{color.name}</td>
                          <td><input name='price' onChange={(event) => handleChangeColor(index, openVariant?._id, event)} type="number" value={color.price} className='form-control' /></td>
                          <td><input name='stock' onChange={(event) => handleChangeColor(index, openVariant?._id, event)} type="number" value={color.stock} className='form-control' /></td>
                          <td><input name='img' type="file" className='form-control-file' onChange={(event) => handleChangeColor(index, openVariant?._id, event)} /></td>
                          <td><img src={color?.img_preview} style={{ width: '100px' }} alt="" /></td>
                          <td><button className='btn btn-danger'>Xoá</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="modal-footer">
                  {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button> */}
                  <button type="button" className="btn btn-primary" data-dismiss="modal">Lưu thay đổi</button>
                </div>

              </div>
            </div>
          </div>

          </form>
        </div>




        <div className="card-footer">
          <button className='' type="submit" onClick={(event) => handleSubmit(event)} >
            <i className="fa fa-dot-circle-o" /> Submit
          </button>
          <button type="reset" >
            <i className="fa fa-ban" /> Reset
          </button>
        </div>

      </div>

    </div>
  )
}

export default EditProduct
