/**
 * @name 公共options数据
 */

/**
 * @description 全部数据筛选
 */
export const ALL_OPTIONS = [
	{
		label: '全部',
		value: '',
	},
];
/**
 * @description 用户性别
 */
export const GENDER_TYPES = [
	{ label: '男', value: 1 },
	{ label: '女', value: 2 },
];

/**
 * @description 用户状态
 */
export const USER_STATUS = [
	{ label: '启用', value: 1, tagType: 'success' },
	{ label: '禁用', value: 0, tagType: 'danger' },
];

/**
 * @description 专业
 */
export const MAJOR_OPTIONS = [
	'哲学',
	'经济学',
	'法学',
	'教育学',
	'文学',
	'历史学',
	'理学',
	'工学',
	'农学',
	'医学',
	'军事学',
	'管理学',
	'其他',
].map((item) => ({
	label: item,
	value: item,
}));

/**
 * 默认导出，找到匹配的元素
 * @returns {Object | null} 找出第一个符合条件的成员
 */
export default (options: Array<any>, value: string) => {
	return options.find((item) => item.value === value);
};
