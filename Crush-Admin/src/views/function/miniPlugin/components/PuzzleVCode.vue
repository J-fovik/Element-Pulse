<template>
	<div>
		<el-alert
			title="感谢优秀的 `vue3-puzzle-vcode`，本 Demo 是基于：https://www.npmjs.com/package/vue3-puzzle-vcode"
			type="warning"
			:closable="false"
		/>
		<el-card class="mt20">
			<div class="flex-col mt20 flx-center">
				<div
					class="p6 flx-center flex-col"
					style="background: rgba(15, 23, 42, 0.2); width: 360px"
				>
					<VCode
						:show="isShow"
						type="inside"
						successText="验证通过！"
						failText="验证失败，请重试"
						sliderText="拖动滑块完成拼图"
						@success="onSuccess"
						@fail="onFail"
						@close="onClose"
					/>
					<el-button class="mt20" @click="onShow">开始验证</el-button>
				</div>
			</div>
		</el-card>
	</div>
</template>
<script setup lang="ts" name="PuzzleVCode">
import VCode from 'vue3-puzzle-vcode';
const isShow = ref(false);
const onShow = () => {
	isShow.value = true;
};
// 用户点击遮罩层的回调
const onClose = () => {
	isShow.value = false;
};
// 验证成功
const onSuccess = () => {
	console.log('验证成功');
	onClose(); // 验证成功，手动关闭模态框
};
// 验证失败
const onFail = () => {
	console.log('验证失败');
};
</script>
