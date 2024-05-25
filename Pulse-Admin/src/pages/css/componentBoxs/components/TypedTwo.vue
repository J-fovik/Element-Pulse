<template>
	<div style="width: 100%">
		<div class="container">
			<p ref="pRef" />
			<el-button type="primary" class="btn" @click="onceAgain"> Once Again </el-button>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Typed from 'typed.js';

let typed = null;
const pRef = ref();
const textOne = ref('Legends');
const textTwo = ref('Legends never');
const textThree = ref('Legends never');

const onceAgain = () => {
	typed?.reset();
	typed?.start();
};

onMounted(() => {
	if (pRef.value) {
		const options = {
			strings: ['Legan', 'Legends naver', 'Legends never die'],
			typeSpeed: 60,
			showCursor: false,
			backSpeed: 60,
			backDelay: 0,
		};
		typed = new Typed(pRef.value, options);
		typed?.start();
	}
});

onUnmounted(() => {
	typed?.destroy();
});
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	height: 360px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #ffffff;
	background-image: linear-gradient(to right, #04182c, #000c17, #04182c);

	p {
		font-size: 44px;
		font-weight: 500;
		height: 54px;
		line-height: 48px;
		width: 364px;
		text-align: left;
		white-space: nowrap;
	}

	.btn {
		margin-top: 80px;
	}
}
</style>
