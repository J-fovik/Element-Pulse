<template>
	<div id="echarts" ref="chartRef" :style="echartsStyle" />
</template>

<script setup lang="ts" name="ECharts">
import { EChartsType, ECElementEvent } from 'echarts/core';
import echarts, { ECOption } from './config';
import { useDebounceFn } from '@vueuse/core'; // 导入 debounce 函数用于处理 resize 事件
import { useGlobalStore } from '@/stores'; // 导入全局状态管理
import { storeToRefs } from 'pinia'; // 导入 pinia 的 storeToRefs 函数用于解构全局状态
// 定义 Props 接口，用于接收来自父组件的配置
interface Props {
	option: any; // 图表配置选项
	renderer?: 'canvas' | 'svg'; // 图表渲染方式
	resize?: boolean; // 是否在窗口大小改变时重新调整图表大小
	theme?: Object | string; // 图表主题
	width?: number | string; // 图表宽度
	height?: number | string; // 图表高度
	onClick?: (event: ECElementEvent) => any; // 图表点击事件的处理函数
}
// 使用 withDefaults 函数为 Props 接口提供默认值
const props = withDefaults(defineProps<Props>(), {
	renderer: 'canvas',
	resize: true,
});
// 计算图表的样式
const echartsStyle = computed(() => {
	return props.width || props.height
		? { height: props.height + 'px', width: props.width + 'px' }
		: { height: '100%', width: '100%' };
});
// 引用图表 DOM 元素
const chartRef = ref<HTMLDivElement | HTMLCanvasElement>();
const chartInstance = ref<EChartsType>();
// 绘制图表
const draw = () => {
	if (chartInstance.value) {
		chartInstance.value.setOption(props.option, { notMerge: true });
	}
};
// 监听 props 变化，并重新绘制图表
watch(props, () => {
	draw();
});
// 处理图表点击事件
const handleClick = (event: ECElementEvent) => props.onClick && props.onClick(event);
// 初始化图表
const init = () => {
	// 检查图表容器是否存在
	if (!chartRef.value) return;
	// 获取 ECharts 实例
	chartInstance.value = echarts.getInstanceByDom(chartRef.value);
	// 检查是否已经存在 ECharts 实例
	if (!chartInstance.value) {
		// 创建新的 ECharts 实例
		chartInstance.value = markRaw(
			// 初始化新的 ECharts 实例，并传入主题和渲染器配置
			echarts.init(chartRef.value, props.theme, {
				// 指定渲染器类型，默认是 'canvas'
				renderer: props.renderer,
			})
		);
		// 添加点击事件监听器
		chartInstance.value.on('click', handleClick);
		// 调用 draw 函数来绘制图表
		draw();
	}
};
// 重置图表样式
const resize = () => {
	if (chartInstance.value && props.resize) {
		chartInstance.value.resize({ animation: { duration: 300 } });
	}
};
// 节流执行
const debouncedResize = useDebounceFn(resize, 300, { maxWait: 800 });
// 监听全局状态变化，并调整图表大小
const globalStore = useGlobalStore();
const { maximize, isCollapse, tabs, footer } = storeToRefs(globalStore);
watch(
	() => [maximize, isCollapse, tabs, footer],
	() => {
		debouncedResize();
	},
	{ deep: true }
);
// 在组件挂载时初始化图表和添加 resize 事件监听器
onMounted(() => {
	nextTick(() => init());
	window.addEventListener('resize', debouncedResize);
});
// 在组件激活时调整图表大小
onActivated(() => {
	if (chartInstance.value) {
		chartInstance.value.resize();
	}
});
// 组件卸载前摧毁实例
onBeforeUnmount(() => {
	chartInstance.value?.dispose();
	window.removeEventListener('resize', debouncedResize);
});
// 向父组件暴漏API
defineExpose({
	getInstance: () => chartInstance.value,
	resize,
	draw,
});
</script>
