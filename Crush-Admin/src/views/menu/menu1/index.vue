<template>
	<Container>
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
	</Container>
</template>

<script setup lang="ts" name="menu1">
import { useBasicsState, curryingRequest } from '@/hooks';
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
const state = reactive({
	vueCropperImg: '/src/assets/images/avatar.png', // 裁剪图片的地址
});
const updateVueCropperImg = (img: any) => {
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
