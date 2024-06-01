<template>
	<el-dialog
		:model-value="true"
		:title="props.data.id ? '编辑表格' : '新增表格'"
		width="50vw"
		draggable
		:close-on-click-modal="false"
		@close="emits('close')"
	>
		<el-form ref="formRef" :model="form" label-align="left" size="large" label-width="auto" :rules="rules">
			<el-form-item label="姓名:" prop="name" required>
				<el-input v-model="form.name" placeholder="请输入姓名" />
			</el-form-item>
			<el-form-item label="地点:" prop="address" required>
				<el-input v-model="form.address" placeholder="请输入地点" />
			</el-form-item>
			<el-form-item label="金额:" prop="money" required>
				<el-input
					v-model="form.money"
					placeholder="请输入金额"
					:formatter="(value: string) => moneyFormatComma(value)"
					:parser="(value: string) => value.replace(/,/g, '')"
				/>
			</el-form-item>
			<el-form-item label="数量:" prop="num" required>
				<el-input
					v-model="form.num"
					placeholder="请输入数量"
					:formatter="(value: string) => verifyNumberInteger(value)"
					:parser="(value: string) => value.replace(/,/g, '')"
				/>
			</el-form-item>
			<el-form-item label="手机号:" prop="phone" required>
				<el-input v-model="form.phone" placeholder="请输入手机号" />
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="emits('close')">取消</el-button>
				<el-button
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
import type { FormInstance } from 'element-plus';
import { moneyFormatComma, verifyNumberInteger, checkPhoneNumber } from '/@/utils/toolsValidate'; // 校验工具
import { useForm, useBasicsState, useAsyncData, useTable, curryingRequest } from '/@/hooks';
// import { addApi,editApi } from '/@/api/test';
// 接受父组件参数
const props = defineProps({
	data: {
		type: Object,
		default: {},
	},
});
console.log(props.data);
// 父组件方法
const emits = defineEmits(['close', 'success']);
// 弹窗状态控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 表单
const { form, formRef } = useForm(() => ({ ...props.data }));
// 表单验证
const rules = {
	name: [
		{ required: true, message: '请输入姓名', trigger: 'blur' },
		{ min: 3, max: 19, message: '请输入3-5个字', trigger: 'change' },
	],
	phone: [{ required: true, validator: checkPhoneNumber, trigger: 'blur' }],
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
	num: { required: true, message: '请输入数量', trigger: 'blur' },
};
// 验证数据
const validateData = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			/**可加其他特殊校验 */
			/**有id则表示修改，没有则表示新增*/
			if (props.data.id) submitData('editApi');
			else submitData('addApi');
		} else return false;
	});
};
// 提交数据
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
	// 触发成功
	emits('success');
	// 触发关闭
	emits('close');
};
</script>
