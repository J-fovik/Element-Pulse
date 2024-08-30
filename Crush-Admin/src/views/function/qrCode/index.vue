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
			</div>
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
