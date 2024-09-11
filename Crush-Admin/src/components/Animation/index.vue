<template>
	<!-- 保留整数 -->
	{{ final.toFixed(0) }}
</template>
<script lang="ts" setup name="Animation">
import { animation } from '@/utils/other';
// 接受父组件参数
const props = defineProps({
	value: {
		type: Number,
		default: 0,
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
