import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

class HttpService {
  service: AxiosInstance

  constructor() {
    // Use empty baseURL in development to use Vite proxy
    const baseURL = import.meta.env.DEV
      ? ''
      : import.meta.env.VITE_API_BASE_URL

    const service = axios.create({
      baseURL,
      timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    })

    service.interceptors.request.use((config) => {
      // Get token from localStorage or env variable (dev only)
      const token = localStorage.getItem('authToken') ||
        (import.meta.env.DEV ? import.meta.env.VITE_AUTH_TOKEN : null)

      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`
      }

      // Debug logging if enabled
      if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`)
      }

      return config
    })

    service.interceptors.response.use(
      this.handleSuccess.bind(this),
      this.handleError.bind(this)
    )

    this.service = service
  }

  handleSuccess(response: AxiosResponse): AxiosResponse {
    if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
      console.log(`[API] Response ${response.status} from ${response.config.url}`)
    }
    return response
  }

  handleError = (error: AxiosError) => {
    if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
      console.error('[API] Error:', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
        data: error.response?.data
      })
    }

    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('authToken')
      // Uncomment when you have a login route
      // window.location.href = '/login'
    }

    // Network error - might be CORS in development
    if (error.message === 'Network Error' && !error.response) {
      console.error(
        'Network Error: This might be a CORS issue.',
        `Current origin: ${window.location.origin}`,
        `Target API: ${import.meta.env.VITE_API_BASE_URL}`
      )
    }

    return Promise.reject(error)
  }
}

const http = new HttpService().service

export default http
