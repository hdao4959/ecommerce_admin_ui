import { useState } from "react";
import orderApi from "../apis/orderApi"

const useOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)


  const fetchOrders = async () => {
    setLoading(true)
    try {
      const { data } = await orderApi.getAll();
      setOrders(data.data.orders)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }

  }

  const getDetailById = async (id) => {
    return await orderApi.getDetailById(id);
  }



  return {
    orders, loading, error, fetchOrders, getDetailById
  }
}

export default useOrder