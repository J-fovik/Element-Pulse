import request from '@/api';

/**
 * @name 用户管理模块
 */
// 获取用户列表
export const getUserList = (data: Object) => {
	return request({
		url: `/geeker/user/list`,
		method: 'post',
		data,
	});
};
