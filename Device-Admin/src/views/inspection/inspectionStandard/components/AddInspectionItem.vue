<template>
	<el-dialog
		:model-value="true"
		:title="form.id ? (form.isReadOnly ? '项目详情' : '编辑项目') : '新增项目'"
		width="750px"
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
					<el-form-item label="设备名称" prop="device_name">
						<el-input v-model.trim="form.device_name" placeholder="如：工控机" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="点检部位" prop="inspection_point">
						<el-input v-model.trim="form.inspection_point" placeholder="如：计算机" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="点检子部位" prop="inspection_pointt">
						<el-input
							v-model.trim="form.inspection_pointt"
							placeholder="如：键盘、鼠标"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="点检标准" prop="judgment_standard">
						<el-input v-model.trim="form.judgment_standard" placeholder="如：灵活" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="周期" prop="inspection_cycle">
						<el-input-number
							v-model.trim="form.inspection_cycle"
							controls-position="right"
							class="w-full"
							:min="0"
							placeholder="如：4"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="周期类型" prop="inspection_cycleunit">
						<el-select
							v-model="form.inspection_cycleunit"
							filterable
							clearable
							@change="changeDir"
						>
							<el-option
								v-for="dict in dictionaryStore.getDictionaryInfo(
									'INSPECTION_CYCLE_TYPE',
								)"
								:key="dict.value"
								:label="dict.label"
								:value="dict.value"
							/>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="24" style="margin-bottom: 5px">
				<!-- 定量范围,可输入table -->
				<el-col :span="24">
					<el-form-item label="定量范围" prop="quantitative_list">
						<el-table :data="form.quantitative_list" border style="width: 100%">
							<el-table-column prop="para_name" label="名称">
								<template #default="scope">
									<el-input
										v-model="scope.row.para_name"
										placeholder="请输入"
										size="small"
									/>
								</template>
							</el-table-column>
							<el-table-column prop="min_value" label="最小值" width="140">
								<template #default="scope">
									<el-input-number
										v-model="scope.row.min_value"
										placeholder="请输入"
										controls-position="right"
										class="w-full"
										size="small"
									/>
								</template>
							</el-table-column>
							<el-table-column prop="max_value" label="最大值" width="140">
								<template #default="scope">
									<el-input-number
										v-model="scope.row.max_value"
										placeholder="请输入"
										controls-position="right"
										class="w-full"
										size="small"
									/>
								</template>
							</el-table-column>
							<el-table-column prop="unit" label="单位" width="100">
								<template #default="scope">
									<el-input
										v-model="scope.row.unit"
										placeholder="请输入"
										size="small"
									/>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="50" align="center">
								<template #default="scope">
									<el-button
										type="text"
										:icon="Delete"
										circle
										style="color: red"
										@click="form.quantitative_list.splice(scope.$index, 1)"
									/>
								</template>
							</el-table-column>
							<template #empty>
								<div style="text-align: center; color: #999">
									暂无数据，请点击下方按钮添加定量项
								</div>
							</template>
							<template #append>
								<el-table-row>
									<el-table-cell colspan="5">
										<el-button
											type="primary"
											icon="Plus"
											plain
											style="width: 100%"
											dashed
											@click="
												form.quantitative_list.push({
													tempid: form.quantitative_list.length + 1,
													para_name: '',
													min_value: '',
													max_value: '',
													unit: '',
												})
											"
											>添加定量项</el-button
										>
									</el-table-cell>
								</el-table-row>
							</template>
						</el-table>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="点检方法" prop="inspection_methods">
						<el-select
							v-model="form.inspection_methods"
							filterable
							clearable
							@change="changeDir"
							multiple
						>
							<el-option
								v-for="dict in dictionaryStore.getDictionaryInfo(
									'INSPECTION_METHOD',
								)"
								:key="dict.value"
								:label="dict.label"
								:value="dict.value"
							/>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="巡检时间点" prop="cycle_starttime">
						<el-input-number
							v-model.trim="form.cycle_starttime"
							controls-position="right"
							placeholder="如：9"
						/>
						<span style="margin: 0 5px"> ~ </span>
						<el-input-number
							v-model.trim="form.cycle_endtime"
							controls-position="right"
							placeholder="如：5"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="备注" prop="remark">
						<el-input type="textarea" v-model.trim="form.remark" placeholder="请输入" />
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
import dayjs from 'dayjs';
import { Plus, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

/* 接受父组件参数 */
const props = defineProps({
	data: {
		type: Object,
		default: {},
	},
	curNodeId: {
		type: [String, Number, null],
		default: null,
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
	quantitative_list: props.data.quantitative_list || [], // 定量范围
	inspection_cycleunit: props.data.inspection_cycleunit || '小时', // 默认周期类型
}));
/* 表单验证 */
const rules = {
	areaName: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
	areaCode: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
	areaType: [{ required: true, message: '类型不能为空', trigger: 'change' }],
};
// 切换是否节点
const changeDir = (val: any) => {
	form.value.areaType = ''; // 重置类别
	form.value.dialogTitle = val == 'true' || val === true ? '添加子节点' : '添加设备'; // 重置上级节点名称
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
	if (!props.curNodeId) {
		ElMessage.error('请先选择左侧树节点');
		return;
	}
	form.value.standard_id = props.curNodeId; // 设置标准id
	form.value.inspection_method = form.value.inspection_methods?.join('、'); // 多选点检方法转为字符串
	const { res, err } = await curryingRequestUrl(
		{
			url: URL.INSPECTION.INSPECTION_STANDARD,
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
</script>
<style scoped lang="scss">
.addTable {
	.el-form-item {
		margin-bottom: 0px !important;
	}
}
</style>
