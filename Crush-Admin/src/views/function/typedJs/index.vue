<template>
	<Container>
		<el-alert
			title="感谢优秀的 `typed.js`，项目地址：https://www.npmjs.com/package/typed.js/v/2.0.12"
			type="success"
		/>
		<div class="flex-col mt200 flx-center">
			<p ref="typedRef" />
			<el-button type="primary" class="mt35" style="width: 200px" @click="onceAgain">
				开始打字
			</el-button>
		</div>
	</Container>
</template>

<script setup name="typedJs">
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
onActivated(() => {
	if (typedRef.value) {
		instance = new Typed(typedRef.value, {
			strings: [text.value, 'Second sentence'], // 打印内容
			typeSpeed: 120, // 速度（越大越慢）
			showCursor: false,
		});
	}
});
onDeactivated(() => {
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
