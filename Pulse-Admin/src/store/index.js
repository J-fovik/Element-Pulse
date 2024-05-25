import { createStore } from 'vuex'
import { login, getinfo } from '@/api/manager'
import { MENUS } from '@/composables/options' 
import {
    setToken,
    removeToken
} from '@/composables/auth'
const store = createStore({
    state() {
        return {
            // 用户信息
            user: {},
            // 侧边宽度
            asideWidth: "250px",
            // 用户对应路由菜单
            menus: [],
            // 用户对应接口权限
            ruleNames: []
        }
    },
    mutations: {
        // 记录用户信息
        SET_USERINFO(state, user) {
            state.user = user
        },
        // 展开/缩起侧边
        handleAsideWidth(state) {
            state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px"
        },
        // 用户对应路由菜单
        SET_MENUS(state, menus) {
            state.menus = menus
        },
        // 用户对应接口权限
        SET_RULENAMES(state, ruleNames) {
            state.ruleNames = ruleNames
        }
    },
    actions: {
        // 登录
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    // 存储token
                    setToken(res.token)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        // 获取当前登录用户信息
        getinfo({ commit }) {
            return new Promise((resolve, reject) => {
                getinfo().then(res => {
                    // 调用mutations里面的用户信息、路由菜单以及接口权限
                    commit("SET_USERINFO", res)
                    commit("SET_MENUS", res.menus)
                    // commit("SET_MENUS", MENUS)
                    commit("SET_RULENAMES", res.ruleNames)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        // 退出登录
        logout({ commit }) {
            // 移除cookie里的token
            removeToken()
            // 清除当前用户状态 vuex
            commit("SET_USERINFO", {})
        }
    }
})

export default store