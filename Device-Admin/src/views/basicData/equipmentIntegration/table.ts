import { ElTag, ElImage } from 'element-plus';
import { h } from 'vue';
import type { TableCustomColumnData } from '@/hooks';
import { moneyFormat, textFormat, dateFormat } from '@/utils/commonFunction';
import findOption from '@/utils/options'; // 根据value查label

// 定义表头数据
export const createTableColumns = (): TableCustomColumnData[] => {
	return [
		{
			title: '员工编号',
			key: 'userName',
			show: true,
			width: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.userName);
			},
		},
		{
			title: '员工姓名',
			key: 'nickName',
			show: true,
			width: 100,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.nickName);
			},
		},
		{
			title: '用户部门',
			key: 'deptName',
			show: true,
			width: 120,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.deptName);
			},
		},
		{
			title: '手机号码',
			key: 'phonenumber',
			show: true,
			width: 120,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.phonenumber);
			},
		},
		{
			title: '岗位',
			key: 'postName',
			show: true,
			tooltip: true,
			minWidth: 120,
			align: 'left',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.postName);
			},
		},
		{
			title: '角色',
			key: 'roleName',
			show: true,
			minWidth: 120,
			align: 'left',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.roleName);
			},
		},
		{
			title: '状态',
			key: 'status',
			show: true,
			align: 'center',
			headerAlign: 'center',
		},
		{
			title: '创建时间',
			key: 'createTime',
			show: true,
			minWidth: 180,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.createTime);
			},
		},
		{
			title: '备注',
			key: 'remark',
			show: true,
			tooltip: true,
			minWidth: 180,
			align: 'left',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.remark);
			},
		},
		{
			title: '操作',
			fixed: 'right',
			width: 70,
			key: 'operate',
			show: true,
			align: 'center',
		},
	];
};
