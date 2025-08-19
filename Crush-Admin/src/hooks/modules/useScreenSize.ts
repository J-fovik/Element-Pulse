/**
 * @name 屏幕尺寸
 */

import { useWindowSize } from '@vueuse/core';

// 屏幕尺寸监听
export function useScreenSize() {
	// 创建响应式引用存储窗口尺寸
	const width = ref(window.innerWidth);
	const height = ref(window.innerHeight);

	/**
	 * 更新窗口尺寸
	 * @private
	 */
	const updateSize = () => {
		// 更新当前窗口尺寸
		width.value = window.innerWidth;
		height.value = window.innerHeight;

		// 可以在此处添加调试信息
		// console.log(`窗口尺寸更新: ${width.value}x${height.value}`)
	};

	// 组件挂载时添加监听
	onMounted(() => {
		// 初始获取一次尺寸
		updateSize();

		// 添加resize事件监听
		window.addEventListener('resize', updateSize);

		// 注意：对于高频触发的事件，可以考虑添加防抖
		// window.addEventListener('resize', debounce(updateSize, 200))
	});

	// 组件卸载时移除监听
	onUnmounted(() => {
		// 移除resize事件监听
		window.removeEventListener('resize', updateSize);
	});

	// 返回响应式尺寸对象
	return {
		width,
		height,
	};
}

// 响应式布局容器宽度判定设备类型
export function useDevice() {
	// 大屏（>=1200px）中屏（>=992px）小屏（>=768px）
	const { width } = useWindowSize();
	// 客户端
	const isDesktop = computed(() => width.value > 992);
	// 移动端
	const isMobile = computed(() => !isDesktop.value);

	return { isMobile, isDesktop };
}
