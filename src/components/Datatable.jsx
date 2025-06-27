import { useEffect } from "react"

const Datatable = ({ tableId, columnTitles, columns, ajaxUrl, showMore, onDelete = false, options = [], endPoint = null }) => {
  
  useEffect(() => {
    const $ = window.$;
    if ($.fn.DataTable) {
      const $table = $(`#${tableId}`);
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

          fetch(ajaxUrl + query)
            .then(res => res.json())
            .then(response => {
              console.log(response);
              
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
          ...columns,
          {
            className: 'align-content-center',
            data: null,
            render: function (data) {
              return `
              <div class="d-flex justify-content-around" style="gap:2px">
              ${options.includes('show') ? `<a href="/${endPoint}/${data._id}" class="btn btn-success"><i class="menu-icon fa fa-info-circle"></i></a>` : ''}
              ${options.includes('edit') ? `<button class="btn btn-secondary"><i class="menu-icon fa fa-edit"></i></button>` : ''}
              ${options.includes('delete') ? `<button data-id="${data._id}" ${data.type == 'not_delete' ? 'disabled' : ""} class="btn-delete btn btn-danger"><i class="menu-icon fa fa-trash-o"></i></button>` : ''}
              </div>`;
            }
          }
        ]
      }
      )
      if (onDelete) {
        $table.on('click', '.btn-delete', function () {
          const $btn = $(this);
          const id = $btn.data('id')
          const confirmed = confirm('Bạn có chắc chắn muốn xoá không?');
          if (confirmed) {
            fetch(`${ajaxUrl}/${id}`, {
              method: "DELETE"
            }).then(res => res.json())
              .then(res => {
                if (res.success == true) {
                  $table.DataTable().ajax.reload(null, false)
                  toast.success(res?.message)
                } else {
                  toast.error(res?.message)
                }
              });
          }
        })
      }

      if (typeof showMore === 'function') {

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
      }
    } else {
      alert('Lỗi khi render dữ liệu')
    }

  }, [])


  return (
    <table style={{ width: '100%' }} id={tableId} className="table table-striped table-bordered">
      <thead>
        <tr className='text-center'>
          {
            columnTitles && columnTitles.map((title, index) => (
              <th key={index}>{title}</th>
            ))
          }
        </tr>
      </thead>
      <tbody className='text-center'>

      </tbody>
    </table>
  )
}

export default Datatable
