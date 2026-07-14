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
					:default-value="form.treeID"
					:expandAll="true"
					title="设备信息树"
					:width="'100%'"
					:default-props="{
						children: 'children',
						label: 'areaName',
					}"
					@change="changeTreeFilterSingle"
				>
					<template #labelLeft="{ node, data }">
						<div>
							<el-icon v-if="data.isDir == 1" size="20"><FolderOpened /></el-icon>
						</div>
					</template>
					<template #labelRight="{ node, data }">
						<div>
							<el-tag
								v-if="data.isDir === 1 && data.tagLabel"
								type="info"
								size="small"
							>
								{{ data.tagLabel }}
							</el-tag>
							<el-tag
								v-if="data.isDir === 0 && data.equipment_status === 'using'"
								type="success"
								size="small"
							>
								运行中
							</el-tag>
							<el-tag
								v-if="data.isDir === 0 && data.equipment_status === 'idle'"
								type="danger"
								size="small"
							>
								已停机
							</el-tag>
						</div>
					</template>
					<template #operate="{ node, data }">
						<el-dropdown trigger="click">
							<el-icon><MoreFilled /></el-icon>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item>
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
													},
													() => setActiveKey('AddEditorTree'),
												)
											"
										>
											添加
										</el-button>
									</el-dropdown-item>
									<!-- <el-dropdown-item>
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
									</el-dropdown-item> -->
									<el-dropdown-item>
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
				<div class="descriptions-box card">
					<el-tabs
						v-model="form.activeTabs"
						type="border-card"
						@tab-click="handleClickTabs"
					>
						<el-tab-pane label="基本信息" name="Basic">
							<el-form
								ref="formRef"
								:model="form"
								label-align="left"
								label-width="auto"
								:disabled="!!form.isReadOnly"
							>
								<div class="mb5">
									{{ form.areaName }}
								</div>
								<el-row :gutter="24">
									<!-- 是节点 -->
									<template v-if="form.isDir == 1">
										<el-col :span="8">
											<el-form-item label="节点类型" prop="categorycode">
												<el-select
													v-model="form.categorycode"
													filterable
													clearable
												>
													<el-option
														v-for="dict in dictionaryStore.getDictionaryInfo(
															'FACTORY_DEVICE',
														)"
														:key="dict.value"
														:label="dict.label"
														:value="dict.value"
													/>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="节点名称" prop="equipment_name">
												<el-input
													v-model.trim="form.equipment_name"
													placeholder="请输入节点名称"
												/>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="节点编码" prop="equipment_code">
												<el-input
													v-model.trim="form.equipment_code"
													placeholder="请输入节点编码"
												/>
											</el-form-item>
										</el-col>
									</template>
									<!-- 非节点 -->
									<template v-if="form.isDir == 0">
										<el-col :span="8">
											<el-form-item label="设备类别" prop="categorycode">
												<el-tree-select
													v-model="form.categorycode"
													placeholder="请选择设备类别"
													:data="equipmentCategoryList"
													filterable
													check-strictly
													:render-after-expand="false"
												/>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="设备名称" prop="equipment_name">
												<el-input
													v-model.trim="form.equipment_name"
													placeholder="请输入设备名称"
												/>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="设备编码" prop="equipment_code">
												<el-input
													v-model.trim="form.equipment_code"
													placeholder="请输入设备编码"
												/>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="设备别名" prop="alias_name">
												<el-input
													v-model.trim="form.alias_name"
													placeholder="请输入设备别名"
												/>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="设备精度" prop="accuracy">
												<el-select
													v-model="form.accuracy"
													filterable
													clearable
												>
													<el-option
														v-for="dict in dictionaryStore.getDictionaryInfo(
															'equipment_accuracy',
														)"
														:key="dict.value"
														:label="dict.label"
														:value="dict.value"
													/>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item prop="specification" label="规格型号">
												<el-input
													v-model.trim="form.specification"
													placeholder="请输入规格型号"
												/>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item prop="manufacturer" label="生产厂家">
												<el-input
													v-model.trim="form.manufacturer"
													placeholder="请输入生产厂家"
												/>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="设备标准" prop="standard">
												<el-select
													v-model="form.standard"
													filterable
													clearable
												>
													<el-option
														v-for="dict in dictionaryStore.getDictionaryInfo(
															'EqStandard',
														)"
														:key="dict.value"
														:label="dict.label"
														:value="dict.value"
													/>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="出厂日期" prop="manufacture_date">
												<el-date-picker
													v-model="form.manufacture_date"
													type="date"
													range-separator="-"
													size="small"
													format="YYYY/MM/DD"
													value-format="YYYY-MM-DD"
												/>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item prop="serial_number" label="出厂编号">
												<el-input
													v-model.trim="form.serial_number"
													placeholder="请输入出厂编号"
												/>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item prop="rated_power" label="额定功率(KW)">
												<el-input-number
													v-model.trim="form.rated_power"
													:min="0"
													:max="999999999"
													:step="1"
													class="flex-1"
													controls-position="right"
												/>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item prop="rated_voltage" label="额定电压(V)">
												<el-input-number
													v-model.trim="form.rated_voltage"
													:min="0"
													:max="999999999"
													:step="1"
													class="flex-1"
													controls-position="right"
												/>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="采购日期" prop="purchase_date">
												<el-date-picker
													v-model="form.purchase_date"
													type="date"
													range-separator="-"
													size="small"
													format="YYYY/MM/DD"
													value-format="YYYY-MM-DD"
												/>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item prop="purchase_price" label="采购价格">
												<el-input-number
													v-model.trim="form.purchase_price"
													:min="0"
													:max="999999999"
													:step="1"
													class="flex-1"
													controls-position="right"
												/>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item prop="asset_number" label="资产编号">
												<el-input
													v-model.trim="form.asset_number"
													placeholder="请输入资产编号"
												/>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="使用部门" prop="usingDeptId">
												<el-tree-select
													v-model="form.usingDeptId"
													placeholder="请选择使用部门"
													:data="deptOptions"
													filterable
													check-strictly
													:render-after-expand="false"
												/>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="责任人" prop="responsible_user_id">
												<el-select
													v-model="form.responsible_user_id"
													filterable
													clearable
												>
													<el-option
														v-for="dict in userList"
														:key="dict.userId"
														:label="dict.nickName"
														:value="dict.userId"
													/>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="是否特种" prop="isspecial">
												<el-select
													v-model="form.isspecial"
													filterable
													clearable
												>
													<el-option
														v-for="dict in dictionaryStore.getDictionaryInfo(
															'Is_Special',
														)"
														:key="dict.value"
														:label="dict.label"
														:value="dict.value"
													/>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="24">
											<el-form-item label="备注" prop="remark">
												<el-input
													v-model="form.remark"
													type="textarea"
													:rows="4"
													placeholder="请输入内容"
												/>
											</el-form-item>
										</el-col>
									</template>
									<el-col :span="8">
										<el-form-item label="是否启用" prop="iS_ACTIVE">
											<el-select
												v-model="form.iS_ACTIVE"
												filterable
												clearable
											>
												<el-option
													v-for="dict in dictionaryStore.getDictionaryInfo(
														'Is_Active',
													)"
													:key="dict.value"
													:label="dict.label"
													:value="dict.value"
												/>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-tab-pane>
						<template v-if="form.isDir == 0">
							<el-tab-pane label="维修" name="Repair">
								<div class="mb5">
									{{ form.areaName }}
								</div>
								维修
							</el-tab-pane>
							<el-tab-pane label="保养" name="Maintenance">
								<div class="mb5">
									{{ form.areaName }}
								</div>
								保养
							</el-tab-pane>
							<el-tab-pane label="润滑" name="Lubrication">
								<div class="mb5">
									{{ form.areaName }}
								</div>
								润滑
							</el-tab-pane>
							<el-tab-pane label="巡检" name="Inspection">
								<div class="mb5">
									{{ form.areaName }}
								</div>
								巡检
							</el-tab-pane>
							<el-tab-pane label="委外" name="Outsourcing">
								<div class="mb5">
									{{ form.areaName }}
								</div>
								委外
							</el-tab-pane>
							<el-tab-pane label="文件管理" name="DocumentManagement">
								<div class="mb5">
									{{ form.areaName }}
								</div>
								文件管理
							</el-tab-pane>
							<el-tab-pane label="关联备件" name="RelatedSpareParts">
								<div class="mb5">
									{{ form.areaName }}
								</div>
								关联备件
							</el-tab-pane>
						</template>
						<el-tab-pane label="下级节点" name="SubNodes">
							<div class="mb5">
								{{ form.areaName }}
							</div>
							下级节点
						</el-tab-pane>
					</el-tabs>
				</div>
			</el-splitter-panel>
		</el-splitter>
		<!-- 新增编辑详情 -->
		<AddEditorTree
			v-if="activeKey === 'AddEditorTree'"
			:data="selectRow"
			:deptOptions="deptOptions"
			:equipmentCategoryList="equipmentCategoryList"
			:userList="userList"
			@success="init"
			@close="setSelectRow({}, () => setActiveKey(null))"
		></AddEditorTree>
	</div>
