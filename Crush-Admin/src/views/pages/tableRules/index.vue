<template>
	<div class="layout-pd">
		<el-card shadow="hover" header="表单表格验证">
			<el-form ref="tableRulesRef" :model="state.tableData" size="default">
				<el-table ref="tableRef" :data="state.tableData.data" border class="module-table-uncollected" max-height="200">
					<el-table-column
						v-for="(item, index) in state.tableData.header"
						:key="index"
						show-overflow-tooltip
						:prop="item.prop"
						:width="item.width"
						:label="item.label"
					>
						<!-- 头部插槽 -->
						<template v-slot:header>
							<span v-if="item.isRequired" class="color-danger">*</span>
							<span class="pl5">{{ item.label }}</span>
							<el-tooltip v-if="item.isTooltip" effect="dark" content="这是tooltip" placement="top">
								<SvgIcon name="iconfont icon-dianhua"></SvgIcon>
							</el-tooltip>
						</template>
						<template #default="{ row, $index }">
							<el-form-item
								:prop="`data.${$index}.${item.prop}`"
								:rules="[
									{
										required: item.isRequired,
										message: `${item.label}不能为空`,
										trigger: `${item.type}` == 'input' ? 'blur' : 'change',
									},
								]"
							>
								<el-select
									v-if="item.prop == 'a1' || item.prop == 'a2' || item.prop == 'a3'"
									v-model="row[item.prop]"
									placeholder="请选择"
								>
									<el-option v-for="sel in state.tableData.option" :key="sel.value" :label="sel.label" :value="sel.value" />
								</el-select>
								<el-date-picker
									v-if="item.prop == 'a4'"
									v-model="row[item.prop]"
									type="date"
									placeholder="选择日期"
									style="width: 100%"
								/>
								<el-input
									v-if="item.prop == 'a5' || item.prop == 'a6' || item.prop == 'a7' || item.prop == 'a8'"
									v-model="row[item.prop]"
									placeholder="请输入内容"
								/>
							</el-form-item>
						</template>
					</el-table-column>
				</el-table>
			</el-form>
			<el-row class="flex mt15">
				<div class="flex-margin">
					<el-button size="default" type="success" @click="onValidate(tableRulesRef)">表格验证</el-button>
					<el-button size="default" type="primary" @click="onAddRow">新增一行</el-button>
				</div>
			</el-row>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="pagesTableRules">
import { ElMessage } from 'element-plus';
import type { FormInstance } from 'element-plus';
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route)
// 定义变量内容
const tableRulesRef = ref<FormInstance>();
const tableRef = ref();
const state = reactive<any>({
	tableData: {
		data: [],
		header: [
			{ prop: 'a1', width: '', label: '一级分类', isRequired: true },
			{ prop: 'a2', width: '', label: '二级分类', isRequired: true },
			{ prop: 'a3', width: '', label: '三级分类', isRequired: true },
			{ prop: 'a4', width: '', label: '四级分类', isRequired: true },
			{ prop: 'a5', width: '', label: '五级分类', isRequired: true },
			{ prop: 'a6', width: '', label: '六级分类', isTooltip: true },
			{ prop: 'a7', width: '', label: '演示级分类', isRequired: true },
			{ prop: 'a8', width: '', label: '颜色是分类' },
		],
		option: [
			{ value: '选项1', label: '黄金糕' },
			{ value: '选项2', label: '双皮奶' },
			{ value: '选项3', label: '蚵仔煎' },
		],
	},
});

// 表格验证
const onValidate = (formEl: FormInstance | undefined) => {
	if (state.tableData.data.length <= 0) return ElMessage.warning('请先点击增加一行');
	if (!formEl) return;
	formEl.validate((valid) => {
		if (!valid) return ElMessage.warning('表格项必填未填');
		ElMessage.success('全部验证通过');
	});
};
// 新增一行
const onAddRow = () => {
	state.tableData.data.push({
		a1: '',
		a2: '',
		a3: '',
		a4: '',
		a5: '',
		a6: '',
		a7: '',
		a8: '',
	});
	tableRef.value.doLayout();
	nextTick(() => {
		tableRef.value.setScrollTop(1000000);
	});
};
</script>
