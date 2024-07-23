import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { LOGIN_URL } from '@/config';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/modules/user';
import router from '@/routers';
const request = axios.create({
	// 默认地址请求地址，可在 .env.** 文件中修改
	baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间
	timeout: (10 * 3000) as number,
	// 请求头
	headers: {
		'Content-Type': 'application/json',
	},
	// 跨域时候允许携带凭证
	withCredentials: true,
});
// 请求拦截
request.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const userStore = useUserStore();
		// 判断是否存在
		if (userStore.token) {
			config.headers['token'] = userStore.token;
		}
		// 全局参数
		config.data = {
			// uuid: userInfo.uuid ?? '',
			...config.data,
		};
		return config;
	},
	(error: AxiosError) => Promise.reject(error)
);

// 添加响应拦截器
request.interceptors.response.use(
	async (res: AxiosResponse) => {
		const userStore = useUserStore();
		// 文件类型
		if (['blob', 'arraybuffer'].includes(res.config.responseType as string)) {
			return res.data;
		} else {
			// 请求成功
			if (res.data.code === 200) {
				return res.data;
			} else {
				// 登录失效
				if ([9000].includes(res.data.code)) {
					// 清空Token
					userStore.setToken('');
					// 清空用户信息
					userStore.setUserInfo({} as any);
					// 去登录页
					router.replace(LOGIN_URL);
				}
				if (res.data.code === 1003) {
					// 设置token
					userStore.setToken(res?.data.access_token);
					// 重新请求
					return await request(res.config);
				}
				ElMessage.error(res.data.msg ?? '请求出错了');
				return Promise.reject(res.data);
			}
		}
	},
	async (error: AxiosError) => {
		ElMessage.error('请求出错了');
		return Promise.reject(error);
	}
);

export default request;
