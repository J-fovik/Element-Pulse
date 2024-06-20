import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { LOGIN_URL } from "@/config";
import { ElMessage } from "element-plus";
import { checkStatus, ResultEnum } from "./config/servicePort";
import { useUserStore } from "@/stores/modules/user";
import router from "@/routers";
const request = axios.create({
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true
});
// 请求拦截
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore();
    if (config.headers && typeof config.headers.set === "function") {
      config.headers.set("x-access-token", userStore.token);
    }
    return config;
  },
  error => Promise.reject(error)
);

// 添加响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const userStore = useUserStore();
    const data = response.data;
    // 登录失效
    if (data.code == ResultEnum.OVERDUE) {
      userStore.setToken("");
      router.replace(LOGIN_URL);
      ElMessage.error(data.msg);
      return Promise.reject(data);
    }
    // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
    if (data.code && data.code !== ResultEnum.SUCCESS) {
      ElMessage.error(data.msg);
      return Promise.reject(data);
    }
    // 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
    return data;
  },
  async (error: AxiosError) => {
    const { response } = error;
    // 请求超时 && 网络错误单独判断，没有 response
    if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
    if (error.message.indexOf("Network Error") !== -1) ElMessage.error("网络错误！请您稍后重试");
    // 根据服务器响应的错误状态码，做不同的处理
    if (response) checkStatus(response.status);
    // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
    if (!window.navigator.onLine) router.replace("/500");
    return Promise.reject(error);
  }
);

export default request;
