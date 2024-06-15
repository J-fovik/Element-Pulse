<template>
	<div ref="eChartRef" style="height: 100%; width: 100%"></div>
</template>

<script setup lang="ts" name="chart">
import * as echarts from 'echarts';
// 让echarts根据屏幕响应
import { useResizeObserver } from '@vueuse/core';
import { EChartsCoreOption } from 'echarts/core';
// 接受父组件参数
const props = defineProps({
	options: {
		type: Object,
		default: () => ({}),
	},
});
const eChartRef = ref<HTMLDivElement | null>(null);
// 定义实例
let instance: any;
onMounted(() => {
	// 响应式数据
	const options = toRef(props, 'options');
	// 确保获取到ref
	if (eChartRef.value) {
		instance = echarts.init(eChartRef.value as HTMLDivElement);
		// 配置
		instance.setOption(options.value as EChartsCoreOption);
	}
});
// 离开页面之前卸载实例
onBeforeUnmount(() => {
	if (instance) echarts.dispose(instance);
});
// 使用useResizeObserver监听容器大小变化
useResizeObserver(eChartRef, () => {
	if (instance) {
		instance.resize();
	}
});
</script>
