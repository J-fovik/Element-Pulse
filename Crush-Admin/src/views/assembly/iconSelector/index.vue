<template>
	<div>
		<el-card shadow="hover" header="IconSelect 下拉选择图标" class="mb20">
			<IconSelect v-model="state.iconValueOne" class="my20" />
			<el-descriptions title="配置项 📚" :column="1" border>
				<el-descriptions-item label="modelValue">
					双向绑定的icon值，使用示例：v-model="value"
				</el-descriptions-item>
			</el-descriptions>
		</el-card>

		<el-card shadow="hover" header="SelectIcon 模态框选择图标" class="mb20">
			<SelectIcon v-model="state.iconValueTwo" class="my20" />
			<el-descriptions title="配置项 📚" :column="1" border>
				<el-descriptions-item label="modelValue">
					双向绑定的icon值，使用示例：v-model="value"
				</el-descriptions-item>
				<el-descriptions-item label="title">
					弹窗标题，默认 '请选择图标'
				</el-descriptions-item>
				<el-descriptions-item label="clearable">
					是否可清空，默认为 true
				</el-descriptions-item>
				<el-descriptions-item label="placeholder">
					输入框占位文本，默认 '请选择图标'
				</el-descriptions-item>
			</el-descriptions>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="iconSelector">
const state = reactive({
	iconValueOne: '',
	iconValueTwo: '',
});
</script>
