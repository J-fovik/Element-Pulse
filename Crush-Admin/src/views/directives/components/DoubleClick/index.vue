<template>
	<div>
		<el-alert
			class="mb10"
			title="使用方式：v-doubleClick='fn'"
			type="success"
			:closable="false"
		/>
		<el-button v-doubleClick="doubleClick" type="primary">双击触发</el-button>
	</div>
</template>

<script setup lang="ts" name="DoubleClick">
import { ElMessage } from 'element-plus';
// 双击触发事件
const doubleClick = () => {
	ElMessage.success('我是双击触发的事件 🍍🍓🍌');
};
</script>
