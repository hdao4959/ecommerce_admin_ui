import axios from "axios"
import env from "../config/env"

const API_ENDPOINT = `${env.VITE_SERVER_API_URL}/location`

const getProvinces = async () => {
  return await axios.get(`${API_ENDPOINT}/provinces`)
}

const getDistricts = async (provinceCode) => {
  return await axios.get(`${API_ENDPOINT}/districts?provinceCode=${provinceCode}`)
}

const getWards = async (districtCode) => {
  return await axios.get(`${API_ENDPOINT}/wards?districtCode=${districtCode}`)
}

export default {
  getProvinces, getDistricts, getWards
}