import formatPrice from "../../utils/formatPrice"
import OrderProductItem from "./OrderProductItem"

const OrderProductList = ({order, key}) => {
  
  return (
    <div className="card">
      <div className="card-header">
        <strong className="card-title">Danh sách sản phẩm</strong>
      </div>
      <div className='card-body'>
        <div className="table-stats order-table ov-h">
          <table className="table">
            <thead>
              <tr>
                <th className="serial">#</th>
                <th className="avatar">Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody className='border'>
              {
                order?.orderItems && order.orderItems.map((item, index) => (
                  <OrderProductItem key={index} item={item} index={index}/>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className='card-footer'>
        <strong>Tổng tiền: <span className='text-danger'>{formatPrice(order?.amount)}</span></strong>
      </div>
    </div>
  )
}

export default OrderProductList
