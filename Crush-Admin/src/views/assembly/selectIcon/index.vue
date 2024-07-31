<template>
	<Content>
		<SelectIcon v-model="iconValue" />
		<el-descriptions title="配置项 📚" :column="1" border>
			<el-descriptions-item label="iconValue">
				双向绑定的icon值，使用示例：v-model="iconValue"
			</el-descriptions-item>
			<el-descriptions-item label="title"> 弹窗标题 </el-descriptions-item>
			<el-descriptions-item label="clearable"> 是否可清空，默认为 true </el-descriptions-item>
			<el-descriptions-item label="placeholder"> 输入框占位文本 </el-descriptions-item>
		</el-descriptions>
	</Content>
</template>

<script setup lang="ts" name="selectIcon">
const iconValue = ref('');
</script>
