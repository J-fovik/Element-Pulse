<template>
	<el-form
		ref="formRef"
		:model="form"
		label-align="left"
		:rules="rules"
		label-width="auto"
		label-position="top"
	>
		<el-card shadow="hover" header="规则校验">
			<el-form-item label="验证手机号:" prop="a1">
				<el-input v-model.trim="form.a1" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证座机号码:" prop="a2">
				<el-input v-model.trim="form.a2" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证网址格式(url地址):" prop="a3">
				<el-input v-model.trim="form.a3" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证IP地址:" prop="a4">
				<el-input v-model.trim="form.a4" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证邮箱地址:" prop="a5">
				<el-input v-model.trim="form.a5" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证邮政编码:" prop="a6">
				<el-input v-model.trim="form.a6" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证汉字:" prop="a7">
				<el-input v-model.trim="form.a7" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证数字:" prop="a8">
				<el-input v-model.trim="form.a8" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证英文:" prop="a9">
				<el-input v-model.trim="form.a9" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证全特殊字符:" prop="a10">
				<el-input v-model.trim="form.a10" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证字母数字组合:" prop="a11">
				<el-input v-model.trim="form.a11" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证字母汉字组合:" prop="a12">
				<el-input v-model.trim="form.a12" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证身份证号码:" prop="a13">
				<el-input v-model.trim="form.a13" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证姓名是否正确，包括少数民族名字:" prop="a14">
				<el-input v-model.trim="form.a14" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证车牌号码:" prop="a15">
				<el-input v-model.trim="form.a15" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证时间格式为24小时制(HH:mm:ss):" prop="a16">
				<el-input v-model.trim="form.a16" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证强密码(字母+数字+特殊字符):" prop="a17">
				<el-input v-model.trim="form.a17" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证element表单输入是否为有效的手机号:" prop="a18">
				<el-input v-model.trim="form.a18" placeholder="请输入" />
			</el-form-item>
			<el-form-item label="验证element表单输入是否为有效的手机号或座机号:" prop="a19">
				<el-input v-model.trim="form.a19" placeholder="请输入" />
			</el-form-item>
		</el-card>
		<el-card shadow="hover" header="输入校验" class="mt20">
			<el-form-item label="小数或整数(不可以负数):" prop="b1">
				<el-input
					v-model.trim="form.b1"
					@input="onVerifyNumberIntegerAndFloat($event)"
					placeholder="请输入"
				/>
			</el-form-item>
			<el-form-item label="数字(小数、整数或负数):" prop="b2">
				<el-input
					v-model.trim="form.b2"
					@input="onVerifyNumber($event)"
					placeholder="请输入"
				/>
			</el-form-item>
			<el-form-item label="正整数:" prop="b3">
				<el-input
					v-model.trim="form.b3"
					@input="onVerifyNumberInteger($event)"
					placeholder="请输入"
				/>
			</el-form-item>
			<el-form-item label="百分比（不可以小数）:" prop="b4">
				<el-input
					v-model.trim="form.b4"
					@input="onVerifyNumberPercentage($event)"
					placeholder="请输入"
				>
					<template #append> % </template>
				</el-input>
			</el-form-item>
			<el-form-item label="百分比（可以小数）:" prop="b5">
				<el-input
					v-model.trim="form.b5"
					@input="onVerifyNumberPercentageFloat($event)"
					placeholder="请输入"
				>
					<template #append> % </template>
				</el-input>
			</el-form-item>
			<el-form-item label="去掉中文及空格:" prop="b6">
				<el-input
					v-model.trim="form.b6"
					@input="onVerifyCnAndSpace($event)"
					placeholder="请输入"
				/>
			</el-form-item>
			<el-form-item label="验证不可以输入空格与中文:" prop="b7">
				<el-input
					v-model.trim="form.b7"
					@input="onVerifyEnAndSpace($event)"
					placeholder="请输入"
				/>
			</el-form-item>
		</el-card>
		<div style="height: 100px"></div>
		<el-card class="footerCard flex justify-end items-end">
			<el-space>
				<el-button type="primary" @click="console.log(form)">查看</el-button>
				<el-button type="primary" @click="validateData(formRef)">提交</el-button>
			</el-space>
		</el-card>
	</el-form>
</template>

