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
				<el-table-column prop="value" label="数值" align="center">
					<template #default="{ row, $index }">
						<el-form-item :prop="'tableData.' + $index + '.value'" :rules="rules.value">
							<el-input v-model="row.value" placeholder="请输入数值" />
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
		{ label: '1', value: '2', startTime: '2023-10-18', endTime: '2023-11-10' },
		{ label: '', value: '', startTime: '', endTime: '' },
	] as any,
}));
// 表单验证
const rules = {
	label: [
		{
			required: true,
			message: '请输入名称',
			trigger: 'blur',
		},
	],
	value: [
		{
			required: false,
			message: '请输入数值',
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
	form.value.tableData.push({ label: '', value: '', startTime: '', endTime: '' });
};
// 删除
const deleteTableItem = (len: number) => {
	form.value.tableData.splice(len, 1);
};
</script>
