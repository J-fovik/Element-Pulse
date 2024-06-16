import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
// 用于序列化和解析 URL 查询字符串的库
import qs from 'qs';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Session } from '/@/utils/storage';
import { showFullScreenLoading, tryHideFullScreenLoading } from '/@/utils/elementPlus';

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	loading?: boolean;
	cancel?: boolean;
}
// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10 * 1000,
	headers: { 'Content-Type': 'application/json' },
	paramsSerializer: {
		serialize(params) {
			return qs.stringify(params, { allowDots: true });
		},
	},
});

// 添加请求拦截器
service.interceptors.request.use(
	(config: CustomAxiosRequestConfig) => {
		// 当前请求不需要显示 loading，在 api 服务中通过参数: { loading: false } 来控制
		config.loading ??= true;
		config.loading && showFullScreenLoading();
		// 在发送请求之前做些什么 token
		if (Session.get('token')) {
			// 设置请求头带token
			config.headers!['token'] = `${Session.get('token')}`;
		}
		return config;
	},
	(error: AxiosError) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response: AxiosResponse & { config: CustomAxiosRequestConfig }) => {
		// 结构出data和配置
		const { data, config } = response;
		config.loading && tryHideFullScreenLoading();
		// 对响应数据做点什么
		if (data.code && data.code !== 0) {
			// `token` 过期或者账号已在别处登录
			if (data.code === 401 || data.code === 4001) {
				Session.clear(); // 清除浏览器全部临时缓存
				window.location.href = '/'; // 去登录页
				ElMessageBox.alert('你已被登出，请重新登录', '提示', {})
					.then(() => {})
					.catch(() => {});
			}
			return Promise.reject(service.interceptors.response);
		} else {
			return data;
		}
	},
	(error) => {
		// 对响应错误做点什么
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络超时');
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		} else {
			if (error.response.data) ElMessage.error(error.response.statusText);
			else ElMessage.error('接口路径找不到');
		}
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
