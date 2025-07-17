import axiosInstance from "../utils/axios"

const create = (data) => {
  return axiosInstance.post('/specifications', data);
}

const getAllActive = () => {
  return axiosInstance.get('/specifications?active=1');
}

export default {
  create, getAllActive
}