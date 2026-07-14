<template>
	<el-dialog
		:model-value="true"
		title="调度日志详细"
		width="60vw"
		draggable
		:close-on-click-modal="true"
		@close="emits('close')"
	>
		<el-form
			ref="formRef"
			:model="form"
			label-align="left"
			label-width="auto"
			:disabled="!!form.isReadOnly"
		>
			<el-row>
				<el-col :span="12">
					<el-form-item label="日志序号：">{{ form.jobLogId }}</el-form-item>
					<el-form-item label="任务名称：">{{ form.jobName }}</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="任务分组：">{{
						dictionaryStore.getDictionaryItem('sys_job_group', form.jobGroup)?.label
					}}</el-form-item>
					<el-form-item label="执行时间：">{{ form.createTime }}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="调用方法：">{{ form.invokeTarget }}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="日志信息：">{{ form.jobMessage }}</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="执行状态：">
						{{
							dictionaryStore.getDictionaryItem('operlog_status', form.status)?.label
						}}
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item v-if="form.status === 1" label="异常信息：">{{
						form.exceptionInfo
					}}</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="emits('close')">取消</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="AddEditor">
import { useForm, useBasicsState, curryingRequestUrl, URL } from '@/hooks';
import { useDictionaryStore } from '@/stores';
const dictionaryStore = useDictionaryStore();

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
</script>
<style scoped lang="scss">
.addTable {
	.el-form-item {
		margin-bottom: 0px !important;
	}
}
</style>
