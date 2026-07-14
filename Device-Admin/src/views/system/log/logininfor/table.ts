import { ElTag, ElImage } from 'element-plus';
import { h } from 'vue';
import type { TableCustomColumnData } from '@/hooks';
import { moneyFormat, textFormat, dateFormat } from '@/utils/commonFunction';
import findOption from '@/utils/options'; // 根据value查label
import { useDictionaryStore } from '@/stores';
const dictionaryStore = useDictionaryStore();

// 定义表头数据
export const createTableColumns = (): TableCustomColumnData[] => {
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
			minWidth: 120,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.userName);
			},
		},
		{
			title: '用户昵称',
			key: 'nickName',
			show: true,
			minWidth: 120,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.nickName);
			},
		},
		{
			title: '所属部门',
			key: 'deptName',
			show: true,
			minWidth: 100,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.deptName);
			},
		},
		{
			title: '地址',
			key: 'ipaddr',
			show: true,
			width: 130,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.ipaddr);
			},
		},
		{
			title: '登录状态',
			key: 'status',
			show: true,
			width: 100,
			align: 'center',
			headerAlign: 'center',
		},
		{
			title: '描述',
			key: 'msg',
			show: true,
			minWidth: 180,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.msg);
			},
		},
		{
			title: '访问时间',
			key: 'accessTime',
			show: true,
			minWidth: 180,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.accessTime);
			},
		},
	];
};
