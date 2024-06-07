<template>
	<div class="filter" :style="{ width }">
		<h4 v-if="title" class="title text-ellipsis" v-tooltip="{ text: title, position: 'top' }">
			{{ title }}
		</h4>
		<el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
		<el-tree
			ref="treeRef"
			accordion
			:icon="icon"
			:node-key="id"
			:data="data"
			:show-checkbox="multiple"
			:check-strictly="false"
			:current-node-key="!multiple ? selected : ''"
			:highlight-current="!multiple"
			:expand-on-click-node="false"
			:check-on-click-node="multiple"
			:props="defaultProps"
			:filter-node-method="filterNode"
			:default-checked-keys="multiple ? selected : []"
			@node-click="handleNodeClick"
			@check="handleCheckChange"
		>
			<template #default="{ node, data }">
				<span class="el-tree-node__label">
					<slot :row="{ node, data }">
						{{ node.label }}
					</slot>
				</span>
			</template>
		</el-tree>
	</div>
</template>

<script setup lang="ts" name="TreeFilter">
import { ElTree } from 'element-plus';
// 父组件参数
const props = withDefaults(
	defineProps<{
		data: Array<any>; // 数据 ==> 必传
		defaultValue?: any; // 默认选中的值 ==> 非必传
		defaultProps?: any; // 默认配置==> 非必传
		multiple?: boolean; // 是否为多选 ==> 非必传，默认为 false
		title?: string; // treeFilter 标题 ==> 非必传
		id?: string; // 选择的id ==> 非必传，默认为 “id”
		width?: string; // 组件宽度 ==> 非必传，默认为 “220px”
		icon?: string; // 节点图标 ==> 非必传
	}>(),
	{
		data: () => [],
		defaultValue: () => [],
		defaultProps: {
			children: 'children',
			label: 'label',
		},
		multiple: false,
		title: '',
		id: 'id',
		width: '220px',
		icon: '',
	}
);
// 树形控件实例
const treeRef = ref<InstanceType<typeof ElTree>>();
// 选中值
const selected = ref();
// 搜索过滤值
const filterText = ref('');
// 设置默认选中值
const setSelected = () => {
	if (props.multiple) selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
	else selected.value = typeof props.defaultValue === 'string' ? props.defaultValue : '';
};
onBeforeMount(() => {
	setSelected();
});
// 使用 nextTick 防止打包后赋值不生效，开发环境是正常的
watch(
	() => props.defaultValue,
	() => nextTick(() => setSelected()),
	{ deep: true, immediate: true }
);
watch(filterText, (val) => {
	treeRef.value!.filter(val);
});

// 过滤
const filterNode = (value: string, data: { [key: string]: any }, node: any) => {
	if (!value) return true;
	let parentNode = node.parent,
		labels = [node.label],
		level = 1;
	while (level < node.level) {
		labels = [...labels, parentNode.label];
		parentNode = parentNode.parent;
		level++;
	}
	return labels.some((label) => label.indexOf(value) !== -1);
};
const emits = defineEmits(['change']);

// 单选
const handleNodeClick = (data: { [key: string]: any }) => {
	if (props.multiple) return;
	emits('change', data[props.id]);
};

// 多选
const handleCheckChange = () => {
	emits('change', treeRef.value?.getCheckedKeys());
};

// 暴露给父组件使用
defineExpose({ treeRef });
</script>

<style scoped lang="scss">
.filter {
	box-sizing: border-box;
	height: 100%;
	.title {
		margin: 0 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: var(--el-color-info-dark-2);
		letter-spacing: 0.5px;
	}
	.el-input {
		margin: 0 0 15px;
	}
	.el-scrollbar {
		:deep(.el-tree) {
			height: 80%;
			overflow: auto;
			.el-tree-node__content {
				height: 33px;
			}
		}
		:deep(.el-tree--highlight-current) {
			.el-tree-node.is-current > .el-tree-node__content {
				background-color: var(--el-color-primary);
				.el-tree-node__label,
				.el-tree-node__expand-icon {
					color: white;
				}
				.is-leaf {
					color: transparent;
				}
			}
		}
	}
}
:deep(.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content) {
	background-color: var(--el-color-primary-light-1) !important;
	color: var(--next-bg-main-color) !important;
}
</style>
