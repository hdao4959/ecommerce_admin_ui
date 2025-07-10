import axiosInstance from "../utils/axios"

const getAllActive = () => {
  return axiosInstance.get('/products?active=1&limit=0')
}
const create = (data) => {
  return axiosInstance.post('/products', data);
}

const update = (id, data) => {
  return axiosInstance.put('/products/' + id, data);
}

const getDetail = (id) => {
  return axiosInstance.get('/products/' + id);
}

const getVariantsOfProduct = (productId) => {
  return axiosInstance.get('/products/' + productId + '/variants')
}

export default {
  getAllActive, create, update, getDetail, getVariantsOfProduct
}