import env from "../../config/env"
import formatPrice from "../../utils/formatPrice"

const OrderProductList = ({order}) => {
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
                  <tr key={index}>
                    <td className="serial">{index + 1}.</td>
                    <td>
                      <div className="round-img">
                        <img
                          src={`${env.VITE_SERVER_BASE_URL}/${item.img}`}
                          alt={`${item?.product_name} ${item?.variant_name} ${item?.color}`}
                        />
                      </div>
                    </td>
                    <td>
                      <span className="name">{item?.product_name} {item?.variant_name} {item?.color}</span>{" "}
                    </td>
                    <td>
                      <span className="badge badge-complete">{item?.quantity}</span>
                    </td>
                    <td>
                      <span className="badge badge-pending">{formatPrice(item.price)}</span>
                    </td>
                  </tr>
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
