<template>
	<div
		class="card-tree container flex justify-center items-center"
		style="box-shadow: var(--el-border-color-light) 0px 0px 10px"
	>
		<el-splitter>
			<el-splitter-panel size="15%" min="200" :collapsible="true">
				<TreeSelector
					:data="treeList"
					id="id"
					v-loading="treeLoading"
					:default-value="treeID"
					:expandAll="true"
					title="设备信息树"
					:width="'100%'"
					:expand="true"
					:default-props="{
						children: 'children',
						label: 'areaName',
					}"
					@change="changeTreeFilterSingle"
				>
					<template #labelLeft="{ node, data }">
						<div>
							<el-icon v-if="data.areaType == 'root'" size="20">
								<HomeFilled />
							</el-icon>
							<el-icon v-else-if="data.isDir == 1" size="20">
								<FolderOpened />
							</el-icon>
							<el-icon v-else size="20"><Document /></el-icon>
						</div>
					</template>
					<template #labelRight="{ node, data }">
						<div v-if="data.isDir == 1">({{ data.childNum }})</div>
					</template>
					<template #operate="{ node, data }">
						<el-dropdown trigger="click">
							<el-icon><MoreFilled /></el-icon>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item
										v-if="
											data.areaType == 'gc' ||
											data.areaType == 'cj' ||
											data.areaType == 'root'
										"
									>
										<el-button
											type="success"
											:icon="CirclePlus"
											link
											@click="
												setSelectRow(
													{
														ParentId: data.id,
														dialogTitle: '添加子节点',
														ParentName: data.areaName,
														ParentType: data.areaType,
													},
													() => setActiveKey('AddEditorTree'),
												)
											"
										>
											添加
										</el-button>
									</el-dropdown-item>
									<el-dropdown-item
										v-if="
											data.areaType == 'gc' ||
											data.areaType == 'cj' ||
											data.areaType == 'djb'
										"
									>
										<el-button
											type="primary"
											:icon="Edit"
											link
											@click="
												setSelectRow(
													{
														...data,
														dialogTitle: `编辑${data.areaName}`,
													},
													() => setActiveKey('AddEditorTree'),
												)
											"
										>
											编辑
										</el-button>
									</el-dropdown-item>
									<el-dropdown-item
										v-if="
											data.areaType == 'gc' ||
											data.areaType == 'cj' ||
											data.areaType == 'djb'
										"
									>
										<el-button
											type="danger"
											:icon="Delete"
											link
											@click="handleDelete(data)"
										>
											删除
										</el-button>
									</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</template>
				</TreeSelector>
			</el-splitter-panel>
			<el-splitter-panel>
				<!-- 右侧表格 -->
				<el-splitter>
					<el-splitter-panel min="800">
						<template v-if="curData.areaType == 'djb'">
							<div class="descriptions-box card-noBorder">
								<div class="flex items-center mb5">
									<div
										style="
											width: 4px;
											height: 20px;
											background: #1e5eff;
											display: block;
											border-radius: 2px;
										"
									></div>
									<div class="font20" style="font-weight: bold; margin-left: 8px">
										{{ form.areaName }}
									</div>
								</div>
								<div class="breadcrumb-wrapper">
									<div class="breadcrumb-nav">
										<template
											v-for="(item, index) in curData.sheetNames"
											:key="index"
										>
											<span
												class="crumb-item"
												:class="{ active: currentIndex === index }"
												@click="switchTab(index)"
											>
												{{ item }}
											</span>
											<!-- 分隔符（最后一项不加） -->
											<span
												class="separator"
												v-if="
													Number(index) <
													(curData.sheetNames?.length ?? 0) - 1
												"
												>/</span
											>
										</template>
									</div>
								</div>
								<!-- ========== 内容展示区 ========== -->
								<el-table
									v-if="currentTab?.detaiL_LIST?.length"
									:data="currentTab?.detaiL_LIST"
									border
									v-loading="loading"
									:span-method="arrayMethod"
									stripe
									style="width: 100%; margin-top: 16px"
								>
									<!-- <el-table-column
										:label="currentTab.title"
										align="center"
										label-class-name="first-header"
									>
										<el-table-column
											:label="currentTab.areA_MAJOR"
											align="center"
											label-class-name="second-header"
										>
											
										</el-table-column>
									</el-table-column> -->
									<el-table-column
										v-for="item in currentTab.tableHeader"
										:key="item.key"
										:show-overflow-tooltip="true"
										:prop="item.key"
										:width="item.width"
										:min-width="item.minWidth"
										:label="item.title"
										:align="item.align"
										:header-align="item.headerAlign"
										:show-header="item.show"
										:fixed="item.fixed"
										:sortable="item.sortable"
										:label-class-name="
											[
												'no',
												'device_name',
												'judgment_standard',
												'inspection_method',
											].includes(item.key)
												? 'special-header'
												: 'other-header'
										"
									>
										<template #default="scope">
											{{ scope.row[item.key] }}
										</template>
									</el-table-column>
								</el-table>
								<el-empty
									v-if="!currentTab?.detaiL_LIST?.length"
									description="暂无数据"
								/>
								<div
									v-if="currentTab?.remark"
									class="w-full p15 mt5"
									style="border: 1px solid #d7d7d7"
								>
									{{ currentTab?.remark }}
								</div>
							</div>
						</template>
					</el-splitter-panel>
					<el-splitter-panel size="15%" min="200" :collapsible="true">
						<el-splitter layout="vertical">
							<el-splitter-panel :collapsible="true" min="100">
								<div class="flex items-center mb5 p15">
									<div
										style="
											width: 3px;
											height: 15px;
											background: #1e5eff;
											display: block;
											border-radius: 2px;
										"
									></div>
									<div class="font15" style="font-weight: bold; margin-left: 8px">
										点检周期配置
									</div>
								</div>
							</el-splitter-panel>
							<el-splitter-panel :collapsible="true" min="100">
								<div class="flex items-center mb5 p15">
									<div
										style="
											width: 3px;
											height: 15px;
											background: #1e5eff;
											display: block;
											border-radius: 2px;
										"
									></div>
									<div class="font15" style="font-weight: bold; margin-left: 8px">
										点检人员配置
									</div>
								</div>
							</el-splitter-panel>
							<el-splitter-panel :collapsible="true" min="100">
								<div class="flex items-center mb5 p15">
									<div
										style="
											width: 3px;
											height: 15px;
											background: #1e5eff;
											display: block;
											border-radius: 2px;
										"
									></div>
									<div class="font15" style="font-weight: bold; margin-left: 8px">
										异常审批配置
									</div>
								</div>
							</el-splitter-panel>
						</el-splitter>
					</el-splitter-panel>
				</el-splitter>
			</el-splitter-panel>
		</el-splitter>
		<!-- 新增编辑详情 -->
		<AddEditorTree
			v-if="activeKey === 'AddEditorTree'"
			:data="selectRow"
			@success="init"
			@close="setSelectRow({}, () => setActiveKey(null))"
		></AddEditorTree>
		<AddInspectionItem
			v-if="activeKey === 'AddInspectionItem'"
			:data="selectRow"
			:curNodeId="treeID"
			@success="resetData"
			@close="setSelectRow({}, () => setActiveKey(null))"
		></AddInspectionItem>
	</div>
