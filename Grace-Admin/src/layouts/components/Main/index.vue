<template>
	<!-- 退出最大化 -->
	<Maximize v-show="maximize" />
	<!-- 标签栏 -->
	<Tabs v-show="tabs" />
	<!-- 主体 -->
	<el-main>
		<!-- 水印 -->
		<el-watermark
			id="watermark"
			:font="watermarkFont"
			:content="isWatermark ? ['Geeker Admin', 'Happy Working'] : ''"
		>
			<!-- BackTop 返回顶部 -->
			<el-backtop target=".el-main" :bottom="50"></el-backtop>
			<router-view v-slot="{ Component, route }">
				<transition appear name="fade-transform" mode="out-in">
					<keep-alive :include="keepAliveName">
						<component
							:is="createComponentWrapper(Component, route)"
							v-if="isRouterShow"
							:key="route.fullPath"
						/>
					</keep-alive>
				</transition>
			</router-view>
		</el-watermark>
	</el-main>
	<!-- 页脚 -->
	<el-footer v-show="footer">
		<Footer />
	</el-footer>
</template>

<script setup lang="ts" name="Main">
import { storeToRefs } from 'pinia';
import { useDebounceFn } from '@vueuse/core';
import { useGlobalStore } from '@/stores/modules/global';
import { useKeepAliveStore } from '@/stores/modules/keepAlive';
import Maximize from './components/Maximize.vue';
import Tabs from '@/layouts/components/Tabs/index.vue';
import Footer from '@/layouts/components/Footer/index.vue';

const globalStore = useGlobalStore();
const { maximize, isCollapse, layout, tabs, footer, isWatermark, isDark } =
	storeToRefs(globalStore);

const keepAliveStore = useKeepAliveStore();
const { keepAliveName } = storeToRefs(keepAliveStore);
// 注入刷新页面方法
const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
provide('refresh', refreshCurrentPage);

// 水印样式
const watermarkFont = reactive({ color: 'rgba(0, 0, 0, .15)' });
watch(
	isDark,
	() => (watermarkFont.color = isDark.value ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)'),
	{
		immediate: true,
	}
);

// 解决详情页 keep-alive 问题
const wrapperMap = new Map();
function createComponentWrapper(component, route) {
	if (!component) return;
	const wrapperName = route.fullPath;
	let wrapper = wrapperMap.get(wrapperName);
	if (!wrapper) {
		wrapper = { name: wrapperName, render: () => h(component) };
		wrapperMap.set(wrapperName, wrapper);
	}
	return h(wrapper);
}

// 监听当前页面是否最大化，动态添加 class
watch(
	() => maximize.value,
	() => {
		const app = document.getElementById('app') as HTMLElement;
		if (maximize.value) app.classList.add('main-maximize');
		else app.classList.remove('main-maximize');
	},
	{ immediate: true }
);

// 监听布局变化，在 body 上添加相对应的 layout class
watch(
	() => layout.value,
	() => {
		const body = document.body as HTMLElement;
		body.setAttribute('class', layout.value);
	},
	{ immediate: true }
);

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
	screenWidth.value = document.body.clientWidth;
	if (!isCollapse.value && screenWidth.value < 1200)
		globalStore.setGlobalState('isCollapse', true);
	if (isCollapse.value && screenWidth.value > 1200)
		globalStore.setGlobalState('isCollapse', false);
}, 100);
window.addEventListener('resize', listeningWindow, false);
onBeforeUnmount(() => {
	window.removeEventListener('resize', listeningWindow);
});
</script>

<style scoped lang="scss">
.el-main {
	box-sizing: border-box;
	padding: 10px 12px;
	overflow-x: hidden;
	background-color: var(--el-bg-color-page);
}
.el-footer {
	height: auto;
	padding: 0;
}
</style>
