<template>
	<el-dialog
		:model-value="true"
		:title="form.id ? (form.isReadOnly ? '基础配置详情' : '编辑基础配置') : '新增基础配置'"
		width="60vw"
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
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="配置编码" prop="configTypeCode">
						<el-input
							v-model.trim="form.configTypeCode"
							placeholder="请输入配置编码"
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="配置名称" prop="configTypeName">
						<el-input
							v-model.trim="form.configTypeName"
							placeholder="请输入配置名称"
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="配置描述" prop="configTypeDesc">
						<el-input
							v-model.trim="form.configTypeDesc"
							placeholder="请输入配置描述"
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="第一栏" prop="columnOne">
						<el-input
							v-model.trim="form.columnOne"
							placeholder="请输入第一栏"
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="第二栏" prop="columnTwo">
						<el-input
							v-model.trim="form.columnTwo"
							placeholder="请输入第二栏"
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="第三栏" prop="columnThree">
						<el-input
							v-model.trim="form.columnThree"
							placeholder="请输入第三栏"
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="第四栏" prop="columnFour">
						<el-input
							v-model.trim="form.columnFour"
							placeholder="请输入第四栏"
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="第五栏" prop="columnFive">
						<el-input
							v-model.trim="form.columnFive"
							placeholder="请输入第五栏"
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="第六栏" prop="columnSix">
						<el-input
							v-model.trim="form.columnSix"
							placeholder="请输入第六栏"
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="第七栏" prop="columnSeven">
						<el-input
							v-model.trim="form.columnSeven"
							placeholder="请输入第七栏"
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="第八栏" prop="columnEight">
						<el-input
							v-model.trim="form.columnEight"
							placeholder="请输入第八栏"
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="第九栏" prop="columnNine">
						<el-input
							v-model.trim="form.columnNine"
							placeholder="请输入第九栏"
							clearable
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="第十栏" prop="columnTen">
						<el-input
							v-model.trim="form.columnTen"
							placeholder="请输入第十栏"
							clearable
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
					v-loading.fullscreen.lock="activeKey == 'okLoading'"
					type="primary"
					element-loading-text="请稍后..."
					@click="validateData(formRef)"
				>
					确认
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="AddEditor">
import { useForm, useBasicsState, curryingRequestUrl, URL } from '@/hooks';
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
	status: '0',
	...props.data,
}));
/* 表单验证 */
const rules = {
	configTypeCode: [{ required: true, message: '请输入配置编码', trigger: 'blur' }],
	configTypeName: [{ required: true, message: '请输入配置名称', trigger: 'blur' }],
	configTypeDesc: [{ required: true, message: '请输入配置描述', trigger: 'blur' }],
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
	const { res, err } = await curryingRequestUrl(
		{
			url: URL.BASIC.HANDLE_BASIC,
			baseURL: import.meta.env.VITE_EMS_URL as string,
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
