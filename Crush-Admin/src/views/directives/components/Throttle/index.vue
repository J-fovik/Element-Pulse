<template>
	<div>
		<el-alert
			class="mb10"
			title="使用方式：v-throttle 或 v-throttle='5000'"
			type="success"
			:closable="false"
		/>
		<el-button v-throttle @click="throttleClick" type="primary">
			节流按钮 (默认，每隔2000毫秒后执行)
		</el-button>
		<el-button v-throttle="time" @click="throttleClick" type="primary">
			节流按钮 (每隔{{ time }}毫秒后执行)
		</el-button>
	</div>
</template>

<script setup lang="ts" name="Throttle">
import { ElMessage } from 'element-plus';
const time = ref(5000);
const throttleClick = () => {
	ElMessage.success('我是节流按钮触发的事件 🍍🍓🍌');
};
</script>
