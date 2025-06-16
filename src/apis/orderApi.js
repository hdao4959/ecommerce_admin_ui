import axiosInstance from "../utils/axios";

const orderApi = {
  getAll: () => axiosInstance.get('/orders'),
  getDetailById: (id) => axiosInstance.get('/orders/' + id ),
  changeOrderStatus: (id, status) => axiosInstance.post(`/orders/${id}/changeStatus`, {
    status: status
  })
}

export default orderApi