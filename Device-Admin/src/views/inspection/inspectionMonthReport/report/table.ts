import { ElTag, ElImage } from 'element-plus';
import { h } from 'vue';
import type { TableCustomColumnData } from '@/hooks';
import { moneyFormat, textFormat, dateFormat } from '@/utils/commonFunction';
import findOption from '@/utils/options'; // 根据value查label
import { useDictionaryStore } from '@/stores';
const dictionaryStore = useDictionaryStore();
//表头数据
export const createTableColumns = (): TableCustomColumnData[] => {
	return [
		{
			title: '设备',
			key: 'deviceName',
			width: 80,
			show: true,
			align: 'center',
			headerAlign: 'center',
		},
		{
			title: '点检项',
			key: 'inspectionPoint',
			show: true,
			tooltip: true,
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
		},
		{
			title: '状态',
			key: 'status',
			show: true,
			tooltip: true,
			minWidth: 500,
			align: 'center',
			headerAlign: 'center',
		},
	];
};
