<template>
	<div ref="eChartRef" :style="echartsStyle"></div>
</template>

<script setup lang="ts" name="EChart">
import echarts from './config';
// 防抖监听窗口变化
import { useDebounceFn, useResizeObserver } from '@vueuse/core';
import { EChartsCoreOption, ECElementEvent } from 'echarts/core';
// 定义 Props 接口，用于接收来自父组件的配置
interface Props {
	options: Object; // 图表配置选项
	renderer?: 'canvas' | 'svg'; // 图表渲染方式
	theme?: 'dark' | 'light'; // 图表主题
	width?: number | string; // 图表宽度
	height?: number | string; // 图表高度
	onClick?: (event: ECElementEvent) => any; // 图表点击事件的处理函数
}
// 使用 withDefaults 函数为 Props 接口提供默认值
const props = withDefaults(defineProps<Props>(), {
	renderer: 'canvas',
	theme: 'light',
});
// ref实例
const eChartRef = ref<HTMLDivElement | null>(null);
// 定义实例
let instance: any;
// 计算图表的样式
const echartsStyle = computed(() => {
	const width = props.width || '100%';
	const height = props.height || '100%';
	return { height, width };
});
// 处理图表点击事件
const handleClick = (event: ECElementEvent) => props.onClick && props.onClick(event);
// 节流
const debounceFn = useDebounceFn(() => {
	instance.resize({
		animation: {
			duration: 500,
		},
	});
}, 500);
// 初始化图表
const init = () => {
	// 响应式数据
	const options = toRef(props, 'options');
	// 确保获取到ref
	if (eChartRef.value) {
		instance = echarts.init(eChartRef.value as HTMLDivElement, props.theme, {
			// 指定渲染器类型，默认是 'canvas'
			renderer: props.renderer,
		});
		// 配置
		instance.setOption(options.value as EChartsCoreOption, { notMerge: true });
		// 添加点击事件监听器
		instance.on('click', handleClick);
	}
};
// 监听 props 变化，并重新绘制图表
watch(
	props,
	() => {
		// 销毁之后再初始化
		if (instance) echarts.dispose(instance);
		init();
	},
	{ immediate: true }
);
onActivated(() => {
	init();
});
// 缓存组件销毁
onDeactivated(() => {
	if (instance) echarts.dispose(instance);
});
// 使用useResizeObserver监听容器大小变化
useResizeObserver(eChartRef, () => {
	if (instance) {
		debounceFn();
	}
});
// 向父组件暴漏API
defineExpose({
	getInstance: () => instance,
	debounceFn,
	init,
});
// 缓存组件之后用 onActivated 和 onDeactivated
// onMounted(() => {
// 	init();
// });
// // 离开页面之前卸载实例
// onBeforeUnmount(() => {
// 	if (instance) echarts.dispose(instance);
// });
</script>
