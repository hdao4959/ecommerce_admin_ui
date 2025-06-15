import React, { useEffect, useState } from 'react'
import ScriptLoader from '../../common/ScriptLoader'
import axiosInstance from '../../utils/axios'

const ListColor = () => {

  const [arrayColor, setArrayColor] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get('/colors');
        
        setArrayColor(data.data.colors);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    fetchData();

  }, [])

  
  const handleDeleteColor = async (id) => {
    try {
      const {data} = await axiosInstance.delete('/colors/' + id);
      alert(data?.message)
      
      setArrayColor(prev => prev.filter(color => color._id != id));
    } catch (error) {
      alert(error?.response?.data.errors)
    }

  }


  const arrayCss = [
    "/assets/css/lib/datatable/dataTables.bootstrap.min.css",
    // 'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800'
  ]
  const arrayScripts = [
    "/assets/js/lib/data-table/datatables.min.js",
    "/assets/js/lib/data-table/dataTables.bootstrap.min.js",
    "/assets/js/lib/data-table/dataTables.buttons.min.js",
    "/assets/js/lib/data-table/buttons.bootstrap.min.js",
    "/assets/js/lib/data-table/jszip.min.js",
    "/assets/js/lib/data-table/vfs_fonts.js",
    "/assets/js/lib/data-table/buttons.html5.min.js",
    "/assets/js/lib/data-table/buttons.print.min.js",
    "/assets/js/lib/data-table/buttons.colVis.min.js",
    "/assets/js/init/datatables-init.js"
  ]


  return (
    <>
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <strong className="card-title">Danh sách Màu sắc</strong>
                <a href='/color/add' className='btn btn-success'> Thêm mới</a>
              </div>
              <div className="card-body">
              
                    <table id = "bootstrap-data-table" className = "table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Id</th>
              <th>Tên</th>
              <th>Trạng thái</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
              <td colSpan="4" className="text-center">
                <i className="fa fa-spinner fa-spin fa-2x text-primary"></i>
                <p>Đang tải dữ liệu...</p>
              </td>
            </tr>
            ) : (
              <>
              <ScriptLoader arrayCss={arrayCss} arrayScripts={arrayScripts}/>
              {arrayColor.map((color, index) => (
                <tr key={index} className="align-content-center">
                  <td>{color._id}</td>
                  <td>{color.name}</td>
                  <td className="text-center">
                    {color.is_active ? (
                      <i className="menu-icon fa fa-check-circle text-success" />
                    ) : (
                      <i className="menu-icon fa fa-minus-square text-danger" />
                    )}
                  </td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <a href={`/color/${color._id}`} className="btn btn-success">Chi tiết</a>
                      <button className="btn btn-secondary">
                        <i className="menu-icon fa fa-edit"></i>
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDeleteColor(color._id)}>
                        <i className="menu-icon fa fa-trash-o"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            ) }
            </>
  )}
          </tbody>
        </table>
                
      </div>
    </div >
          </div >
        </div >
      </div >
    </>
  );



}

export default ListColor
