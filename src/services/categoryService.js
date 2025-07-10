import axiosInstance from "../utils/axios"

const getAll = () => {
  return axiosInstance.get('/categories?limit=0');
}
const getAllActive = () => {
  return axiosInstance.get('/categories?active=1&limit=0');
}

const create = (data) => {
  return axiosInstance.post('/categories', data)
}

const update = (id, data) => {
  return axiosInstance.put('/categories/' + id, data);
}

const getProductsOfCategory = (id) => {
  if (!id) return null
  return axiosInstance.get('/categories/products/' + id)
}

const getDetail = (id) => {
  if (!id) return null
  return axiosInstance.get('/categories/' + id);
}

const getChildrentOfCategory = (idParent) => {
  if(!idParent) return null
  return axiosInstance.get('/categories/' + idParent + '/children')
}
export default {
  getAll, getAllActive, getDetail, create, update, getProductsOfCategory, getChildrentOfCategory
}