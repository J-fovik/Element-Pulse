<template>
	<div>
		<el-card shadow="hover" header="表单组件1">
			<FormRulesOne :data="state.formRulesOneData" ref="pagesFormRulesOneRef" />
		</el-card>
		<el-card shadow="hover" header="表单组件2" class="mt15">
			<FormRulesTwo ref="pagesFormRulesTwoRef" />
		</el-card>
		<el-card shadow="hover" header="表单组件3" class="mt15">
			<FormRulesThree :data="state.formRulesThreeData" ref="pagesFormRulesThreeRef" />
		</el-card>
		<div style="height: 100px"></div>
		<el-card class="footerCard flex justify-end items-end">
			<el-space>
				<el-button @click="onResetForm">
					<el-icon><RefreshRight class="mr5" /></el-icon>
					重置表单
				</el-button>
				<el-button type="primary" @click="onSubmitForm">
					<el-icon><SuccessFilled class="mr5" /></el-icon>
					验证表单
				</el-button>
			</el-space>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="formRules">
import { ElMessage } from 'element-plus';
import FormRulesOne from './components/FormRulesOne.vue';
import FormRulesTwo from './components/FormRulesTwo.vue';
import FormRulesThree from './components/FormRulesThree.vue';

// 定义变量内容
const pagesFormRulesOneRef = ref();
const pagesFormRulesTwoRef = ref();
const pagesFormRulesThreeRef = ref();
const state = reactive({
	formRulesOneData: {
		name: 'lyt',
		email: 'lyt123@.com',
		autograph: 'lyt123456',
		occupation: '1',
	},
	formRulesThreeData: { createUser: 'aaaa', editUser: 'bbbb', user: 'cccc', department: '555' },
});

// 表单组件验证
const formRulesValidate = (pageRef: any, sonRef: string) => {
	return new Promise((resolve) => {
		pageRef.value.$refs[sonRef].validate((valid: boolean) => {
			if (valid) resolve(valid);
		});
	});
};
// 表单组件重置
const formRulesResetFields = () => {
	pagesFormRulesOneRef.value.$refs.formRulesOneRef.resetFields();
	pagesFormRulesTwoRef.value.$refs.formRulesTwoRef.resetFields();
	pagesFormRulesThreeRef.value.$refs.formRulesThreeRef.resetFields();
};
// 验证表单
const onSubmitForm = () => {
	Promise.all([
		formRulesValidate(pagesFormRulesOneRef, 'formRulesOneRef'),
		formRulesValidate(pagesFormRulesTwoRef, 'formRulesTwoRef'),
		formRulesValidate(pagesFormRulesThreeRef, 'formRulesThreeRef'),
	]).then(() => {
		ElMessage.success('表单全部验证成功');
		console.log(state.formRulesOneData);
		console.log(pagesFormRulesTwoRef.value.getFormData());
		console.log(state.formRulesThreeData);
	});
};
// 重置表单
const onResetForm = () => {
	formRulesResetFields();
};
</script>
