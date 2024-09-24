<template>
	<div>
		<el-alert
			title="感谢优秀的 `typed.js`，本 Demo 是基于：https://www.npmjs.com/package/typed.js/v/2.0.12"
			type="warning"
			:closable="false"
		/>
		<div class="flex-col mt20 flx-center">
			<p ref="typedRef" />
			<el-button type="primary" class="mt35" style="width: 200px" @click="onceAgain">
				开始打字
			</el-button>
		</div>
	</div>
</template>

<script setup name="TypedJs">
import Typed from 'typed.js';
let instance = null;
const typedRef = ref();
const text = ref('你好, 我有一个毛衫');
// 开始打字
const onceAgain = () => {
	// 重置
	instance?.reset();
	// 开始
	instance?.start();
};
onMounted(() => {
	if (typedRef.value) {
		instance = new Typed(typedRef.value, {
			strings: [text.value, 'Second sentence'], // 打印内容
			typeSpeed: 120, // 速度（越大越慢）
			showCursor: false,
		});
	}
});
onUnmounted(() => {
	instance?.destroy();
});
</script>

<style scoped lang="scss">
p {
	font-size: 44px;
	font-weight: 500;
	height: 54px;
	line-height: 48px;
	text-align: center;
	white-space: nowrap;
}
</style>
