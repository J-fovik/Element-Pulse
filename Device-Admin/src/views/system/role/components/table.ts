import { ElTag, ElImage } from 'element-plus';
import { h } from 'vue';
import type { TableCustomColumnData } from '@/hooks';
import { moneyFormat, textFormat, dateFormat } from '@/utils/commonFunction';
import findOption from '@/utils/options'; // 根据value查label

// 分配用户
export const assignUsersTableColumns = (): TableCustomColumnData[] => {
	return [
		{
			title: '序号',
			key: 'sortTableNo',
			width: 80,
			show: true,
			align: 'center',
			headerAlign: 'center',
		},
		{
			title: '用户名称',
			key: 'userName',
			show: true,
			minWidth: 180,
			tooltip: true,
			align: 'left',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.userName);
			},
		},
		{
			title: '用户昵称',
			key: 'nickName',
			show: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.nickName);
			},
		},
		{
			title: '邮箱',
			key: 'email',
			show: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.email);
			},
		},
		{
			title: '手机',
			key: 'phonenumber',
			show: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.phonenumber);
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
			title: '操作',
			fixed: 'right',
			width: 100,
			key: 'operate',
			show: true,
			align: 'center',
		},
	];
};

// 选择用户
export const selectUsersTableColumns = (): TableCustomColumnData[] => {
	return [
		{
			title: '序号',
			key: 'sortTableNo',
			width: 80,
			show: true,
			align: 'center',
			headerAlign: 'center',
		},
		{
			title: '用户名称',
			key: 'userName',
			show: true,
			minWidth: 180,
			tooltip: true,
			align: 'left',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.userName);
			},
		},
		{
			title: '用户昵称',
			key: 'nickName',
			show: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.nickName);
			},
		},
		{
			title: '邮箱',
			key: 'email',
			show: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.email);
			},
		},
		{
			title: '手机',
			key: 'phonenumber',
			show: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.phonenumber);
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
			title: '操作',
			fixed: 'right',
			width: 100,
			key: 'operate',
			show: true,
			align: 'center',
		},
	];
};
