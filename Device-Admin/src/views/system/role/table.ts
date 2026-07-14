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
			title: '角色名称',
			key: 'roleName',
			show: true,
			minWidth: 180,
			tooltip: true,
			align: 'left',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.roleName);
			},
		},
		{
			title: '权限字符',
			key: 'roleKey',
			show: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.roleKey);
			},
		},
		{
			title: '显示顺序',
			key: 'roleSort',
			show: true,
			width: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return record.roleSort;
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
			width: 70,
			key: 'operate',
			show: true,
			align: 'center',
		},
	];
};
