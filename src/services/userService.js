import axiosInstance from "../utils/axios"

const getAll = () => {
  return axiosInstance.get('/users');
}

const create = (data) => {
  return axiosInstance.post('/users', data)
}

export default {
  getAll, create
}