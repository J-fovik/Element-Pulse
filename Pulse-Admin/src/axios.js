import axios from "axios"
import { toast } from '@/composables/util'
import { getToken } from '@/composables/auth'
import store from "./store"

// const service = axios.create({
//     baseURL:"/api"// 基本地址用/api代理http://ceshi13.dishait.cn
// })
// 可根据生产环境，开发环境自行匹配
const service = axios.create({
  baseURL:import.meta.env.VITE_APP_BASE_API,
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {

    // 往header头自动添加token
    const token = getToken()
    // 如果有token将请求头加token
    if(token){
        config.headers["token"] = token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data.data;
  }, function (error) {
    const msg = error.response.data.msg || "请求失败"
    // 如果mag为"非法token，请先登录！"则调用退出登录接口并刷新页面
    if(msg == "非法token，请先登录！"){
      store.dispatch("logout").finally(()=>location.reload())
    }
    // 提示信息
    toast(msg,"error")
    return Promise.reject(error);
 })

export default service