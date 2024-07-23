import request from '@/api';

/**
 * @name 文件上传模块
 */
// 图片上传
export const uploadImg = (data: FormData) => {
	return request({
		url: `/geeker/file/upload/img`,
		method: 'post',
		data,
	});
};
// 视频上传
export const uploadVideo = (data: FormData) => {
	return request({
		url: `/geeker/file/upload/video`,
		method: 'post',
		data,
	});
};
