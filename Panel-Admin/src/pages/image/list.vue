<template>
	<el-container class="rounded bg-white" style="height: calc(100vh - 144px); overflow: auto">
		<el-header class="image-header">
			<el-button type="primary" size="small" @click="handleOpenCreate">新增</el-button>
			<el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
			<el-button type="warning" size="small" @click="upload.open = true">导入文件</el-button>
		</el-header>
		<el-container>
			<RollAside ref="RollAsideRef" />
			<RollMain ref="RollMainRef" />
		</el-container>

		<UploadExcel
			v-model="upload.open"
			:title="upload.upLoadTitle"
			:url="'地址'"
			@onSuccess="onSuccess"
			@onDownTemplate="onDownTemplate"
		>
		</UploadExcel>
	</el-container>
</template>

<script setup>
import { ref, onActivated } from 'vue';
import RollAside from '@/components/RollAside.vue';
import RollMain from '@/components/RollMain.vue';
import UploadExcel from '@/components/UploadExcel.vue';

// 获取浏览器的高度
const windowHeight = window.innerHeight || document.body.clientHeight;
// 内容高度为浏览器高度-头部高度-tab列表高度-padding
const h = windowHeight - 64 - 44 - 40;
// 定义ref实例
const RollAsideRef = ref(null);
const RollMainRef = ref(null);

// 点击新增按钮调用RollAside组件暴漏的handleCreate的方法
const handleOpenCreate = () => RollAsideRef.value.handleCreate();
// 打开上传图片调用RollMainRef组件暴漏的openUploadFile的方法
const handleOpenUpload = () => RollMainRef.value.openUploadFile();

/** * 导入参数 */
const upload = ref({
	// 是否显示弹出层（用户导入）
	open: false,
	// 弹出层标题（用户导入）
	upLoadTitle: '导入',
});
/** 文件上传成功处理 */
const onSuccess = (response, file, fileList) => {
	upload.value.open = false;
	// 调用列表
};
const onDownTemplate = () => {
	ElMessage.error('演示模式');
};
onActivated(() => {
	console.log(33);
});
</script>

<style>
.image-header {
	border-bottom: 1px solid #eeeeee;
	@apply flex items-center;
}
</style>
