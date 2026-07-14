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
			title: '配置编码',
			key: 'configTypeCode',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.configTypeCode);
			},
		},
		{
			title: '配置名称',
			key: 'configTypeName',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.configTypeName);
			},
		},
		{
			title: '配置描述',
			key: 'configTypeDesc',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.configTypeDesc);
			},
		},
		{
			title: '第一栏',
			key: 'columnOne',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.columnOne);
			},
		},
		{
			title: '第二栏',
			key: 'columnTwo',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.columnTwo);
			},
		},
		{
			title: '第三栏',
			key: 'columnThree',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.columnThree);
			},
		},
		{
			title: '第四栏',
			key: 'columnFour',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.columnFour);
			},
		},
		{
			title: '第五栏',
			key: 'columnFive',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.columnFive);
			},
		},
		{
			title: '第六栏',
			key: 'columnSix',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.columnSix);
			},
		},
		{
			title: '第七栏',
			key: 'columnSeven',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.columnSeven);
			},
		},
		{
			title: '第八栏',
			key: 'columnEight',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.columnEight);
			},
		},
		{
			title: '第九栏',
			key: 'columnNine',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.columnNine);
			},
		},
		{
			title: '第十栏',
			key: 'columnTen',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.columnTen);
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
