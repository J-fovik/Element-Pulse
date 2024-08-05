<template>
	<div>
		<el-alert
			class="mb10"
			title="使用方式：v-debounce='fn' 或 v-debounce：5000='fn'"
			type="success"
			:closable="false"
		/>
		<el-button v-debounce="debounceClick" type="primary">
			防抖按钮（默认500毫秒后执行）
		</el-button>
		<el-button v-debounce:5000="debounceClick" type="primary">
			防抖按钮 (5000毫秒后执行)
		</el-button>
	</div>
</template>

<script setup lang="ts" name="Debounce">
import { ElMessage } from 'element-plus';
const debounceClick = () => {
	ElMessage.success('我是防抖按钮触发的事件 🍍🍓🍌');
};
</script>
