import { defineStore } from 'pinia'
import { login as userLogin, logout as userLogout, type LoginData } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import type { UserState } from './types'
// 定义user仓库
const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    role: '',
  }),
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
  },

  actions: {
    // 重置
    resetInfo() {
      this.$reset()
    },
    // Login
    async getInfo() {
      return { username: 'admin', password: 123 }
    },

    // 登录
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm)
        // 设置并存储token
        setToken(res.token)
      } catch (err) {
        removeToken()
        throw err
      }
    },

    // 退出登录
    async logout() {
      await userLogout()
      this.resetInfo() // 调用函数
      removeToken() // 清除token
    },
  },
})

export default useUserStore
