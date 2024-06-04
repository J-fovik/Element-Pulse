<template>
	<div class="layout-padding">
		<div class="layout-padding-auto layout-padding-view">
			<div class="flex-margin color-primary">
				<div>paramsDynamicDetails</div>
				<div class="mt10 mb10">路径：path: {{ route.path }}</div>
				<div>参数：params: {{ route.params }}</div>
			</div>
		</div>
		<el-button @click="router.back()">返回</el-button>
	</div>
</template>

<script setup lang="ts" name="paramsDynamicDetails">
import { useRoute, useRouter } from 'vue-router';
// 定义变量内容
const route = useRoute();
const router = useRouter();
</script>
