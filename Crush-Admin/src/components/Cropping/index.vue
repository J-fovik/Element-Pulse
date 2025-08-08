<template>
	<div>
		<div
			v-if="inSrc"
			ref="tippyElRef"
			:class="{ 're-circled': inCircled }"
			:style="getWrapperStyle"
		>
			<img
				v-show="isReady"
				ref="imgElRef"
				:style="getImageStyle"
				:src="inSrc"
				:alt="props.alt"
				:crossorigin="props.crossorigin"
			/>
		</div>
		<div class="mt20 flex flex-wrap justify-between">
			<!-- 上传 -->
			<el-upload accept="image/*" :before-upload="beforeUpload" :show-file-list="false">
				<el-button circle :icon="Upload"> </el-button>
			</el-upload>
			<!-- 下载 -->
			<el-button circle :icon="Download" @click="downloadBase64Image(imgBase64, 'cropping')">
			</el-button>
			<!-- 圆形、矩形裁剪 -->
			<el-button
				circle
				:icon="Notification"
				@click="
					() => {
						inCircled = !inCircled;
						realTimeCroppered();
					}
				"
			>
			</el-button>
			<!-- 重置 -->
			<el-button circle :icon="Refresh" @click="handCropper('reset')"> </el-button>
			<!-- 上移 -->
			<el-button circle :icon="CaretTop" @click="handCropper('move', [0, -10])"></el-button>
			<!-- 下移 -->
			<el-button circle :icon="CaretBottom" @click="handCropper('move', [0, 10])"></el-button>
			<!-- 左移 -->
			<el-button circle :icon="CaretLeft" @click="handCropper('move', [-10, 0])"></el-button>
			<!-- 右移 -->
			<el-button circle :icon="CaretRight" @click="handCropper('move', [10, 0])"></el-button>
			<!-- 水平翻转 -->
			<el-button circle :icon="Guide" @click="handCropper('scaleX', -1)"></el-button>
			<!-- 垂直翻转 -->
			<el-button circle :icon="DCaret" @click="handCropper('scaleY', -1)"></el-button>
			<!-- 逆时针旋转 -->
			<el-button circle :icon="RefreshLeft" @click="handCropper('rotate', -45)"></el-button>
			<!-- 顺时针旋转 -->
			<el-button circle :icon="RefreshRight" @click="handCropper('rotate', 45)"></el-button>
			<!-- 放大 -->
			<el-button circle :icon="ZoomIn" @click="handCropper('zoom', 0.1)"></el-button>
			<!-- 缩小 -->
			<el-button circle :icon="ZoomOut" @click="handCropper('zoom', -0.1)"></el-button>
		</div>
	</div>
</template>

<script setup lang="ts" name="Cropping">
import {
	Upload,
	Download,
	Notification,
	Refresh,
	CaretTop,
	CaretBottom,
	CaretLeft,
	CaretRight,
	Guide,
	DCaret,
	RefreshLeft,
	RefreshRight,
	ZoomIn,
	ZoomOut,
} from '@element-plus/icons-vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { useResizeObserver } from '@vueuse/core';
import { debounce } from '@/utils/other';
import { isArray } from '@/utils/type';
import { downloadBase64Image } from '@/utils/fileOperation';
import type { CSSProperties } from 'vue';

