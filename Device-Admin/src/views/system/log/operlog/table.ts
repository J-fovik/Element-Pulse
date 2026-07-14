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
			title: '系统模块',
			key: 'title',
			show: true,
			minWidth: 120,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.title);
			},
		},
		{
			title: '操作类型',
			key: 'businessType',
			show: true,
			align: 'center',
			tooltip: true,
			headerAlign: 'center',
			width: 90,
			// formatter: (record) => {
			// 	const cur = dictionaryStore.getDictionaryItem('sys_oper_type', record.businessType);
			// 	return cur.label;
			// },
			formatter: (record) => {
				const cur = dictionaryStore.getDictionaryItem('sys_oper_type', record.businessType);
				return h(ElTag, { type: 'success' }, { default: () => textFormat(cur.label) });
			},
		},
		{
			title: '请求方式',
			key: 'requestMethod',
			show: true,
			tooltip: true,
			align: 'center',
			width: 80,
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.requestMethod);
			},
		},
		{
			title: '操作账户',
			key: 'operName',
			show: true,
			width: 100,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.operName);
			},
		},
		{
			title: '操作人员',
			key: 'nickName',
			show: true,
			align: 'center',
			tooltip: true,
			width: 100,
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.nickName);
			},
		},
		{
			title: '所属部门',
			key: 'sysDeptName',
			show: true,
			minWidth: 100,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.sysDeptName);
			},
		},
		{
			title: '主机',
			key: 'operIp',
			show: true,
			width: 130,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.operIp);
			},
		},
		{
			title: '操作状态',
			key: 'status',
			show: true,
			width: 100,
			align: 'center',
			headerAlign: 'center',
		},
		{
			title: '操作日期',
			key: 'operTime',
			show: true,
			minWidth: 180,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.operTime);
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
