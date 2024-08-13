<template>
	<div class="card treeSelector">
		<h4 v-if="title" class="title sle">
			{{ title }}
		</h4>
		<div class="search">
			<el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
			<el-dropdown trigger="click">
				<el-icon size="20"><More /></el-icon>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="toggleTreeNodes(true)">展开全部</el-dropdown-item>
						<el-dropdown-item @click="toggleTreeNodes(false)"
							>折叠全部</el-dropdown-item
						>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
		<el-scrollbar :style="{ height: title ? `calc(100% - 95px)` : `calc(100% - 56px)` }">
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
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts" name="TreeSelector">
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
		icon: 'CaretRight',
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
	if (props.multiple)
		selected.value = Array.isArray(props.defaultValue)
			? props.defaultValue
			: [props.defaultValue];
	else selected.value = typeof props.defaultValue === 'string' ? props.defaultValue : '';
};
// 未缓存组件使用
onBeforeMount(() => {
	setSelected();
});
// 缓存组件使用
onActivated(() => {
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
// 切换树节点的展开或折叠状态
const toggleTreeNodes = (isExpand: boolean) => {
	let nodes = treeRef.value?.store.nodesMap;
	if (!nodes) return;
	for (const node in nodes) {
		if (nodes.hasOwnProperty(node)) {
			nodes[node].expanded = isExpand;
		}
	}
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
.treeSelector {
	box-sizing: border-box;
	height: 100%;
	.title {
		margin: 0 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: var(--el-color-info-dark-2);
		letter-spacing: 0.5px;
	}
	.search {
		display: flex;
		align-items: center;
		margin: 0 0 15px;
		.el-icon {
			cursor: pointer;
			transform: rotate(90deg) translateY(-8px);
		}
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
