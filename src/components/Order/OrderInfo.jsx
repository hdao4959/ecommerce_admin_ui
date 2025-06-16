import OrderStatusLine from './OrderStatusLine'
import PAYMENT_METHODS from '../../constants/paymentMethods'
import ORDER_METHODS from '../../constants/orderMethods'
import { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi'
import orderService from '../../services/orderService'

const OrderInfo = ({ order, fetchOrder }) => {
  const { fetchApi: changeStatus } = useApi(orderService.changeOrderStatus);
  const [orderStatus, setOrderStatus] = useState(order?.status)

  const orderStatusKeys = Object.keys(ORDER_METHODS);

  const handleChangeOrderStatus = async (event) => {
    const confirmed = confirm('Bạn có chắc muốn thay đổi trạng thái đơn hàng không?')
    if (confirmed) {
      try {
        await changeStatus(order._id, event.target.value)
        setOrderStatus(event.target.value)
        fetchOrder(order._id)
      } catch (error) {
        alert('Thay đổi trạng thái đơn hàng thất bại')
      }
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <strong className="card-title mb-3">Thông tin đơn hàng</strong>
      </div>
      <div className="card-body">
        <div className="mx-auto d-block">
          <h5 className="text-sm-center mt-2 mb-1"><strong>Họ và tên:</strong> {order?.name}</h5>
          <div className="location text-sm-center">
            <strong>Số điện thoại: </strong>{order?.phone_number}
          </div>
          <div className="location text-sm-center">
            <strong>Email:</strong>{order?.email}
          </div>
          <div className="location text-sm-center">
            <i className="fa fa-map-marker" /><strong>Địa chỉ:</strong> California, United States
          </div>
          <div className="location text-sm-center">
            <strong>Ghi chú:</strong> {order?.note}
          </div>
          <div className="location text-sm-center">
            <strong>Thanh toán: </strong><span className={`badge badge-${PAYMENT_METHODS[order?.payment_status]?.badge_color}`}>{PAYMENT_METHODS[order?.payment_status]?.name}</span>
          </div>
        </div>
        <hr />
        <div className="card-text text-sm-center">
          <div>
            <strong className=''>Trạng thái đơn hàng: <select value={orderStatus} onChange={(e) => handleChangeOrderStatus(e)} name="order_status" id="">
              {
                orderStatusKeys.map((key, index) => (
                  <option
                    disabled={index < orderStatusKeys.indexOf(orderStatus)}
                    key={index} value={key}>{ORDER_METHODS[key].name}</option>
                ))
              }
            </select></strong>
          </div>
          <OrderStatusLine currentStatus={orderStatus} />
        </div>
      </div>
    </div>
  )
}

export default OrderInfo
