import { useState } from 'react'
import ScriptLoader from '../../common/ScriptLoader'
import formatPrice from '../../utils/formatPrice'
import formatTimestamp from '../../utils/formatTimestamp'
import PAYMENT_METHODS from '../../constants/paymentMethods'
import ORDER_METHODS from '../../constants/orderMethods'
import Datatable from '../../components/Datatable'
import env from '../../config/env'

const ListOrder = () => {
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
    "/assets/js/init/datatables-init.js"
  ]

  const columnTitles = ["#", "Tên người nhận", "Số điện thoại", "Email", "Thanh toán", "Trạng thái", "Tuỳ chọn"]

  const columns = [
    {
      className: 'align-content-center',
      data: 'name'
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
      data: 'email',
      render: function (data) {
        return data ? data : 'Chưa cập nhật'
      }
    },
    {
      className: 'align-content-center',
      data: 'payment_status',
      render: function (data) {
        return data ?
          `<span class="badge badge-${PAYMENT_METHODS[data].badge_color}">${PAYMENT_METHODS[data].name}</span>`
          : data
      }
    },
    {
      className: 'align-content-center',
      data: 'status',
      render: function (data) {
        return data ?
          `<span class="badge badge-${ORDER_METHODS[data].badge_color}">${ORDER_METHODS[data].name}</span>`
          : data
      }
    }
  ]

  const showMore = (d) => {
    return `
      <table class="table border">
        <tbody>
          <tr>
            <th>Id</th>
            <td>${d._id}</td>
          </tr>
          <tr>
            <th>Họ và tên</th>
            <td>${d.name}</td>
          </tr>
          <tr>
            <th>Số điện thoại</th>
            <td>${d.phone_number}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>${d.email}</td>
          </tr>
          <tr>
            <th>Ghi chú</th>
            <td>${d.note}</td>
          </tr>
          <tr>
            <th>Tổng tiền</th>
            <td>${formatPrice(d.amount)}</td>
          </tr>
          <tr>
            <th>Trạng thái thanh toán</th>
            <td>
            <span class="badge badge-${PAYMENT_METHODS[d.payment_status].badge_color}"> ${PAYMENT_METHODS[d.payment_status].name}</span>
            </td>
          </tr>
          <tr>
            <th>Trạng thái đơn hàng</th>
            <td>
            <span class="badge badge-${ORDER_METHODS[d.status].badge_color}"> ${ORDER_METHODS[d.status].name}</span>
            </td>
          </tr>
          <tr>
            <th>Ngày đặt hàng</th>
            <td>${formatTimestamp(d.created_at)}</td>
          </tr>
        </tbody>
      </table>`
  }

  return (
    <>
      <ScriptLoader arrayCss={arrayCss} arrayScripts={arrayScripts} onLoadAll={() => setLoadAllScript(true)} />
      <div className="animated fadeIn">
        <div className="row ">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <strong className="card-title">Danh sách <span className='text-info'>Đơn hàng</span></strong>
              </div>
              <div className="card-body">
                {
                  loadAllScript && (
                    <Datatable tableId="order-datatable" ajaxUrl={`${env.VITE_ADMIN_API_URL}/orders`} columns={columns} columnTitles={columnTitles} showMore={showMore} options={['show']} endPoint="order" />
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListOrder
