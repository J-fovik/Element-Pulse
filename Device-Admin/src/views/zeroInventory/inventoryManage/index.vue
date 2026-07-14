<template>
	<Container>
		<div class="stats-bar">
			<span class="stat-item">
				<el-icon style="color: #409eff"><Present /></el-icon> 供货库存
				<strong>{{ storeInfo[0]?.storeNo }}</strong></span
			>
			<span class="stat-item">
				<el-icon style="color: #67c23a"><Top /></el-icon> 本月入库
				<strong>{{ storeInfo[0]?.monthInStoreNo }}</strong></span
			>
			<span class="stat-item"
				><el-icon style="color: #e6a23c"><Bottom /></el-icon> 本月出库
				<strong>{{ storeInfo[0]?.monthOutStoreNo }}</strong></span
			>
			<span class="stat-item"
				><el-icon style="color: #f56c6c"><Warning /></el-icon> 预警
				<strong>{{ storeInfo[0]?.warnNo }}</strong></span
			>
			<span class="stat-item"
				><el-icon style="color: #909399"><Management /></el-icon> 供应商
				<strong>{{ storeInfo[0]?.supplierNo }}</strong> 家</span
			>
		</div>
		<el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick(activeName)">
			<el-tab-pane name="first">
				<template #label>
					<span class="custom-tabs-label">
						<el-icon><Present /></el-icon>
						<span>库存</span>
					</span>
				</template>
				<CustomTableMould
					:table-columns="storeData"
					:title="'库存'"
					@reset-search="resetFormState"
					@search="storeResetData"
					><template #form>
						<el-form :model="formState" label-position="left" label-width="auto">
							<el-row :gutter="24">
								<el-col :span="4">
									<el-form-item label="名称">
										<el-input
											v-model.trim="formState.materialName"
											placeholder="名称"
											clearable
										/>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="型号">
										<el-input
											v-model.trim="formState.spec"
											placeholder="型号"
											clearable
										/>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="仓库">
										<el-select
											v-model="formState.storeCode"
											filterable
											clearable
										>
											<el-option
												v-for="dict in storeSelectList"
												:key="dict.code"
												:label="dict.name"
												:value="dict.code"
											/>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="供应商">
										<el-select
											v-model="formState.supplierCode"
											filterable
											clearable
										>
											<el-option
												v-for="dict in supplierSelectList"
												:key="dict.code"
												:label="dict.name"
												:value="dict.code"
											/>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</template>
					<template #operateRight>
						<el-space>
							<el-dropdown trigger="click">
								<el-button type="primary" :icon="ArrowDown"> 批量操作 </el-button>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item>
											<el-button
												type="primary"
												link
												:icon="Upload"
												@click="
													getExportData(
														'first',
														createStoreTableColumns(),
													)
												"
											>
												导出
											</el-button>
										</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</el-space>
					</template>
					<template #table>
						<TablePlus
							ref="storeTableRef"
							:tableData="storeData"
							:selection="false"
							border
							:loading="storeLoading"
							:visibleColumnsData="storeVisibleColumnsData"
							@select-keys="storeHandleSelectionChange"
						>
						</TablePlus>
					</template>
					<!-- 分页 -->
					<template #pagination>
						<el-pagination
							style="margin-top: 10px"
							v-model:current-page="storeTableBaseOptions.pagination.current"
							v-model:page-size="storeTableBaseOptions.pagination.pageSize"
							:total="storeTableBaseOptions.pagination.total"
							:pager-count="storeTableBaseOptions.pagination.pagerCount"
							:page-sizes="storeTableBaseOptions.pagination.sizeList"
							background
							layout="total, sizes, prev, pager, next, jumper"
							@size-change="storeOnPageSizeChange"
							@current-change="storeOnCurrentChange"
						/>
					</template>
				</CustomTableMould>
			</el-tab-pane>
			<el-tab-pane name="second">
				<template #label>
					<span class="custom-tabs-label">
						<el-icon><Top /></el-icon>
						<span>入库记录</span>
					</span>
				</template>
				<CustomTableMould
					:table-columns="inboundData"
					:title="'入库记录'"
					@reset-search="resetInboundForm"
					@search="inboundResetData"
					><template #form>
						<el-form :model="inboundForm" label-position="left" label-width="auto">
							<el-row :gutter="24">
								<el-col :span="4">
									<el-form-item label="名称">
										<el-input
											v-model.trim="inboundForm.materialName"
											placeholder="名称"
											clearable
										/>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="型号">
										<el-input
											v-model.trim="inboundForm.spec"
											placeholder="型号"
											clearable
										/>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="仓库">
										<el-select
											v-model="inboundForm.storeCode"
											filterable
											clearable
										>
											<el-option
												v-for="dict in storeSelectList"
												:key="dict.code"
												:label="dict.name"
												:value="dict.code"
											/>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="供应商">
										<el-select
											v-model="inboundForm.supplierCode"
											filterable
											clearable
										>
											<el-option
												v-for="dict in supplierSelectList"
												:key="dict.code"
												:label="dict.name"
												:value="dict.code"
											/>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="入库时间">
										<el-date-picker
											v-model="inboundForm.daterange"
											type="daterange"
											range-separator="-"
											start-placeholder="开始"
											end-placeholder="结束"
											size="small"
											:clearable="false"
											format="YYYY/MM/DD"
											value-format="YYYY-MM-DD"
										/>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</template>
					<template #operateRight>
						<el-space>
							<el-dropdown trigger="click">
								<el-button type="primary" :icon="ArrowDown"> 批量操作 </el-button>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item>
											<el-button
												type="primary"
												link
												:icon="Upload"
												@click="
													getExportData(
														'second',
														createInboundTableColumns(),
													)
												"
											>
												导出
											</el-button>
										</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</el-space>
					</template>
					<template #table>
						<TablePlus
							ref="inboundTableRef"
							:tableData="inboundData"
							:selection="false"
							border
							:loading="inboundLoading"
							:visibleColumnsData="inboundVisibleColumnsData"
							@select-keys="inboundHandleSelectionChange"
						>
						</TablePlus>
					</template>
					<!-- 分页 -->
					<template #pagination>
						<el-pagination
							style="margin-top: 10px"
							v-model:current-page="inboundTableBaseOptions.pagination.current"
							v-model:page-size="inboundTableBaseOptions.pagination.pageSize"
							:total="inboundTableBaseOptions.pagination.total"
							:pager-count="inboundTableBaseOptions.pagination.pagerCount"
							:page-sizes="inboundTableBaseOptions.pagination.sizeList"
							background
							layout="total, sizes, prev, pager, next, jumper"
							@size-change="inboundOnPageSizeChange"
							@current-change="inboundOnCurrentChange"
						/>
					</template>
				</CustomTableMould>
			</el-tab-pane>
			<el-tab-pane name="third">
				<template #label>
					<span class="custom-tabs-label">
						<el-icon><Bottom /></el-icon>
						<span>出库记录</span>
					</span>
				</template>
				<CustomTableMould
					:title="'出库记录'"
					:table-columns="outboundData"
					@reset-search="resetOutboundForm"
					@search="outboundResetData"
				>
					<template #form>
						<el-form :model="outboundForm" label-position="left" label-width="auto">
							<el-row :gutter="24">
								<el-col :span="4">
									<el-form-item label="名称">
										<el-input
											v-model.trim="outboundForm.materialName"
											placeholder="名称"
											clearable
										/>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="型号">
										<el-input
											v-model.trim="outboundForm.spec"
											placeholder="型号"
											clearable
										/>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="仓库">
										<el-select
											v-model="outboundForm.storeCode"
											filterable
											clearable
										>
											<el-option
												v-for="dict in storeSelectList"
												:key="dict.code"
												:label="dict.name"
												:value="dict.code"
											/>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="供应商">
										<el-select
											v-model="outboundForm.supplierCode"
											filterable
											clearable
										>
											<el-option
												v-for="dict in supplierSelectList"
												:key="dict.code"
												:label="dict.name"
												:value="dict.code"
											/>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="出库时间">
										<el-date-picker
											v-model="outboundForm.daterange"
											type="daterange"
											range-separator="-"
											start-placeholder="开始"
											end-placeholder="结束"
											size="small"
											:clearable="false"
											format="YYYY/MM/DD"
											value-format="YYYY-MM-DD"
										/>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</template>
					<template #operateRight>
						<el-space>
							<el-dropdown trigger="click">
								<el-button type="primary" :icon="ArrowDown"> 批量操作 </el-button>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item>
											<el-button
												type="primary"
												link
												:icon="Upload"
												@click="
													getExportData(
														'third',
														createOutboundTableColumns(),
													)
												"
											>
												导出
											</el-button>
										</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</el-space>
					</template>
					<template #table>
						<TablePlus
							ref="outboundTableRef"
							:tableData="outboundData"
							:selection="false"
							border
							:loading="outboundLoading"
							:visibleColumnsData="outboundVisibleColumnsData"
							@select-keys="outboundHandleSelectionChange"
						>
						</TablePlus>
					</template>
					<!-- 分页 -->
					<template #pagination>
						<el-pagination
							style="margin-top: 10px"
							v-model:current-page="outboundTableBaseOptions.pagination.current"
							v-model:page-size="outboundTableBaseOptions.pagination.pageSize"
							:total="outboundTableBaseOptions.pagination.total"
							:pager-count="outboundTableBaseOptions.pagination.pagerCount"
							:page-sizes="outboundTableBaseOptions.pagination.sizeList"
							background
							layout="total, sizes, prev, pager, next, jumper"
							@size-change="outboundOnPageSizeChange"
							@current-change="outboundOnCurrentChange"
						/>
					</template>
				</CustomTableMould>
			</el-tab-pane>
			<el-tab-pane name="fourth">
				<template #label>
					<span class="custom-tabs-label">
						<el-icon><Warning /></el-icon>
						<span>预警信息</span>
					</span>
				</template>
				<CustomTableMould
					:title="'预警信息'"
					:table-columns="warningData"
					@reset-search="resetWarningForm"
					@search="warningResetData"
				>
					<template #form>
						<el-form :model="warningForm" label-position="left" label-width="auto">
							<el-row :gutter="24">
								<el-col :span="4">
									<el-form-item label="名称">
										<el-input
											v-model.trim="warningForm.materialName"
											placeholder="名称"
											clearable
										/>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="型号">
										<el-input
											v-model.trim="warningForm.spec"
											placeholder="型号"
											clearable
										/>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="仓库">
										<el-select
											v-model="warningForm.storeCode"
											filterable
											clearable
										>
											<el-option
												v-for="dict in storeSelectList"
												:key="dict.code"
												:label="dict.name"
												:value="dict.code"
											/>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="供应商">
										<el-select
											v-model="warningForm.supplierCode"
											filterable
											clearable
										>
											<el-option
												v-for="dict in supplierSelectList"
												:key="dict.code"
												:label="dict.name"
												:value="dict.code"
											/>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</template>
					<template #operateRight>
						<el-space>
							<el-dropdown trigger="click">
								<el-button type="primary" :icon="ArrowDown"> 批量操作 </el-button>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item>
											<el-button
												type="primary"
												link
												:icon="Upload"
												@click="
													getExportData(
														'fourth',
														createWarningTableColumns(),
													)
												"
											>
												导出
											</el-button>
										</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</el-space>
					</template>
					<template #table>
						<TablePlus
							ref="warningTableRef"
							:tableData="warningData"
							:selection="false"
							border
							:loading="warningLoading"
							:visibleColumnsData="warningVisibleColumnsData"
							@select-keys="warningHandleSelectionChange"
						>
						</TablePlus>
					</template>
					<!-- 分页 -->
					<template #pagination>
						<el-pagination
							style="margin-top: 10px"
							v-model:current-page="warningTableBaseOptions.pagination.current"
							v-model:page-size="warningTableBaseOptions.pagination.pageSize"
							:total="warningTableBaseOptions.pagination.total"
							:pager-count="warningTableBaseOptions.pagination.pagerCount"
							:page-sizes="warningTableBaseOptions.pagination.sizeList"
							background
							layout="total, sizes, prev, pager, next, jumper"
							@size-change="warningOnPageSizeChange"
							@current-change="warningOnCurrentChange"
						/>
					</template>
				</CustomTableMould>
			</el-tab-pane>
		</el-tabs>
	</Container>
