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
const content = ref(
	'<p><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;">胡歌，1982年9月20日出生于上海市徐汇区，中国内地影视男演员、流行乐歌手，</span><a href="https://baike.baidu.com/item/%E6%B0%91%E7%9B%9F/1971441?fromModule=lemma_inlink" target="_blank" style="text-indent: 28px; text-align: start;">民盟</a><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;">盟员</span><span style="color: rgb(51, 102, 204); background-color: rgb(255, 255, 255); font-size: 12px;"><sup> [1]</sup></span><a href="" target="" style="text-indent: 28px; text-align: start;"> </a><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;"> ，毕业于</span><a href="https://baike.baidu.com/item/%E4%B8%8A%E6%B5%B7%E6%88%8F%E5%89%A7%E5%AD%A6%E9%99%A2/1736818?fromModule=lemma_inlink" target="_blank" style="text-indent: 28px; text-align: start;">上海戏剧学院</a><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;">表演系。</span></p>'
);
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
