/**
 * @description：全部数据筛选
 */
export const ALL_OPTIONS = [
	{
		label: '全部',
		value: '',
	},
];
/**
 * @description：用户性别
 */
export const SEX_OPTIONS = [
	{ label: '男', value: 1 },
	{ label: '女', value: 2 },
];
/**
 * @description 是否
 */
export const YES_NO_OPTIONS = [
	{
		label: '是',
		value: true,
		numValue: 1, // 未用
		stringValue: '1', // 未用
		tagType: 'success',
		isEnable: '启用',
		key: 'Y',
	},
	{
		label: '否',
		value: false,
		numValue: 0, // 未用
		stringValue: '2', // 未用
		tagType: 'danger',
		isEnable: '禁用',
		key: 'N',
	},
];
/**
 * @description：用户状态
 */
export const OPEN_STATUS = [
	{ label: '启用', value: true, tagType: 'success' },
	{ label: '禁用', value: false, tagType: 'danger' },
];
/**
 * @description 星期
 */
export const WEEK_OPTIONS = [
	{
		label: '一',
		value: '一',
	},
	{
		label: '二',
		value: '二',
	},
	{
		label: '三',
		value: '三',
	},
	{
		label: '四',
		value: '四',
	},
	{
		label: '五',
		value: '五',
	},
	{
		label: '六',
		value: '六',
	},
	{
		label: '日',
		value: '日',
	},
];
// 日报类型
export const reportTypeList = [
	{ label: '日常', value: 1, type: 'success' },
	{ label: '加班', value: 2, type: 'primary' },
];
// 审核状态
export const statusType = [
	{
		label: '待审批',
		value: 0,
		type: 'warning',
	},
	{
		label: '通过',
		value: 1,
		type: 'success',
	},
	{
		label: '拒绝',
		value: 2,
		type: 'danger',
	},
];

// 项目状态 0-已完成，1-进行中，2-暂停，3-待启动
export const projectStatusType = [
	{
		label: '已完成',
		value: 0,
		type: 'success',
		color: '#13CE66',
	},
	{
		label: '进行中',
		value: 1,
		type: '',
		color: '#00B42A',
	},
	{
		label: '已暂停',
		value: 2,
		type: 'danger',
		color: '#FF4949',
	},
	{
		label: '待启动',
		value: 3,
		type: 'info',
		color: '#909399',
	},
];

// 本日:day 本周:week 本月:month
export const timeTypeList = [
	{
		label: '本日',
		value: 'day',
	},
	{
		label: '本周',
		value: 'week',
	},
	{
		label: '本月',
		value: 'month',
	},
	{
		label: '全部',
		value: '',
	},
];
// 优先级 1-高，2-中，3-低
export const priorityTypeList = [
	{
		label: '高',
		value: 1,
	},
	{
		label: '中',
		value: 2,
	},
	{
		label: '低',
		value: 3,
	},
];

// 默认导出，找到匹配的元素
export default (options: Array<any>, value: string) => {
	return options.find((item) => item.value === value);
};