</template>

<script setup lang="ts" name="inspectionStandard">
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/elementPlus';
import {
	CirclePlus,
	Edit,
	ArrowDown,
	Delete,
	Download,
	Key,
	UserFilled,
	CirclePlusFilled,
} from '@element-plus/icons-vue';
import { convertDeptTree, convertTree } from '@/utils';
import { ElMessageBox, ElMessage } from 'element-plus';
import {
	useForm,
	useTable,
	useBasicsState,
	curryingRequest,
	useAsyncNoInitData,
	curryingRequestUrl,
	URL,
	useAsyncData,
} from '@/hooks';
import { useUserStore, useDictionaryStore, useGlobalStore } from '@/stores';
import { createTableColumns } from './table'; // 表头配置
import AddEditorTree from './components/AddEditorTree.vue';
import AddInspectionItem from './components/AddInspectionItem.vue';
import { downloadFromResponse } from '@/utils/download';
const userStore = useUserStore();
const dictionaryStore = useDictionaryStore();
const globalStore = useGlobalStore();
const route = useRoute();
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 表单hooks
const { form, resetForm } = useForm(
	() => ({}),
	() => resetData(),
);
// 当前sheet的索引
const currentIndex = ref(0);
const curData = ref({} as any);
const treeID = ref(null);
// 表格hooks
const {
	tableRef, // 表格实例
	selectRow, // 当前选中的值
	columnsData, // 表头设置
	visibleColumnsData, //表格的列描述信息
	tableBaseOptions, //基础表格设置
	onPageSizeChange, // 改变每页数量
	onCurrentChange, // 改变当前页码
	resetData, // 重置分页筛选
	setSelectRow, // 设置当前数据
	extendTableList, // 处理表格数据
	handleSelectionChange, // 多选
} = useTable(createTableColumns(), () => initData());
// 单选选中
const changeTreeFilterSingle = (id: any, data: any) => {
	treeID.value = id;
	// 点检表
	if (data.areaType === 'djb') {
		form.value = {
			...form.value,
			...data,
		};
		// 当前节点
		curData.value = data;
		initData();
	}
};
// 删除左侧树
const handleDelete = (row: any) => {
	ElMessageBox.confirm(`是否确认删除【${row.areaName}】，子节点会同步删除？`, '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.INSPECTION.INSPECTION_TREE + `/${row.id}`,
					headers: {
						'Content-Type': 'application/json; charset=utf-8', // 关键：告诉后端不是JSON对象
					},
					method: 'delete',
					data: row.id,
				},
				{
					before: () => setActiveKey('loading'),
					after: () => setActiveKey(null),
					successMsg: '删除成功',
				},
			);
			if (err) return;
			if (res) {
				init();
			}
		},
		() => {
			ElMessage.info('已取消删除');
		},
	);
};
// 删除点检项目
const handleDeleteItem = (row: any) => {
	var curPoint = row.inspection_point;
	if (row.inspection_pointt) {
		curPoint = `${row.inspection_point}（${row.inspection_pointt}）`;
	}
	ElMessageBox.confirm(`是否确认删除【${curPoint}】？`, '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.INSPECTION.INSPECTION_STANDARD + `/${row.id}`,
					headers: {
						'Content-Type': 'application/json; charset=utf-8', // 关键：告诉后端不是JSON对象
					},
					method: 'delete',
					data: row.id,
				},
				{
					before: () => setActiveKey('loading'),
					after: () => setActiveKey(null),
					successMsg: '删除成功',
				},
			);
			if (err) return;
			if (res) {
				resetData();
			}
		},
		() => {
			ElMessage.info('已取消删除');
		},
	);
};
// 初始化数据
const init = async () => {
	await initTreeList();
};
// 递归处理函数
const processTreeNode = (node) => {
	const typeLabel =
		dictionaryStore.getDictionaryInfo('INSPECTION_TYPE')?.find((o) => o.value === node.areaType)
			?.label || node.areaType;
	return {
		...node,
		// 递归处理 children
		children: node.children?.map((child) => processTreeNode(child)) || [],
	};
};
// 切换 Tab
const switchTab = (index) => {
	if (currentIndex.value === index) return;
	currentIndex.value = index;
};
// 获取左侧树数据
const {
	data: treeList,
	loading: treeLoading,
	initData: initTreeList,
} = useAsyncNoInitData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.INSPECTION.QUERY_INSPECTION_TREE,
		params: {},
		method: 'get',
	});
	if (err) return;
	treeID.value = res?.content[0]?.id;
	form.value = {
		...form.value,
		...res?.content[0],
		isActive: res?.content[0].isActive.toString(),
	};
	curData.value = res?.content[0];
	// 处理根节点列表
	return res?.content.map((node) => processTreeNode(node));
});
// 获取表格列表
const {
	data: tableData,
	loading,
	initData,
} = useAsyncNoInitData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.INSPECTION.QUERY_INSPECTION_STANDARD_NEW,
		params: {
			standard_id: treeID.value,
			sheet_name: curData.value?.sheetNames[currentIndex.value],
		},
		method: 'get',
	});
	if (err) return [];
	return (
		res?.content?.map((o) => {
			return {
				...o,
				tableHeader:
					o.tableHeader?.map((v) => {
						return {
							...v,
							align: 'center',
							headerAlign: 'center',
							width: ['序号', '状态', '周期/小时'].includes(v.title) ? 80 : null,
						};
					}) || [],
			};
		}) ?? []
	); // 处理数据
});
//  当前选中的 Tab（计算属性）
const currentTab = computed(() => {
	console.log(tableData.value, tableData.value[currentIndex.value]);
	return tableData.value[currentIndex.value] || tableData.value[0];
});
//  为每个合并列独立生成合并映射
const spanMapMap = computed(() => {
	const list = currentTab.value?.detaiL_LIST || [];
	const mergeKeys = currentTab.value?.mergeColumnNames?.map((item) => item.key) || [];
	if (!list.length || !mergeKeys.length) return {};

	const result = {};
	for (const key of mergeKeys) {
		const map = {};
		let i = 0;
		while (i < list.length) {
			let j = i + 1;
			const currentVal = list[i][key];
			// 向后查找连续相同的值（使用严格相等，注意 null/undefined 处理）
			while (j < list.length && list[j][key] === currentVal) {
				j++;
			}
			map[i] = j - i;
			i = j;
		}
		result[key] = map;
	}
	return result;
});
//  合并单元格方法
const arrayMethod = ({ row, column, rowIndex, columnIndex }) => {
	const mergeKeys = currentTab.value?.mergeColumnNames?.map((item) => item.key) || [];
	// 获取当前列绑定的字段名（使用 column.property 更可靠）
	const colKey = column.property || column.rawColumnKey;
	if (mergeKeys.includes(colKey)) {
		const map = spanMapMap.value[colKey];
		if (map && map[rowIndex] !== undefined) {
			return { rowspan: map[rowIndex], colspan: 1 };
		} else {
			return { rowspan: 0, colspan: 0 }; // 被合并的行隐藏该列单元格
		}
	} else {
		// 非合并列正常显示
		return { rowspan: 1, colspan: 1 };
	}
};
onActivated(async () => {
	init();
});
</script>

