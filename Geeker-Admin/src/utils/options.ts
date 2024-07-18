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
export const GENDER_TYPDS = [
	{ label: '男', value: 1 },
	{ label: '女', value: 2 },
];

/**
 * @description：用户状态
 */
export const USER_STATUS = [
	{ label: '启用', value: 1, tagType: 'success' },
	{ label: '禁用', value: 0, tagType: 'danger' },
];
// 默认导出，找到匹配的元素
export default (options: Array<any>, value: string) => {
	return options.find((item) => item.value === value);
};
