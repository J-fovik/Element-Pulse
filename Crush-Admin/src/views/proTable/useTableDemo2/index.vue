<template>
	<div>
		<CustomTableMould
			fold
			:table-columns="columnsData"
			@reset-search="resetForm"
			@search="resetData"
		>
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
							<el-select v-model="form.gender" filterable placeholder="请选择性别">
								<el-option
									v-for="item in genderList"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								/>
							</el-select>
						</SearchItem>
						<SearchItem label="类型:" class="mb5">
							<el-select
								v-model="form.type"
								filterable
								placeholder="请选择类型"
								:disabled="typeList.length == 0"
							>
								<el-option
									v-for="item in typeList"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								/>
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
					<el-button type="primary" :icon="CirclePlus" @click="setActiveKey('AddEditor')"
						>新增</el-button
					>
					<el-button
						type="danger"
						:icon="Delete"
						plain
						:disabled="tableBaseOptions.selectedKeys.length == 0"
					>
						删除
					</el-button>
				</el-space>
			</template>
			<template #table>
				<TablePlus
					ref="tableRef"
					:tableData="tableData"
					:selection="visibleColumnsData.length > 0 ? true : false"
					:loading="loading"
					:selectable="selectable"
					:visibleColumnsData="visibleColumnsData"
					@select-keys="handleSelectionChange"
				>
					<template #status="{ row }">
						<el-switch v-model="row.status" active-value="1" inactive-value="0">
						</el-switch>
					</template>
					<template #operate="{ row }">
						<el-space spacer="|">
							<el-button
								type="success"
								text
								@click="
									setSelectRow({ ...row, isReadOnly: true }, () =>
										setActiveKey('AddEditor')
									)
								"
								>详情</el-button
							>
							<el-button
								type="primary"
								text
								@click="setSelectRow(row, () => setActiveKey('AddEditor'))"
								>编辑</el-button
							>
							<el-button type="danger" text>删除</el-button>
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
		</CustomTableMould>
		<!-- 新增编辑模态框 -->
		<!-- 实现逻辑就是模态框一直打开状态，根据activeKey控制展示或者销毁，必须用v-if -->
		<Operation
			v-if="activeKey === 'AddEditor'"
			:data="selectRow"
			@success="initData"
			@close="setSelectRow({}, () => setActiveKey(null))"
		></Operation>
	</div>
</template>
<script setup lang="ts" name="useTableDemo2">
import { CirclePlus, Delete } from '@element-plus/icons-vue';
import { sleep } from '@/utils/other';
import {
	useForm,
	useTable,
	useBasicsState,
	curryingRequest,
	useAsyncData,
	useAsyncNoInitData,
	useAsyncWatchData,
} from '@/hooks';
import { ALL_OPTIONS } from '@/utils/options'; // 全部
import {
	TABLE_DATA,
	GENDER_OPTIONS,
	TYPES_A_OPTIONS,
	TYPES_B_OPTIONS,
	STATUS_OPTIONS,
} from './options'; // 模拟接口数据
import { createTableColumns } from './table'; // 表头配置
import // getUserList,
//   deleteUser,
//   editUser,
//   addUser,
//   changeUserStatus,
//   resetUserPassWord,
//   exportUserInfo,
//   BatchAddUser,
//   getUserStatus,
//   getUserGender
'@/api/modules/user';
import Operation from './components/index.vue';

// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 表单hooks
const { form, resetForm } = useForm(
	() => ({
		name: '', // 姓名
		status: '', // 状态
		gender: '', // 性别
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
	setSelectRow, // 设置当前数据
	extendTableList, // 处理表格数据
	handleSelectionChange, // 多选
} = useTable(createTableColumns(), () => initData());
// 获取性别列表
const { data: genderList } = useAsyncData(async () => {
	// const { res, err } = await curryingRequest(() => getSexList({}));
	// 处理错误
	// if (err) return;
	// 返回处理后的数据
	return GENDER_OPTIONS;
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
		if (form.value.gender == '1') return TYPES_A_OPTIONS;
		else return TYPES_B_OPTIONS;
	},
	{ watchSource: () => form.value.gender, defaultValue: [] }
);
// 判断当前列是否可以选择
const selectable = (row: any) => {
	return row.status !== '1';
};
// 获取表格列表
const {
	data: tableData,
	loading,
	initData,
} = useAsyncData(async () => {
	await sleep(1000);
	// const { res, err } = await curryingRequest(() =>
	//     getUserList({
	//         ...form.value,
	//         currentPage: tableBaseOptions.pagination.current,
	//         pageSize: tableBaseOptions.pagination.pageSize,
	//     })
	// );
	// // 处理错误
	// if (err) return;
	// 赋值总页数
	tableBaseOptions.pagination.total = TABLE_DATA.total;
	return extendTableList(TABLE_DATA.tableData, ['money']); // 处理数据
});
</script>
