import { StoreKey } from '@/config/constants'

const TokenKey = `${StoreKey}-Token`
// 如果存在令牌，则返回 true，否则返回 false。
const isLogin = () => {
  return !!localStorage.getItem(TokenKey)
}
// 从本地存储中检索并返回身份验证令牌。
const getToken = () => {
  return localStorage.getItem(TokenKey)
}
// 该函数将身份验证令牌设置到本地存储中
const setToken = (token: string) => {
  localStorage.setItem(TokenKey, token)
}
// 从本地存储中移除身份验证令牌
const removeToken = () => {
  localStorage.removeItem(TokenKey)
}

export { isLogin, getToken, setToken, removeToken }
