<template>
	<Container>
		<el-alert
			title="富文本编辑器目前使用 wangeditor 插件完成，官方文档请查看 ：https://www.wangeditor.com/v5/installation.html#cdn"
			type="warning"
			:closable="false"
		/>
		<WangEditor v-model="content" :upload-img="uploadImg" class="mt20" />
		<el-descriptions title="配置项 📚" :column="1" border class="mt20">
			<el-descriptions-item label="modelValue">
				双向绑定的 value 值，使用示例： v-model="content">
			</el-descriptions-item>
			<el-descriptions-item label="excludeKeys"> 默认配置 </el-descriptions-item>
			<el-descriptions-item label="height"> 高度，默认300px </el-descriptions-item>
			<el-descriptions-item label="disabled"> 是否禁用 ,默认 false</el-descriptions-item>
			<el-descriptions-item label="hideToolbar">
				是否展示操作栏,默认 true
			</el-descriptions-item>
			<el-descriptions-item label="uploadImg">
				回调上传图片 使用示例：:upload-img="uploadImg"
			</el-descriptions-item>
		</el-descriptions>
	</Container>
</template>

<script setup lang="ts" name="wangEditor">
import { curryingRequest } from '@/hooks';
const content = ref('');
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
