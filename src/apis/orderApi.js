import axiosInstance from "../utils/axios";

const orderApi = {
  getAll: () => axiosInstance.get('/orders'),
  getDetailById: (id) => axiosInstance.get('/orders/' + id )
}

export default orderApi