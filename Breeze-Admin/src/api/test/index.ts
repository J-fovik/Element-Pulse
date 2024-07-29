import request from '/@/utils/request';

export const getTableList=(data?: object)=>{
	return request({
		url: '/api/v1/admin/vocation/getVocationList',
		method: 'post',
		data,
	});
}