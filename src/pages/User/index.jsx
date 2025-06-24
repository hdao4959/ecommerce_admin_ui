import { toast } from 'react-toastify';
import ScriptLoader from '../../common/ScriptLoader';
import env from '../../config/env.js'
import convertTimestamp from '../../utils/convertTimestamp.js';
const ListUser = () => {

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

  const handleLoadAll = () => {
    const $ = window.$;
    if ($.fn.DataTable) {
      const $table = $('#bootstrap-data-table');

      if ($.fn.DataTable.isDataTable($table)) {
        $table.DataTable().clear().destroy();
      }
      $table.DataTable({
        processing: true,
        serverSide: true,

        searchDelay: 1000,
        ajax: function (data, callback) {
          const keyword = data.search.value;
          const order = data?.order[0]
          const direction = order?.dir
          const column = order?.column
          const nameColumn = data?.columns[column]?.data;
          const limit = data?.length;
          const offset = data?.start;
          let params = [];

          if (keyword) {
            params.push(`search=${encodeURIComponent(keyword)}`)
          }

          if (direction && nameColumn) {
            params.push(`sortBy=${nameColumn}`)
            params.push(`orderBy=${direction}`)
          }

          params.push(`limit=${limit}`)
          params.push(`offset=${offset}`)

          const query = params.length > 0 ? `?${params.join('&')}` : ""

          fetch(`${env.VITE_ADMIN_API_URL}/users` + query)
            .then(res => res.json())
            .then(response => {
              callback({
                draw: data?.draw,
                recordsTotal: response?.data?.meta?.total,
                recordsFiltered: response?.data?.meta?.totalFiltered,
                data: response?.data?.items
              })
            })
        },


        columns: [
          {
            className: 'details-control align-content-center text-center',
            orderable: false,
            data: null,
            defaultContent: '<i class="fa fa-plus-circle text-primary" style="cursor:pointer"></i>',
          },
          // { 
          //   className: 'align-content-center',
          //   data: '_id' },
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
      }
      )

      $table.on('click', '.btn-delete', function () {
        const $btn = $(this);
        const id = $btn.data('id')
        const confirmed = confirm('Bạn có chắc muốn xoá tài khoản này không?');
        if(confirmed){
          fetch(`${env.VITE_ADMIN_API_URL}/users/${id}`, {
            method: "DELETE"
          }).then(res => res.json())
            .then(res => {
              if (res.success == true) {
                console.log(res);
                $table.DataTable().ajax.reload(null, false)
                toast.success(res?.message)
              } else {
                toast.error(res?.message)
              }
            });
        }
      })

      function showMore(d) {
        return `
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
  `;
      }

      $table.find('tbody').on('click', 'td.details-control', function () {
        const tr = $(this).closest('tr');
        const row = $table.DataTable().row(tr);

        if (row.child.isShown()) {
          row.child.hide();
          tr.removeClass('shown');
        } else {
          row.child(showMore(row.data())).show();
          tr.addClass('shown');
        }
      });


    } else {
      alert('Lỗi khi render dữ liệu')
    }
  }


  return (
    <>
      <ScriptLoader arrayCss={arrayCss} arrayScripts={arrayScripts} onLoadAll={handleLoadAll} />
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <strong className="card-title">Danh sách <span className='text-info'>Tài khoản người dùng</span></strong>
                <a href='/user/add' className='btn btn-success'> Thêm mới</a>
              </div>
              <div className="card-body">
                <table style={{ width: '100%' }} id="bootstrap-data-table" className="table table-striped table-bordered">
                  <thead>
                    <tr className='text-center'>
                      <th>#</th>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>Sđt</th>
                      <th>Loại tk</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody className='text-center'>

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

export default ListUser
