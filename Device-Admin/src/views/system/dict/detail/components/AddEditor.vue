<template>
	<el-dialog
		:model-value="true"
		:title="form.dictId ? (form.isReadOnly ? '字典数据详情' : '编辑字典数据') : '新增字典数据'"
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
					<el-form-item label="字典类型" prop="dictType">
						<el-input
							v-model.trim="form.dictType"
							disabled
							placeholder="请输入字典类型"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="数据标签" prop="dictLabel">
						<el-input v-model.trim="form.dictLabel" placeholder="请输入数据标签" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="数据键值" prop="dictValue">
						<el-input v-model="form.dictValue" placeholder="请输入数据键值" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="样式属性" prop="cssClass">
						<el-input v-model="form.cssClass" placeholder="请输入样式属性" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="显示排序" prop="dictSort">
						<el-input-number
							v-model="form.dictSort"
							controls-position="right"
							:min="0"
							class="w-full"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="回显样式" prop="listClass">
						<el-select v-model="form.listClass">
							<el-option
								v-for="item in listClassOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="状态" prop="status">
						<el-radio-group v-model="form.status">
							<el-radio value="0">正常</el-radio>
							<el-radio value="1">停用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="备注" prop="remark">
						<el-input
							v-model="form.remark"
							type="textarea"
							:rows="4"
							placeholder="请输入内容"
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
	dictSort: 0,
	listClass: 'primary',
	...props.data,
}));
const listClassOptions = ref([
	{
		value: 'default',
		label: '默认',
	},
	{
		value: 'primary',
		label: '主要',
	},
	{
		value: 'success',
		label: '成功',
	},
	{
		value: 'info',
		label: '信息',
	},
	{
		value: 'warning',
		label: '警告',
	},
	{
		value: 'danger',
		label: '危险',
	},
]);
/* 表单验证 */
const rules = {
	dictLabel: [{ required: true, message: '数据标签不能为空', trigger: 'blur' }],
	dictValue: [{ required: true, message: '数据键值不能为空', trigger: 'blur' }],
	dictSort: [{ required: true, message: '数据顺序不能为空', trigger: 'blur' }],
};

/* 验证数据 */
const validateData = (formEl: any) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			/* 可加其他特殊校验 */
			/* 有id则表示修改，没有则表示新增 */
			if (props.data.dictId) submitData('editApi');
			else submitData('addApi');
		} else return false;
	});
};
/* 提交数据 */
const submitData = async (type: 'addApi' | 'editApi') => {
	const { res, err } = await curryingRequestUrl(
		{
			url: URL.SYSTEM.HANDLE_DICT_DATA,
			data: {
				...form.value,
				listClass: ['default', '', 'primary'].includes(form.value.listClass)
					? 'primary'
					: form.value.listClass,
			},
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
