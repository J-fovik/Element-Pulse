<template>
	<div>
		<el-card shadow="hover" header="Container 容器" class="mb20">
			<Container />
		</el-card>
		<el-card shadow="hover" header="CropperJs 裁剪图片" class="mb20">
			<el-alert
				title="感谢优秀的 `cropperjs`，本 Demo 是基于：https://mraining.github.io/Cropperjs.html"
				type="warning"
				:closable="false"
				class="mb15"
			></el-alert>
			<div class="flx-center">
				<div class="cropper-img-warp">
					<div class="mb15 mt15">
						<img class="cropper-img" :src="state.cropperJsImg" />
					</div>
					<el-button type="primary" size="default" @click="setActiveKey('CropperJs')">
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
		<el-card shadow="hover" header="Dot 热点" class="mb20">
			<el-row :gutter="24">
				<el-col :span="12">
					<el-divider content-position="center">基础用法</el-divider>
					<div class="flx-center">
						<Dot class="mr20" />
						<Dot type="success" class="mr20" />
						<Dot type="warning" class="mr20" />
						<Dot type="danger" class="mr20" />
						<Dot type="info" class="mr20" />
					</div>
				</el-col>
				<el-col :span="12">
					<el-divider content-position="center">关闭动画</el-divider>
					<div class="flx-center">
						<Dot :animation="false" class="mr20" />
						<Dot type="success" :animation="false" class="mr20" />
						<Dot type="warning" :animation="false" class="mr20" />
						<Dot type="danger" :animation="false" class="mr20" />
						<Dot type="info" :animation="false" class="mr20" />
					</div>
				</el-col>
			</el-row>
			<el-descriptions :column="1" border class="mt20">
				<el-descriptions-item label="animation">动画，默认'true'</el-descriptions-item>
				<el-descriptions-item label="type">
					类型('primary' | 'success' | 'warning' | 'danger' | 'info')，默认'primary'
				</el-descriptions-item>
			</el-descriptions>
		</el-card>
		<el-card shadow="hover" header="FlopTime 时钟" class="mb20">
			<FlopTime />
		</el-card>
		<el-card shadow="hover" header="Loading 加载动画" class="mb20">
			<Loading />
		</el-card>
		<el-card shadow="hover" header="SearchItem 表单响应式布局" class="mb20">
			<el-row :gutter="24">
				<SearchItem label="名称:" class="mb5"> 111 </SearchItem>
				<SearchItem label="名称:" class="mb5"> 222 </SearchItem>
				<SearchItem label="名称:" class="mb5"> 333 </SearchItem>
				<SearchItem label="名称:" class="mb5"> 444 </SearchItem>
				<SearchItem label="名称:" class="mb5"> 555 </SearchItem>
				<SearchItem label="名称:" class="mb5"> 666 </SearchItem>
				<SearchItem label="名称:" class="mb5"> 777 </SearchItem>
				<SearchItem label="名称:" class="mb5"> 888 </SearchItem>
			</el-row>
			<el-descriptions :column="1" border class="mt20">
				<el-descriptions-item label="label">标签文本</el-descriptions-item>
			</el-descriptions>
		</el-card>
		<el-card shadow="hover" header="SwitchDark 切换主题" class="mb20">
			<div class="flx-center">
				<SwitchDark />
			</div>
		</el-card>
		<el-card shadow="hover" header="TagInput 可输入标签" class="mb20">
			<el-alert
				title="TagInput 是el-tag动态编辑标签进行的二次封装，官方文档请查看 ：https://element-plus.org/zh-CN/component/tag.html"
				type="warning"
				:closable="false"
			/>
			<div class="flx-center flex-col">
				<div class="mt20">
					<TagInput v-model="tagValue" />
				</div>
				<div class="my20">绑定值：{{ tagValue }}</div>
			</div>
			<el-descriptions title="配置项 📚" :column="1" border>
				<el-descriptions-item label="modelValue">
					双向绑定的 value 值，使用示例： v-model="content">
				</el-descriptions-item>
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
				<div class="cropper-img-warp">
					<div class="mb15 mt15">
						<img class="cropper-img" :src="state.vueCropperImg" />
					</div>
					<el-button type="primary" size="default" @click="setActiveKey('VueCropper')">
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

<script setup lang="ts" name="miniTool">
import { useBasicsState, curryingRequest } from '@/hooks';
import { downloadBase64Image } from '@/utils/fileOperation';
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
const tagValue = ref('aaa,bbb,ccc');
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
.cropper-img-warp {
	text-align: center;
	.cropper-img {
		margin: auto;
		width: 150px;
		height: 150px;
		border-radius: 100%;
	}
}
</style>
