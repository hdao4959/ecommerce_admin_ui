import axiosInstance from "../utils/axios"

const create = (data) => {
  return axiosInstance.post('/variants', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export default {
  create
}