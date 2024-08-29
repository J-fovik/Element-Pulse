<template>
	<div>
		<el-card shadow="hover" header="qrcode">
			<el-alert
				title="感谢优秀的 `qrcode`，项目地址：https://www.npmjs.com/package/qrcode"
				type="success"
				:closable="false"
				class="mb15"
			/>
			<img :src="state.qrcodeUrl" alt="" />
		</el-card>
		<el-card shadow="hover" header="useQRCode" class="mt20">
			<el-alert
				title="感谢优秀的 `useQRCode`，地址：https://vueuse.org/integrations/useQRCode"
				type="success"
				:closable="false"
				class="mb15"
			/>
			<img :src="state.useQRCodeUrl" alt="" />
		</el-card>
	</div>
</template>

<script setup lang="ts" name="qrCode">
import QRCode from 'qrcode';
import { useQRCode } from '@vueuse/integrations/useQRCode'; // useQRCode
const state = reactive({
	qrcodeUrl: '',
	useQRCodeUrl: '' as any,
});
const qrcodeInit = async (id: any) => {
	state.qrcodeUrl = await QRCode.toDataURL(`https://www.paperred.com/exchange?id=${id}`, {
		margin: 1,
	});
};
qrcodeInit('1');

const useQRCodeInit = async (id: any) => {
	state.useQRCodeUrl = await useQRCode(`https://vueuse.org?id=${id}`, {
		errorCorrectionLevel: 'H',
		margin: 1,
	});
};
useQRCodeInit('1');
</script>

<style lang="scss" scoped></style>
