import React, { useEffect, useState } from 'react'
import ScriptLoader from '../../common/ScriptLoader'
import axiosInstance from '../../utils/axios'
import Datatable from '../../components/Datatable';
import env from '../../config/env';

const ListColor = () => {

  const [arrayColor, setArrayColor] = useState([]);
  const [loadAllScript, setLoadAllScript] = useState(false)
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


  const columnTitles = [
    'Id',
    'Tên',
    'Trạng thái',
    'Options'
  ]

  const columns = [
    {
      className: 'align-content-center',
      data: '_id'
    },
    {
      className: 'align-content-center',
      data: 'name'
    },
    {
      className: 'align-content-center',
      data: 'is_active',
      render: function (data) {
        return data == true ?
          `<i class="menu-icon fa fa-check-circle text-success" />` :
          `<i class="menu-icon fa fa-minus-square text-danger" />`
      }
    },
  ]




  const arrayCss = [
    "/assets/css/lib/datatable/dataTables.bootstrap.min.css",
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
      <ScriptLoader arrayCss={arrayCss} arrayScripts={arrayScripts} onLoadAll={() => setLoadAllScript(true)} />
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <strong className="card-title">Danh sách <span className='text-info'>Màu sắc</span></strong>
                <a href='/color/add' className='btn btn-success'> Thêm mới</a>
              </div>
              <div className="card-body">
                {
                  loadAllScript &&
                  <Datatable tableId="color-datatable" ajaxUrl={`${env.VITE_ADMIN_API_URL}/colors`} columnTitles={columnTitles} columns={columns} options={['show', 'edit', 'delete']} endPoint="color" onDelete={true}/>
                }
              </div>
            </div >
          </div >
        </div >
      </div >
    </>
  );



}

export default ListColor
