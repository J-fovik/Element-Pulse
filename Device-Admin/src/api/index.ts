import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { LOGIN_URL } from '@/config';
import qs from 'qs';
import { Session } from '@/utils/storage';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores';
import router from '@/routers';
const request = axios.create({
	// 默认地址请求地址，可在 .env.** 文件中修改
	baseURL: import.meta.env.VITE_API_URL as string,
	timeout: 50000,
	headers: { 'Content-Type': 'application/json;charset=utf-8' },
	paramsSerializer: (params) => qs.stringify(params),
	method: 'post',
});
// 请求拦截
request.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const { userInfo } = useUserStore();
		// 获取用户token
		const userToken = Session.get('userToken');
		// 判断是否存在
		if (config.headers.Bearer !== 'no-auth' && userToken) {
			config.headers.Bearer = `${userToken}`;
		} else {
			delete config.headers.Bearer;
		}
		return config;
	},
	(error: AxiosError) => Promise.reject(error),
);

// 添加响应拦截器
request.interceptors.response.use(
	async (res: AxiosResponse) => {
		const { setUserInfo } = useUserStore();
		// 文件类型
		if (['blob', 'arraybuffer'].includes(res.config.responseType as string)) {
			return res.data;
		} else {
			// else if (res.data.isOk && res.data.content == null) {
			// return { ...res.data, content: [] };
			// }
			// 请求成功
			if (['00000', 200, '200'].includes(res.data.code) || res.data.isOk) {
				return res.data;
			} else {
				// 登录失效
				if ([401].includes(res.data.code)) {
					// 删除token
					Session.remove('userToken');
					// 清空Session缓存
					Session.clear();
					// 清除用户信息
					setUserInfo({});
					// 去登录页
					router.replace(LOGIN_URL);
				}
				// if (res.data.code === 1003) {
				// 	// 设置token
				// 	Session.set('userToken', res?.data.token);
				// 	// 重新请求
				// 	return await request(res.config);
				// }
				ElMessage.error(res.data.message ?? '请求出错了');
				return Promise.reject(res.data);
			}
		}
	},
	async (error: AxiosError) => {
		ElMessage.error('请求出错了');
		return Promise.reject(error);
	},
);

export default request;