<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	overflow-y: auto;

	.descriptions-box {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow-y: auto !important;
		padding: 15px !important;
	}
}
/* ========== 面包屑外层卡片 ========== */
.breadcrumb-wrapper {
	transition: all 0.3s ease;
}
/* ========== 导航列表 ========== */
.breadcrumb-nav {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 2px 0;
}
// :deep(.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell) {
// 	background: none !important; // 白色
// }
// 双数行背景色
:deep(.el-table__body tr:nth-child(even)) {
	background-color: #ecf2ff !important; // 白色
}
// hover 时与双数行颜色一致
:deep(.el-table__body tr:hover) {
	background-color: #ecf2ff !important; // 与双数行相同的白色
}
// :deep(.first-header) {
// 	background: #409eff !important;
// 	color: #ffffff !important;
// 	font-weight: bold !important;
// }

// :deep(.second-header) {
// 	background: #ffffff !important;
// 	color: #333333 !important;
// 	font-weight: bold !important;
// }

// :deep(.special-header) {
// 	background: #d9e1f2 !important;
// 	color: #333333 !important;
// 	font-weight: bold !important;
// }
// :deep(.other-header) {
// 	background: #ffffff !important;
// 	color: #333333 !important;
// 	font-weight: bold !important;
// }
/* ========== 每个面包屑节点 ========== */
.crumb-item {
	display: inline-block;
	padding: 3px 8px;
	font-size: 15px;
	font-weight: 500;
	color: #5a6a7e;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	user-select: none;
	line-height: 1.4;
	letter-spacing: 0.3px;
	background: transparent;
	position: relative;
}
/* ========== 激活状态（当前选中） ========== */
.crumb-item.active {
	color: #ffffff;
	font-weight: 700;
	background: #1a73e8;
	cursor: default;
	pointer-events: none;
	/* 底部装饰条 */
}
/* ========== 分隔符（斜杠） ========== */
.separator {
	margin: 0 6px;
	color: #b0bcc8;
	font-weight: 300;
	font-size: 17px;
	letter-spacing: 0.5px;
	flex-shrink: 0;
}
</style>
