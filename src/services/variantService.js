import axiosInstance from "../utils/axios"

const create = (data) => {
  return axiosInstance.post('/variants', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const getDetailById = (id) => {
  return axiosInstance.get('/variants/' + id);
}

const update = (id, data) => {
  return axiosInstance.put('/variants/' + id, data)
}

export default {
  create, getDetailById, update
}