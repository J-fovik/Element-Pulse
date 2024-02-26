<template>
    <el-dialog v-model="open" :title="title" align-center width="800px" append-to-body @opened="modalOpened"
        @close="closeDialog">
        <el-row>
            <el-col :xs="24" :md="12" :style="{ height: '350px' }">
                <vue-cropper v-if="visible" ref="cropper" :img="options.img" :info="true" :auto-crop="options.autoCrop"
                    :auto-crop-width="options.autoCropWidth" :auto-crop-height="options.autoCropHeight"
                    :fixed-box="options.fixedBox" :output-type="options.outputType" @realTime="realTime" />
            </el-col>
            <el-col :xs="24" :md="12" :style="{ height: '350px' }">
                <!-- avatar-upload-preview -->
                <div class="avatar-upload-preview">
                    <img id="maxWidth" :src="options.previews.url" :style="options.previews.img" />
                </div>
            </el-col>
        </el-row>
        <br />
        <el-row>
            <el-col :lg="2" :md="2">
                <el-upload action="#" :http-request="requestUpload" :show-file-list="false" :before-upload="beforeUpload">
                    <el-button>
                        选择
                        <el-icon class="el-icon--right">
                            <Upload />
                        </el-icon>
                    </el-button>
                </el-upload>
            </el-col>
            <el-col :lg="{ span: 1, offset: 2 }" :md="2">
                <el-button icon="Plus" @click="changeScale(1)"></el-button>
            </el-col>
            <el-col :lg="{ span: 1, offset: 1 }" :md="2">
                <el-button icon="Minus" @click="changeScale(-1)"></el-button>
            </el-col>
            <el-col :lg="{ span: 1, offset: 1 }" :md="2">
                <el-button icon="RefreshLeft" @click="rotateLeft()"></el-button>
            </el-col>
            <el-col :lg="{ span: 1, offset: 1 }" :md="2">
                <el-button icon="RefreshRight" @click="rotateRight()"></el-button>
            </el-col>
            <el-col :lg="{ span: 2, offset: 6 }" :md="2">
                <el-button type="primary" @click="uploadImg()">提 交</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>

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
#maxWidth{
    max-width: none;
}
.el-dialog {
	position: relative;
	left: 0;
	margin: 0 auto;
	transform: none;
}
</style>

<script setup>
import { toast } from '@/composables/util'
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";
import { ref, reactive } from "vue";
const open = ref(false);
const visible = ref(false);
const title = ref("修改头像");
const cropper = ref(null);

// 图片裁剪数据
const options = reactive({
    img: '/src/assets/avatar.png', // 裁剪图片的地址
    autoCrop: true, // 是否默认生成截图框
    autoCropWidth: 200, // 默认生成截图框宽度
    autoCropHeight: 200, // 默认生成截图框高度
    fixedBox: true, // 固定截图框大小 不允许改变
    outputType: "png", // 默认生成截图为PNG格式
    previews: {} // 预览数据
});
/** 点击编辑头像 */
function editCropper() {
    open.value = true;
}
/** 打开弹出层结束时的回调 */
const modalOpened = () => {
    visible.value = true;
}
/** 关闭窗口 */
const closeDialog = () => {
    options.img = '/src/assets/avatar.png';
    options.visible = false;
}
/** 覆盖默认上传行为 */
const requestUpload = () => { }
/** 向左旋转 */
const rotateLeft = () => {
    cropper.value.rotateLeft();
}
/** 向右旋转 */
const rotateRight = () => {
    cropper.value.rotateRight();
}
/** 图片缩放 */
const changeScale = (num) => {
    num = num || 1;
    cropper.value.changeScale(num);
}
/** 上传预处理 */
const beforeUpload = (file) => {
    if (file.type.indexOf("image/") == -1) {
        toast("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
    } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            options.img = reader.result;
        };
    }
}
/** 上传图片 */
const uploadImg = () => {
    // cropper.value.getCropBlob(data => {
    //     const formData = new FormData();
    //     console.log("uploadImg", data);
    //     formData.append("avatarfile", data);
    //     // uploadAvatar(formData).then(response => {
    open.value = false;
    //     //   options.img = import.meta.env.VITE_APP_BASE_API + response.imgUrl;
    //     //   userStore.avatar = options.img;
    toast("修改成功");
    //     //
    visible.value = false;
    //     // });
    // });
}
/** 实时预览 */
const realTime = (data) => {
    console.log(data);
    options.previews = data;
}

// 向父组件暴露以下方法
defineExpose({
    editCropper,
})
</script>