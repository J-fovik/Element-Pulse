import { ElTag, ElImage } from 'element-plus';
import { h } from 'vue';
import type { TableCustomColumnData } from '@/hooks';
import { moneyFormat, textFormat, dateFormat } from '@/utils/commonFunction';
import findOption from '@/utils/options'; // 根据value查label

// 定义表头数据
export const createTableColumns = (): TableCustomColumnData[] => {
	return [
		{
			title: '设备名称',
			key: 'device_name',
			show: true,
			width: 160,
			tooltip: true,
			align: 'left',
			headerAlign: 'left',
			formatter: (record) => {
				return textFormat(record.device_name);
			},
		},
		{
			title: '点检部位',
			key: 'inspection_point',
			show: true,
			minWidth: 160,
			tooltip: true,
			align: 'left',
			headerAlign: 'left',
			formatter: (record) => {
				if (record.inspection_pointt) {
					return textFormat(`${record.inspection_point}（${record.inspection_pointt}）`);
				}
				return textFormat(record.inspection_point);
			},
		},
		{
			title: '标准',
			key: 'judgment_standard',
			show: true,
			minWidth: 220,
			align: 'left',
			tooltip: true,
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.judgment_standard);
			},
		},
		{
			title: '定量范围',
			key: 'quantitatives',
			show: true,
			minWidth: 220,
			align: 'left',
			tooltip: true,
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.quantitatives);
			},
		},
		{
			title: '方法',
			key: 'inspection_methods',
			show: true,
			minWidth: 180,
			align: 'left',
			headerAlign: 'left',
			formatter: (record) => {
				return textFormat(record.inspection_methods);
			},
		},
		{
			title: '周期',
			key: 'inspection_cycle',
			show: true,
			width: 50,
			align: 'left',
			headerAlign: 'left',
			formatter: (record) => {
				return textFormat(record.inspection_cycle);
			},
		},
		{
			title: '周期类型',
			key: 'inspection_cycleunit',
			show: true,
			tooltip: true,
			width: 80,
			align: 'left',
			headerAlign: 'left',
			formatter: (record) => {
				return textFormat(record.inspection_cycleunit);
			},
		},
		{
			title: '开始时间点',
			key: 'cycle_starttime',
			show: true,
			tooltip: true,
			width: 80,
			align: 'left',
			headerAlign: 'left',
			formatter: (record) => {
				return textFormat(record.cycle_starttime);
			},
		},
		{
			title: '结束时间点',
			key: 'cycle_endtime',
			show: true,
			tooltip: true,
			width: 80,
			align: 'left',
			headerAlign: 'left',
			formatter: (record) => {
				return textFormat(record.cycle_endtime);
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
