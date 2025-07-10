import axiosInstance from "../utils/axios"

const getAllActive = () => {
  return axiosInstance.get('/colors?active=1&limit=0')
}

export default {
  getAllActive
}