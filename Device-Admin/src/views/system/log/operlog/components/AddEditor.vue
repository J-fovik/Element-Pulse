<template>
	<el-dialog
		:model-value="true"
		title="操作日志详细"
		width="60vw"
		draggable
		:close-on-click-modal="true"
		@close="emits('close')"
	>
		<el-form ref="formRef" :model="form" label-align="left" :rules="rules" label-width="auto">
			<el-row>
				<el-col :span="12">
					<el-form-item label="操作模块："
						>{{ form.title }} /
						{{
							dictionaryStore.getDictionaryItem('sys_oper_type', form.businessType)
								?.label
						}}</el-form-item
					>
					<el-form-item label="登录信息："
						>{{ form.operName }} / {{ form.operIp }}</el-form-item
					>
				</el-col>
				<el-col :span="12">
					<el-form-item label="请求地址：">{{ form.operUrl }}</el-form-item>
					<el-form-item label="请求方式：">{{ form.requestMethod }}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="操作方法：">{{ form.method }}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="请求参数：">{{ form.operParam }}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="返回参数：">{{ form.jsonResult }}</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="操作状态：">
						<div v-if="form.status === 0">正常</div>
						<div v-else-if="form.status === 1">失败</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="操作时间：">{{ form.operTime }}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item v-if="form.status === 1" label="异常信息：">{{
						form.errorMsg
					}}</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="emits('close')">关闭</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="AddEditor">
import { useForm, useBasicsState, useAsyncData, curryingRequestUrl, URL } from '@/hooks';
import { useUserStore } from '@/stores';
import { convertDeptTree } from '@/utils';
import { useDictionaryStore } from '@/stores';
const dictionaryStore = useDictionaryStore();

const userStore = useUserStore();
/* 接受父组件参数 */
const props = defineProps({
	data: {
		type: Object,
		default: {},
	},
});
/* 父组件方法 */
const emits = defineEmits(['close', 'success']);
/* 弹窗状态控制 */
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
/* 表单 */
const { form, formRef } = useForm<any>(() => ({
	parentId: '1506545158835290114',
	status: '0',
	...props.data,
}));
// 获取部门数据
const { data: deptOptions, initData: getDeptOptions } = useAsyncData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.QUERY_DEPT,
		params: {},
		method: 'get',
	});
	if (err) return;
	return res?.data?.map((item) => convertDeptTree(item)); // 处理数据
});
/* 表单验证 */
const rules = {
	parentId: [{ required: true, message: '请选择上级部门', trigger: 'blur' }],
	email: [
		{
			type: 'email',
			message: '请输入正确的邮箱地址',
			trigger: ['blur', 'change'],
		},
	],
	orderNum: [{ required: true, message: '请输入显示排序', trigger: 'blur' }],
	deptName: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
	phone: [
		{
			pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
			message: '请输入正确的手机号码',
			trigger: 'blur',
		},
	],
};

/* 验证数据 */
const validateData = (formEl: any) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			/* 可加其他特殊校验 */
			if (form.value.dialogTitle == '编辑部门') submitData('editApi');
			else submitData('addApi');
		} else return false;
	});
};
/* 提交数据 */
const submitData = async (type: 'addApi' | 'editApi') => {
	const { res, err } = await curryingRequestUrl(
		{
			url: URL.SYSTEM.HANDLE_DEPT,
			data: form.value,
			method: type == 'addApi' ? 'post' : 'put',
		},
		{
			before: () => setActiveKey('okLoading'), // 设置loading
			after: () => setActiveKey(null), // 关闭loading
			successMsg: '操作成功',
		},
	);
	// 处理错误
	if (err) return;
	// 触发成功
	emits('success');
	// 触发关闭
	emits('close');
};
</script>
<style scoped lang="scss">
.addTable {
	.el-form-item {
		margin-bottom: 0px !important;
	}
}
</style>
