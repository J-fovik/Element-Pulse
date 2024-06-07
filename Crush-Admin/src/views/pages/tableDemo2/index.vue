<template>
	<div class="layout-padding">
		<div class="layout-padding-view layout-padding-auto">
			<CustomTable fold :table-columns="columnsData" @reset-search="resetForm" @search="resetData">
				<template #form>
					<el-form :model="form" label-position="left">
						<el-row :gutter="24">
							<SearchItem label="名称:" class="mb5">
								<el-input v-model.trim="form.name" placeholder="请输入名称" />
							</SearchItem>
							<SearchItem label="状态:" class="mb5">
								<el-select v-model="form.status" filterable placeholder="请输入状态">
									<el-option
										v-for="item in [...ALL_OPTIONS, ...STATUS_OPTIONS]"
										:key="item.label"
										:label="item.label"
										:value="item.value"
										:disabled="item.disabled"
									/>
								</el-select>
							</SearchItem>
							<SearchItem label="性别:" class="mb5">
								<el-select v-model="form.sex" filterable placeholder="请选择性别">
									<el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value" />
								</el-select>
							</SearchItem>
							<SearchItem label="类型:" class="mb5">
								<el-select v-model="form.type" filterable placeholder="请选择类型" :disabled="typeList.length == 0">
									<el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
								</el-select>
							</SearchItem>
							<SearchItem label="日期:" class="mb5">
								<el-date-picker
									v-model="form.date"
									type="date"
									placeholder="请选择开始时间"
									format="YYYY/MM/DD"
									value-format="YYYY-MM-DD"
								/>
							</SearchItem>
						</el-row>
					</el-form>
				</template>
				<template #operate>
					<el-space>
						<el-button type="success" size="default" @click="$router.push(`/pages/tableDemo2/operate`)">
							<el-icon><ele-DocumentAdd /></el-icon>新增
						</el-button>
						<el-button type="danger" size="default" :disabled="tableBaseOptions.selectedKeys.length == 0" @click="handleDelete">
							<el-icon><ele-Delete /></el-icon> 删除
						</el-button>
					</el-space>
				</template>
				<template #table>
					<!-- 方式一 -->
					<!-- <el-table ref="tableRef" :data="tableData" @selection-change="handleSelectionChange" v-loading="loading">
						<el-table-column type="selection" width="55" />
						<el-table-column
							v-for="(item, index) in visibleColumnsData"
							:key="index"
							:show-overflow-tooltip="item.tooltip"
							:prop="item.key"
							:width="item.width"
							:label="item.title"
							:align="item.align"
							:header-align="item.headerAlign"
							:show-header="item.show"
							:formatter="item.formatter"
						>
							<template #default="{ row }" v-if="item.key == 'status'">
								<el-switch v-model="row.status" active-value="1" inactive-value="0"> </el-switch>
							</template>
							<template #default="{ row }" v-if="item.key == 'operate'">
								<el-button text type="primary">编辑</el-button>
							</template>
							<template #default="{ row }" v-if="item.key == 'image'">
								<el-image
									v-if="row.image"
									:preview-src-list="[row.image]"
									style="width: 100px; height: 100px"
									:src="row.image"
									fit="cover"
								/>
								<div v-else>--</div>
							</template>
						</el-table-column>
						<template #empty>
							<el-empty description="暂无数据" />
						</template>
					</el-table> -->

					<!-- 方式二 -->
					<TablePlus
						ref="tableRef"
						:tableData="tableData"
						:selection="visibleColumnsData.length > 0 ? true : false"
						:loading="loading"
						:visibleColumnsData="visibleColumnsData"
						@selectKeys="handleSelectionChange"
					>
						<template #status="{ row }">
							<el-switch v-model="row.status" active-value="1" inactive-value="0"> </el-switch>
						</template>
						<template #image="{ row }">
							<el-image
								v-if="row.image"
								:preview-src-list="[row.image]"
								style="width: 100px; height: 100px"
								:src="row.image"
								fit="cover"
							/>
							<div v-else>--</div>
						</template>
						<template #operate="{ row }">
							<el-space>
								<el-button type="success" text @click="$router.push(`/pages/tableDemo2/operate?id=${row.id}&isReadOnly=true`)"
									>详情</el-button
								>
								<el-button type="primary" text @click="$router.push(`/pages/tableDemo2/operate?id=${row.id}`)">编辑</el-button>
								<el-button type="danger" text @click="handleDelete(row)">删除</el-button>
							</el-space>
						</template>
					</TablePlus>
				</template>
				<!-- 分页 -->
				<template #pagination>
					<el-pagination
						v-model:current-page="tableBaseOptions.pagination.current"
						v-model:page-size="tableBaseOptions.pagination.pageSize"
						:total="tableBaseOptions.pagination.total"
						:pager-count="tableBaseOptions.pagination.pagerCount"
						:page-sizes="tableBaseOptions.pagination.sizeList"
						background
						layout="total, sizes, prev, pager, next, jumper"
						@size-change="onPageSizeChange"
						@current-change="onCurrentChange"
					/>
				</template>
			</CustomTable>
		</div>
	</div>