</template>

<script setup lang="ts" name="equipmentIntegration">
import {
	CirclePlus,
	Edit,
	ArrowDown,
	Delete,
	Connection,
	Key,
	UserFilled,
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
const userStore = useUserStore();
const dictionaryStore = useDictionaryStore();
const globalStore = useGlobalStore();
const route = useRoute();
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 表单hooks
const { form, resetForm } = useForm(
	() => ({
		treeID: null,
		activeTabs: 'Basic',
	}),
	() => resetData(),
);
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
// 获取详情
const getDetail = async (id: number) => {
	const { res, err } = await curryingRequestUrl({
		url: URL.BASIC_DATA.QUERY_EQUIPMENT_DETAIL,
		method: 'post',
		data: id,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
	if (err) return;
	console.log('详情数据', res?.data);
};

// 单选选中
const changeTreeFilterSingle = (id: any, data: any) => {
	form.value.treeID = id;
	// 非节点
	if (data.isDir === 0) {
		form.value = {
			...form.value,
			...data,
		};
		getDetail(form.value.treeID);
		// 节点
	} else {
		form.value = {
			...form.value,
			...data,
		};
		console.log('节点数据', data);
		form.value.Id = data.id;
		form.value.IS_DIR = data.isDir;
		form.value.Parent_id = data.parenT_ID;
		form.value.equipment_code = data.areaCode;
		form.value.equipment_name = data.areaName;
		form.value.categorycode = data.areaType;
	}

	initData();
};
// 切换tabs
const handleClickTabs = (tab: any) => {
	form.value.activeTabs = tab.props.name;
};
// 删除左侧树
const handleDelete = (row: any) => {
	ElMessageBox.confirm(`是否确认删除${row.areaName}？`, '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.BASIC_DATA.DELETE_EQUIPMENT,
					headers: {
						'Content-Type': 'application/json; charset=utf-8', // 关键：告诉后端不是JSON对象
					},
					method: 'post',
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
// 初始化数据
const init = async () => {
	await initTreeList();
	await initData();
};
// 递归处理函数
const processTreeNode = (node) => {
	const typeLabel =
		dictionaryStore.getDictionaryInfo('FACTORY_DEVICE')?.find((o) => o.value === node.areaType)
			?.label || node.areaType;
	return {
		...node,
		tagLabel: node.isDir === 1 ? typeLabel : null,
		// 递归处理 children
		children: node.children?.map((child) => processTreeNode(child)) || [],
	};
};
// 获取左侧树数据
const { data: treeList, initData: initTreeList } = useAsyncNoInitData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.BASIC_DATA.QUERY_EQUIPMENT,
		params: {},
		method: 'post',
	});
	if (err) return;
	form.value.treeID = res?.data[0]?.id;
	form.value = {
		...form.value,
		...res?.data[0],
	};
	// 处理根节点列表
	return res?.data.map((node) => processTreeNode(node));
});
// 获取部门数据
const { data: deptOptions, initData: getDeptOptions } = useAsyncData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.QUERY_DEPT,
		params: {},
		method: 'get',
	});
	if (err) return;
	return res?.data?.map((item) => convertDeptTree(item)); // 处理数据
});
// 获取设备类别列表
const { data: equipmentCategoryList, initData: getEquipmentCategoryList } = useAsyncData(
	async () => {
		const { res, err } = await curryingRequestUrl({
			url: URL.BASIC_DATA.EQUIPMENT_CATEGORY,
			params: {
				NAME: '',
				IS_ACTIVE: '',
				type: 'category',
			},
			method: 'get',
		});
		if (err) return;
		return res?.data?.list?.map((item) => convertTree(item, 'name', 'strID', 'children')); // 处理数据
	},
);
// 查询用户列表
const { data: userList, initData: getUserList } = useAsyncData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.QUERY_USER,
		params: {
			deptId: '1506545158835290114',
			pageNum: 1,
			pageSize: 1000,
		},
		method: 'get',
	});
	if (err) return;
	return res?.data.list; // 处理数据
});
// 获取表格列表
const {
	data: tableData,
	loading,
	initData,
} = useAsyncNoInitData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.QUERY_USER,
		params: {
			...form.value,
			pageNum: tableBaseOptions.pagination.current,
			pageSize: tableBaseOptions.pagination.pageSize,
		},
		method: 'get',
	});
	if (err) return;
	// 赋值总页数
	tableBaseOptions.pagination.total = res?.data.total ?? 0;
	return extendTableList(res?.data.list); // 处理数据
});
onActivated(async () => {
	init();
});
</script>

<style scoped lang="scss">
.card {
	padding: 10px !important;
}
.container {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	overflow-y: auto;

	.descriptions-box {
		display: flex;
		flex: 1;
		flex-direction: column;
		/* height: 100%; */
		overflow-y: auto !important;
	}
}
</style>