</template>
<script setup lang="ts" name="inventoryManage">
import dayjs from 'dayjs';
import {
	CirclePlus,
	Edit,
	Delete,
	Search,
	ArrowDown,
	MoreFilled,
	Upload,
} from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import {
	createStoreTableColumns,
	createInboundTableColumns,
	createOutboundTableColumns,
	createWarningTableColumns,
} from './table'; // 表头配置
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
import { export_json_to_excel } from '@/utils';
import { useDictionaryStore } from '@/stores';
const dictionaryStore = useDictionaryStore();
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 仓库表单hooks
const { form: formState, resetForm: resetFormState } = useForm(
	() => ({
		materialName: '',
		spec: '',
		storeCode: '',
		supplierCode: '',
	}),
	() => storeResetData(),
);
// 入库表单hooks
const { form: inboundForm, resetForm: resetInboundForm } = useForm(
	() => ({
		materialName: '',
		spec: '',
		storeCode: '',
		supplierCode: '',
		daterange: [
			dayjs().subtract(0, 'days').startOf('month').format('YYYY-MM-DD'), // 一号
			dayjs().subtract(0, 'days').format('YYYY-MM-DD'),
		],
	}),
	() => inboundResetData(),
);
// 出库表单hooks
const { form: outboundForm, resetForm: resetOutboundForm } = useForm(
	() => ({
		materialName: '',
		spec: '',
		storeCode: '',
		supplierCode: '',
		daterange: [
			dayjs().subtract(0, 'days').startOf('month').format('YYYY-MM-DD'), // 一号
			dayjs().subtract(0, 'days').format('YYYY-MM-DD'),
		],
	}),
	() => outboundResetData(),
);
// 预警表单hooks
const { form: warningForm, resetForm: resetWarningForm } = useForm(
	() => ({
		materialName: '',
		spec: '',
		storeCode: '',
		supplierCode: '',
	}),
	() => warningResetData(),
);
// 当前tab
const activeName = ref('first');
// 仓库表格hooks
const {
	tableRef: storeTableRef, // 表格实例
	selectRow: storeSelectRow, // 当前选中的值
	columnsData: storeColumnsData, // 表头设置
	visibleColumnsData: storeVisibleColumnsData, //表格的列描述信息
	tableBaseOptions: storeTableBaseOptions, //基础表格设置
	onPageSizeChange: storeOnPageSizeChange, // 改变每页数量
	onCurrentChange: storeOnCurrentChange, // 改变当前页码
	resetData: storeResetData, // 重置分页筛选
	setSelectRow: storeSetSelectRow, // 设置当前数据
	extendTableList: storeExtendTableList, // 处理表格数据
	handleSelectionChange: storeHandleSelectionChange, // 多选
} = useTable(createStoreTableColumns(), () => initStoreData());
// 入库表格hooks
const {
	tableRef: inboundTableRef, // 表格实例
	selectRow: inboundSelectRow, // 当前选中的值
	columnsData: inboundColumnsData, // 表头设置
	visibleColumnsData: inboundVisibleColumnsData, //表格的列描述信息
	tableBaseOptions: inboundTableBaseOptions, //基础表格设置
	onPageSizeChange: inboundOnPageSizeChange, // 改变每页数量
	onCurrentChange: inboundOnCurrentChange, // 改变当前页码
	resetData: inboundResetData, // 重置分页筛选
	setSelectRow: inboundSetSelectRow, // 设置当前数据
	extendTableList: inboundExtendTableList, // 处理表格数据
	handleSelectionChange: inboundHandleSelectionChange, // 多选
} = useTable(createInboundTableColumns(), () => initInboundData());
// 出库表格hooks
const {
	tableRef: outboundTableRef, // 表格实例
	selectRow: outboundSelectRow, // 当前选中的值
	columnsData: outboundColumnsData, // 表头设置
	visibleColumnsData: outboundVisibleColumnsData, //表格的列描述信息
	tableBaseOptions: outboundTableBaseOptions, //基础表格设置
	onPageSizeChange: outboundOnPageSizeChange, // 改变每页数量
	onCurrentChange: outboundOnCurrentChange, // 改变当前页码
	resetData: outboundResetData, // 重置分页筛选
	setSelectRow: outboundSetSelectRow, // 设置当前数据
	extendTableList: outboundExtendTableList, // 处理表格数据
	handleSelectionChange: outboundHandleSelectionChange, // 多选
} = useTable(createOutboundTableColumns(), () => initOutboundData());
// 预警表格hooks
const {
	tableRef: warningTableRef, // 表格实例
	selectRow: warningSelectRow, // 当前选中的值
	columnsData: warningColumnsData, // 表头设置
	visibleColumnsData: warningVisibleColumnsData, //表格的列描述信息
	tableBaseOptions: warningTableBaseOptions, //基础表格设置
	onPageSizeChange: warningOnPageSizeChange, // 改变每页数量
	onCurrentChange: warningOnCurrentChange, // 改变当前页码
	resetData: warningResetData, // 重置分页筛选
	setSelectRow: warningSetSelectRow, // 设置当前数据
	extendTableList: warningExtendTableList, // 处理表格数据
	handleSelectionChange: warningHandleSelectionChange, // 多选
} = useTable(createWarningTableColumns(), () => initWarningData());
// 切换tab时重置表单数据
const handleClick = (tab) => {
	if (tab === 'first') {
		initStoreData();
	} else if (tab === 'second') {
		initInboundData();
	} else if (tab === 'third') {
		initOutboundData();
	} else if (tab === 'fourth') {
		initWarningData();
	}
};
// 查询仓库下拉框
const { data: storeSelectList } = useAsyncData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.ZERO_INVENTORY.QUERY_STORE_SELECT_ALL,
		method: 'get',
	});
	if (err) return;
	return res?.content; // 处理数据
});
// 查询仓库信息
const { data: storeInfo, initData: initStoreInfo } = useAsyncData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.ZERO_INVENTORY.QUERY_STORE_INFO,
		method: 'get',
	});
	if (err) return;
	return [res?.content]; // 处理数据
});
// 查询供应商列表
const { data: supplierSelectList } = useAsyncData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.ZERO_INVENTORY.QUERY_SUPPLIER_SELECT_ALL,
		method: 'get',
	});
	if (err) return;
	return res?.content; // 处理数据
});
// 获取仓库列表
const {
	data: storeData,
	loading: storeLoading,
	initData: initStoreData,
} = useAsyncNoInitData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.ZERO_INVENTORY.QUERY_STORE_LIST,
		params: {
			...formState.value,
			pageNo: storeTableBaseOptions.pagination.current,
			pageSize: storeTableBaseOptions.pagination.pageSize,
		},
		method: 'get',
	});
	if (err) return;
	// 赋值总页数
	storeTableBaseOptions.pagination.total = res?.total ?? 0;
	return storeExtendTableList(res?.content); // 处理数据
});
// 获取入库库列表
const {
	data: inboundData,
	loading: inboundLoading,
	initData: initInboundData,
} = useAsyncNoInitData(async () => {
	const { daterange, ...otherForm } = inboundForm.value;
	const { res, err } = await curryingRequestUrl({
		url: URL.ZERO_INVENTORY.QUERY_IN_OR_OUT_LIST,
		params: {
			...otherForm,
			beginTime: daterange[0],
			endTime: daterange[1],
			pageNo: inboundTableBaseOptions.pagination.current,
			pageSize: inboundTableBaseOptions.pagination.pageSize,
			mode: 1, // 入库
		},
		method: 'get',
	});
	if (err) return;
	// 赋值总页数
	inboundTableBaseOptions.pagination.total = res?.total ?? 0;
	return inboundExtendTableList(res?.content); // 处理数据
});
// 获取出库库列表
const {
	data: outboundData,
	loading: outboundLoading,
	initData: initOutboundData,
} = useAsyncNoInitData(async () => {
	const { daterange, ...otherForm } = outboundForm.value;
	const { res, err } = await curryingRequestUrl({
		url: URL.ZERO_INVENTORY.QUERY_IN_OR_OUT_LIST,
		params: {
			...otherForm,
			beginTime: daterange[0],
			endTime: daterange[1],
			pageNo: outboundTableBaseOptions.pagination.current,
			pageSize: outboundTableBaseOptions.pagination.pageSize,
			mode: 2, // 出库
		},
		method: 'get',
	});
	if (err) return;
	// 赋值总页数
	outboundTableBaseOptions.pagination.total = res?.total ?? 0;
	return outboundExtendTableList(res?.content); // 处理数据
});
// 获取预警列表
const {
	data: warningData,
	loading: warningLoading,
	initData: initWarningData,
} = useAsyncNoInitData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.ZERO_INVENTORY.QUERY_STORE_WARN_LIST,
		params: {
			...warningForm.value,
			pageNo: warningTableBaseOptions.pagination.current,
			pageSize: warningTableBaseOptions.pagination.pageSize,
		},
		method: 'get',
	});
	if (err) return;
	// 赋值总页数
	warningTableBaseOptions.pagination.total = res?.total ?? 0;
	return warningExtendTableList(res?.content); // 处理数据
});

