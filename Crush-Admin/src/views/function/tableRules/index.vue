<template>
	<el-card shadow="hover">
		<template #header>
			<div class="flex items-center justify-between">
				<div>表单表格验证</div>
				<el-button size="default" type="primary" @click="addTableItem">新增一行</el-button>
			</div>
		</template>
		<el-form ref="formRef" :model="form.tableData" size="default" :rules="rules">
			<TablePlus ref="tableRef" :tableData="form.tableData" :visibleColumnsData="columns">
				<template #label="{ row, $index }">
					<el-form-item
						:prop="`tableData[${$index}].value`"
						:rules="{
							required: true,
							message: 'domain can not be null',
							trigger: 'blur',
						}"
					>
						<el-input v-model.trim="row.label" placeholder="请输入名称" />
					</el-form-item>
				</template>
				<template #value="{ row, $index }">
					<el-form-item :prop="`tableData[${$index}].value`">
						<el-input v-model.trim="row.value" placeholder="请输入数值" />
					</el-form-item>
				</template>
				<template #operate="{ $index }">
					<el-button type="danger" text @click="deleteTableItem($index)">删除</el-button>
				</template>
			</TablePlus>
		</el-form>
		<el-row class="flex mt15">
			<div class="flex-margin">
				<el-button size="default" type="success" @click="onValidate(formRef)"
					>表格验证</el-button
				>
			</div>
		</el-row>
	</el-card>
</template>

<script setup lang="ts" name="tableRules">
import { ElMessage } from 'element-plus';
import { useForm, useBasicsState } from '@/hooks';
import { columns } from './table'; // 表头配置
// 弹窗状态控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 表单
const { form, formRef } = useForm(() => ({
	tableData: [] as any,
}));
// 表单验证
const rules = {
	label: {
		required: true,
		message: '请输入编号',
	},
	value: {
		required: true,
		message: '请输入名称',
	},
};

// 表格验证
const onValidate = (formEl: any) => {
	if (form.value.tableData.length <= 0) return ElMessage.warning('请先点击增加一行');
	if (!formEl) return;
	formEl.validate((valid) => {
		if (!valid) return ElMessage.warning('表格项必填未填');
		ElMessage.success('全部验证通过');
	});
};
// 添加空数据
const addTableItem = () => {
	form.value.tableData.push({ label: '', value: '' });
};
// 删除
const deleteTableItem = (len: number) => {
	form.value.tableData.splice(len, 1);
};
</script>
