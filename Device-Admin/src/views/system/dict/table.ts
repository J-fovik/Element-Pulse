import { ElTag, ElImage } from 'element-plus';
import { h } from 'vue';
import type { TableCustomColumnData } from '@/hooks';
import { moneyFormat, textFormat, dateFormat } from '@/utils/commonFunction';
import findOption from '@/utils/options'; // 根据value查label

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
			title: '字典名称',
			key: 'dictName',
			show: true,
			minWidth: 180,
			tooltip: true,
			align: 'left',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.dictName);
			},
		},
		{
			title: '字典类型',
			key: 'dictType',
			show: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.dictType);
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
			title: '备注',
			key: 'remark',
			show: true,
			tooltip: true,
			minWidth: 180,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.remark);
			},
		},
		{
			title: '创建时间',
			key: 'createTime',
			show: true,
			width: 180,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.createTime);
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
