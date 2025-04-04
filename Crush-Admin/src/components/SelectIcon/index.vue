<template>
	<div class="w-full">
		<!-- 全局搜索框 -->
		<el-input
			ref="inputRef"
			v-model="valueIcon"
			v-bind="$attrs"
			:placeholder="placeholder"
			:clearable="clearable"
			@clear="clearIcon"
			@click="dialogVisible = true"
		>
			<template #append>
				<el-button :icon="customIcons[modelValue]" @click="dialogVisible = true" />
			</template>
		</el-input>
		<!-- 对话框 -->
		<el-dialog v-model="dialogVisible" :title="title" top="50px" width="66%">
			<el-input
				class="mb10"
				v-model="inputValue"
				placeholder="搜索图标"
				:prefix-icon="Icons.Search"
			/>
			<el-scrollbar v-if="Object.keys(iconsList).length">
				<div class="icon-list">
					<div
						v-for="item in iconsList"
						:key="item"
						class="icon-item"
						@click="selectIcon(item)"
					>
						<el-icon>
							<component :is="item"></component>
						</el-icon>
						<span>{{ item.name }}</span>
					</div>
				</div>
			</el-scrollbar>
			<el-empty v-else description="未搜索到您要找的图标~" />
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="SelectIcon">
import * as Icons from '@element-plus/icons-vue';
// 接受父组件数据
const props = withDefaults(
	defineProps<{
		modelValue: string; // 默认值
		title?: string; // 模态框名称
		clearable?: boolean; // 是否可清空
		placeholder?: string; // 输入框占位文本
	}>(),
	{
		modelValue: '',
		title: '请选择图标',
		clearable: true,
		placeholder: '请选择图标',
	}
);
// 触发更新父组件数据
const emit = defineEmits(['update:modelValue']);
const inputRef = ref();
// 重新接收一下，防止打包后 clearable 报错
const valueIcon = ref(props.modelValue as string);
// 模态框
const dialogVisible = ref(false);
// 选择图标
const selectIcon = (item: any) => {
	dialogVisible.value = false;
	valueIcon.value = item.name;
	emit('update:modelValue', item.name);
	setTimeout(() => inputRef.value.blur(), 0);
};

// 清空图标
const clearIcon = () => {
	valueIcon.value = '';
	emit('update:modelValue', '');
	setTimeout(() => inputRef.value.blur(), 0);
};

// 监听搜索框值
const inputValue = ref('');
const customIcons: { [key: string]: any } = Icons;
const iconsList = computed((): { [key: string]: any } => {
	if (!inputValue.value) return Icons;
	let result: { [key: string]: any } = {};
	for (const key in customIcons) {
		if (key.toLowerCase().indexOf(inputValue.value.toLowerCase()) > -1)
			result[key] = customIcons[key];
	}
	return result;
});
</script>
<style scoped lang="scss">
.el-button {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	color: var(--el-text-color-regular);
}
:deep(.el-dialog__body) {
	max-height: 90vh !important;
	padding: 25px 20px 20px;
	.icon-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, 115px);
		justify-content: space-evenly;
		max-height: 70vh;
		.icon-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 42px;
			padding: 20px 30px;
			cursor: pointer;
			transition: all 0.2s;
			&:hover {
				transform: scale(1.3);
			}
			span {
				margin-top: 5px;
				line-height: 20px;
				text-align: center;
			}
		}
	}
}
</style>
