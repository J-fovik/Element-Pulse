<template>
	<div style="display: flex">
		<TestCom style="width: 500px" :data="list" :value="defaultValue" @change="changeValue"></TestCom>
		<div>右侧数据：{{ defaultValue }}</div>
	</div>
</template>
<script setup lang="ts" name="systemUser">
const list = ref([
	{ title: '类型1', children: ['name1', 'name2', 'name3'] },
	{ title: '类型2', children: ['name4', 'name5', 'name6'] },
	{ title: '类型3', children: ['name7', 'name8', 'name9'] },
]);
const detailObj = ref({});
const defaultValue = ref('');
const changeValue = (e: any) => {
	defaultValue.value = e;
};
// 定义个方法
const getDetail = (id: any) => {
	// 请求数据
	// detailObj.value=res.data
};
//
const gatListFn = () => {
	// 请求列表数据
	// list.value = res.data;
};
</script>
