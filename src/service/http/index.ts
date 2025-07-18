import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

class httpService {
  service: AxiosInstance

  constructor() {
    const service = axios.create({
      baseURL: window.CALL24_CONFIG.API_URL
    })

    service.interceptors.request.use((config) => {

      if (config && config.headers) {
        config.headers['Authorization'] = `Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjdkZjUzZDUwNWEzODE3YmU1Njk5ZSIsInVzZXJuYW1lIjoiSm9uaWJla1MiLCJ0eXBlIjoiZW1wbG95ZWUiLCJvcmdhbml6YXRpb24iOiI2MzVmYjk1ODIwOTg1MThiZjNiYjM3YjYiLCJpYXQiOjE3NDYxMDA3MTR9.eF_yKD4U3Kl8JyIKZzUZAJ4gJzyEyVYWbWcUKD5oaLHF0-g7fAZ3R2OjfrCZO5e7r0mqDrK3MO8dKMm-S8-l34Y59Wh_X0jx67QPqjcDb5jKTHFYyGKrbgT7Xi5U6LB7w0Bwsvkg7rlftXy8Be77CmFKPwxa5rwv71U-KemwQ1Tk2sDblYPA30m6-SuafbOW4KMwf6PC4LfQrgESGxZCPum8MhOBeJg7QESoia_8LU28QMEeX3syCQye9sFfHjo-XrAiIHo48YVxxI3GaAa8sAdzC-k0esqdgG9D56g_XqPR_RwupCcClhWrtSPNArVus179blgZmBfhMj3ogV0nwyZPfaTb7OAkxinPr9fT5UoZxt5W9Kpd-mCQRrKtz0K05gYbFi5jVObGIEPZ_I-abZHK6z5T6urjTFhkck8qndNsJZwnlcpHY_D3McltN36A2Aj0tlMSmMqYB75u-MU1b1_JBeeLb-ErLa2_1QM_srRB3sWvMaYWOCvC9MLnburmlzAhriW0xgXHV48eRbQai2VlvJju5Pu-Q-GG__UFWRuvfjH93QLr7Gj8e64IA9Di9fd48mjGAlCO10v_pmm8xvKH6TUXK0O6y3Vi-3hnNmGrcIPQOQM6Ur6pqr-3-bzoGLRsn5Lhcv7O71P_rQb5lcsOa43_tsVYkYdUXqKVFGk`
      }

      return config
    })

    service.interceptors.response.use(this.handleSuccess, this.handleError)
    this.service = service
  }

  redirectTo = (document: Document, path: string) => {
    document.location = path
  }

  handleSuccess(response: AxiosResponse): AxiosResponse {
    return response
  }

  handleError = (error: AxiosError) => {
    // switch (error?.response?.status) {
    //   case 401:
    //     this.redirectTo(document, "/login");
    //     break;
    // }
    return Promise.reject(error)
  }
}

const http = new httpService().service

export default http
