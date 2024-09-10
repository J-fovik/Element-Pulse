import authMenuList from '@/assets/json/authMenuList.json';
import authButtonList from '@/assets/json/authButtonList.json';
import request from '@/api';

/**
 * @name 登录模块
 */
// 用户登录
export const loginApi = (data: object) => {
	return request({
		url: `/geeker/login`,
		method: 'post',
		data,
	});
};

// 用户登录
export const loginFormal = (data: object) => {
	return request({
		url: `/login`,
		method: 'post',
		data,
		baseURL: import.meta.env.VITE_API_BASE_URL,
	});
};

// 获取权限菜单
export const getAuthMenuListApi = () => {
	// return request({
	// 	url: `/geeker/menu/list`,
	// 	method: 'get',
	// 	data,
	// });
	return authMenuList;
};
// 获取权限按钮
export const getAuthButtonListApi = () => {
	// return request({
	//   url: `/geeker+ /auth/buttons`,
	//   method: "get",
	//   data
	// });
	return authButtonList;
};
