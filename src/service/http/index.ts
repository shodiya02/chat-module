import axios, { type AxiosInstance } from 'axios'
import auth from '@/modules/auth'

class HttpService {
  service: AxiosInstance

  constructor() {
    this.service = axios.create({
      baseURL: (window as any).CHAT_CONFIG.API_URL
    })

    // Add token to every request
    this.service.interceptors.request.use((config) => {
      const token = auth.getToken()
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    })

    // Handle errors
    this.service.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired, redirect to login
          auth.logout()
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new HttpService().service
export default http
