<template>
	<!-- 保留整数 -->
	{{ final.toFixed(0) }}
</template>

<script setup name="Transitional">
import { useTransition } from '@vueuse/core';
// 接受父组件参数
const props = defineProps({
	value: {
		type: Number,
		default: 0,
	},
});
// 初始值
const initial = ref(0);
// 最终值
const final = useTransition(initial, {
	duration: 3000, // 过渡持续时间
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
