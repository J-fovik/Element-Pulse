<template>
	<!-- 保留整数 -->
	{{ final.toFixed(props.options.decimalPlaces) }}
</template>

<script setup name="Statistic">
import { TransitionPresets, useTransition } from '@vueuse/core';
// 接受父组件参数
const props = defineProps({
	value: {
		type: Number,
		default: 0,
	},
	options: {
		type: Object,
		default: () => ({ decimalPlaces: 0, duration: 3000 }), //decimalPlaces（小数位数）、duration（动画持续时间，以毫秒为单位）
	},
});
// 初始值
const initial = ref(0);
// 最终值
const final = useTransition(initial, {
	duration: props.options.duration, // 过渡持续时间
	// transition: TransitionPresets.easeInOutCubic, // 过渡效果
	onFinished: () => {
		// 可以在这里处理过渡结束的事件
	},
});

// 当传入的值变化时，开始过渡动画
watch(
	() => props.value,
	(newValue) => {
		// 确保newValue是数字类型
		initial.value = newValue * 1;
	},
	{ immediate: true } // 立即执行一次以设置初始值
);
</script>