type Options = Cropper.Options;
// 默认配置
const defaultOptions: Options = {
	aspectRatio: 1,
	zoomable: true,
	zoomOnTouch: true,
	zoomOnWheel: true,
	cropBoxMovable: true,
	cropBoxResizable: true,
	toggleDragModeOnDblclick: true,
	autoCrop: true,
	background: true,
	highlight: true,
	center: true,
	responsive: true,
	restore: true,
	checkCrossOrigin: true,
	checkOrientation: true,
	scalable: true,
	modal: true,
	guides: true,
	movable: true,
	rotatable: true,
};
// 父组件参数
const props = defineProps({
	src: { type: String, required: true }, // 图片路径
	alt: { type: String }, // 无法显示时的替代文本
	circled: { type: Boolean, default: false }, // 形状
	realTimePreview: { type: Boolean, default: true }, // 是否支持实时预览
	height: { type: [String, Number], default: '360px' }, // 图片样式高
	crossorigin: {
		type: String as PropType<'' | 'anonymous' | 'use-credentials' | undefined>,
		default: undefined, // 跨域来源
	},
	imageStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }, // 图片样式
	options: { type: Object as PropType<Options>, default: () => ({}) }, // 配置
});
// 父组件方法
const emit = defineEmits(['readied', 'cropper', 'error']);
const tippyElRef = ref<HTMLImageElement>(); // 包裹图片实例
const imgElRef = ref<HTMLImageElement>(); // 图片实例
const cropper = ref() as any; // 插件实例
const inCircled = ref(props.circled); // 裁剪形状
const inSrc = ref(props.src); // 图片路径
const isReady = ref(false); // 是否可读
const imgBase64 = ref(); // Base64路径（返回路径）
let scaleX = 1;
let scaleY = 1;
// 防抖处理
const debounceRealTimeCroppered = debounce(realTimeCroppered, 80);
// 获取图片样式
const getImageStyle = computed(
	(): CSSProperties => ({
		height: props.height,
		maxWidth: '100%',
		...props.imageStyle,
	})
);
// 获取封面样式
const getWrapperStyle = computed(
	(): CSSProperties => ({
		height: `${props.height}`.replace(/px/, '') + 'px',
	})
);
// 实时预览
function realTimeCroppered() {
	props.realTimePreview && croppered();
}
// 处理裁剪器操作
const handCropper = (event: string, arg?: number | Array<number>) => {
	if (event === 'scaleX') {
		scaleX = arg = scaleX === -1 ? 1 : -1;
	}
	if (event === 'scaleY') {
		scaleY = arg = scaleY === -1 ? 1 : -1;
	}
	arg && isArray(arg) ? cropper.value?.[event]?.(...arg) : cropper.value?.[event]?.(arg);
};
/**
 * 生成圆形裁剪画布（带抗锯齿和透明背景）
 * @returns 圆形裁剪后的Canvas对象
 * @throws 当裁剪器未初始化或获取画布失败时抛出错误
 */
const getRoundedCanvas = () => {
	const sourceCanvas = cropper.value!.getCroppedCanvas();
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d')!;
	const width = sourceCanvas.width;
	const height = sourceCanvas.height;
	canvas.width = width;
	canvas.height = height;
	context.imageSmoothingEnabled = true;
	context.drawImage(sourceCanvas, 0, 0, width, height);
	context.globalCompositeOperation = 'destination-in';
	context.beginPath();
	context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
	context.fill();
	return canvas;
};
// 处理图片裁剪并返回结果的函数
const croppered = () => {
	if (!cropper.value) return;
	const canvas = inCircled.value ? getRoundedCanvas() : cropper.value.getCroppedCanvas();
	canvas.toBlob((blob) => {
		if (!blob) return;
		const fileReader: FileReader = new FileReader();
		fileReader.readAsDataURL(blob);
		fileReader.onloadend = (e) => {
			if (!e.target?.result || !blob) return;
			imgBase64.value = e.target.result;
			emit('cropper', {
				base64: e.target.result,
				blob,
				info: { size: blob.size, ...cropper.value.getData() },
			});
		};
		fileReader.onerror = () => {
			emit('error');
		};
	});
};
// 上传前校验
const beforeUpload = (file) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	inSrc.value = '';
	reader.onload = (e) => {
		inSrc.value = e.target?.result as string;
	};
	reader.onloadend = () => {
		init();
	};
	return false;
};
// 初始化
const init = async () => {
	const imgEl = unref(imgElRef);
	if (!imgEl) return;
	cropper.value = new Cropper(imgEl, {
		...defaultOptions,
		ready: () => {
			isReady.value = true;
			realTimeCroppered();
			emit('readied', cropper.value);
		},
		crop() {
			debounceRealTimeCroppered();
		},
		zoom() {
			debounceRealTimeCroppered();
		},
		cropmove() {
			debounceRealTimeCroppered();
		},
		...props.options,
	});
};
// 初始化zhixing
onMounted(init);
// 卸载
onUnmounted(() => {
	cropper.value?.destroy();
	isReady.value = false;
	cropper.value = null;
	imgBase64.value = '';
	scaleX = 1;
	scaleY = 1;
});
// 监听元素尺寸变化并在变化时重置裁剪器
useResizeObserver(tippyElRef, () => handCropper('reset'));
</script>

<style scoped lang="scss">
.re-circled {
	// 如果你的 .cropper-view-box 和 .cropper-face 是子组件内部的元素，
	// 可能需要使用 :deep() 穿透作用域样式
	:deep(.cropper-view-box),
	:deep(.cropper-face) {
		border-radius: 50%;
	}
}
.el-button + .el-button {
	margin-left: 0px;
}
</style>
