<template>
	<div class="card container">
		<div>图标选择器 🍓🍇🍈🍉</div>
		<SelectIcon v-model="iconValue" class="my20" />
		<el-descriptions title="配置项 📚" :column="1" border>
			<el-descriptions-item label="modelValue">
				双向绑定的icon值，使用示例：v-model="iconValue"
			</el-descriptions-item>
			<el-descriptions-item label="title"> 弹窗标题，默认 '请选择图标' </el-descriptions-item>
			<el-descriptions-item label="clearable"> 是否可清空，默认为 true </el-descriptions-item>
			<el-descriptions-item label="placeholder">
				输入框占位文本，默认 '请选择图标'</el-descriptions-item
			>
		</el-descriptions>
	</div>
</template>

<script setup lang="ts" name="selectIcon">
const iconValue = ref('');
</script>
