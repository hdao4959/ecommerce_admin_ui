import axiosInstance from "../utils/axios"

const getAllActive = () => {
  return axiosInstance.get('/colors?active=1&limit=0')
}

const create = (data) => {
  return axiosInstance.post('/colors', data);
}

export default {
  getAllActive, create
}