<template>
	<div class="card container">
		<span class="text"> 我是 Tab 详情页 🍓🍇🍈🍉</span>
		<span class="text">params:{{ route.params }}</span>
		<el-input v-model="value" placeholder="测试详情页缓存"></el-input>
		<el-button @click="jumpTabName()">返回</el-button>
	</div>
</template>

<script setup lang="ts" name="tabsDetail">
import { useTabsStore } from '@/stores';
const route = useRoute();
const { jumpTabName, setTabsTitle } = useTabsStore();
setTabsTitle(`No.${route.params.id} - ${route.meta.title}`);
const value = ref('');
</script>
