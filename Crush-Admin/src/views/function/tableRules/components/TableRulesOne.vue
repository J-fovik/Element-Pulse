<template>
	<el-card shadow="hover">
		<template #header>
			<div class="flex items-center justify-between">
				<div>表单表格验证</div>
				<el-button size="default" type="primary" @click="addTableItem">新增一行</el-button>
			</div>
		</template>
		<el-form ref="formRef" :model="form">
			<el-table :data="form.tableData" :border="false">
				<el-table-column prop="label" label="名称" align="center">
					<template #default="{ row, $index }">
						<el-form-item :prop="'tableData.' + $index + '.label'" :rules="rules.label">
							<el-input v-model="row.label" placeholder="请输入名称"></el-input>
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="类型" align="center">
					<template #default="{ row, $index }">
						<el-form-item :prop="'tableData.' + $index + '.type'" :rules="rules.type">
							<el-select
								v-model="row.type"
								filterable
								placeholder="请选择类型"
								:disabled="typeList.length == 0"
							>
								<el-option
									v-for="item in computedTypeList"
									:key="item.value"
									:label="item.label"
									:value="item.value"
									:disabled="item.disabled"
								/>
							</el-select>
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column prop="startTime" label="开始时间" align="center">
					<template #default="{ row, $index }">
						<el-form-item
							:prop="'tableData.' + $index + '.startTime'"
							:rules="rules.startTime"
						>
							<el-date-picker
								v-model="row.startTime"
								type="date"
								class="flex-1"
								placeholder="请选择开始时间"
								format="YYYY/MM/DD"
								value-format="YYYY-MM-DD"
								@change="row.endTime = ''"
							/>
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column prop="endTime" label="结束时间" align="center">
					<template #default="{ row, $index }">
						<el-form-item
							:prop="'tableData.' + $index + '.endTime'"
							:rules="rules.endTime"
						>
							<el-date-picker
								v-model="row.endTime"
								type="date"
								class="flex-1"
								placeholder="请选择结束时间"
								format="YYYY/MM/DD"
								value-format="YYYY-MM-DD"
								:disabled-date="
									(current) => dayjs(current).isBefore(dayjs(row.startTime))
								"
							/>
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column prop="operate" label="操作" align="center" width="100px">
					<template #default="{ $index }">
						<el-button type="danger" text @click="deleteTableItem($index)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</el-form>
		<div class="flx-center mt20">
			<el-button type="success" @click="onValidate(formRef)">表格验证</el-button>
		</div>
	</el-card>
</template>

<script setup lang="ts" name="TableRulesOne">
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { useForm, useBasicsState } from '@/hooks';
// 弹窗状态控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 表单
const { form, formRef } = useForm(() => ({
	tableData: [
		{ label: '1', type: '2', startTime: '2023-10-18', endTime: '2023-11-10' },
		{ label: '', type: '', startTime: '', endTime: '' },
	] as any,
}));
// 表单验证
const rules = {
	label: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入名称'));
			if (form.value.tableData.filter((item: any) => item.label === value).length > 1)
				callback(new Error('子项名称不允许重复'));
			callback();
		},
	},
	type: [
		{
			required: false,
			message: '请选择类型',
		},
	],
	startTime: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请选择开始时间'));
			callback();
		},
	},
	endTime: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请选择结束时间'));
			callback();
		},
	},
};
// 类型数组
const typeList = ref([
	{
		label: '类型一',
		value: '1',
	},
	{
		label: '类型二',
		value: '2',
	},
	{
		label: '类型三',
		value: '3',
	},
	{
		label: '类型四',
		value: '4',
	},
	{
		label: '类型五',
		value: '5',
	},
] as any);
// 计算禁用类型
const computedTypeList = computed(() => {
	return typeList.value.map((o) => {
		return {
			...o,
			disabled: form.value.tableData.some((table) => table.type === o.value),
		};
	});
});
// 表格验证
const onValidate = (formEl: any) => {
	if (form.value.tableData.length <= 0) return ElMessage.warning('请先点击增加一行');
	if (!formEl) return;
	formEl.validate((valid) => {
		if (!valid) return ElMessage.warning('表格项必填未填');
		ElMessage.success('全部验证通过');
		console.log(form.value);
	});
};
// 添加空数据
const addTableItem = () => {
	form.value.tableData.push({ label: '', type: '', startTime: '', endTime: '' });
};
// 删除
const deleteTableItem = (len: number) => {
	form.value.tableData.splice(len, 1);
};
</script>
