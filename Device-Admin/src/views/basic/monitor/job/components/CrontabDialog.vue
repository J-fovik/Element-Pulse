<template>
	<el-dialog
		:model-value="true"
		title="Cron表达式生成器"
		width="60vw"
		draggable
		:close-on-click-modal="true"
		@close="emits('close')"
	>
		<Crontab :expression="form.cronExpression" @fill="crontabFill" @hide="emits('close')" />
	</el-dialog>
</template>

<script lang="ts" setup name="CrontabDialog">
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

const crontabFill = (value) => {
	// 触发成功
	emits('success', value);
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
