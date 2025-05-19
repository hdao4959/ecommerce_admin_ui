import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios';
import { Navigate, useNavigate } from 'react-router-dom';



const AddProduct = () => {

  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [childrenCategory, setChildrenCategory] = useState([]);
  const [colorsActive, setColorsActive] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    child_category_id: '',
    is_active: false,
    variants: [
      {
        name_variant: '',
        colors: []
      }
    ]
  });

  const handleChangeProduct = (event) => {
    const { name, type, checked, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: type == 'checkbox' ? checked : value }))
  }

  const handleChangeVariant = (index, event) => {
    // xử lí selected cho color 
    let selectedColors = []
    if (event.target.selectedOptions) {
      selectedColors = Array.from(event.target.selectedOptions).map(opt => opt.value);
    }

    const { name, value } = event.target;
    const updateVariants = [...formData?.variants];
    updateVariants[index] = {
      ...updateVariants[index], [name]: value,
      colors: selectedColors

    }
    setFormData(prev => ({
      ...prev, variants: updateVariants,
    }))

  }


  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get('/categories');
        const colors = await axiosInstance.get('/colors?active=1');
        setCategory(data.data);
        setColorsActive(colors.data.data)
      } catch (error) {
        console.log(error);

      }
    })()
  }, [])

  const selectedParentCategory = async (event) => {
    try {
      if (!event.target.value) {
        setChildrenCategory([])
        setFormData(prev => ({ ...prev, child_category_id: '' }));
      } else {
        const { data } = await axiosInstance.get('/categories/' + event.target.value + '/children')
        setChildrenCategory(data.data.childrenCategory)
      }
    } catch (error) {
      console.log(error);
    }
    event.preventDefault();
  }

  const addNewRowVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [
        ...prev.variants, { name_variant: '', colors: [] }
      ]
    }))
  }

  // Xoá row variant
  const deleteRowVariant = (index, event) => {
    event.preventDefault();
    setFormData(prev => ({
      ...prev, variants: [
        ...prev.variants.filter((_, i) => i !== index)
      ]
    }))

  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const payloadData = formData
    payloadData.category_id = formData.child_category_id != '' ? formData.child_category_id : formData.category_id
    // Xoá trường child_category_id trong payload
    delete payloadData.child_category_id;

    try {
      const {data} = await axiosInstance.post('/products', formData);
      alert(data.message);
      navigate('/product')
    } catch (error) {
      console.log(error);
      
    }

  }

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
                <select name="category_id" id="select" className="form-control" onChange={(event) => { selectedParentCategory(event); handleChangeProduct(event) }} >
                  <option value="">--Danh mục cha--</option>
                  {category?.map((cate, index) => (
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
                  name="child_category_id"
                  onChange={(event) => handleChangeProduct(event)}
                  id="selectSm"
                  className="form-control-sm form-control"
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
              <button type='button' className='btn btn-success my-2' onClick={() => addNewRowVariant()}>Thêm biến thể</button>
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
                          <select name="colors" id="" value={formData?.variants?.[index].colors}
                            onChange={(event) => handleChangeVariant(index, event)}
                            multiple>
                            {colorsActive.map((color, index) => (
                              <option key={index} value={color._id}>{color.name}</option>
                            ))}
                          </select>
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

export default AddProduct
