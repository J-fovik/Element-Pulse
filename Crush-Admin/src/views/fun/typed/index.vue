<template>
	<div class="layout-padding">
		<el-card shadow="hover" class="h100" header="typed.js 打字效果">
			<el-alert title="感谢优秀的 `typed.js`，项目地址：https://www.npmjs.com/package/typed.js/v/2.0.12" type="success"></el-alert>
			<div class="container mt200">
				<p ref="typedRef" />
				<el-button type="primary" class="mt35" style="width: 200px" @click="onceAgain">开始打字</el-button>
			</div>
		</el-card>
	</div>
</template>

<script setup name="funTyped">
// 打字效果
import Typed from 'typed.js';
let typed = null;
const typedRef = ref();
const text = ref('你好, 我有一个毛衫');
// 开始打字
const onceAgain = () => {
	// 重置
	typed?.reset();
	// 开始
	typed?.start();
};

onMounted(() => {
	if (typedRef.value) {
		const options = {
			strings: [text.value],
			typeSpeed: 120, // 速度（越大越慢）
			showCursor: false,
		};
		setTimeout(() => {
			typed = new Typed(typedRef.value, options);
		}, 1000);
	}
});

onUnmounted(() => {
	typed?.destroy();
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
