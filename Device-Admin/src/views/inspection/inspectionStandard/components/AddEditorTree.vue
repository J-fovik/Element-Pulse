<template>
	<el-dialog
		:model-value="true"
		:title="form.dialogTitle"
		width="750px"
		draggable
		close-on-press-escape
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
				<el-col :span="12" v-if="form.ParentName">
					<el-form-item label="上级节点名称" prop="ParentName">
						<el-input
							v-model.trim="form.ParentName"
							disabled
							placeholder="请输入上级节点名称"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="是否节点" prop="isDir">
						<el-select v-model="form.isDir" filterable>
							<el-option
								v-for="dict in dictionaryStore.getDictionaryInfo('IS_DIR')"
								:key="dict.value"
								:label="dict.label"
								:value="dict.value"
							/>
						</el-select>
					</el-form-item>
				</el-col>
				<!-- 是节点 -->
				<el-col :span="12">
					<el-form-item label="节点类型" prop="areaType">
						<el-select
							v-model="form.areaType"
							filterable
							clearable
							:disabled="!!form.id"
						>
							<el-option
								v-for="dict in curNodeTypeDict"
								:key="dict.value"
								:label="dict.label"
								:value="dict.value"
							/>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="节点名称" prop="areaName">
						<el-input v-model.trim="form.areaName" placeholder="请输入节点名称" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="节点编码" prop="areaCode">
						<el-input v-model.trim="form.areaCode" placeholder="请输入节点编码" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="是否启用" prop="isActive">
						<el-select v-model="form.isActive" filterable>
							<el-option
								v-for="dict in dictionaryStore.getDictionaryInfo('Is_Active')"
								:key="dict.value"
								:label="dict.label"
								:value="dict.value"
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

<script lang="ts" setup name="AddEditorTree">
import { useForm, useBasicsState, useAsyncData, curryingRequestUrl, URL } from '@/hooks';
import { useDictionaryStore, useUserStore } from '@/stores';
/* 接受父组件参数 */
const props = defineProps({
	data: {
		type: Object,
		default: {},
	},
});
const dictionaryStore = useDictionaryStore();
const userStore = useUserStore();

/* 父组件方法 */
const emits = defineEmits(['close', 'success']);

/* 弹窗状态控制 */
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
/* 表单 */
const { form, formRef } = useForm<any>(() => ({
	responsible_user_id: userStore.userInfo.id, // 当前用户
	...props.data,
	isDir: [0, 1].includes(props.data.isDir) ? props.data.isDir.toString() : '1', // 默认节点
	isActive: [0, 1].includes(props.data.isActive) ? props.data.isActive.toString() : '1', // 默认节点
}));
/* 表单验证 */
const rules = {
	isDir: [{ required: true, message: '是否节点不能为空', trigger: 'blur' }],
	areaName: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
	areaCode: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
	areaType: [{ required: true, message: '类型不能为空', trigger: 'change' }],
	isActive: [{ required: true, message: '是否启用不能为空', trigger: 'blur' }],
};
/* 验证数据 */
const validateData = (formEl: any) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			/* 可加其他特殊校验 */
			submitData();
		} else return false;
	});
};
/* 提交数据 */
const submitData = async () => {
	const { res, err } = await curryingRequestUrl(
		{
			url: URL.INSPECTION.INSPECTION_TREE,
			data: form.value,
			method: form.value.id ? 'put' : 'post',
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

const allNodeTypeDict = computed(() => {
	return dictionaryStore.getDictionaryInfo('INSPECTION_TYPE') || [];
});
const curNodeTypeDict = computed(() => {
	console.log('props.data', props.data, form.value); //ParentType
	if (!props.data.id) {
		var tempType = form.value.ParentType;
		if (tempType == 'gc') {
			return allNodeTypeDict.value.filter(
				(item) => item.value == 'gc' || item.value == 'cj' || item.value == 'djb',
			);
		} else if (tempType == 'cj') {
			return allNodeTypeDict.value.filter(
				(item) => item.value == 'cj' || item.value == 'djb',
			);
		} else if (tempType == 'djb') {
			return allNodeTypeDict.value.filter((item) => item.value == 'djb');
		} else {
			return allNodeTypeDict.value.filter((item) => item.value == 'gc');
		}
	} else {
		return allNodeTypeDict.value;
	}
});
</script>
<style scoped lang="scss">
.addTable {
	.el-form-item {
		margin-bottom: 0px !important;
	}
}
</style>
