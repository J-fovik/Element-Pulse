<template>
	<Container>
		<el-form
			ref="formRef"
			:model="form"
			label-align="left"
			:rules="rules"
			label-width="auto"
			label-position="top"
		>
			<el-button @click="console.log(form)">查看</el-button>
			<el-button @click="validateData(formRef)">提交</el-button>
			<el-alert title="输入验证" type="warning" :closable="false" class="mb20" />
			<el-form-item label="小数或整数(不可以负数):" prop="a1">
				<el-input
					v-model.trim="form.a1"
					@input="onVerifyNumberIntegerAndFloat($event)"
					placeholder="请输入"
				/>
			</el-form-item>
			<el-form-item label="数字(小数、整数或负数):" prop="a2">
				<el-input
					v-model.trim="form.a2"
					@input="onVerifyNumber($event)"
					placeholder="请输入"
				/>
			</el-form-item>
			<el-form-item label="金额格式化:" prop="a3">
				<el-input
					v-model.trim="form.a3"
					@input="onMoneyFormat($event)"
					placeholder="请输入"
				/>
			</el-form-item>
			<el-form-item label="正整数:" prop="a4">
				<el-input
					v-model.trim="form.a4"
					@input="onVerifyNumberInteger($event)"
					placeholder="请输入"
				/>
			</el-form-item>
			<el-form-item label="百分比（不可以小数）:" prop="a5">
				<el-input
					v-model.trim="form.a5"
					@input="onVerifyNumberPercentage($event)"
					placeholder="请输入"
				>
					<template #append> % </template>
				</el-input>
			</el-form-item>
			<el-form-item label="百分比（可以小数）:" prop="a6">
				<el-input
					v-model.trim="form.a6"
					@input="onVerifyNumberPercentageFloat($event)"
					placeholder="请输入"
				>
					<template #append> % </template>
				</el-input>
			</el-form-item>
			<el-alert title="规则验证" type="warning" :closable="false" class="my20" />
			<el-form-item label="验证手机号:" prop="a7">
				<el-input v-model.trim="form.a7" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证座机号码:" prop="a8">
				<el-input v-model.trim="form.a8" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证网址格式:" prop="a9">
				<el-input v-model.trim="form.a9" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证IP地址:" prop="a10">
				<el-input v-model.trim="form.a10" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证邮箱地址:" prop="a11">
				<el-input v-model.trim="form.a11" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证邮政编码:" prop="a12">
				<el-input v-model.trim="form.a12" placeholder="请输入" />
			</el-form-item>
		</el-form>
	</Container>
</template>

<script setup lang="ts" name="tools">
import { ElMessage } from 'element-plus';
import {
	verifyNumberIntegerAndFloat,
	verifyNumber,
	moneyFormat,
	verifyNumberInteger,
	verifyNumberPercentage,
	verifyNumberPercentageFloat,
	phoneRule,
	landlinePhoneRule,
	websiteRule,
	iPAddressRule,
	emailRule,
	postalCodeRule,
} from '@/utils/toolsValidate';
import { useForm } from '@/hooks';
/* 表单 */
const { form, formRef } = useForm<any>(() => ({}));
/* 表单验证 */
const rules = {
	a1: {
		required: true,
		message: '请输入小数或整数(不可以负数)',
		trigger: 'change',
	},
	a2: {
		required: true,
		message: '请输入数字',
		trigger: 'change',
	},
	a3: {
		required: true,
		message: '请输入金额',
		trigger: 'change',
	},
	a4: {
		required: true,
		message: '请输入正整数',
		trigger: 'change',
	},
	a5: {
		required: true,
		message: '请输入数字进行测试',
		trigger: 'change',
	},
	a6: {
		required: true,
		message: '请输入数字进行测试',
		trigger: 'change',
	},
	a7: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入号码'));
			if (!phoneRule(value)) callback(new Error('请输入正确的手机号码'));
			callback();
		},
		trigger: 'blur',
	},
	a8: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入号码'));
			if (!landlinePhoneRule(value)) callback(new Error('请输入正确的座机号码'));
			callback();
		},
		trigger: 'blur',
	},
	a9: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入网址'));
			if (!websiteRule(value)) callback(new Error('请输入正确的网址格式'));
			callback();
		},
		trigger: 'blur',
	},
	a10: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入IP地址'));
			if (!iPAddressRule(value)) callback(new Error('请输入正确的IP地址'));
			callback();
		},
		trigger: 'blur',
	},
	a11: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入邮箱地址'));
			if (!emailRule(value)) callback(new Error('请输入正确的邮箱地址'));
			callback();
		},
		trigger: 'blur',
	},
	a12: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			console.log(postalCodeRule(value));
			if (!value) callback(new Error('请输入邮政编码'));
			if (!postalCodeRule(value)) callback(new Error('请输入正确的邮政编码'));
			callback();
		},
		trigger: 'blur',
	},
};
// 小数或整数
const onVerifyNumberIntegerAndFloat = (val: string) => {
	form.value.a1 = verifyNumberIntegerAndFloat(val, 3);
};
// 小数、整数或负数
const onVerifyNumber = (val: string) => {
	form.value.a2 = verifyNumber(val);
};
// 金额格式化
const onMoneyFormat = (val: string) => {
	form.value.a3 = moneyFormat(val);
};
// 正整数
const onVerifyNumberInteger = (val: string) => {
	form.value.a4 = verifyNumberInteger(val);
};
// 验证百分比（不可以小数）
const onVerifyNumberPercentage = (val: string) => {
	form.value.a5 = verifyNumberPercentage(val);
};
// 验证百分比（可以小数）
const onVerifyNumberPercentageFloat = (val: string) => {
	form.value.a6 = verifyNumberPercentageFloat(val);
};
/* 验证数据 */
const validateData = (formEl: any) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			ElMessage.success('提交');
		} else return false;
	});
};
</script>

<style scoped lang="scss"></style>
