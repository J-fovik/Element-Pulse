<template>
	<el-dialog
		:model-value="true"
		title="文件预览"
		fullscreen
		:close-on-click-modal="false"
		@close="emits('close')"
	>
		<el-scrollbar height="90vh">
			<vue-office-pdf
				v-if="['pdf'].includes(suffix)"
				:src="props.source"
				class="h-full"
				@rendered="renderedHandler"
				@error="errorHandler"
			/>
			<vue-office-docx
				v-if="['docx'].includes(suffix)"
				:src="props.source"
				class="h-full"
				@rendered="renderedHandler"
				@error="errorHandler"
			/>
			<vue-office-excel
				v-if="['xlsx'].includes(suffix)"
				:src="props.source"
				style="height: 90vh"
				@rendered="renderedHandler"
				@error="errorHandler"
			/>
		</el-scrollbar>
		<template #footer>
			<span class="dialog-footer" style="height: 10vh">
				<el-button @click="emits('close')">取消</el-button>
				<el-button type="primary" @click="emits('close')">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup lang="ts" name="PreviewOffice">
// 引入VueOfficePdf组件
import VueOfficePdf from '@vue-office/pdf';
// 引入VueOfficeDocx组件及相关样式
import VueOfficeDocx from '@vue-office/docx';
import '@vue-office/docx/lib/index.css';
// 引入VueOfficeExcel组件及相关样式
import VueOfficeExcel from '@vue-office/excel';
import '@vue-office/excel/lib/index.css';
// 定义父组件传过来的值
const props = defineProps({
	// 预览文件地址
	source: {
		type: String,
		required: true,
	},
});
// 父组件方法
const emits = defineEmits(['close']);
// 计算后缀
const suffix = computed(() => {
	return props.source.split('.').at(-1) as string;
});
// 渲染完成
const renderedHandler = () => {
	console.log('渲染完成');
};
// 渲染失败
const errorHandler = () => {
	console.log('渲染失败');
};
</script>
