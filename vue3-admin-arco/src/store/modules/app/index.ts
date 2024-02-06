import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import defaultSettings from '@/config/settings.json'
import type { AppState } from './types'
// 定义全局app仓库
const useAppStore = defineStore('app', {
  state: (): AppState => ({
    collapsed: false, // 控制展开收起
    routes: undefined, // 当前活跃路由
    breadcrumbList: [], // 头部面包屑
    sourceSettings: {
      action: 'y',
      shape: 'rect',
      color: 'black',
    },
    ...defaultSettings,
  }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state }
    },
  },

  actions: {
    // 更新设置状态
    updateSettings(partial: Partial<AppState>) {
      // @ts-ignore-next-line
      this.$patch(partial)
    },
    // 设置当前活跃路由
    setRoutes(routes: RouteRecordRaw) {
      this.routes = routes
    },
    // 设置头部面包屑
    setBreadcrumbList(list: any) {
      this.breadcrumbList = list
    },

    setCollapsed(type: boolean) {
      this.collapsed = type
    },

    setSourceSettings(setting: object) {
      this.sourceSettings = setting
    },

    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark'
        document.body.setAttribute('arco-theme', 'dark')
      } else {
        this.theme = 'light'
        document.body.removeAttribute('arco-theme')
      }
    },
  },
})

export default useAppStore
