import authMenuList from '@/assets/json/authMenuList.json';
import authButtonList from '@/assets/json/authButtonList.json';
import request from '@/api';

/**
 * @name 登录模块
 */
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
