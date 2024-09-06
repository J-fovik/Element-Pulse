// 定义表头数据
import type { TableCustomColumnData } from '@/hooks';

export const columns: TableCustomColumnData[] = [
	{
		title: '名称',
		key: 'label',
		show: true,
		align: 'center',
	},
	{
		title: '类型',
		key: 'type',
		show: true,
		align: 'center',
	},
	{
		title: '开始时间',
		key: 'startTime',
		show: true,
		align: 'center',
	},
	{
		title: '结束时间',
		key: 'endTime',
		show: true,
		align: 'center',
	},
	{
		title: '操作',
		key: 'operate',
		show: true,
		width: 100,
		align: 'center',
	},
];
