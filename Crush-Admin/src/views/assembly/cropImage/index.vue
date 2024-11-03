<template>
	<div>
		<el-card shadow="hover" header="CropperJs 裁剪图片" class="mb20">
			<el-alert
				title="感谢优秀的 `cropperjs`，本 Demo 是基于：https://mraining.github.io/Cropperjs.html"
				type="warning"
				:closable="false"
				class="mb15"
			/>
			<div class="flx-center">
				<div class="cropper-img-warp">
					<div class="mb15 mt15">
						<img class="cropper-img" :src="state.cropperJsImg" />
					</div>
					<el-button type="primary" @click="setActiveKey('CropperJs')">
						<el-icon>
							<Crop />
						</el-icon>
						更换头像
					</el-button>
				</div>
				<CropperJs
					v-if="activeKey === 'CropperJs'"
					:imgSrc="state.cropperJsImg"
					@success="updateCropperJsImg"
					@close="setActiveKey(null)"
				/>
			</div>
			<el-descriptions :column="1" border class="mt20">
				<el-descriptions-item label="imgSrc">图片路径</el-descriptions-item>
				<el-descriptions-item label="title">模态框名称</el-descriptions-item>
			</el-descriptions>
		</el-card>

		<el-card shadow="hover" header="VueCropper 裁剪图片" class="mb20">
			<el-alert
				title="感谢优秀的 `vue-cropper`，本 Demo 是基于：https://vue-cropper.vercel.app/#/demo-crop"
				type="warning"
				:closable="false"
				class="my20"
			></el-alert>
			<div class="flx-center">
				<div class="text-center">
					<div class="mb15 mt15">
						<img class="cropper-img" :src="state.vueCropperImg" />
					</div>
					<el-button type="primary" @click="setActiveKey('VueCropper')">
						<el-icon>
							<Crop />
						</el-icon>
						更换头像
					</el-button>
				</div>
				<VueCropper
					v-if="activeKey === 'VueCropper'"
					:imgSrc="state.vueCropperImg"
					@success="updateVueCropperImg"
					@close="setActiveKey(null)"
				/>
			</div>
			<el-descriptions :column="1" border class="mt20">
				<el-descriptions-item label="imgSrc">图片路径</el-descriptions-item>
				<el-descriptions-item label="title">模态框名称</el-descriptions-item>
				<el-descriptions-item label="autoCropWidth">裁剪图片宽度</el-descriptions-item>
				<el-descriptions-item label="autoCropHeight">裁剪图片高度</el-descriptions-item>
			</el-descriptions>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="cropImage">
import { useBasicsState } from '@/hooks';
import { downloadBase64Image } from '@/utils/fileOperation';
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
const state = reactive({
	cropperJsImg:
		'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500',
	vueCropperImg: '/src/assets/images/avatar.png', // 裁剪图片的地址
});

// 更新CropperJs图片
const updateCropperJsImg = (img: any) => {
	state.cropperJsImg = img;
	// downloadBase64Image(img, 'cropperJsImg.png');
};

// 更新VueCropper图片
const updateVueCropperImg = (img: any) => {
	state.vueCropperImg = img;
	// downloadBase64Image(img, 'vueCropperImg.png');
};
</script>

<style scoped lang="scss">
/* VueCropper 裁剪图片 */
.cropper-img {
	margin: auto;
	width: 150px;
	height: 150px;
	border-radius: 100%;
}
</style>
