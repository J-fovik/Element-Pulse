<template>
	<div class="layout-padding">
		<div class="layout-padding-auto layout-padding-view">
			<div class="flex-margin color-primary">
				<div>paramsCommonDetails</div>
				<div class="mt10 mb10">路径：path: {{ route.path }}</div>
				<div>参数：query: {{ route.query }}</div>
			</div>
		</div>
		<el-button @click="jumpTabName()">返回</el-button>
	</div>
</template>

<script setup lang="ts" name="paramsCommonDetails">
import { useRoute } from 'vue-router';
import { useTabStore } from '/@/stores/jumpTab';
const { jumpTabName } = useTabStore();
// 定义变量内容
const route = useRoute();

// 对象或数组JSON转换：JSON.parse(route.query.other as any)

</script>
