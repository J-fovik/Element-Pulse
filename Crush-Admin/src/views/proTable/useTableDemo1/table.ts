import { ElTag, ElImage } from 'element-plus';
import { h } from 'vue';
import type { TableCustomColumnData } from '@/hooks';
import { moneyFormat, textFormat, scaleFormat, dateFormat } from '@/utils/commonFunction';
import findOption from '@/utils/options'; // 根据value查label
import { ALL_TYPE_OPTIONS } from './options';

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
			title: '名称',
			key: 'name',
			show: true,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.name);
			},
		},
		{
			title: 'ID',
			key: 'id',
			show: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return h(ElTag, { type: 'success' }, { default: () => textFormat(record.id) });
			},
		},
		{
			title: '状态',
			width: 100,
			slotName: 'status',
			key: 'status',
			show: true,
			align: 'center',
		},
		{
			title: '金额',
			key: 'money',
			show: true,
			align: 'right',
			headerAlign: 'center',
			formatter: (record) => {
				return h('span', { class: 'text-red text-price' }, moneyFormat(record.money, '0'));
			},
		},
		{
			title: '类型',
			key: 'type',
			show: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(findOption(ALL_TYPE_OPTIONS, record.type)?.label);
			},
		},
		{
			title: '地点',
			key: 'address',
			show: true,
			tooltip: true,
			align: 'center',
			formatter: (record) => {
				return textFormat(record.address);
			},
		},
		{
			title: '日期',
			key: 'date',
			show: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(dateFormat(record.date, 'YYYY-MM-DD'));
			},
		},
		{
			title: '图片',
			width: 120,
			key: 'image',
			show: true,
			align: 'center',
			formatter: (record) => {
				return record.image
					? h(ElImage, {
							src: record.image,
							previewSrcList: [record.image],
							width: 100,
					  })
					: '-';
			},
		},
		{
			title: '操作',
			fixed: 'right',
			width: 300,
			key: 'operate',
			show: true,
			align: 'center',
		},
	];
};
