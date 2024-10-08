import { ElMessage } from 'element-plus';
import type { AxiosRequestConfig } from 'axios';
import request from '@/api';
export interface HttpResponse<T = unknown> {
	status: number;
	msg: string;
	code: number;
	data: T;
}

export interface HttpError {
	msg: string;
	code?: number;
	status?: number;
}
/**
 * @description 请求二次封装
 * */
// 二次封装请求
export const curryingRequest = async <T = any>(
	api: () => Promise<any>, // 请求接口
	options?: {
		before?: () => void;
		after?: () => void;
		successMsg?: string;
	}
) => {
	// 默认值
	const params: { res: HttpResponse<T> | null; err: HttpError | null } = {
		res: null,
		err: null,
	};
	// 请求之前
	if (options?.before) options.before();
	// 请求监听 处理错误
	try {
		const res = await api();
		params.res = res as HttpResponse<T>;
	} catch (err: any) {
		params.err = err as HttpError;
	}
	// 请求之后
	if (options?.after) options.after();
	// 请求成功提示
	if (!params.err && options?.successMsg) ElMessage.success(options.successMsg);
	// 返回结果
	return params;
};
export const curryingRequestUrl = async <T = any>(
	requestConfig: AxiosRequestConfig<any>,
	options?: {
		before?: () => void;
		after?: () => void;
		successMsg?: string;
	}
) => {
	// 默认值
	const params: { res: HttpResponse<T> | null; err: HttpError | null } = {
		res: null,
		err: null,
	};
	// 请求前
	if (options?.before) options.before();
	// 请求监听 处理错误
	try {
		const res = await request(requestConfig);
		params.res = res as any as HttpResponse<T>;
	} catch (err: any) {
		params.err = err as HttpError;
	}
	// 请求前
	if (options?.after) options.after();
	// 请求成功提示
	if (!params.err && options?.successMsg) ElMessage.success(options.successMsg);
	// 返回结果
	return params;
};
