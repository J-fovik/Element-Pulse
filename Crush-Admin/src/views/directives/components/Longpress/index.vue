<template>
	<div>
		<el-alert
			class="mb10"
			title="使用方式：v-longpress='fn'"
			type="success"
			:closable="false"
		/>
		<el-button v-longpress="longpress" type="primary">长按触发</el-button>
	</div>
</template>

<script setup lang="ts" name="Longpress">
import { ElMessage } from 'element-plus';
// 双击触发事件
const longpress = () => {
	ElMessage.success('我是长按触发的事件 🍍🍓🍌');
};
</script>
