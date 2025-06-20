import ScriptLoader from '../../common/ScriptLoader';

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
    "/assets/js/init/datatables-init.js"
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
        ajax: function (data, callback) {
          const keyword = data.search.value;
          
          fetch(`http://localhost:3000/api/v1/admin/users?search=${keyword}`)
            .then(res => res.json())
            .then(response => {
              callback({
                draw: data.draw,
                recordsTotal: response.total,
                recordsFiltered: response.totalFiltered,
                data: response.data.users
              })
            })
        },
        columns: [
          { data: '_id' },
          { data: 'name' },
          { data: 'email' },
          { data: 'phone_number' }, 
          {
            data: null,
            render: function (data) {
              return `
                <div class="d-flex justify-content-around">
                  <a href="/user/${data._id}" class="btn btn-success">Chi tiết</a>
                  <button class="btn btn-secondary"><i class="menu-icon fa fa-edit"></i></button>
                  <button class="btn btn-danger"><i class="menu-icon fa fa-trash-o"></i></button>
                </div>
              `;
            }
          }
        ]
      }
      )
    } else {
      alert('Có lỗi')
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
                <a href='/color/add' className='btn btn-success'> Thêm mới</a>
              </div>
              <div className="card-body">

                <table id="bootstrap-data-table" className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>Số điện thoại</th>
                      {/* <th>Trạng thái</th> */}
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {
                      loading ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <i className="fa fa-spinner fa-spin fa-2x text-primary"></i>
                            <p>Đang tải dữ liệu...</p>
                          </td>
                        </tr>
                      ) :
                        (
                          <>
                            {users && users.map((user, index) => (
                              <tr key={index} className="align-content-center">
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone_number ?? 'Chưa cập nhật'}</td>
                                <td className="text-center">
                                  {user.is_active ? (
                                    <i className="menu-icon fa fa-check-circle text-success" />
                                  ) : (
                                    <i className="menu-icon fa fa-minus-square text-danger" />
                                  )}
                                </td>
                                <td>
                                  <div className="d-flex justify-content-around">
                                    <a href={`/user/${user._id}`} className="btn btn-success">Chi tiết</a>
                                    <button className="btn btn-secondary">
                                      <i className="menu-icon fa fa-edit"></i>
                                    </button>
                                    <button className="btn btn-danger" >
                                      <i className="menu-icon fa fa-trash-o"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )
                            )}
                          </>
                        )} */}
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
