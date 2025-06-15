import React, { useEffect } from 'react'
import useOrder from '../../hooks/useOrder'
import ScriptLoader from '../../common/ScriptLoader'
import formatPrice from '../../utils/formatPrice'
import formatTimestamp from '../../utils/formatTimestamp'
import PAYMENT_METHODS from '../../constants/paymentMethods'
import ORDER_METHODS from '../../constants/orderMethods'

const ListOrder = () => {


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


  const { orders, fetchOrders, loading } = useOrder();

  useEffect(() => {
    fetchOrders()
  }, [])
  
  return (
    <>
      {
        !loading && (
          <ScriptLoader arrayCss={arrayCss} arrayScripts={arrayScripts} />
        )}

      <div className="animated fadeIn">
        <div className="row ">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <strong className="card-title">Danh sách Đơn hàng</strong>
              </div>
              <div className="card-body">
                <table
                  id="bootstrap-data-table"
                  className="table table-striped table-bordered"
                >
                  <thead>

                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Tên người nhận</th>
                      <th>Số điện thoại</th>
                      <th>Email</th>
                      <th>Tổng tiền</th>
                      <th>Ngày đặt</th>
                      <th>Thanh toán</th>
                      <th>Trạng thái</th>
                      <th>Tuỳ chọn</th>
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
                        {orders && orders.map((order, index) => (
                          <tr key={index}>
                            <td className='align-content-center'>{order._id}</td>
                            <td className='align-content-center'>{order.name}</td>
                            <td className='align-content-center'>{order.phone_number}</td>
                            <td className='align-content-center'>{order.email}</td>
                            <td className='align-content-center'>{formatPrice(order.amount)}</td>
                            <td className='align-content-center'>{formatTimestamp(order.created_at)}</td>
                            <td className='align-content-center'><span className={`badge badge-${PAYMENT_METHODS[order?.payment_status]?.badge_color}`}>{PAYMENT_METHODS[order.payment_status].name}</span></td>
                            <td className='align-content-center'><span className={`badge badge-${ORDER_METHODS[order?.status]?.badge_color}`}>{ORDER_METHODS[order?.status]?.name}</span></td>
                            <td className='align-content-center'>
                              <div className="d-flex justify-content-around">
                                <a href={`/order/${order._id}`} className="btn btn-success" >
                                  Chi tiết
                                </a>
                                {/* <button className='btn btn-danger'><i className='menu-icon fa fa-trash-o'> </i></button> */}
                              </div>
                            </td>
                          </tr>
                        )
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListOrder
