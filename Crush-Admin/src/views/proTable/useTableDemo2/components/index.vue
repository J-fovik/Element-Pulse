<template>
	<el-dialog
		:model-value="true"
		:title="form.id ? (form.isReadOnly ? '表格详情' : '编辑表格') : '新增表格'"
		width="80vw"
		draggable
		:close-on-click-modal="true"
		@close="emits('close')"
	>
		<el-form
			ref="formRef"
			:model="form"
			label-align="left"
			:rules="rules"
			label-width="auto"
			:disabled="!!form.isReadOnly"
		>
			<el-form-item label="姓名:" prop="name" required>
				<el-input v-model.trim="form.name" placeholder="请输入姓名" />
			</el-form-item>
			<el-form-item label="地点:" prop="address" required>
				<el-input type="textarea" v-model.trim="form.address" placeholder="请输入地点" />
			</el-form-item>
			<!-- <el-form-item label="金额:" prop="money" required>
				<el-input
					v-model.number="form.money"
					placeholder="请输入金额"
					:formatter="(value: string) => moneyFormat(value,'')"
					:parser="(value: string) => value.replace(/,/g, '')"
				/>
			</el-form-item> -->
			<el-form-item label="金额:" prop="money" required>
				<el-input-number
					v-model.number="form.money"
					controls-position="right"
					placeholder="请输入金额"
					:precision="2"
					@input="inputMoney"
					class="flex1 inputNumber"
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
							placeholder="请选择结束时间"
							format="YYYY/MM/DD"
							value-format="YYYY-MM-DD"
						/>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="emits('close')">取消</el-button>
				<el-button
					v-if="!form.isReadOnly"
					type="primary"
					v-loading.fullscreen.lock="activeKey == 'okLoading'"
					element-loading-text="请稍后..."
					@click="validateData(formRef)"
					>确认</el-button
				>
			</div>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="tableDemoOperate">
import dayjs from 'dayjs';
import { validatePhoneOrLandline } from '@/utils/rules'; // 校验工具
import { moneyFormat } from '@/utils/commonFunction';
import { useForm, useBasicsState, useAsyncData, curryingRequest } from '@/hooks';
// import { addApi, editApi, detailApi } from '/@/api/test';
/* 接受父组件参数 */
const props = defineProps({
	data: {
		type: Object,
		default: {},
	},
});
console.log(props.data);
/* 父组件方法 */
const emits = defineEmits(['close', 'success']);
/* 弹窗状态控制 */
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
/* 表单 */
const { form, formRef } = useForm<any>(() => ({ ...props.data, num: props.data.num * 1 }));
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
const inputMoney = (e) => {
	form.value.money = moneyFormat(e, '');
	console.log(form.value.money);
};
/* 验证数据 */
const validateData = (formEl: any) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			/* 可加其他特殊校验 */
			/* 有id则表示修改，没有则表示新增 */
			if (props.data.id) submitData('editApi');
			else submitData('addApi');
		} else return false;
	});
};
/* 提交数据 */
const submitData = async (type: 'addApi' | 'editApi') => {
	console.log('提交接口', type);
	console.log('提交参数', form.value);
	// const { res,err } = await curryingRequest(() => type(form.value), {
	// 	before: () => setActiveKey('okLoading'),// 设置loading
	// 	after: () => setActiveKey(null),// 关闭loading
	// 	successMsg: '操作成功',
	// });
	// // 处理错误
	// if (err) return;
	// 触发成功
	emits('success');
	// 触发关闭
	emits('close');
};
/*  查询详情信息 */
const getDetail = async () => {
	console.log('查询详情id', form.value.id);
	// const { res, err } = await curryingRequest(() => detailApi({ id: form.value.id }));
	// if (err) return;
	// form.value = res?.data;
};
/* 查询详情和编辑时才调用 */
if (form.value.id) getDetail();
</script>
