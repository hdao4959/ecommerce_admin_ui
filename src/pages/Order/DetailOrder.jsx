import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import OrderInfo from '../../components/Order/OrderInfo';
import OrderProductList from '../../components/Order/OrderProductList';
import useApi from '../../hooks/useApi';
import orderService from '../../services/orderService';
const DetailOrder = () => {
  const { id } = useParams();
  const {loading, data, error, fetchApi} = useApi(orderService.getDetail);
  const fetchOrder = () => {
    fetchApi(id)
  }
  useEffect(() => {
    fetchOrder()
  }, [])


  return (
    <>
      {
        loading ? (
          <>Loading...</>
        ) : (
          <div>
            <OrderInfo order={data?.order} fetchOrder={fetchOrder} />
            <div >
              <OrderProductList order={data?.order}/>
            </div>
          </div>
        )
      }
    </>
  )
}

export default DetailOrder