// 获取数据列表
const getExportData = async (type, columns) => {
	switch (type) {
		case 'first': {
			const { res, err } = await curryingRequestUrl({
				url: URL.ZERO_INVENTORY.QUERY_STORE_LIST,
				params: {
					...formState.value,
					pageNo: 1,
					pageSize: 99999,
				},
				method: 'get',
			});
			if (err) return null;
			return exportData(res?.content, columns, `库存_${new Date().getTime()}`);
		}
		case 'second': {
			const { daterange, ...otherForm } = inboundForm.value;
			const { res, err } = await curryingRequestUrl({
				url: URL.ZERO_INVENTORY.QUERY_IN_OR_OUT_LIST,
				params: {
					...otherForm,
					beginTime: daterange[0],
					endTime: daterange[1],
					pageNo: 1,
					pageSize: 99999,
					mode: 1, // 入库
				},
				method: 'get',
			});
			if (err) return null;
			return exportData(res?.content, columns, `入库记录_${new Date().getTime()}`);
		}
		case 'third': {
			const { daterange, ...otherForm } = outboundForm.value;
			const { res, err } = await curryingRequestUrl({
				url: URL.ZERO_INVENTORY.QUERY_IN_OR_OUT_LIST,
				params: {
					...otherForm,
					beginTime: daterange[0],
					endTime: daterange[1],
					pageNo: 1,
					pageSize: 99999,
					mode: 2, // 出库
				},
				method: 'get',
			});
			if (err) return null;
			return exportData(res?.content, columns, `出库记录_${new Date().getTime()}`);
		}
		case 'fourth': {
			const { res, err } = await curryingRequestUrl({
				url: URL.ZERO_INVENTORY.QUERY_STORE_WARN_LIST,
				params: {
					...warningForm.value,
					pageNo: 1,
					pageSize: 99999,
				},
				method: 'get',
			});
			if (err) return null;
			return exportData(res?.content, columns, `预警信息_${new Date().getTime()}`);
		}
		default:
			return null;
	}
};

