import env from '../../config/env'
import formatPrice from '../../utils/formatPrice'

const OrderProductItem = ({item, index}) => {
  return (
    <tr>
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
  )
}

export default OrderProductItem
