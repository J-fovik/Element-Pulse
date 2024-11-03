<template>
	<div class="flex items-center">
		<el-icon :size="20" v-if="modelValue" class="mr2">
			<component :is="modelValue" />
		</el-icon>
		<el-select
			filterable
			:modelValue="modelValue"
			class="m2"
			placeholder="请选择图标"
			@change="handleChange"
		>
			<el-option v-for="item in icons" :key="item" :label="item" :value="item">
				<div class="flex items-center justify-between">
					<el-icon>
						<component :is="item" />
					</el-icon>
					<span>{{ item }}</span>
				</div>
			</el-option>
		</el-select>
	</div>
</template>
<script setup name="IconSelect">
import * as iconList from '@element-plus/icons-vue';
defineProps({
	modelValue: String,
});

// 赋值图标
const icons = ref(Object.keys(iconList));

// 父组件方法
const emit = defineEmits(['update:modelValue']);
// 切换图标
const handleChange = (icon) => {
	emit('update:modelValue', icon);
};
</script>
