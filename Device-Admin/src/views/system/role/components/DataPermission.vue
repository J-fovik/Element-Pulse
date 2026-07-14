<template>
	<el-dialog
		:model-value="true"
		title="分配数据权限"
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
					<el-form-item label="角色名称" prop="roleName">
						<el-input
							v-model.trim="form.roleName"
							disabled
							placeholder="请输入角色名称"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="权限字符" prop="roleKey">
						<el-input
							v-model.trim="form.roleKey"
							disabled
							placeholder="请输入权限字符"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="权限范围" prop="dataScope">
						<el-select v-model="form.dataScope">
							<el-option
								v-for="item in dataScopeOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>
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

<script lang="ts" setup name="DataPermission">
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
	...props.data,
}));
const dataScopeOptions = ref([
	{
		value: '1',
		label: '全部数据权限',
	},
	// {
	//   value: '2',
	//   label: '自定数据权限',
	// },
	{
		value: '3',
		label: '本部门数据权限',
	},
	{
		value: '4',
		label: '本部门及以下数据权限',
	},
	{
		value: '5',
		label: '仅本人数据权限',
	},
]);
/* 表单验证 */
const rules = {
	roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
	roleKey: [{ required: true, message: '请输入权限字符', trigger: 'blur' }],
};

/* 验证数据 */
const validateData = (formEl: any) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			submitData();
		} else return false;
	});
};
/* 提交数据 */
const submitData = async () => {
	const { res, err } = await curryingRequestUrl(
		{
			url: URL.SYSTEM.ROLE_DATA_SCOPE,
			data: form.value,
			method: 'put',
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
