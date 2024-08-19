<template>
	<el-dialog v-model="openDialog" :title="props.title" align-center width="800px" append-to-body @opened="modalOpened">
		<el-row>
			<el-col :span="12" :style="{ height: '350px' }">
				<vue-cropper
					v-if="visible"
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
			<el-col :span="4">
				<el-upload action="#" :http-request="requestUpload" :show-file-list="false" :before-upload="beforeUpload">
					<el-button>
						选择
						<el-icon class="el-icon--right">
							<ele-Upload />
						</el-icon>
					</el-button>
				</el-upload>
			</el-col>
			<el-col :span="12">
				<el-button circle :icon="Plus" @click="changeScale(1)"></el-button>
				<el-button circle :icon="Minus" @click="changeScale(-1)"></el-button>
				<el-button circle :icon="RefreshLeft" @click="rotateLeft()"></el-button>
				<el-button circle :icon="RefreshRight" @click="rotateRight()"></el-button>
			</el-col>
			<el-col :span="8">
				<el-button type="primary" @click="uploadImg()">提 交</el-button>
			</el-col>
		</el-row>
	</el-dialog>
</template>

<script setup name="vueCropper">
import { Plus, Minus, RefreshLeft, RefreshRight } from '@element-plus/icons-vue';
import 'vue-cropper/dist/index.css';
import { VueCropper } from 'vue-cropper';
import { toast } from '/@/utils/elementPlus';
const openDialog = ref(false); // 模态框
const visible = ref(false); // 图片遮罩
const cropperRef = ref(null); // 裁剪图片实例
const props = defineProps({
	// 定义一个 prop 来接收图片路径
	imgSrc: {
		type: String,
		default: '/src/assets/avatar.png', // 默认值
	},
	title: {
		type: String,
		default: '修改头像', // 默认值
	},
});
const emits = defineEmits(['updateImg']);
// 图片裁剪数据
const options = reactive({
	img: props.imgSrc, // 裁剪图片的地址
	autoCrop: true, // 是否默认生成截图框
	autoCropWidth: 200, // 默认生成截图框宽度
	autoCropHeight: 200, // 默认生成截图框高度
	fixedBox: true, // 固定截图框大小 不允许改变
	outputType: 'png', // 默认生成截图为PNG格式
	previews: {}, // 预览数据
});
/** 点击编辑头像 */
const editCropper = () => {
	openDialog.value = true;
};
/** 打开弹出层结束时的回调 */
const modalOpened = () => {
	visible.value = true;
};
/** 覆盖默认上传行为 */
const requestUpload = () => {};
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
/** 上传预处理 */
const beforeUpload = (file) => {
	if (file.type.indexOf('image/') == -1) {
		toast('文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。');
	} else {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			options.img = reader.result;
			console.log(reader.result);
		};
	}
};
/** 实时预览 */
const realTime = (data) => {
	options.previews = data;
};
/** 上传图片 */
const uploadImg = () => {
	cropperRef.value.getCropBlob((data) => {
		// 将 Blob 对象转换为 DataURL 格式
		const blobToDataURL = (blob) =>
			new Promise((resolve) => {
				const reader = new FileReader();
				reader.onload = (event) => resolve(event.target.result);
				reader.readAsDataURL(blob);
			});
		blobToDataURL(data).then((dataURL) => {
			const formData = new FormData();
			console.log(formData, dataURL);
			formData.append('avatarfile', dataURL);
			emits('updateImg', dataURL); // 发射事件，并传递裁剪后的图片 DataURL
			openDialog.value = false;
			visible.value = false;
			toast('修改成功');
		});
	});
};
// 向父组件暴露以下方法
defineExpose({
	editCropper,
});
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
