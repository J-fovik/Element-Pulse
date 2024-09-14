<template>
	<!-- 保留整数 -->
	{{ initial.num.toFixed(props.options.decimalPlaces) }}
</template>
<script setup name="Gsap">
import gsap from 'gsap';
// 接受父组件参数
const props = defineProps({
	value: {
		type: Number,
		default: 0,
	},
	options: {
		type: Object,
		default: () => ({ decimalPlaces: 0, duration: 3 }), //decimalPlaces（小数位数）、duration（动画持续时间，以秒为单位）
	},
});
// 定义初始值
const initial = reactive({
	num: 0,
});
// gsap的方法，传入初始值和一个对象{持续时间，最终值}
function AnimateToValue() {
	gsap.to(initial, {
		duration: props.options.duration,
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
