<template>
	<div class="app_tree_select">
		<el-select :model-value="valueTitle" :clearable="clearable" @clear="clearHandle">
			<el-option :value="valueTitle" :label="valueTitle">
				<el-tree
					id="tree-option"
					ref="selectTree"
					:accordion="accordion"
					:data="data"
					:props="props"
					:node-key="props.value"
					:default-expanded-keys="defaultExpandedKey"
					@node-click="handleNodeClick"
				>
					<!-- 自定义树节点渲染模板 -->
					<template v-slot="{ node, data }">
						<span class="custom-tree-node el-tree-node__content">
							<span class="el-tree-node__label">{{ node.label }}</span>
						</span>
					</template>
				</el-tree>
			</el-option>
		</el-select>
	</div>
</template>

<script lang="ts">
export default {
	name: 'TreeSelect',
	props: {
		// 树形组件的字段映射配置
		props: {
			type: Object,
			default: () => ({
				value: 'id', // 节点值的字段名
				label: 'title', // 节点显示文本的字段名
				children: 'children', // 子节点数组的字段名
				disabled: 'disabled', // 是否禁用节点的字段名
			}),
			required: true,
		},
		// 树形数据数组
		data: {
			type: Array<any>,
			default: () => [],
		},
		// 当前选中的值（v-model绑定）
		value: {
			type: String || Number || null || undefined,
			default: () => null,
		},
		// 是否显示清除按钮
		clearable: {
			type: Boolean,
			default: () => true,
		},
		// 是否开启手风琴模式（同级只展开一个）
		accordion: {
			type: Boolean,
			default: () => false,
		},
		// 是否可选择非叶子节点
		onlyLeaf: {
			type: Boolean,
			default: () => false,
		},
	},
	setup(props, { emit }) {
		// 当前选中节点的ID
		const valueId = ref<string | null>(null);
		// 树形组件的引用
		const selectTree = ref();
		// 当前选中节点的显示文本（用于el-select显示）
		const valueTitle = ref('');
		// 默认展开的节点key数组（用于回显时展开到选中节点）
		const defaultExpandedKey = ref<string[]>([]);

		// 初始化处理：根据传入的value值回显选中状态
		const initHandle = () => {
			if (valueId.value) {
				// 根据节点ID获取对应的节点数据
				const node = selectTree.value.getNode(valueId.value);
				if (node) {
					// 设置显示文本
					valueTitle.value = node.data[props.props.label];
					// 设置树形组件的当前选中节点
					selectTree.value.setCurrentKey(valueId.value);
					// 设置默认展开的节点（用于展开到选中节点）
					defaultExpandedKey.value = [valueId.value];
				}
			}
		};

		// 在下一次DOM更新后执行，用于调整下拉框样式
		nextTick(() => {
			// 获取下拉框的滚动容器
			let scrollWrap = document.querySelectorAll(
				'.el-scrollbar .el-select-dropdown__wrap',
			)[0];
			// 获取滚动条
			let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar');
			// 移除最大高度限制和滚动条，让树形组件完全展示
			(scrollWrap as any).style.cssText = 'margin: 0px; max-height: none; overflow: hidden;';
			scrollBar.forEach((ele) => ((ele as any).style.width = 0));
		});

		// 树节点点击事件处理
		const handleNodeClick = (node: any) => {
			// 如果节点有子节点且onlyLeaf为true，则不允许选择
			if (node[props.props.children] && !props.onlyLeaf) {
			} else {
				// 更新显示文本
				valueTitle.value = node[props.props.label];
				// 更新选中节点的ID
				valueId.value = node[props.props.value];
				// 触发v-model更新（更新父组件的绑定值）
				emit('update:value', valueId.value);
				// 触发自定义事件，传递完整的节点数据
				emit('selectChanged', node);
				// 清空默认展开的节点（防止再次打开时自动展开）
				defaultExpandedKey.value = [];
			}
		};

		// 清除选中处理
		const clearHandle = () => {
			// 清空显示文本
			valueTitle.value = '';
			// 清空选中ID
			valueId.value = null;
			// 清空默认展开节点
			defaultExpandedKey.value = [];
			// 清除树形组件的选中样式
			clearSelected();
			// 触发v-model更新，传递null值
			emit('update:value', null);
		};

		// 清除树形组件的选中样式
		const clearSelected = () => {
			// 获取所有树节点元素
			let allNode = document.querySelectorAll('#tree-option .el-tree-node');
			// 移除选中样式类
			allNode.forEach((element) => element.classList.remove('is-current'));
		};

		// 组件挂载时初始化
		onMounted(() => {
			// 设置初始值
			valueId.value = props.value;
			// 执行初始化
			initHandle();
		});

		// 监听props.value变化，当父组件传入的值变化时更新
		watch(
			() => props.value,
			() => {
				valueId.value = props.value;
				initHandle();
			},
		);

		return {
			valueId,
			selectTree,
			valueTitle,
			defaultExpandedKey,
			initHandle,
			handleNodeClick,
			clearHandle,
			clearSelected,
		};
	},
};
</script>

<style lang="scss" scoped>
.active {
	color: #409eff;
}

/* 调整下拉选项框的样式，使其能完整显示树形组件 */
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
	height: auto;
	max-height: 274px;
	padding: 0;
	overflow: hidden;
	overflow-y: auto;
}

/* 取消选中项的字重样式 */
.el-select-dropdown__item.selected {
	font-weight: normal;
}

/* 调整树节点内容的样式 */
ul li ::deep(.el-tree .el-tree-node__content) {
	height: auto;
	padding: 0 20px;
}

/* 树节点标签默认样式 */
.el-tree-node__label {
	font-weight: normal;
}

/* 当前选中节点标签样式 */
.el-tree ::deep(.is-current .el-tree-node__label) {
	color: #409eff;
	font-weight: 700;
}

/* 当前选中节点的子节点标签样式（保持普通样式） */
.el-tree ::deep(.is-current .el-tree-node__children .el-tree-node__label) {
	color: #606266;
	font-weight: normal;
}
</style>
