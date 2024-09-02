import { defineStore } from 'pinia';

export const useKeepAliveStore = defineStore(`keepAlive`, () => {
	const keepAliveName = ref([] as any);
	const addKeepAliveName = async (name: string) => {
		!keepAliveName.value.includes(name) && keepAliveName.value.push(name);
	};
	// 删除缓存
	const removeKeepAliveName = async (name: string) => {
		keepAliveName.value = keepAliveName.value.filter((item) => item !== name);
	};
	// 设置缓存
	const setKeepAliveName = async (keepAliveName: any) => {
		keepAliveName.value = keepAliveName;
	};
	return {
		keepAliveName,
		addKeepAliveName,
		removeKeepAliveName,
		setKeepAliveName,
	};
});
