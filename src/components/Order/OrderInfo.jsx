import OrderStatusLine from './OrderStatusLine'
import PAYMENT_METHODS from '../../constants/paymentMethods'

const OrderInfo = ({order}) => {
  return (
    <div className="card">
      <div className="card-header">
        <strong className="card-title mb-3">Thông tin đơn hàng</strong>
      </div>
      <div className="card-body">
        <div className="mx-auto d-block">
          {/* <img
                    className="rounded-circle mx-auto d-block"
                    src=""
                    alt="Card image cap"
                  /> */}
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
            <strong>Trạng thái đơn hàng: </strong>
          </div>
          <OrderStatusLine currentStatus={order.status} />
        </div>
      </div>
    </div>
  )
}

export default OrderInfo
