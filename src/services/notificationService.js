import axiosInstance from "../utils/axios"

const getNotificationsRecent = () => {
  return axiosInstance.get('/notifications/recent')
}

const readNotification = (notifyId) => {
  return axiosInstance.put(`/notifications/${notifyId}/read`)
}

export default {
  getNotificationsRecent, readNotification
}