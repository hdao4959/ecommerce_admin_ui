import axiosInstance from "../utils/axios";


const getAll = () => axiosInstance.get('/orders')

const getDetail = (id) => {
  if (!id) throw new Error("Thiếu id khi gọi getDetail")

  return axiosInstance.get('/orders/' + id)
}

const changeOrderStatus = (id, status) => axiosInstance.post(`/orders/${id}/changeStatus`, {
  status: status
})

export default {
  getAll, getDetail, changeOrderStatus
}