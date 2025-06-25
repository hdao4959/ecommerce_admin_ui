import { toast } from 'react-toastify';
import ScriptLoader from '../../common/ScriptLoader';
import env from '../../config/env.js'
import convertTimestamp from '../../utils/convertTimestamp.js';
import Datatable from '../../components/Datatable.jsx';
import { useState } from 'react';
const ListUser = () => {

  const [renderDatatable, setRenderDatatable] = useState(false);
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
      className: 'details-control align-content-center text-center',
      orderable: false,
      data: null,
      defaultContent: '<i class="fa fa-plus-circle text-primary" style="cursor:pointer"></i>',
    },
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
    {
      className: 'align-content-center',
      data: null,
      render: function (data) {
        return `
                <div class="d-flex justify-content-around" style="gap:2px">
                  <a href="/user/${data._id}" class="btn btn-success"><i class="menu-icon fa fa-info-circle"></i></a>
                  <button class="btn btn-secondary"><i class="menu-icon fa fa-edit"></i></button>
                  <button data-id=${data._id} class="btn-delete btn btn-danger"><i class="menu-icon fa fa-trash-o"></i></button>
                </div>
              `;
      }
    }
  ]


  const showMore = (d) => (
    <table style="margin-left:35px">
      <thead>
        <tr>
          <th>Id:</th><th>${d._id}</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Họ và tên:</td><td>${d.name}</td></tr>
        <tr><td>Email:</td><td>${d.email}</td></tr>
        <tr><td>Số điên thoại:</td><td>${d.phone_number ?? 'Chưa cập nhật'}</td></tr>
        <tr><td>Tỉnh/Thành phố:</td><td>${d.province ?? 'Chưa cập nhật'}</td></tr>
        <tr><td>Quận/Huyện:</td><td>${d.district ?? 'Chưa cập nhật'}</td></tr>
        <tr><td>Phường/Xã:</td><td>${d.ward ?? 'Chưa cập nhật'}</td></tr>
        <tr><td>Ngày tạo tk:</td><td>${convertTimestamp(d.created_at) ?? 'Chưa cập nhật'}</td></tr>
        <tr><td>Lần cập nhật gần nhất:</td><td>${convertTimestamp(d.updated_at) ?? 'Chưa cập nhật'}</td></tr>
      </tbody>
    </table>

  )

  return (
    <>
      <ScriptLoader arrayCss={arrayCss} arrayScripts={arrayScripts} onLoadAll={() => setRenderDatatable(true)} />
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
                  renderDatatable &&
                    <Datatable tableId='user-datatable' columnTitles={columnTitles} columns={columns} ajaxUrl={`${env.VITE_ADMIN_API_URL}/users`} showMore={showMore} onDelete={true} />

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
