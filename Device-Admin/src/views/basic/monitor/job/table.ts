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
			title: '任务编号',
			key: 'jobId',
			show: true,
			width: 180,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.jobId);
			},
		},
		{
			title: '任务名称',
			key: 'jobName',
			show: true,
			width: 180,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.jobName);
			},
		},
		{
			title: '任务组名',
			key: 'jobGroup',
			show: true,
			align: 'center',
			tooltip: true,
			headerAlign: 'center',
			width: 90,
			formatter: (record) => {
				const cur = dictionaryStore.getDictionaryItem('sys_job_group', record.jobGroup);
				return h(ElTag, { type: 'success' }, { default: () => textFormat(cur.label) });
			},
		},
		{
			title: '调用目标字符串',
			key: 'invokeTarget',
			show: true,
			minWidth: 180,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.invokeTarget);
			},
		},
		{
			title: 'cron执行表达式',
			key: 'cronExpression',
			show: true,
			minWidth: 180,
			align: 'center',
			headerAlign: 'center',
			formatter: (record) => {
				return textFormat(record.cronExpression);
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
			title: '操作',
			fixed: 'right',
			width: 70,
			key: 'operate',
			show: true,
			align: 'center',
		},
	];
};
