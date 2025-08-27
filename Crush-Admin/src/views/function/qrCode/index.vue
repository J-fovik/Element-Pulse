<template>
	<div>
		<el-card shadow="hover" header="qrcode" class="mb20">
			<el-alert
				title="感谢优秀的 `qrcode`，本 Demo 是基于：https://www.npmjs.com/package/qrcode"
				type="warning"
				:closable="false"
				class="mb15"
			/>
			<div class="flex-col my20 flx-center">
				<img :src="state.qrcodeUrl" alt="" />
				<el-button class="mt10" type="primary" @click="onInitQrCode('qrcodeUrl')"
					>重新生成</el-button
				>
			</div>
		</el-card>
		<el-card shadow="hover" header="useQRCode" class="mb20">
			<el-alert
				title="感谢优秀的 `useQRCode`，本 Demo 是基于：https://vueuse.org/integrations/useQRCode"
				type="warning"
				:closable="false"
				class="mb15"
			/>
			<div class="flex-col my20 flx-center">
				<img :src="state.useQRCodeUrl" alt="" />
				<el-button class="mt10" type="primary" @click="onInitQrCode('useQRCodeUrl')"
					>重新生成</el-button
				>
			</div>
		</el-card>
		<el-card shadow="hover" header="qrcodejs2-fixes" class="mb20">
			<el-alert
				title="感谢优秀的 `qrcodejs2-fixes`，本 Demo 是基于：https://github.com/davidshimjs/qrcodejs"
				type="warning"
				:closable="false"
				class="mb15"
			/>
			<div class="flex-col my20 flx-center">
				<div ref="qrCodeJsRef"></div>
				<el-button class="mt10" type="primary" @click="onInitQrCodeJs">重新生成</el-button>
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="qrCode">
import QRCode from 'qrcode';
import { useQRCode } from '@vueuse/integrations/useQRCode'; // useQRCode
import QRCodeJs from 'qrcodejs2-fixes';
import { randomStr } from '@/utils/other';
const state = reactive({
	qrcodeUrl: '',
	useQRCodeUrl: '' as any,
});
const qrCodeJsRef = ref<any>(null);
// 重点是二维码信息（地址或者信息）
const qrCodeInit = async (id: any) => {
	state.qrcodeUrl = await QRCode.toDataURL(`https://www.paperred.com/exchange?id=${id}`, {
		margin: 1,
	});
};
const useQRCodeInit = async (id: any) => {
	state.useQRCodeUrl = await useQRCode(`https://vueuse.org?id=${id}`, {
		errorCorrectionLevel: 'H',
		margin: 1,
	});
};
const qrCodeJsInit = async (id: any) => {
	if (!qrCodeJsRef.value) return; // 确保元素存在
	new QRCodeJs(qrCodeJsRef.value, {
		text: `https://vueuse.org?t=${id}`,
		width: 125,
		height: 125,
		colorDark: '#000000',
		colorLight: '#ffffff',
	});
};
// 重新生成
const onInitQrCode = (str: any) => {
	state[str] = '';
	if (str === 'qrcodeUrl') qrCodeInit(randomStr(1));
	else if (str === 'useQRCodeUrl') useQRCodeInit(randomStr(1));
};
// 重新生成
const onInitQrCodeJs = () => {
	qrCodeJsRef.value.innerHTML = '';
	qrCodeJsInit(randomStr(1));
};
onMounted(() => {
	qrCodeInit('1');
	useQRCodeInit('1');
	qrCodeJsInit('1');
});
</script>

<style lang="scss" scoped></style>
