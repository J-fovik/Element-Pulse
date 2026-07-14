import { defineStore } from 'pinia';
import { useBasicsMap, URL, curryingRequest, curryingRequestUrl } from '@/hooks';

/**
 * @name 字典仓库
 */
export const useDictionaryStore = defineStore('dictionary', () => {
	// 字典信息
	const { basicsMap, hasValue, getValue, addValue } = useBasicsMap<Array<any>>([]);
	// 增加 loading 状态锁，防止重复请求
	let isLoaded = false;
	// 获取参数
	const initData = async () => {
		// 如果已经加载过，直接返回
		if (isLoaded) return;
		isLoaded = true;
		const { res, err } = await curryingRequestUrl({
			url: URL.PUBLIC.QUERY_DICT_DATA_LIST,
			params: {
				pageNum: 1,
				pageSize: 10000,
			},
			method: 'get',
		});
		if (err) {
			isLoaded = false; // 请求失败重置状态，允许下次重试
			return;
		}
		// // 循环添加map数据
		let list = res?.data.list;
		list.sort((a: any, b: any) => a?.dictSort - b?.dictSort)?.forEach((item: any) => {
			// 在每个对象中添加value属性
			item.value = item?.dictValue;
			item.label = item?.dictLabel;
			item.listClass = ['default', '', 'primary'].includes(item?.listClass)
				? 'primary'
				: item?.listClass;
			// item.
			if (hasValue(item.dictType)) {
				const dictionaryList = getValue(item.dictType) as Array<any>;
				basicsMap.value.set(item.dictType, [...dictionaryList, item]);
			} else {
				addValue(item.dictType, [item]);
			}
		});
	};
	/**
	 * 根据分类分组的值找到该数组，再根据具体的值找到该对象
	 * @param key 分组分类的值
	 * @param value 具体的值
	 * @returns
	 */
	const getDictionaryItem = (key: string, value: any): any => {
		return (
			getValue(key)?.find((item) => {
				return item.value == value;
			}) ?? {}
		);
	};
	// 初始化
	initData();
	// 暴露API
	return {
		initData,
		getDictionaryInfo: getValue, // 传入分类分组的值 即可获取分类数组
		getDictionaryItem,
	};
});
