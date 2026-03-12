<template>
	<div class="">
		<!-- 文件 -->
		<el-card header="文件">
			<el-button
				type="primary"
				@click="
					downloadFileFromUrl({
						source: 'https://codeload.github.com/vbenjs/vue-vben-admin-doc/zip/main',
						target: '_self',
					})
				"
			>
				文件下载
			</el-button>
		</el-card>
		<!-- 文本 -->
		<el-card class="my5" header="文本">
			<el-button
				type="primary"
				@click="
					downloadFileFromBlobPart({
						source: 'text content',
						fileName: 'test.txt',
					})
				"
			>
				文本下载
			</el-button>
		</el-card>
		<!-- 图片 -->
		<el-card class="my5" header="图片">
			<div class="flex justify-center items-center flex-col">
				<div><canvas ref="canvas" width="200" height="200"></canvas></div>
				<div>
					<div v-if="imageInfo.size">
						图片大小：
						<span>{{ imageInfo.size + 'kb' }}</span>
					</div>
					<div v-if="imageInfo.height">
						图片高度：
						<span>{{ imageInfo.height + 'px' }}</span>
					</div>
					<div v-if="imageInfo.width">
						图片宽度：
						<span>{{ imageInfo.width + 'px' }}</span>
					</div>
					<div v-if="imageInfo.suffix">
						图片尾缀：
						<span>{{ imageInfo.suffix }}</span>
					</div>
					<div v-if="imageInfo.type">
						图片类型：
						<span>{{ imageInfo.type }}</span>
					</div>
					<div v-if="imageInfo.name">
						图片名称：
						<span>{{ imageInfo.name }}</span>
					</div>
				</div>
				<div>
					<el-button type="primary" @click="flipImage('leftRotate')">左转</el-button>
					<el-button type="primary" @click="flipImage('rightRotate')">右转</el-button>
					<el-button type="primary" @click="flipImage('flipSideToSide')">
						左右翻转
					</el-button>
					<el-button type="primary" @click="flipImage('flipUpsideDown')">
						上下翻转
					</el-button>
					<el-button type="primary" @click="clickUrlToBase64(imageInfo.imageSrc)">
						图片转Base64
					</el-button>
					<el-button type="primary" @click="clickShow(imageInfo.imageSrc, 'size')">
						显示大小
					</el-button>
					<el-button type="primary" @click="clickShow(imageInfo.imageSrc, 'widthHeight')">
						显示宽高
					</el-button>
					<el-button type="primary" @click="clickShow(imageInfo.imageSrc, 'suffix')">
						显示尾缀
					</el-button>
					<el-button type="primary" @click="clickShow(imageInfo.imageSrc, 'type')">
						显示类型
					</el-button>
					<el-button type="primary" @click="clickShow(imageInfo.imageSrc, 'name')">
						显示名称
					</el-button>
					<el-button type="primary" @click="clickShow(imageInfo.imageSrc, 'imgData')">
						打印图片数据
					</el-button>
					<el-button type="primary" @click="downImage(imageInfo.imageSrc, 'image.png')">
						图片下载1
					</el-button>
					<el-button
						type="primary"
						@click="
							downloadFileFromImageUrl({
								source: imageInfo.imageSrc,
								fileName: 'image.png',
							})
						"
					>
						图片下载2
					</el-button>
					<el-button
						type="primary"
						:disabled="!imageInfo.imageBase64"
						@click="
							downloadFileFromBase64({
								source: imageInfo.imageBase64,
								fileName: 'imageBase64.png',
							})
						"
					>
						base64流下载1
					</el-button>
					<el-button
						type="primary"
						:disabled="!imageInfo.imageBase64"
						@click="downloadBase64Image(imageInfo.imageBase64, 'imageBase64.png')"
					>
						base64流下载2
					</el-button>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="download">
import {
	showSize,
	getCanvasImgData,
	getFileName,
	downImage,
	fileSuffix,
	getImageWidthHeight,
	downloadBase64Image,
	urlToBase64,
	flipSideToSide,
	flipUpsideDown,
	leftRotate,
	rightRotate,
	downloadFileFromUrl,
	downloadFileFromImageUrl,
	downloadFileFromBase64,
	downloadFileFromBlobPart,
	getImageTypeFromUrl,
} from '@/utils/fileOperation';

import imageSrc from '@/assets/images/allosaurus.png';
type FlipType = 'flipSideToSide' | 'flipUpsideDown' | 'leftRotate' | 'rightRotate';
const imageInfo = ref({
	imageSrc: imageSrc,
	imageBase64: '',
	size: null as any,
	width: null as any,
	height: null as any,
	suffix: null as any,
	type: null as any,
	name: null as any,
} as any);
const canvas = ref();
onMounted(() => {
	const ctx = canvas.value.getContext('2d');
	const image = new Image();
	image.onload = () => {
		ctx.drawImage(image, 0, 0, canvas.value.width, canvas.value.height);
	};
	image.src = imageInfo.value.imageSrc;
});
// 操作图片
const flipImage = (type: FlipType) => {
	const ctx = canvas.value.getContext('2d');
	const imageData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height);
	let flippedImageData: ImageData | null = null;
	switch (type) {
		case 'flipSideToSide':
			flippedImageData = flipSideToSide(imageData);
			break;
		case 'flipUpsideDown':
			flippedImageData = flipUpsideDown(imageData);
			break;
		case 'leftRotate':
			flippedImageData = leftRotate(imageData);
			break;
		case 'rightRotate':
			flippedImageData = rightRotate(imageData);
			break;
		default:
			console.error('Unknown flip type');
			return;
	}
	if (flippedImageData) {
		ctx.putImageData(flippedImageData, 0, 0);
	}
};
// 图片转Base64
const clickUrlToBase64 = (url: string) => {
	urlToBase64(url)
		.then((base64) => {
			imageInfo.value.imageBase64 = base64;
		})
		.catch((error) => {
			console.error('Error converting URL to Base64:', error);
		});
};

// 点击显示
const clickShow = async (url: string, type: any) => {
	switch (type) {
		case 'size':
			imageInfo.value.size = await showSize(url);
			break;
		case 'widthHeight':
			const { width, height } = await getImageWidthHeight(url);
			imageInfo.value.height = height;
			imageInfo.value.width = width;
			break;
		case 'suffix':
			imageInfo.value.suffix = await fileSuffix(url);
			break;
		case 'type':
			imageInfo.value.type = await getImageTypeFromUrl(url);
			break;
		case 'name':
			imageInfo.value.name = await getFileName(url);
			break;
		case 'imgData':
			const { width: curWidth, height: curHeight } = await getImageWidthHeight(url);
			const imgData = await getCanvasImgData(url, curWidth, curHeight);
			console.log(imgData);
			break;
	}
};
</script>
