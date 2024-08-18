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
		<el-row>
			<el-col :span="12" :style="{ height: '350px' }">
				<vue-cropper
					ref="cropperRef"
					:img="options.img"
					:info="true"
					:auto-crop="options.autoCrop"
					:auto-crop-width="options.autoCropWidth"
					:auto-crop-height="options.autoCropHeight"
					:fixed-box="options.fixedBox"
					:output-type="options.outputType"
					@realTime="realTime"
				/>
			</el-col>
			<el-col :span="12" :style="{ height: '350px' }">
				<div class="avatar-upload-preview">
					<img id="maxWidth" :src="options.previews.url" :style="options.previews.img" />
				</div>
			</el-col>
		</el-row>
		<br />
		<el-row>
			<el-col :span="12">
				<el-button circle :icon="Plus" @click="changeScale(1)"></el-button>
				<el-button circle :icon="Minus" @click="changeScale(-1)"></el-button>
				<el-button circle :icon="RefreshLeft" @click="rotateLeft()"></el-button>
				<el-button circle :icon="RefreshRight" @click="rotateRight()"></el-button>
			</el-col>
			<el-col :span="8">
				<el-button type="primary" @click="submitImg()">提 交</el-button>
			</el-col>
		</el-row>
	</el-dialog>
</template>

<script setup name="VueCropper" lang="ts">
import { Plus, Minus, RefreshLeft, RefreshRight } from '@element-plus/icons-vue';
import 'vue-cropper/dist/index.css';
import { VueCropper } from 'vue-cropper';
import { toast } from '@/utils/elementPlus';
const cropperRef = ref(); // 裁剪图片实例
// 父组件参数
const props = withDefaults(
	defineProps<{
		imgSrc: string;
		title?: string;
		autoCropWidth?: number;
		autoCropHeight?: number;
	}>(),
	{
		imgSrc: '/src/assets/images/avatar.png',
		title: '修改头像',
		autoCropWidth: 200,
		autoCropHeight: 200,
	}
);
/* 父组件方法 */
const emits = defineEmits(['close', 'success']);
// 图片裁剪数据
const options = reactive({
	img: props.imgSrc, // 裁剪图片的地址
	autoCrop: true, // 是否默认生成截图框
	autoCropWidth: props.autoCropWidth, // 默认生成截图框宽度
	autoCropHeight: props.autoCropHeight, // 默认生成截图框高度
	fixedBox: true, // 固定截图框大小 不允许改变
	outputType: 'png', // 默认生成截图为PNG格式
	previews: {} as any, // 预览数据
});
/** 向左旋转 */
const rotateLeft = () => {
	cropperRef.value.rotateLeft();
};
/** 向右旋转 */
const rotateRight = () => {
	cropperRef.value.rotateRight();
};
/** 图片缩放 */
const changeScale = (num) => {
	num = num || 1;
	cropperRef.value.changeScale(num);
};
/** 实时预览 */
const realTime = (data) => {
	options.previews = data;
};
/** 提交图片 */
const submitImg = () => {
	cropperRef.value.getCropData((data) => {
		emits('success', data); // 发射事件，并传递裁剪后的图片 DataURL
		toast('修改成功');
		emits('close');
	});
};
</script>
<style lang="scss" scoped>
.avatar-upload-preview {
	overflow: hidden;
	position: absolute;
	top: 50%;
	border-radius: 50%;
	width: 200px;
	height: 200px;
	box-shadow: 0 0 4px #ccc;
	transform: translate(50%, -50%);
}
#maxWidth {
	max-width: none;
}
.el-dialog {
	position: relative;
	left: 0;
	margin: 0 auto;
	transform: none;
}
</style>
