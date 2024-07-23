<template>
	<div class="card container">
		<span class="text"> 图标选择器 🍓🍇🍈🍉</span>
		<SelectIcon v-model="iconValue" />
		<el-descriptions title="配置项 📚" :column="1" border>
			<el-descriptions-item label="iconValue">
				双向绑定的icon值，使用示例：v-model="iconValue"
			</el-descriptions-item>
			<el-descriptions-item label="title"> 弹窗标题 </el-descriptions-item>
			<el-descriptions-item label="clearable"> 是否可清空，默认为 true </el-descriptions-item>
			<el-descriptions-item label="placeholder"> 输入框占位文本 </el-descriptions-item>
		</el-descriptions>
	</div>
</template>

<script setup lang="ts" name="selectIcon">
import { ref } from 'vue';
const iconValue = ref('');
</script>

<style scoped lang="scss"></style>
