import { toast } from 'react-toastify';
import ScriptLoader from '../../common/ScriptLoader';
import env from '../../config/env.js'
import convertTimestamp from '../../utils/convertTimestamp.js';
import Datatable from '../../components/Datatable.jsx';
import { useState } from 'react';

const ListUser = () => {
  const [loadAllScript, setLoadAllScript] = useState(false);
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
    "/assets/js/init/datatables-init.js",
  ]

  // Tên cột cho datatable
  const columnTitles = [
    "#",
    "Tên",
    "Email",
    "Sđt",
    "Loại tk",
    "Options"
  ]

  // Nội dung của cột cho datatable
  const columns = [
    {
      className: 'align-content-center',
      data: 'name'
    },
    {
      className: 'align-content-center',
      data: 'email'
    },
    {
      className: 'align-content-center',
      data: 'phone_number',
      render: function (data) {
        return data ? data : 'Chưa cập nhật'
      }
    },
    {
      className: 'align-content-center',
      data: 'google_id',
      render: function (data) {
        return data ? 'Google' : 'Tài khoản thường'
      }
    },
   
  ]

  const showMore = (d) => {
    return `<table class="table border">
   
      <tbody>
      <tr>
        <th>Id:</th><td>${d._id}</td>
      </tr>
        <tr><th>Họ và tên:</th><td>${d.name}</td></tr>
        <tr><th>Email:</th><td>${d.email}</td></tr>
        <tr><th>Số điên thoại:</th><td>${d.phone_number ?? 'Chưa cập nhật'}</td></tr>
        <tr><th>Loại tài khoản:</th><td>${d.google_id ? 'Google' : 'Tài khoản thường'}</td></tr>
        <tr><th>Tỉnh/Thành phố:</th><td>${d.province ?? 'Chưa cập nhật'}</td></tr>
        <tr><th>Quận/Huyện:</th><td>${d.district ?? 'Chưa cập nhật'}</td></tr>
        <tr><th>Phường/Xã:</th><td>${d.ward ?? 'Chưa cập nhật'}</td></tr>
        <tr><th>Ngày tạo tài khoản:</th><td>${convertTimestamp(d.created_at) ?? 'Chưa cập nhật'}</td></tr>
        <tr><th>Lần cập nhật gần nhất:</th><td>${convertTimestamp(d.updated_at) ?? 'Chưa cập nhật'}</td></tr>
      </tbody>
    </table>`
  }

  return (
    <>
      <ScriptLoader arrayCss={arrayCss} arrayScripts={arrayScripts} onLoadAll={() => setLoadAllScript(true)} />
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <strong className="card-title">Danh sách <span className='text-info'>Tài khoản người dùng</span></strong>
                <a href='/user/add' className='btn btn-success'> Thêm mới</a>
              </div>
              <div className="card-body">
                {
                  loadAllScript &&
                  <Datatable tableId='user-datatable' columnTitles={columnTitles} columns={columns} ajaxUrl={`${env.VITE_ADMIN_API_URL}/users`} showMore={showMore} onDelete={true} options={['show', 'edit', 'delete']} endPoint="user"/>
                }
              </div>
            </div >
          </div >
        </div >
      </div >
    </>
  );
}

export default ListUser
