import React, { useEffect, useState } from 'react'
import useOrder from '../../hooks/useOrder'
import { useParams } from 'react-router-dom'
import ORDER_METHODS from '../../constants/orderMethods';
import PAYMENT_METHODS from '../../constants/paymentMethods';
import env from '../../config/env';
import formatPrice from '../../utils/formatPrice';
import OrderStatusLine from '../../components/Order/OrderStatusLine';
import OrderInfo from '../../components/Order/OrderInfo';
import OrderProductList from '../../components/Order/OrderProductList';

const DetailOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const { getDetailById } = useOrder();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { data } = await getDetailById(id)
        setOrder(data.data.order)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    })()
  }, [])
  return (
    <>
      {
        loading ? (
          <>Loading...</>
        ) : (
          <div>
            <OrderInfo order={order} />
            <div >
              <OrderProductList order={order}/>
            </div>
          </div>
        )
      }
    </>
  )
}

export default DetailOrder
