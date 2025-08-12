import io from 'socket.io-client'
import env from '../config/env'

const token = sessionStorage.getItem('token')
export const socket = io(env.VITE_SERVER_BASE_URL, {
  auth: {
    token
  }
})
