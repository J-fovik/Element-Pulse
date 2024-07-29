<template>
	<div class="qrcode-container layout-pd">
		<el-card shadow="hover" header="qrcodejs2 二维码生成">
			<el-alert title="感谢优秀的 `qrcodejs2`，项目地址：https://github.com/davidshimjs/qrcodejs" type="success"
				:closable="false" class="mb15"></el-alert>
			<div class="qrcode-img-warp">
				<div class="mb30 mt30 qrcode-img">
					<div class="qrcode" ref="qrcodeRef"></div>
				</div>
				<input v-model="qrcodejsText" type="text" @input="changeQrCode">
			</div>



			<el-alert title="感谢优秀的 `useQRCode`，地址：https://vueuse.org/integrations/useQRCode/" type="success"
				:closable="false" class="mb15 mt30"></el-alert>
			<div class="qrcode-img-warp">
				<div class="mb30 mt30 qrcode-img">
					<img v-if="useQRCodeText" class="mt-6 mb-2 rounded border qrcode" :src="qrcode" alt="QR Code">
				</div>
				<input v-model="useQRCodeText" type="text">
			</div>
			<!-- <div class="qrcode-img-warp mt30">
				<el-button type="primary" size="default" @click="onInitQrcode">
					<el-icon>
						<ele-Refresh />
					</el-icon>
					重新生成
				</el-button>
			</div> -->
		</el-card>
	</div>
</template>

<script setup lang="ts" name="funQrcode">
import QRCode from 'qrcodejs2-fixes';// qrcodejs2
import { useQRCode } from '@vueuse/integrations/useQRCode'// useQRCode

// qrcodejs2二维码
const qrcodeRef = ref();
const qrcodejsText = ref('https://wx.biye.cc');
// 初始化生成二维码
const initQrcode = () => {
	new QRCode(qrcodeRef.value, {
		// text: `111?t=${new Date().getTime()}`,
		text: qrcodejsText.value,
		width: 125,
		height: 125,
		colorDark: '#000000',
		colorLight: '#ffffff',
	});
};
// 输入框输入重新生成二维码
const changeQrCode = () => {
	qrcodeRef.value.innerHTML = '';
	initQrcode()
}




// useQRCode二维码
const useQRCodeText = ref('https://vueuse.org')
const qrcode = useQRCode(useQRCodeText, {
	errorCorrectionLevel: 'H',
	margin: 3,
})


// // 重新生成
// const onInitQrcode = () => {
// 	qrcodeRef.value.innerHTML = '';
// 	useQRCodeText.value ='';
// };
// 页面加载时
onMounted(() => {
	initQrcode();
});
</script>

<style scoped lang="scss">
.qrcode-container {
	.qrcode-img-warp {
		text-align: center;

		.qrcode-img {
			display: flex;
			width: 100%;
			height: 125px;

			.qrcode {
				margin: auto;
				width: 125px;
				height: 125px;
			}
		}
	}
}
</style>
