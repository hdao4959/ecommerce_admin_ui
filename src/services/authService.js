import axiosInstance from "../utils/axios"

const loginWithEmail = (data) => {
  return axiosInstance.post('/auth/loginAdmin', data)
}


export default {
  loginWithEmail
}