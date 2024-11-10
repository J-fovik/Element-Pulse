<template>
	<div class="w-full rounded12 proportionBox">
		<div class="w-full flex proportion">
			<div
				class="rounded10 progress-fill"
				:style="{
					width: currentWidth + '%',
					background: background,
				}"
			></div>
		</div>
	</div>
</template>
<script setup lang="ts" name="Proportion">
// 父组件参数
const props = withDefaults(
	defineProps<{
		background?: any;
		width?: any;
		isAnimate?: boolean;
	}>(),
	{
		background: '#FFA864',
		width: '0',
		isAnimate: true,
	}
);

// 当前宽度比
const currentWidth = ref('');
// 创建延时动画
const animateProgress = () => {
	if (props.isAnimate) {
		// 使用setTimeout来逐个开始动画，你可以根据需要调整延迟时间
		setTimeout(() => {
			currentWidth.value = props.width;
		}, 500); // 假设每个动画间隔500ms
	} else {
		currentWidth.value = props.width;
	}
};
animateProgress();
</script>
<style scoped>
.progress-fill {
	transition: width 1s ease-in-out; /* 动画持续时间1秒，缓动函数为ease-in-out */
	width: 0%; /* 初始宽度为0 */
}
.proportionBox {
	background: #ffffff;
	border: 1px solid #dddddd;
}
.proportion {
	background-color: #f4f4f4;
	height: 10px;
}
</style>
