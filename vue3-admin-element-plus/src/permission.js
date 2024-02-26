import { router } from "@/router" // 后端添加路由引入 addRoutes 方法
import { getToken } from "@/composables/auth"
import {
    toast,
    showFullLoading,
    hideFullLoading
} from "@/composables/util"
import store from "./store"

// 全局前置守卫
let hasGetInfo = false // 防止请求两次数组导致重复加载
router.beforeEach(async (to, from, next) => {
    // 显示loading
    showFullLoading()
    const token = getToken()
    // 没有登录，强制跳转回登录页
    if (!token && to.path != "/login") {
        toast("请先登录", "error")
        return next({ path: "/login" })
    }
    // 防止重复登录
    if (token && to.path == "/login") {
        toast("请勿重复登录", "error")
        return next({ path: from.path ? from.path : "/" })
    }

    // 如果用户登录了，自动获取用户信息，并存储在vuex当中
    let hasNewRoutes = false
    if (token && !hasGetInfo) {
        // 调用存储用户信息并结构menus菜单
        let { menus } = await store.dispatch("getinfo")
        hasGetInfo = true
        // 根据后端返回数据动态添加路由
        // hasNewRoutes = addRoutes(menus)
    }

    // 设置页面标题
    let title = (to.meta.title ? to.meta.title : "yue")
    document.title = title
    // next(to.fullPath)手动添加路由，但是会死循环，如果为true跳到对应页面
    hasNewRoutes ? next(to.fullPath) : next()
})

// 全局后置守卫
router.afterEach((to, from) => hideFullLoading())// 加载完页面关闭loading