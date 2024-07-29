<template>
	<el-card shadow="hover" header="富文本编辑器 🍓🍇🍈🍉">
		<WangEditor v-model="content" :upload-img="uploadImg" />
		<el-button type="primary" @click="dialogVisible = true"> 内容预览 </el-button>
		<el-descriptions title="配置项 📚" :column="1" border>
			<el-descriptions-item label="modelValue">
				双向绑定的 value 值，使用示例： v-model="content">
			</el-descriptions-item>
			<el-descriptions-item label="excludeKeys"> 默认配置 </el-descriptions-item>
			<el-descriptions-item label="height"> 高度，默认300px </el-descriptions-item>
			<el-descriptions-item label="disabled"> 是否禁用 </el-descriptions-item>
			<el-descriptions-item label="hideToolbar"> 是否展示操作栏 </el-descriptions-item>
			<el-descriptions-item label="uploadImg">
				回调图片 使用示例：:upload-img="uploadImg"
			</el-descriptions-item>
		</el-descriptions>
		<el-dialog v-model="dialogVisible" title="富文本内容预览" width="800" top="50px">
			<div class="view" v-html="content"></div>
		</el-dialog>
	</el-card>
</template>

<script setup lang="ts" name="wangEditor">
import { curryingRequest } from '@/hooks';
const content = ref('');
const dialogVisible = ref(false);
// 图片上传
const uploadImg = async (file: any) => {
	// // 图片上传
	// const { res } = await curryingRequest(() => uploadInformationImg({ file }));
	// // 返回图片路径
	// return res?.data;
	return 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';
};
</script>
<style scoped lang="scss">
.el-button {
	margin-top: 20px;
}
:deep(.el-dialog__body) {
	height: 700px !important;
	overflow: auto;
}
</style>
