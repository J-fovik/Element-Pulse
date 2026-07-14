<template>
	<el-dialog
		:model-value="true"
		:title="form.jobId ? (form.isReadOnly ? '任务详情' : '编辑任务') : '新增任务'"
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
					<el-form-item label="任务名称" prop="jobName">
						<el-input v-model.trim="form.jobName" placeholder="请输入任务名称" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="任务分组" prop="jobGroup">
						<el-select v-model="form.jobGroup" filterable clearable>
							<el-option
								v-for="dict in dictionaryStore.getDictionaryInfo('sys_job_group')"
								:key="dict.value"
								:label="dict.label"
								:value="dict.value"
							/>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item prop="invokeTarget">
						<template #label>
							<span>
								<el-tooltip
									content=" Bean调用示例：ryTask.ryParams('ry') Class类调用示例：com.ruoyi.quartz.task.RyTask.ryParams('ry')
                    参数说明：支持字符串，布尔类型，长整型，浮点型，整型"
									placement="top"
								>
									<el-icon><InfoFilled /></el-icon>
								</el-tooltip>
								调用方法
							</span>
						</template>
						<el-input
							v-model="form.invokeTarget"
							placeholder="请输入调用目标字符串"
							maxlength="100"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="cron表达式" prop="cronExpression">
						<el-input v-model="form.cronExpression" placeholder="请输入cron执行表达式">
							<template #append>
								<el-button
									type="primary"
									@click="
										setSelectRow({ cronExpression: form.cronExpression }, () =>
											setActiveKey('CrontabDialog'),
										)
									"
								>
									生成表达式
									<el-icon><CircleCheck /></el-icon>
								</el-button>
							</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="执行策略" prop="misfirePolicy">
						<el-radio-group
							border
							v-model="form.misfirePolicy"
							size="small"
							fill="#409eff"
						>
							<el-radio-button label="立即执行" value="1" />
							<el-radio-button label="执行一次" value="2" />
							<el-radio-button label="放弃执行" value="3" />
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="是否并发" prop="concurrent">
						<el-radio-group
							border
							v-model="form.concurrent"
							size="small"
							fill="#409eff"
						>
							<el-radio-button label="允许" value="0" />
							<el-radio-button label="禁止" value="1" />
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="任务状态" prop="status">
						<el-radio-group v-model="form.status">
							<el-radio value="0">正常</el-radio>
							<el-radio value="1">停用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!-- Cron表达式生成器 -->
		<CrontabDialog
			v-if="activeKey === 'CrontabDialog'"
			:data="selectRow"
			@success="successCrontabDialog"
			@close="setSelectRow({}, () => setActiveKey(null))"
		></CrontabDialog>
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
import { useForm, useBasicsState, curryingRequestUrl, URL, useTable } from '@/hooks';
import { useDictionaryStore } from '@/stores';
import CrontabDialog from './CrontabDialog.vue';
/* 接受父组件参数 */
const props = defineProps({
	data: {
		type: Object,
		default: {},
	},
});
const dictionaryStore = useDictionaryStore();
/* 父组件方法 */
const emits = defineEmits(['close', 'success']);

/* 弹窗状态控制 */
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
/* 表单 */
const { form, formRef } = useForm<any>(() => ({
	status: '0',
	misfirePolicy: '1',
	concurrent: '1',
	...props.data,
}));
//  当前选中的值
const selectRow = shallowRef<any>({});
// 设置当前数据
const setSelectRow = (row: any, callBack?: () => void) => {
	selectRow.value = row; // 赋值当前数据
	if (callBack) callBack();
};
const successCrontabDialog = (value) => {
	form.value.cronExpression = value;
};
/* 表单验证 */
const rules = {
	jobName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
	invokeTarget: [{ required: true, message: '请输入调用目标字符串', trigger: 'blur' }],
	jobGroup: [{ required: true, message: '请选择任务分组', trigger: 'change' }],
	cronExpression: [{ required: true, message: '请输入cron表达式', trigger: 'blur' }],
};

/* 验证数据 */
const validateData = (formEl: any) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			/* 可加其他特殊校验 */
			/* 有id则表示修改，没有则表示新增 */
			if (props.data.jobId) submitData('editApi');
			else submitData('addApi');
		} else return false;
	});
};
/* 提交数据 */
const submitData = async (type: 'addApi' | 'editApi') => {
	const { res, err } = await curryingRequestUrl(
		{
			url: URL.BASIC.HANDLE_JOB,
			baseURL: import.meta.env.VITE_JOB_URL as string,
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
:deep(.el-radio-button--large .el-radio-button__inner) {
	border: 1px solid #dcdfe6 !important;
}
</style>
