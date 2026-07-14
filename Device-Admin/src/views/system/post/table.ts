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
			title: '岗位编号',
			key: 'postId',
			show: true,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.postId);
			},
		},
		{
			title: '岗位编码',
			key: 'postCode',
			show: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.postCode);
			},
		},
		{
			title: '岗位名称',
			key: 'postName',
			show: true,
			minWidth: 80,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.postName);
			},
		},
		{
			title: '岗位排序',
			key: 'postSort',
			show: true,
			minWidth: 70,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return record.postSort;
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
			width: 180,
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
			width: 180,
			align: 'center',
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
