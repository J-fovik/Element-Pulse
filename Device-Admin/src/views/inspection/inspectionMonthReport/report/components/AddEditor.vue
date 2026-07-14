<template>
	<el-dialog
		:model-value="true"
		title="点检详情"
		width="60vw"
		draggable
		:close-on-click-modal="true"
		@close="emits('close')"
	>
		<el-table border :data="form.items">
			<el-table-column v-if="form.mode == 2" label="" width="150" type="expand">
				<template #default="props">
					<el-table class="ml30" border :data="props.row.fieldJson">
						<el-table-column label="名称" prop="label" />
						<el-table-column label="数值" prop="val" />
						<el-table-column label="单位" prop="unit" />
						<el-table-column label="最小值" prop="min" />
						<el-table-column label="最大值" prop="max" />
						<el-table-column
							label="范围"
							prop="tempclcu"
							width="200"
							:show-overflow-tooltip="true"
						/>
						<el-table-column
							label="结果"
							prop="tempresult"
							:show-overflow-tooltip="true"
						/>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column prop="execName" label="执行人" width="120" />
			<el-table-column prop="execTime" label="执行时间" width="150" />
			<el-table-column
				prop="execStatus"
				label="点检结果"
				:show-overflow-tooltip="true"
				width="90"
				align="center"
			/>
			<el-table-column
				prop="faultStatus"
				label="故障状态"
				:show-overflow-tooltip="true"
				width="120"
			/>
			<el-table-column prop="dealMethod" label="处理方法" :show-overflow-tooltip="true" />
			<el-table-column
				prop="measureResult"
				label="措施及结果"
				:show-overflow-tooltip="true"
				width="120"
			/>
			<el-table-column
				prop="dealResult"
				label="处理结论"
				:show-overflow-tooltip="true"
				width="120"
			/>
		</el-table>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="emits('close')">关闭</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="AddEditor">
import { useForm, useBasicsState } from '@/hooks';
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
	items: props.data?.items
		? props.data?.items?.map((item) => {
				return {
					...item,
					fieldJson: item.fieldJson
						? [...JSON.parse(item.fieldJson)]?.map((o) => {
								var tempclcu = '';
								var tempresult = '';
								if (o.clcu.indexOf('cl') > -1) {
									tempclcu = '包含最小值;';
									if (o.val >= o.min) {
										tempresult = '正常';
									} else {
										tempresult = '异常';
									}
								} else {
									if (o.val > o.min) {
										tempresult = '正常';
									} else {
										tempresult = '异常';
									}
								}

								if (o.clcu.indexOf('cu') > -1) {
									tempclcu += '包含最大值;';
									if (o.val <= o.max) {
										tempresult = '正常';
									} else {
										tempresult = '异常';
									}
								} else {
									if (o.val < o.max) {
										tempresult = '正常';
									} else {
										tempresult = '异常';
									}
								}

								return {
									...o,
									tempclcu: tempclcu,
									tempresult: tempresult,
								};
							})
						: '',
				};
			})
		: [],
}));
setTimeout(() => {
	console.log(props.data);
}, 1000);
</script>
<style scoped lang="scss">
.addTable {
	.el-form-item {
		margin-bottom: 0px !important;
	}
}
</style>
