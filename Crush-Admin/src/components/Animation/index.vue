<template>
	<!-- 保留整数 -->
	{{ final.toFixed(props.options.decimalPlaces) }}
</template>
<script lang="ts" setup name="Animation">
import { animation } from '@/utils/other';
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
// 定义初始值
const final = ref(0);
// 初始化执行函数
function AnimateToValue() {
	// 执行动画
	animation({
		from: 0,
		to: props.value,
		duration: props.options.duration,
		onUpdate(val: number) {
			final.value = val;
		},
	});
}
AnimateToValue();
// 监听props变化
watch(
	() => props.value,
	() => AnimateToValue()
);
</script>
