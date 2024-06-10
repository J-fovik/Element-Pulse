<template>
	<!-- 保留整数 -->
	{{ initial.num.toFixed(0) }}
</template>
<script setup name="countUp">
import gsap from 'gsap';
// 接受父组件参数
const props = defineProps({
	value: {
		type: Number,
		default: 0,
	},
});
// 定义初始值
const initial = reactive({
	num: 0,
});
// gsap的方法，传入初始值和一个对象{持续时间，最终值}
function AnimateToValue() {
	gsap.to(initial, {
		duration: 3,
		num: props.value * 1,
	});
}
// 初始化执行
AnimateToValue();
// 监听props变化
watch(
	() => props.value,
	() => AnimateToValue()
);
</script>