/**
 * 导出Excel处理函数
 * @param {Array} data - 表格数据源
 * @param {Array} columns - 表头配置
 * @param {String} fileName - 文件名
 */
const exportData = (data, columns, fileName) => {
	if (!data || data.length === 0) {
		ElMessage.warning('暂无数据可导出');
		return;
	}
	// 1. 过滤掉不需要导出的列
	const exportColumns = columns.filter(
		(col) => col.key !== 'operate' && col.key !== 'sortTableNo',
	);
	// 2. 构造表头
	const header = exportColumns.map((col) => col.title);
	// 3. 构造数据体
	const exportRows = data.map((row) => {
		return exportColumns.map((col) => {
			const value = row[col.key]; // 获取原始值
			if (col.key === 'quantity') {
				const unit = row.unit;
				return `${value}${unit}`;
			}
			if (col.key === 'warnLevel') {
				const cur = dictionaryStore.getDictionaryItem('warning_level', row[col.key]);
				return cur.label;
			}
			return value;
		});
	});
	// 5. 调用导出
	export_json_to_excel({
		header,
		data: exportRows,
		filename: fileName,
	});
};
onActivated(() => {
	initStoreData();
});
</script>
<style scoped lang="scss">
/* ===== 统计条 ===== */
.stats-bar {
	display: flex;
	gap: 28px;
	background: #f7faff;
	padding: 12px 24px;
	border-radius: 60px;
	margin-bottom: 5px;
	border: 1px solid #e9eff8;
	flex-wrap: wrap;
}
.stats-bar .stat-item {
	font-size: 14px;
	color: #1d2c48;
	display: flex;
	align-items: center;
	gap: 4px;
}
.stats-bar .stat-item i {
	color: #2a6df4;
	width: 18px;
	text-align: center;
}
.stats-bar .stat-item strong {
	font-weight: 600;
	color: #0b1a33;
}
.custom-tabs-label {
	display: flex;
	align-items: center;
}
</style>
