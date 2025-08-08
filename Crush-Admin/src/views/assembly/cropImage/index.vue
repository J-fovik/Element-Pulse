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

		<el-card shadow="hover" header="Cropping 裁剪图片" class="mb20">
			<el-alert
				title="感谢优秀的 `cropperjs`，本 Demo 是基于：https://mraining.github.io/Cropperjs.html"
				type="warning"
				:closable="false"
				class="mb15"
			/>
			<div style="display: flex; align-items: center; justify-content: center">
				<el-popover placement="right" width="300px">
					<template #reference>
						<Cropping
							:src="state.vueCropperImg"
							circled
							style="width: 30vw"
							@cropper="updateCropper"
							@readied="() => {}"
						/>
					</template>
					<div class="flex flex-wrap justify-center items-center text-center">
						<el-image
							v-if="state.cropperImg"
							:src="state.cropperImg"
							:preview-src-list="Array.of(state.cropperImg)"
							fit="cover"
						/>
						<div v-if="state.infos" class="mt-1">
							<p>
								图像大小：{{ parseInt(state.infos.width) }} ×
								{{ parseInt(state.infos.height) }}像素
							</p>
							<p>
								文件大小：{{ sizeToStr(state.infos.size) }}（{{ state.infos.size }}
								字节）
							</p>
						</div>
					</div>
				</el-popover>
			</div>
			<el-descriptions :column="1" border class="mt20">
				<el-descriptions-item label="src">图片路径</el-descriptions-item>
				<el-descriptions-item label="alt">无法显示时的替代文本</el-descriptions-item>
				<el-descriptions-item label="circled">形状</el-descriptions-item>
				<el-descriptions-item label="realTimePreview">
					是否支持实时预览
				</el-descriptions-item>
				<el-descriptions-item label="height">图片样式高</el-descriptions-item>
				<el-descriptions-item label="crossorigin">跨域来源</el-descriptions-item>
				<el-descriptions-item label="imageStyle">图片样式</el-descriptions-item>
				<el-descriptions-item label="options">配置</el-descriptions-item>
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
import { downloadBase64Image, sizeToStr } from '@/utils/fileOperation';

// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
const state = reactive({
	cropperJsImg:
		'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500',
	cropperImg: '/src/assets/images/avatar.png', // 裁剪图片的地址
	infos: {} as any, // 信息
	vueCropperImg: '/src/assets/images/avatar.png', // 裁剪图片的地址
});

// 更新CropperJs图片
const updateCropperJsImg = (img: any) => {
	state.cropperJsImg = img;
	// downloadBase64Image(img, 'cropperJsImg.png');
};

// 更新Cropper图片
const updateCropper = ({ base64, blob, info }) => {
	console.log(blob);
	state.infos = info;
	state.cropperImg = base64;
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
