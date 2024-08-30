import request from '@/api';

/**
 * @name 文件管理模块
 */
// 上传图片
export const uploadImage = (data: Object) => {
	return request({
		url: `/back/business/article/uploadImg`,
		method: 'post',
		data,
		baseURL: import.meta.env.VITE_API_BASE_URL,
		headers: {
			'Content-type': 'multipart/form-data',
		},
	});
};
// 导出兑换码
export const exportCode = (data: Object) => {
	return request({
		url: `/back/business/code/codeExport`,
		method: 'post',
		data,
		baseURL: import.meta.env.VITE_API_BASE_URL,
		responseType: 'blob',
	});
};

// 图片上传
export const uploadImg = (data: Object) => {
	return request({
		url: `/geeker/file/upload/img`,
		method: 'post',
		data,
		headers: {
			'Content-type': 'multipart/form-data',
		},
	});
};
// 视频上传
export const uploadVideo = (data: Object) => {
	return request({
		url: `/geeker/file/upload/video`,
		method: 'post',
		data,
		headers: {
			'Content-type': 'multipart/form-data',
		},
	});
};
