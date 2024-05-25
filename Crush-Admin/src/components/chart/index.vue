<template>
	<div ref="eChartContainer" style="height: 100%; width: 100%"></div>
</template>

<script lang="ts">
import { useEcharts } from '/@/hooks';
import { EChartsCoreOption } from 'echarts/core';
export default defineComponent({
	name: 'eChartChart',
	props: {
		id: {
			type: Number,
			default: 0,
		},
		options: {
			type: Object,
			default: () => ({}),
		},
	},
	setup(prop) {
		const eChartContainer = ref<HTMLDivElement | null>(null);
		onMounted(() => {
			// 赋值数据
			const options = toRef(prop, 'options');
			// 定义实例
			const instance = useEcharts(eChartContainer.value as HTMLDivElement);
			// 配置
			instance.setOption(options.value as EChartsCoreOption);
			instance.resize();
		});
		return {
			eChartContainer,
		};
	},
});
</script>
