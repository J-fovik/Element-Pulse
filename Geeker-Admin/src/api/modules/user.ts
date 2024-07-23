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
// 用户树形列表
export const getUserTreeList = (data: Object) => {
	return request({
		url: `/geeker/user/tree/list`,
		method: 'post',
		data,
	});
};
// 添加用户
export const addUser = (data: Object) => {
	return request({
		url: `/geeker/user/add`,
		method: 'post',
		data,
	});
};
// 批量添加用户
export const BatchAddUser = (data: Object) => {
	return request({
		url: `/geeker/user/import`,
		method: 'post',
		data,
	});
};

// 编辑用户
export const editUser = (data: Object) => {
	return request({
		url: `/geeker/user/edit`,
		method: 'post',
		data,
	});
};

// 删除用户
export const deleteUser = (data: Object) => {
	return request({
		url: `/geeker/user/delete`,
		method: 'post',
		data,
	});
};

// 切换用户状态
export const changeUserStatus = (data: Object) => {
	return request({
		url: `/geeker/user/change`,
		method: 'post',
		data,
	});
};

// 重置用户密码
export const resetUserPassWord = (data: Object) => {
	return request({
		url: `/geeker/user/rest_password`,
		method: 'post',
		data,
	});
};

// 导出用户数据
export const exportUserInfo = (data: Object) => {
	return request({
		url: `/geeker/user/export`,
		method: 'post',
		data,
		responseType: 'blob',
	});
};

// 获取用户状态字典
export const getUserStatus = () => {
	return request({
		url: `/geeker/user/status`,
		method: 'get',
	});
};

// 获取用户性别字典
export const getUserGender = () => {
	return request({
		url: `/geeker/user/gender`,
		method: 'get',
	});
};

// 获取用户部门列表
export const getUserDepartment = () => {
	return request({
		url: `/geeker/user/department`,
		method: 'get',
	});
};

// 获取用户角色字典
export const getUserRole = () => {
	return request({
		url: `/geeker/user/role`,
		method: 'get',
	});
};
