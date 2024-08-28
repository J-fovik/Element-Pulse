<template>
	<div>
		<Container>
			<el-form
				ref="formRef"
				:model="form"
				label-align="left"
				:rules="rules"
				label-width="auto"
				:disabled="!!route.query.isReadOnly"
			>
				<el-form-item label="姓名:" prop="name" required>
					<el-input v-model.trim="form.name" placeholder="请输入姓名" />
				</el-form-item>
				<el-form-item label="地点:" prop="address" required>
					<el-input
						type="textarea"
						v-model.trim="form.address"
						placeholder="请输入地点"
					/>
				</el-form-item>
				<el-form-item label="金额:" prop="money" required>
					<el-input
						v-model.number="form.money"
						placeholder="请输入金额"
						type="number"
						:formatter="(value: string) => moneyFormat(value,'')"
						:parser="(value: string) => value.replace(/,/g, '')"
					/>
				</el-form-item>
				<el-form-item label="数量:" prop="num" required>
					<el-input-number
						v-model.number="form.num"
						controls-position="right"
						placeholder="请输入数量"
						:precision="2"
						:max="1000000"
						class="flex1 inputNumber"
					/>
				</el-form-item>
				<el-form-item label="手机号:" prop="phone" required>
					<el-input v-model="form.phone" placeholder="请输入手机号" />
				</el-form-item>
				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item label="开始时间:" prop="startDate" required>
							<el-date-picker
								v-model="form.startDate"
								type="date"
								class="flex-1"
								placeholder="请选择开始时间"
								format="YYYY/MM/DD"
								value-format="YYYY-MM-DD"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="结束时间:" prop="endDate" required>
							<el-date-picker
								v-model="form.endDate"
								type="date"
								class="flex-1"
								placeholder="请选择结束时间"
								format="YYYY/MM/DD"
								value-format="YYYY-MM-DD"
								:disabled-date="(current: any) =>disabledDate(current,form.startDate,3,'month')"
							/>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</Container>
		<div style="height: 100px"></div>
		<el-card class="footerCard flex justify-end items-end">
			<el-space>
				<el-button
					v-if="!route.query.isReadOnly"
					type="primary"
					:loading="activeKey === 'okLoading'"
					@click="validateData(formRef)"
					>确定</el-button
				>
				<el-button type="primary" @click="jumpTabName()">返回</el-button>
			</el-space>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="useTableDemoDetail">
import dayjs from 'dayjs';
import { disabledDate } from '@/utils/formatTime';
import { validatePhoneOrLandline } from '@/utils/rules'; // 校验工具
import { moneyFormat } from '@/utils/commonFunction';
import { useForm, useBasicsState, useAsyncData, curryingRequest } from '@/hooks';
import { useJumpTabStore } from '@/stores';
// import { addApi, editApi, detailApi } from '/@/api/test';
const { jumpTabName } = useJumpTabStore();
const route = useRoute();

/* 弹窗状态控制 */
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
/* 表单 */
const { form, formRef } = useForm<any>(() => ({
	name: '', // 姓名
	phone: '',
	address: '',
	money: '',
	num: undefined,
	startDate: '',
	endDate: '',
}));
/* 表单验证 */
const rules = {
	name: [
		{ required: true, message: '请输入姓名', trigger: 'blur' },
		{ min: 3, max: 19, message: '请输入3-5个字', trigger: 'change' },
	],
	phone: [{ required: true, validator: validatePhoneOrLandline, trigger: 'blur' }],
	// 自定义校验
	address: [
		{
			required: true,
			validator: (rule: any, value: any, callback: any) => {
				if (!value) callback(new Error('请输入地点'));
				if (value && value.length > 25) callback(new Error('最多输入25个字'));
				callback();
			},
			trigger: 'blur',
		},
	],
	money: { required: true, message: '请输入金额', trigger: 'blur' },
	num: { required: true, message: '请输入数量' },
	startDate: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请选择开始时间'));
			if (form.value.endDate && dayjs(value).isAfter(dayjs(form.value.endDate)))
				callback(new Error('开始时间不能大于结束时间'));
			callback();
		},
		trigger: 'blur',
	},
	endDate: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!value) callback(new Error('请选择开始时间'));
			if (form.value.startDate && dayjs(value).isBefore(dayjs(form.value.startDate)))
				callback(new Error('结束时间不能小于开始时间'));
			callback();
		},
		trigger: 'blur',
	},
};
/* 验证数据 */
const validateData = async (formEl: any) => {
	if (!formEl) return;
	await formEl.validate((valid) => {
		if (valid) {
			/**可加其他特殊校验 */
			/**有id则表示修改，没有则表示新增*/
			if (route.query.id) submitData('editApi');
			else submitData('addApi');
		} else return false;
	});
};
/* 提交数据 */
const submitData = async (type: 'addApi' | 'editApi') => {
	console.log('接口', type);
	console.log('参数', form.value);
	// const { res,err } = await curryingRequest(() => type(form.value), {
	// 	before: () => setActiveKey('okLoading'),// 设置loading
	// 	after: () => setActiveKey(null),// 关闭loading
	// 	successMsg: '操作成功',
	// });
	// // 处理错误
	// if (err) return;
	jumpTabName();
};
/*  查询详情信息 */
const getDetail = async () => {
	console.log('查询详情', route.query.id);
	// const { res, err } = await curryingRequest(() => detailApi({ id: route.query.id }));
	// if (err) return;
	// form.value = res?.data;
};
/* 查询详情和编辑时才调用 */
if (route.query.id) getDetail();
</script>
