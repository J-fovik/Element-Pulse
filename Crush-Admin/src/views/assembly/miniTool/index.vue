<template>
	<div>
		<el-card shadow="hover" header="Container 容器" class="mb20">
			<Container />
		</el-card>
		<el-card shadow="hover" class="mb20" header="CountUp 数字滚动">
			<el-alert
				title="感谢优秀的 `gsap`，项目地址：https://www.npmjs.com/package/gsap"
				type="success"
				:closable="false"
				class="my15"
			></el-alert>
			<el-row :gutter="15">
				<el-col :sm="6" v-for="(v, k) in recommendList" :key="k">
					<div class="data" :style="{ 'background-color': v.bg }">
						<el-icon class="element">
							<component :is="v.icon" :color="v.iconColor" />
						</el-icon>
						<div class="data-auto">
							<div>{{ v.title }}</div>
							<div class="my5 font10">{{ v.msg }}</div>
							<div class="font20">
								<CountUp :value="v.num" />
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-descriptions :column="1" border class="mt20">
				<el-descriptions-item label="value">滚动数字值</el-descriptions-item>
			</el-descriptions>
		</el-card>
		<el-card shadow="hover" header="CropperJs 裁剪图片" class="mb20">
			<el-alert
				title="感谢优秀的 `cropperjs`，项目地址：https://mraining.github.io/Cropperjs.html"
				type="success"
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
		<el-card shadow="hover" header="VueCropper 裁剪图片" class="mb20">
			<el-alert
				title="感谢优秀的 `vue-cropper`，项目地址：https://vue-cropper.vercel.app/#/demo-crop"
				type="success"
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
const state = reactive({
	cropperJsImg:
		'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500',
	vueCropperImg: '/src/assets/images/avatar.png', // 裁剪图片的地址
});
// 获取数据
const recommendList = [
	{
		title: '优惠券',
		msg: '现金券、折扣券、营销必备',
		num: 22,
		icon: 'Food',
		bg: '#48D18D',
		iconColor: '#64d89d',
	},
	{
		title: '多人拼团',
		msg: '社交电商、开辟流量',
		num: 5532,
		icon: 'ShoppingCart',
		bg: '#F95959',
		iconColor: '#F86C6B',
	},
	{
		title: '分销中心',
		msg: '轻松招募分销员，成功推广奖励',
		num: 5233,
		icon: 'School',
		bg: '#8595F4',
		iconColor: '#92A1F4',
	},
	{
		title: '秒杀',
		msg: '超低价抢购引导更多销量',
		num: 100,
		icon: 'AlarmClock',
		bg: '#FEBB50',
		iconColor: '#FDC566',
	},
];

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
/* CountUp 数字滚动 */
.data {
	position: relative;
	height: 120px;
	border-radius: 3px;
	overflow: hidden;
	cursor: pointer;
	&:hover {
		.element {
			right: 0px !important;
			bottom: 0px !important;
			transition: all ease 0.3s;
		}
	}
	.element {
		position: absolute;
		right: -10px;
		bottom: -10px;
		font-size: 70px;
		transform: rotate(-30deg);
		transition: all ease 0.3s;
	}
	.data-auto {
		padding: 15px;
		position: absolute;
		left: 0;
		top: 5%;
	}
}
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
