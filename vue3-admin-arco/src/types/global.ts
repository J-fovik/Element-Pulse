import type { AxiosRequestConfig } from 'axios'

export interface AnyObject {
  [key: string]: unknown
}

export interface Options {
  value: unknown
  label: string
}
// hideLoading类型
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  hideLoading?: boolean
}

export interface Pagination {
  page: number
  limit: number
  total?: number
  showJumper?: boolean
  showTotal?: boolean
  showPageSize?: boolean
}

// 通知类型
export interface INotice {
  type?: 'success' | 'warning' | 'error' | 'info'
  content: string
  duration?: number
  [key: string]: any
}
