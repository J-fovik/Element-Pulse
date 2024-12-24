import { defineStore } from 'pinia';
import { useBasicsMap, curryingRequest } from '@/hooks';

/**
 * @name 字典仓库
 */
export const useDictionaryStore = defineStore('dictionary', () => {
	// 字典信息
	const { basicsMap, hasValue, getValue, addValue } = useBasicsMap<Array<any>>([]);
	// 获取参数
	const initData = async () => {
		// const { res } = await curryingRequest(() => getDictionaryList({}));
		// // 循环添加map数据
		const list = [
			{ name: 'aaa', type: 'A', code: '111', sort: 1 },
			{ name: 'bbb', type: 'B', code: '222', sort: 2 },
			{ name: 'ccc', type: 'C', code: '333', sort: 4 },
			{ name: 'ddd', type: 'A', code: '444', sort: 3 },
			{ name: 'eee', type: 'B', code: '444', sort: 5 },
		];
		list?.sort((a: any, b: any) => a?.sort - b?.sort)?.forEach((item: any) => {
			// 在每个对象中添加value属性
			item.value = item?.code;
			item.label = item?.name;
			if (hasValue(item.type)) {
				const dictionaryList = getValue(item.type) as Array<any>;
				basicsMap.value.set(item.type, [...dictionaryList, item]);
			} else {
				addValue(item.type, [item]);
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
				return item.value === value;
			}) ?? {}
		);
	};
	// 初始化
	initData();
	// 暴露API
	return {
		getDictionaryInfo: getValue, // 传入分类分组的值 即可获取分类数组
		getDictionaryItem,
	};
});
