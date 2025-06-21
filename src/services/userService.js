import axiosInstance from "../utils/axios"

const getAll = () => {
  return axiosInstance.get('/users');
}

export default {
  getAll
}