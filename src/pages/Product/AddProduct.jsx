import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios';
import ScriptLoader from '../../common/ScriptLoader';

const arrayCss = [
  "https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800"
]

const AddProduct = () => {
  const [indexRowVariant, setIndexRowVariant]  = useState(1);
  const [category, setCategory] = useState([]);
  const [childrentCategory, setChildrentCategory] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get('/categories');
        setCategory(data.data);
      } catch (error) {
        console.log(error);

      }
    })()
  }, [])

  const selectedParentCategory = async (event) => {
    try {
      if (!event.target.value) {
        setChildrentCategory([])
      } else {
        const { data } = await axiosInstance.get('/categories/' + event.target.value + '/childrent')
        setChildrentCategory(data.data.childrentCategory)
      }
    } catch (error) {
      console.log(error);
    }
    event.preventDefault();
  }

  const addNewRowVariant = (event) => {
    setIndexRowVariant(indexRowVariant + 1);
    // event.preventDefault();

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
  <td><button class='btn btn-primary' data-toggle="modal" data-target="#largeModal">Thêm Mầu sắc</button></td>
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
    console.log(tr.getAttribute('data-index'));
    tr.remove()
  }
  

  const addNewRowColor = (event) => {
    console.log(event.target);
    
  }
  ScriptLoader(arrayCss, [])

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  console.log(indexRowVariant);
  
  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <strong>Thêm mới sản phẩm</strong>
        </div>
        <div className="card-body card-block">
          <form
            onSubmit={(event) => handleSubmit(event)}
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
                  name="text-input"
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
                <select name="select" id="select" className="form-control" onChange={(event) => selectedParentCategory(event)} >
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
                  name="selectSm"
                  id="selectSm"
                  className="form-control-sm form-control"
                  disabled={!childrentCategory || childrentCategory.length == 0}
                >
                  <option value="">--Danh mục con--</option>
                  {childrentCategory?.map((childCategory, index) => (
                    <option key={index} value={childCategory._id}>{childCategory.name}</option>
                  ))}
                </select>
                {!childrentCategory || childrentCategory.length == 0 && <small className="form-text text-warning">Không có danh mục con</small>}
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
                        defaultValue={true}
                        className="form-check-input"
                      />
                      Active
                    </label>
                  </div>

                </div>
              </div>
            </div>

            <strong>Biến thể</strong>
            <div >
              <button className='btn btn-success my-2' onClick={(event) => addNewRowVariant(event)}>Thêm mới</button>
            <div style={{maxHeight: "300px", overflowY: 'auto'}}>
            <table id='table_add_variant' className=' table table-striped border'  >
                <thead>
                  <tr className='text-center'>
                    <th>#</th>
                    <th>Tên biến thể</th>
                    <th>Mầu sắc</th>
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
                    <td><button className='btn btn-primary' data-toggle="modal" data-target="#largeModal">Thêm Mầu sắc</button></td>
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

        <div
          className="modal fade"
          id="largeModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="largeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="largeModalLabel">
                  Large Modal
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <button className='btn btn-success my-2' onClick={(event) => addNewRowColor(event)}>Thêm mới</button>
                <table className='table table-striped border'>
                  <thead>
                    <tr className='text-center'>
                      <th>#</th>
                      <th>Tên màu</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>...</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='text-center'>
                      <td>1</td>
                      <td><input
                        type="text"
                        id="text-input"
                        name="text-input"
                        placeholder="Tên màu sắc"
                        className="form-control"
                      /></td>
                      <td><input
                        type="number"
                        id="number-input"
                        name="number-input"
                        placeholder="Giá"
                        className="form-control"
                      /></td>
                      <td><input
                        type="number"
                        id="number-input"
                        name="number-input"
                        placeholder="Số lượng"
                        className="form-control"
                      /></td>
                      <td><button className='btn btn-danger'><i className='menu-icon fa fa-trash-o'></i></button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Quay lại
                </button>
                <button type="button" className="btn btn-primary">
                  Thêm mới
                </button>
              </div>
            </div>
          </div>
        </div>



        <div className="card-footer">
          <button type="submit" className="btn btn-primary btn-sm">
            <i className="fa fa-dot-circle-o" /> Submit
          </button>
          <button type="reset" className="btn btn-danger btn-sm">
            <i className="fa fa-ban" /> Reset
          </button>
        </div>
      </div>

    </div>


  )
}

export default AddProduct
