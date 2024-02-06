import NProgress from 'nprogress' // 加载进度条
import { setPageTitle } from '@/utils/index'
import router from './index'
import { getToken } from '@/utils/auth'
import { useUserStore } from '@/store'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false }) // 在进度过程中不会显示旋转器（加载指示器）

const whiteList = ['/login'] // 定义白名单
// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const token = getToken()
  const userStore = useUserStore()
  // 如果有token
  if (token) {
    // 如果路径是'/login'则重定向
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 调用userStore仓库的getInfo方法
      userStore.getInfo()
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
// 路由后置守卫
router.afterEach((to) => {
  // 设置标题并关闭加载进度条
  setPageTitle(to.meta.title)
  NProgress.done()
})
