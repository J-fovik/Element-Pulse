<template>
	<span ref="countRef"></span>
</template>

<script setup lang="ts" name="CountUp">
import { CountUp } from 'countup.js';
// 接受父组件参数
const props = defineProps({
	value: {
		type: Number,
		required: true, // 数值
	},
	options: {
		type: Object,
		default: () => ({ decimalPlaces: 0, duration: 3 }), //decimalPlaces（小数位数）、duration（动画持续时间，以秒为单位）
	},
});
// 定义实例
const countRef = ref<any>(null);
let countUp: any;
// 初始化执行
onMounted(() => {
	countUp = new CountUp(countRef.value, props.value, props.options);
	if (countUp.error) {
		return;
	}
	// 开始变化
	countUp.start();
});

watch(
	() => props.value,
	(newVal) => {
		if (countUp) {
			// 更新数据
			countUp.update(newVal);
		}
	}
);
</script>
