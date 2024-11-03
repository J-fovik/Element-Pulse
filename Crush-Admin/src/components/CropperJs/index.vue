<template>
	<el-dialog
		:model-value="true"
		:title="props.title"
		align-center
		width="800px"
		append-to-body
		:close-on-click-modal="false"
		@close="emits('close')"
	>
		<div class="flex">
			<!-- 当前图片 -->
			<div class="cropper-warp-left">
				<img :src="state.cropperImg" class="w-full h-full" ref="cropperRef" />
			</div>
			<!-- 预览 -->
			<div class="cropper-warp-right">
				<div class="text-center">预览</div>
				<div class="cropper-warp-right-item">
					<div class="flex">
						<img :src="state.cropperImgBase64" class="cropper-warp-right-value-img" />
					</div>
					<div class="cropper-warp-right-label">100 x 100</div>
				</div>
				<div class="cropper-warp-right-item">
					<div class="flex">
						<img
							:src="state.cropperImgBase64"
							class="cropper-warp-right-value-img cropper-size"
						/>
					</div>
					<div class="cropper-warp-right-label">50 x 50</div>
				</div>
			</div>
		</div>
		<!-- 操作 -->
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="emits('close')" size="default">取 消</el-button>
				<el-button type="primary" @click="onSubmit" size="default">更 换</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="CropperJs">
import { toast } from '@/utils/elementPlus';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
const cropperRef = ref(); // 裁剪图片实例
// 父组件参数
const props = withDefaults(
	defineProps<{
		imgSrc: string;
		title?: string;
	}>(),
	{
		imgSrc: '/src/assets/images/avatar.png',
		title: '修改头像',
	}
);
// 父组件方法
const emits = defineEmits(['close', 'success']);
// 定义变量内容
const state = reactive({
	cropperImg: props.imgSrc, // 接收的图片
	cropperImgBase64: '', // base64图片
	instance: '' as any, // 实例
});

// 更换
const onSubmit = () => {
	state.cropperImgBase64 = state.instance.getCroppedCanvas().toDataURL('image/jpeg');
	emits('success', state.cropperImgBase64); // 发射事件，并传递裁剪后的图片 DataURL
	toast('修改成功');
	emits('close');
};
// 初始化cropperjs图片裁剪
const initCropper = () => {
	if (cropperRef.value) {
		state.instance = new Cropper(cropperRef.value, {
			viewMode: 1,
			dragMode: 'none',
			initialAspectRatio: 1,
			aspectRatio: 1,
			preview: '.before',
			background: false,
			autoCropArea: 0.6,
			zoomOnWheel: false,
			crop: () => {
				state.cropperImgBase64 = state.instance.getCroppedCanvas().toDataURL('image/jpeg');
			},
		});
	}
};
// 初始化
onMounted(() => {
	setTimeout(() => {
		initCropper();
	}, 500);
});
</script>

<style scoped lang="scss">
.cropper-warp-left {
	position: relative;
	display: inline-block;
	height: 350px;
	flex: 1;
	border: 1px solid var(--el-border-color);
	background: var(--el-color-white);
	overflow: hidden;
	background-repeat: no-repeat;
	cursor: move;
	border-radius: var(--el-border-radius-base);
}
.cropper-warp-right {
	width: 150px;
	height: 350px;
	.cropper-warp-right-item {
		margin: 15px 0;
		.cropper-warp-right-value-img {
			width: 100px;
			height: 100px;
			border-radius: var(--el-border-radius-circle);
			margin: auto;
		}
		.cropper-size {
			width: 50px;
			height: 50px;
		}
		.cropper-warp-right-label {
			text-align: center;
			font-size: 12px;
			color: var(--el-text-color-primary);
			height: 30px;
			line-height: 30px;
		}
	}
}
</style>