</template>
<script setup lang="ts" name="pagesTableDemo2">
import { onActivated } from 'vue';
import { useForm, useTable, useBasicsState, curryingRequest, useAsyncData, useAsyncNoInitData, useAsyncWatchData } from '/@/hooks';
import { createTableColumns } from './table'; // 表头配置
// import { getTableList, getTypeList, getSexList } from '/@/api/test';// 模拟接口
import { ALL_OPTIONS } from '/@/utils/options'; // 全部
import { toast } from '/@/utils/elementPlus';
import { TABLE_DATA, SEX_OPTIONS, TYPES_A_OPTIONS, TYPES_B_OPTIONS, STATUS_OPTIONS } from './options'; // 模拟接口数据
import { showModal } from '/@/utils/elementPlus';
import commonFunction from '/@/utils/commonFunction';
const { sleep } = commonFunction();

// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 表单hooks
const { form, resetForm } = useForm(
	() => ({
		name: '', // 姓名
		status: '', // 状态
		sex: '', // 性别
		type: '', // 类型
		date: '', // 日期
	}),
	() => resetData()
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
	extendTableList, // 处理表格数据
	createRowNo, // 生成序号
	setSelectRow, // 设置当前数据
	handleSelectionChange, // 多选
} = useTable(createTableColumns(), () => initData());

// 获取性别列表
const { data: sexList } = useAsyncData(async () => {
	// const { res, err } = await curryingRequest(() => getSexList({}));
	// 处理错误
	// if (err) return;
	// 返回处理后的数据
	return SEX_OPTIONS;
});
// 监听性别变换获取类型
const { data: typeList } = useAsyncWatchData<Array<any>>(
	async () => {
		// const { res, err } = await curryingRequest(() => getTypeList({}));
		// 处理错误
		// if (err) return;
		// 每次请求将其赋空
		form.value.type = '';
		// 模拟变化参数后端返回不同数据
		if (form.value.sex == '1') return TYPES_A_OPTIONS;
		else return TYPES_B_OPTIONS;
	},
	{ watchSource: () => form.value.sex, defaultValue: [] }
);
// 删除功能
const handleDelete = (row: any) => {
	const title = ref('');
	const isRow = ref(false);
	if (row && row.id) {
		title.value = '确定删除当前数据？';
		isRow.value = true;
	} else {
		title.value = '确定删除已选数据？';
		isRow.value = false;
	}
	showModal(title.value).then((res) => {
		isRow.value ? toast('删除当前列' + row.id) : toast('删除选择列' + tableBaseOptions.selectedKeys.map((o: any) => o.id));
		// 调用接口删除成功后清空已选
		tableBaseOptions.selectedKeys = [];
	});
};
// 获取表格列表
const {
	data: tableData,
	loading,
	initData,
} = useAsyncNoInitData(async () => {
	await sleep(1000);
	console.log('表单参数', form.value);
	toast('当前页：' + tableBaseOptions.pagination.current + '，每页数量' + tableBaseOptions.pagination.pageSize);
	// const { res, err } = await curryingRequest(() =>
	// getTableList({
	// 		...form.value,
	// 		currentPage: tableBaseOptions.pagination.current,
	// 		pageSize: tableBaseOptions.pagination.pageSize,
	// 	})
	// );
	// // 处理错误
	// if (err) return;
	// 设置分页信息
	tableBaseOptions.pagination.total = TABLE_DATA.total; // 赋值总页数
	// 可直接返回数据 或 返回处理后数据
	return extendTableList(
		TABLE_DATA.tableData.map((o: any) => {
			o.num = o.num * 1; // 转数字
			o.disabled = o.status == '0';
			return o;
		})
	); // 处理数据
});
// onActivated 可用于跳转页面返回刷新列表
onActivated(() => {
	console.log('onActivated,请求数据了');
	initData();
});
</script>
