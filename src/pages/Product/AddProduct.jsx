import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios';



const AddProduct = () => {
  const [indexRowVariant, setIndexRowVariant] = useState(1);
  const [category, setCategory] = useState([]);
  const [childrenCategory, setChildrenCategory] = useState([]);
  const [colorsActive, setColorsActive] = useState([]);

  const [formData, setFormData] = useState({
    name_product: '',
    category: '',
    child_category: '',
    is_active: false
  });

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;

    setFormData(prev => ({ ...prev, [name]: type == 'checkbox' ? checked : value }))
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
        setFormData(prev => ({ ...prev, child_category: '' }));
      } else {
        const { data } = await axiosInstance.get('/categories/' + event.target.value + '/children')
        setChildrenCategory(data.data.childrenCategory)
      }
    } catch (error) {
      console.log(error);
    }
    event.preventDefault();
  }

  const addNewRowVariant = (event) => {
    event.preventDefault();
    setIndexRowVariant(indexRowVariant + 1);

    const tableBodyAddVariant = document.getElementById('table_body_add_variant')

    const tr = document.createElement('tr');
    tr.className = 'text-center';
    tr.setAttribute('data-index', indexRowVariant + 1)
    tr.innerHTML = `
  <td>${indexRowVariant + 1}</td>
  <td>
    <input
      type="text"
      name="text-input"
      placeholder="Tên biến thể"
      class="form-control"
    />
  </td>
  <td>
     <select name="colors" id="" multiple>
                          ${colorsActive.map((color, index) => (
                            `<option key=${index} value=${color._id}>${color.name}</option>`
                          ))}
                        </select>
  <td>
    <div class="col-12">
      <select name="select" class="form-control-sm w-100">
        <option value="">--Trạng thái--</option>
      </select>
    </div>
  </td>
  <td>
    <button class='delete-variant btn btn-danger'><i class='menu-icon fa fa-trash-o'> </i></button>
  </td>
`;

    const deleteVariant = tr.querySelector('.delete-variant');
    deleteVariant.addEventListener('click', (event) => deleteRowVariant(event))

    tableBodyAddVariant.appendChild(tr);
  }

  const deleteRowVariant = (event) => {
    const tr = event.target.closest('tr');
    tr.remove()
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);

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
                  name="name_product"
                  value={formData.name_product}
                  onChange={(event) => handleChange(event)}
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
                <select name="category" id="select" className="form-control" onChange={(event) => { selectedParentCategory(event); handleChange(event) }} >
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
                  name="child_category"
                  onChange={(event) => handleChange(event)}
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
                        onChange={(event) => handleChange(event)}
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
              <button type='button' className='btn btn-success my-2' onClick={(event) => addNewRowVariant(event)}>Thêm mới</button>
              <div style={{ maxHeight: "300px", overflowY: 'auto' }}>
                <table id='table_add_variant' className=' table table-striped border'  >
                  <thead>
                    <tr className='text-center'>
                      <th>#</th>
                      <th>Tên biến thể</th>
                      <th>Màu sắc</th>
                      <th>Trạng thái</th>
                      <th>...</th>
                    </tr>
                  </thead>
                  <tbody id='table_body_add_variant' >
                    <tr className='text-center'>
                      <td>1</td>
                      <td><input
                        type="text"
                        id="text-input"
                        name="text-input"
                        placeholder="Tên biến thể"
                        className="form-control"
                      /></td>
                      <td>
                        <select name="colors" id="" multiple>
                          {colorsActive.map((color, index) => (
                            <option key={index} value={color._id}>{color.name}</option>
                          ))}
                        </select>
                        {/* <button className='btn btn-primary' data-toggle="modal" data-target="#largeModal">Thêm màu sắc</button> */}
                        </td>
                      <td>
                        <div className="col-12">
                          <select name="select" id="select" className="form-control-sm w-100" >
                            <option value="">--Trạng thái--</option>
                          </select>
                        </div>
                      </td>
                      <td>
                        <button className='btn btn-danger' disabled>
                          <i className='menu-icon fa fa-trash-o' ></i>
                        </button>
                      </td>
                    </tr>
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
