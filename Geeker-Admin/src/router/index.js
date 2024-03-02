import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
// 使用 import.meta.globEager 导入所有模块文件
const modules = import.meta.globEager('./modules/*.js', { eager: true, import: 'default' })
// 处理模块
export const routerArray = Object.keys(modules).map((key) => {
    return (modules[key]).default;
});
import Admin from "@/layouts/admin.vue";
import Login from '@/pages/login.vue'
import NotFound from '@/pages/404.vue'

const routes = [
    {
        path: "/",
        component: Admin,
        meta: {
            title: "后台首页"
        },
        // 子路由
        children: [...routerArray]
    },
    {
        path: "/login",
        component: Login,
        meta: {
            title: "登录页"
        }
    }, {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }]


export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
