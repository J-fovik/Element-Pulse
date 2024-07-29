<template>
	<div class="croppers-container layout-pd">
		<el-card shadow="hover" header="cropper 图片裁剪">
			<el-alert
				title="感谢优秀的 `cropperjs`，项目地址：https://github.com/fengyuanchen/cropperjs"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<div class="cropper-img-warp">
				<div class="mb15 mt15">
					<img class="cropper-img" :src="state.cropperJsImg" />
				</div>
				<el-button type="primary" size="default" @click="openCropperJs">
					<el-icon>
						<ele-Crop />
					</el-icon>
					更换头像
				</el-button>
			</div>
			<el-alert
				title="感谢优秀的 `vue-cropper`，项目地址：https://vue-cropper.vercel.app/#/demo-crop"
				type="success"
				:closable="false"
				class="my20"
			></el-alert>
			<div class="cropper-img-warp">
				<div class="mb15 mt15">
					<img class="cropper-img" :src="state.vueCropperImg" />
				</div>
				<el-button type="primary" size="default" @click="openVueCropper">
					<el-icon>
						<ele-Crop />
					</el-icon>
					更换头像
				</el-button>
			</div>
		</el-card>
		<CropperJs ref="cropperJsRef" @updateImg="updateCropperJsImg" />
		<VueCropper ref="vueCropperRef" :imgSrc="state.vueCropperImg" @updateImg="updateVueCropperImg" />
	</div>
</template>

<script setup lang="ts" name="funCropper">
/** 定义实例 */
const cropperJsRef = ref<any>(null);
const vueCropperRef = ref<any>(null);
const state = reactive({
	cropperJsImg: 'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500',
	vueCropperImg: '/src/assets/avatar.png', // 裁剪图片的地址
});
/** 编辑图片 */
const openCropperJs = () => {
	cropperJsRef.value.editCropper(state.cropperJsImg);
};
const openVueCropper = () => {
	vueCropperRef.value.editCropper();
};
/** 更新图片*/
const updateCropperJsImg = (img: any) => {
	console.log(img);
	state.cropperJsImg = img;
};
const updateVueCropperImg = (img: any) => {
	console.log(img);
	state.vueCropperImg = img;
};
</script>

<style scoped lang="scss">
.croppers-container {
	.cropper-img-warp {
		text-align: center;
		.cropper-img {
			margin: auto;
			width: 150px;
			height: 150px;
			border-radius: 100%;
		}
	}
}
</style>