<script setup lang="ts" name="tools">
import { ElMessage } from 'element-plus';
import {
	phoneRule,
	landlinePhoneRule,
	websiteRule,
	iPAddressRule,
	emailRule,
	postalCodeRule,
	chineseCharacterRule,
	numberRule,
	englishRule,
	specialCharactersRule,
	alphanumericRule,
	alphabetChineseCharactersRule,
	identityCardRule,
	fullNameRule,
	numberplateRule,
	twentyFourRule,
	strongPasswordRule,
	validatePhone,
	validatePhoneOrLandline,
} from '@/utils/rules';
import {
	verifyNumberIntegerAndFloat,
	verifyNumber,
	verifyNumberInteger,
	verifyNumberPercentage,
	verifyNumberPercentageFloat,
	verifyCnAndSpace,
	verifyEnAndSpace,
} from '@/utils/commonFunction';
import { useForm } from '@/hooks';
/* 表单 */
const { form, formRef } = useForm<any>(() => ({}));
/* 表单验证 */
const rules = {
	a1: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入号码'));
			if (!phoneRule(value)) callback(new Error('请输入正确的手机号码'));
			callback();
		},
		trigger: 'blur',
	},
	a2: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入号码'));
			if (!landlinePhoneRule(value)) callback(new Error('请输入正确的座机号码'));
			callback();
		},
		trigger: 'blur',
	},
	a3: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入网址'));
			if (!websiteRule(value)) callback(new Error('请输入正确的网址格式'));
			callback();
		},
		trigger: 'blur',
	},
	a4: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入IP地址'));
			if (!iPAddressRule(value)) callback(new Error('请输入正确的IP地址'));
			callback();
		},
		trigger: 'blur',
	},
	a5: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入邮箱地址'));
			if (!emailRule(value)) callback(new Error('请输入正确的邮箱地址'));
			callback();
		},
		trigger: 'blur',
	},
	a6: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入邮政编码'));
			if (!postalCodeRule(value)) callback(new Error('请输入正确的邮政编码'));
			callback();
		},
		trigger: 'blur',
	},
	a7: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入汉字'));
			if (!chineseCharacterRule(value)) callback(new Error('请输入正确的汉字'));
			callback();
		},
		trigger: 'blur',
	},
	a8: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入数字'));
			if (!numberRule(value)) callback(new Error('请输入正确的数字'));
			callback();
		},
		trigger: 'blur',
	},
	a9: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入英文'));
			if (!englishRule(value)) callback(new Error('请输入正确的英文'));
			callback();
		},
		trigger: 'blur',
	},
	a10: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入全特殊字符'));
			if (!specialCharactersRule(value)) callback(new Error('请输入正确的全特殊字符'));
			callback();
		},
		trigger: 'blur',
	},
	a11: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入字母数字组合'));
			if (!alphanumericRule(value)) callback(new Error('请输入正确的字母数字组合'));
			callback();
		},
		trigger: 'blur',
	},
	a12: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入字母汉字组合'));
			if (!alphabetChineseCharactersRule(value))
				callback(new Error('请输入正确的字母汉字组合'));
			callback();
		},
		trigger: 'blur',
	},
	a13: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入身份证号码'));
			if (!identityCardRule(value)) callback(new Error('请输入正确的身份证号码'));
			callback();
		},
		trigger: 'blur',
	},
	a14: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入姓名'));
			if (!fullNameRule(value)) callback(new Error('请输入正确的姓名'));
			callback();
		},
		trigger: 'blur',
	},
	a15: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入车牌号码'));
			if (!numberplateRule(value)) callback(new Error('请输入正确的车牌号码'));
			callback();
		},
		trigger: 'blur',
	},
	a16: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入世间'));
			if (!twentyFourRule(value)) callback(new Error('请输入正确的24小时制'));
			callback();
		},
		trigger: 'blur',
	},
	a17: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请输入密码'));
			if (!strongPasswordRule(value)) callback(new Error('请输入正确的强密码'));
			callback();
		},
		trigger: 'blur',
	},
	a18: {
		required: true,
		validator: validatePhone,
		trigger: 'blur',
	},
	a19: {
		required: true,
		validator: validatePhoneOrLandline,
		trigger: 'blur',
	},
	b1: {
		required: true,
		message: '请输入小数或整数(不可以负数)',
		trigger: 'change',
	},
	b2: {
		required: true,
		message: '请输入数字',
		trigger: 'change',
	},
	b3: {
		required: true,
		message: '请输入正整数',
		trigger: 'change',
	},
	b4: {
		required: true,
		message: '请输入数字进行测试',
		trigger: 'change',
	},
	b5: {
		required: true,
		message: '请输入数字进行测试',
		trigger: 'change',
	},
	b6: {
		required: true,
		message: '请输入',
		trigger: 'change',
	},
	b7: {
		required: true,
		message: '请输入',
		trigger: 'change',
	},
};
// 小数或整数
const onVerifyNumberIntegerAndFloat = (val: string) => {
	form.value.b1 = verifyNumberIntegerAndFloat(val, 3);
};
// 小数、整数或负数
const onVerifyNumber = (val: string) => {
	form.value.b2 = verifyNumber(val);
};
// 正整数
const onVerifyNumberInteger = (val: string) => {
	form.value.b3 = verifyNumberInteger(val);
};
// 验证百分比（不可以小数）
const onVerifyNumberPercentage = (val: string) => {
	form.value.b4 = verifyNumberPercentage(val);
};
// 验证百分比（可以小数）
const onVerifyNumberPercentageFloat = (val: string) => {
	form.value.b5 = verifyNumberPercentageFloat(val);
};
// 去掉中文及空格
const onVerifyCnAndSpace = (val: string) => {
	form.value.b6 = verifyCnAndSpace(val);
};
// 验证不可以输入空格与中文
const onVerifyEnAndSpace = (val: string) => {
	form.value.b7 = verifyEnAndSpace(val);
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
