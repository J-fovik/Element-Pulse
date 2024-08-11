import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { LOGIN_URL } from '@/config';
import { Session } from '@/utils/storage';
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
		const { userInfo } = useUserStore();
		// 获取用户token
		const uerToken = Session.get('userToken');
		// 判断是否存在
		if (uerToken) {
			config.headers['token'] = uerToken;
		}
		// 全局参数
		config.data = {
			name: userInfo.name ?? '',
			...config.data,
		};
		return config;
	},
	(error: AxiosError) => Promise.reject(error)
);

// 添加响应拦截器
request.interceptors.response.use(
	async (res: AxiosResponse) => {
		const { setUserInfo } = useUserStore();
		// 文件类型
		if (['blob', 'arraybuffer'].includes(res.config.responseType as string)) {
			return res.data;
		} else {
			// 请求成功
			if (res.data.code === 200) {
				return res.data;
			} else {
				// 登录失效
				if ([1002, 1003].includes(res.data.code)) {
					// 删除token
					Session.remove('userToken');
					// 删除用户信息
					Session.remove('userInfo');
					// 清除用户信息
					setUserInfo({});
					// 去登录页
					router.replace(LOGIN_URL);
				}
				if (res.data.code === 1003) {
					// 设置token
					Session.set('userToken', res?.data.access_token);
					// 重新请求
					return await request(res.config);
				}
				ElMessage.error(res.data.msg ?? '请求出错了');
				return Promise.reject(res.data);
			}
		}
	},
	async (error: AxiosError) => {
		// 对响应错误做点什么
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络超时');
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		} else {
			ElMessage.error('请求出错了');
		}
		return Promise.reject(error);
	}
);

export default request;
