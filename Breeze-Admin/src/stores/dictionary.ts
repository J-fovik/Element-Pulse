import { defineStore } from 'pinia';
import { useBasicsMap, curryingRequest } from '/@/hooks';
// 字典仓库
export const useDictionaryStore = defineStore('dictionary', () => {
	// 字典信息
	const { basicsMap, hasValue, getValue, addValue } = useBasicsMap<Array<any>>([]);
	// 获取参数
	const initData = async () => {
		// const { res } = await curryingRequest(() => getDictionaryList({}));
		// // 循环添加map数据
		const list = [
			{ label: 'aaa', type: 'A', value: '111' },
			{ label: 'bbb', type: 'B', value: '222' },
			{ label: 'ccc', type: 'C', value: '333' },
			{ label: 'ddd', type: 'A', value: '444' },
			{ label: 'eee', type: 'B', value: '444' },
		];
		list.forEach((item: any) => {
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
