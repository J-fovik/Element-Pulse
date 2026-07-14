import { ElTag, ElImage } from 'element-plus';
import { h } from 'vue';
import type { TableCustomColumnData } from '@/hooks';
import { moneyFormat, textFormat, dateFormat } from '@/utils/commonFunction';
import findOption from '@/utils/options'; // 根据value查label
import { useDictionaryStore } from '@/stores';
const dictionaryStore = useDictionaryStore();
//仓库表头数据
export const createStoreTableColumns = (): TableCustomColumnData[] => {
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
			title: '物料编码',
			key: 'materialCode',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.materialCode);
			},
		},
		{
			title: '名称',
			key: 'materialName',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.materialName);
			},
		},
		{
			title: '型号',
			key: 'spec',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.spec);
			},
		},
		{
			title: '数量',
			key: 'quantity',
			show: true,
			tooltip: true,
			minWidth: 80,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				// 使用 h 函数创建多色文本
				return h('span', [
					// 红色数字部分
					h('span', { style: { color: '#f56c6c', fontWeight: 'bold' } }, record.quantity),
					// record.unit
					// 	? h(
					// 			'span',
					// 			{ style: { color: '#909399', marginLeft: '4px' } },
					// 			textFormat(record.unit),
					// 		)
					// 	: null,
				]);
			},
		},
		{
			title: '计量单位',
			key: 'unit',
			show: true,
			tooltip: true,
			width: 80,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.unit);
			},
		},
		{
			title: '仓库',
			key: 'storeName',
			show: true,
			tooltip: true,
			minWidth: 80,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return h(
					ElTag,
					{ type: 'success' },
					{ default: () => textFormat(record.storeName) },
				);
			},
		},
		{
			title: '供应商',
			key: 'supplierName',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return h(
					ElTag,
					{ type: 'warning' },
					{ default: () => textFormat(record.supplierName) },
				);
			},
		},
	];
};
// 入库表头数据
export const createInboundTableColumns = (): TableCustomColumnData[] => {
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
			title: '物料编码',
			key: 'materialCode',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.materialCode);
			},
		},
		{
			title: '名称',
			key: 'materialName',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.materialName);
			},
		},
		{
			title: '型号',
			key: 'spec',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.spec);
			},
		},
		{
			title: '数量',
			key: 'quantity',
			show: true,
			tooltip: true,
			minWidth: 80,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				// 使用 h 函数创建多色文本
				return h('span', [
					// 红色数字部分
					h('span', { style: { color: '#f56c6c', fontWeight: 'bold' } }, record.quantity),
					// record.unit
					// 	? h(
					// 			'span',
					// 			{ style: { color: '#909399', marginLeft: '4px' } },
					// 			textFormat(record.unit),
					// 		)
					// 	: null,
				]);
			},
		},
		{
			title: '计量单位',
			key: 'unit',
			show: true,
			tooltip: true,
			width: 80,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.unit);
			},
		},
		{
			title: '仓库',
			key: 'storeName',
			show: true,
			tooltip: true,
			minWidth: 80,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return h(
					ElTag,
					{ type: 'success' },
					{ default: () => textFormat(record.storeName) },
				);
			},
		},
		{
			title: '供应商',
			key: 'supplierName',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return h(
					ElTag,
					{ type: 'warning' },
					{ default: () => textFormat(record.supplierName) },
				);
			},
		},
		{
			title: '入库日期',
			key: 'operTime',
			show: true,
			tooltip: true,
			minWidth: 180,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.operTime);
			},
		},
		{
			title: '关联采购单',
			key: 'documentCode',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return h(
					ElTag,
					{ type: 'danger' },
					{ default: () => textFormat(record.documentCode) },
				);
			},
		},
	];
};
// 出库表头数据
export const createOutboundTableColumns = (): TableCustomColumnData[] => {
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
			title: '物料编码',
			key: 'materialCode',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.materialCode);
			},
		},
		{
			title: '名称',
			key: 'materialName',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.materialName);
			},
		},
		{
			title: '型号',
			key: 'spec',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.spec);
			},
		},
		{
			title: '数量',
			key: 'quantity',
			show: true,
			tooltip: true,
			minWidth: 80,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				// 使用 h 函数创建多色文本
				return h('span', [
					// 红色数字部分
					h('span', { style: { color: '#f56c6c', fontWeight: 'bold' } }, record.quantity),
					// record.unit
					// 	? h(
					// 			'span',
					// 			{ style: { color: '#909399', marginLeft: '4px' } },
					// 			textFormat(record.unit),
					// 		)
					// 	: null,
				]);
			},
		},
		{
			title: '计量单位',
			key: 'unit',
			show: true,
			tooltip: true,
			width: 80,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.unit);
			},
		},
		{
			title: '仓库',
			key: 'storeName',
			show: true,
			tooltip: true,
			minWidth: 80,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return h(
					ElTag,
					{ type: 'success' },
					{ default: () => textFormat(record.storeName) },
				);
			},
		},
		{
			title: '供应商',
			key: 'supplierName',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return h(
					ElTag,
					{ type: 'warning' },
					{ default: () => textFormat(record.supplierName) },
				);
			},
		},
		{
			title: '出库日期',
			key: 'operTime',
			show: true,
			tooltip: true,
			minWidth: 180,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.operTime);
			},
		},
		{
			title: '关联工单',
			key: 'documentCode',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return h(
					ElTag,
					{ type: 'danger' },
					{ default: () => textFormat(record.documentCode) },
				);
			},
		},
		{
			title: '领用部门',
			key: 'departName',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.departName);
			},
		},
	];
};
// 预警表头数据
export const createWarningTableColumns = (): TableCustomColumnData[] => {
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
			title: '物料编码',
			key: 'materialCode',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.materialCode);
			},
		},
		{
			title: '名称',
			key: 'materialName',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.materialName);
			},
		},
		{
			title: '型号',
			key: 'spec',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.spec);
			},
		},
		{
			title: '当前库存',
			key: 'quantity',
			show: true,
			tooltip: true,
			minWidth: 80,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return h('span', [
					// 红色数字部分
					h('span', { style: { color: '#f56c6c', fontWeight: 'bold' } }, record.quantity),
					// record.unit
					// 	? h(
					// 			'span',
					// 			{ style: { color: '#909399', marginLeft: '4px' } },
					// 			textFormat(record.unit),
					// 		)
					// 	: null,
				]);
			},
		},
		{
			title: '安全阈值',
			key: 'safeQuantity',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return h('span', [
					// 红色数字部分
					h(
						'span',
						{ style: { color: '#f56c6c', fontWeight: 'bold' } },
						record.safeQuantity,
					),
					// record.unit
					// 	? h(
					// 			'span',
					// 			{ style: { color: '#909399', marginLeft: '4px' } },
					// 			textFormat(record.unit),
					// 		)
					// 	: null,
				]);
			},
		},
		{
			title: '计量单位',
			key: 'unit',
			show: true,
			tooltip: true,
			width: 80,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.unit);
			},
		},
		{
			title: '仓库',
			key: 'storeName',
			show: true,
			tooltip: true,
			minWidth: 80,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return h(
					ElTag,
					{ type: 'success' },
					{ default: () => textFormat(record.storeName) },
				);
			},
		},
		{
			title: '供应商',
			key: 'supplierName',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return h(
					ElTag,
					{ type: 'warning' },
					{ default: () => textFormat(record.supplierName) },
				);
			},
		},
		{
			title: '预警级别',
			key: 'warnLevel',
			show: true,
			align: 'center',
			tooltip: true,
			headerAlign: 'center',
			width: 90,
			formatter: (record) => {
				const cur = dictionaryStore.getDictionaryItem('warning_level', record.warnLevel);
				return h(ElTag, { type: cur.listClass }, { default: () => textFormat(cur.label) });
			},
		},
		// {
		// 	title: '预警时间',
		// 	key: 'operTime',
		// 	show: true,
		// 	tooltip: true,
		// 	minWidth: 180,
		// 	align: 'center',
		// 	headerAlign: 'center',
		// 	formatter: (record) => {
		// 		return textFormat(record.operTime);
		// 	},
		// },
	];
};
