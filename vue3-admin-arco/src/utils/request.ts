import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Message, Notification } from '@arco-design/web-vue'
// import router from '@/router'
// import store from '@/store'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import { CodeMessage } from '@/config/constants'
import type { CustomAxiosRequestConfig } from '@/types/global'

export interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
}
// 创建Axios实例
const service = Axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) || undefined,
  timeout: 50000,
})
// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    NProgress.start() // 进度条
    const token = getToken()
    if (token) {
      // 如果有则设置token
      config.headers!.token = token
    }
    return config
  },
  (error: { message: string }) => {
    Message.error(error.message)
  }
)
// 响应拦截器
service.interceptors.response.use(
  async (response: AxiosResponse): Promise<any> => {
    const { data } = response
    const { code, msg } = data

    if (typeof code !== 'undefined' && code !== 0) {
      Notification.error(msg)
      return Promise.reject(new Error(msg || 'Error'))
    }

    NProgress.done()
    return Promise.resolve(data)
  },
  (error: AxiosError) => {
    NProgress.done()
    Message.clear()

    const response = Object.assign({}, error.response)
    response && Message.error(CodeMessage[response.status] || '系统异常')

    return Promise.reject(error)
  }
)

const request = <T = any>(config: CustomAxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    service
      .request<BaseResponse<T>>(config)
      .then((res: AxiosResponse) => resolve(res.data))
      .catch((err: { message: string }) => reject(err))
  })
}

request.get = <T = any>(url: string, params?: object): Promise<T> =>
  request({
    method: 'get',
    url,
    params,
  })

request.post = <T = any>(url: string, params?: object): Promise<T> =>
  request({
    method: 'post',
    url,
    data: params,
  })

request.delete = <T = any>(url: string, params?: object): Promise<T> =>
  request({
    method: 'delete',
    url,
    params,
  })

request.put = <T = any>(url: string, params?: object): Promise<T> =>
  request({
    method: 'put',
    url,
    data: params,
  })

request.patch = <T = any>(url: string, params?: object): Promise<T> =>
  request({
    method: 'patch',
    url,
    data: params,
  })

export default request
