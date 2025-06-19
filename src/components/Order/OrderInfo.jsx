import OrderStatusLine from './OrderStatusLine'
import PAYMENT_METHODS from '../../constants/paymentMethods'
import ORDER_METHODS from '../../constants/orderMethods'
import { useEffect, useRef, useState } from 'react'
import useApi from '../../hooks/useApi'
import orderService from '../../services/orderService'
import locationService from '../../services/locationService'
import { toast } from 'react-toastify'
import formatTimestamp from '../../utils/formatTimestamp'

const OrderInfo = ({ order, fetchOrder }) => {
  const [address, setAddress] = useState(null);
  const [orderStatus, setOrderStatus] = useState("")
  const orderStatusKeys = Object.keys(ORDER_METHODS);


  const { data: responseWards, fetchApi: fetchWards } = useApi(locationService.getWards);
  const { fetchApi: changeStatus } = useApi(orderService.changeOrderStatus);


  const handleChangeOrderStatus = async (event) => {
    const confirmed = confirm('Bạn có chắc muốn thay đổi trạng thái đơn hàng không?')
    if (confirmed) {
      try {
        await changeStatus(order?._id, event.target.value)
        setOrderStatus(event.target.value)
        fetchOrder()
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  
  useEffect(() => {
    (async () => {
      await fetchWards(order?.district)
    })()
  }, [])

  useEffect(() => {
    setOrderStatus(order.status || "");
  }, [order, order?.status])

  useEffect(() => {
    if (responseWards && responseWards.wards) {
      const ward = responseWards.wards.find(ward => ward?.code == order?.ward);
      setAddress(ward.path_with_type)
    }
  }, [responseWards, order, order.ward])

  return (
    <div className="card">
      <div className="card-header">
        <strong className="card-title mb-3">Thông tin đơn hàng</strong>
      </div>
      <div className="card-body">
        <div className="mx-auto d-block">
          <h5 className="text-sm-center mt-2 mb-1"><strong>Mã đơn hàng:</strong> {order?._id}</h5>
          <h5 className="text-sm-center mt-2 mb-1"><strong>Ngày đặt hàng:</strong> {formatTimestamp(order?.created_at)}</h5>
          <h5 className="text-sm-center mt-2 mb-1"><strong>Họ và tên:</strong> {order?.name}</h5>
          <div className="location text-sm-center">
            <strong>Số điện thoại: </strong>{order?.phone_number}
          </div>
          <div className="location text-sm-center">
            <strong>Email:</strong>{order?.email}
          </div>
          <div className="location text-sm-center">
            {/* <i className="fa fa-map-marker" /> */}
            <strong>Địa chỉ:</strong> {address}
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
