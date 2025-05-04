import axios from 'axios'

export const axiosInstance = axios.create({
  validateStatus: (status) => status <= 500
})
