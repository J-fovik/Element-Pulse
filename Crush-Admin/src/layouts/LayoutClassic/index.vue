<!-- 经典布局 -->
<template>
	<el-container class="layout">
		<el-header>
			<div class="header-lf mask-image">
				<div class="logo flx-center">
					<Logo />
					<span class="logo-text">{{ APP_TITLE }}</span>
				</div>
				<ToolBarLeft />
			</div>
			<div class="header-ri">
				<ToolBarRight />
			</div>
		</el-header>
		<el-container class="classic-content">
			<el-splitter :key="isCollapse as any">
				<el-splitter-panel
					v-model:size="splitterSize"
					:min="isCollapse ? 65 : 200"
					:max="isCollapse ? 65 : '50%'"
					@update:size="updateSize"
				>
					<el-aside>
						<div class="aside-box" :style="{ width: isCollapse ? '65px' : '100%' }">
							<el-scrollbar>
								<el-menu
									:router="false"
									:default-active="activeMenu"
									:collapse="isCollapse"
									:unique-opened="accordion"
									:collapse-transition="false"
									style="z-index: 999; height: calc(100vh - 55px) !important"
								>
									<SubMenu :menu-list="menuList" />
								</el-menu>
							</el-scrollbar>
						</div>
					</el-aside>
				</el-splitter-panel>
				<el-splitter-panel>
					<el-container class="classic-main">
						<Main />
					</el-container>
				</el-splitter-panel>
			</el-splitter>
		</el-container>
	</el-container>
</template>

<script setup lang="ts" name="LayoutClassic">
import { storeToRefs } from 'pinia';
import { useUserStore, useGlobalStore } from '@/stores';
import Main from '@/layouts/components/Main/index.vue';
import Logo from '@/layouts/components/Logo/index.vue';
import SubMenu from '@/layouts/components/Menu/SubMenu.vue';
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue';
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue';

// LOGO标题
const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE;

const route = useRoute();
const userStore = useUserStore();
const globalStore = useGlobalStore();

// 是否手风琴、是否水平折叠收起菜单
const { accordion, isCollapse, splitterSize } = storeToRefs(globalStore);
// 路由数组
const menuList = computed(() => userStore.showMenuListGet());
// 活跃菜单
const activeMenu = computed(
	() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string,
);
// 更新侧边栏宽度触发折叠菜单状态变化
const updateSize = (val: string | number) => {
	const size = typeof val === 'string' ? Number(val) : val;
	if (size <= 66) {
		isCollapse.value = true;
	} else {
		isCollapse.value = false;
	}
};
watch(isCollapse, async (newVal) => {
	await nextTick();
	if (newVal) {
		splitterSize.value = 65;
	} else {
		splitterSize.value = 200;
	}
});
if (isCollapse.value) {
	splitterSize.value = 65;
} else {
	splitterSize.value = 200;
}
</script>

<style scoped lang="scss">
.el-container {
	width: 100%;
	height: 100%;
	:deep(.el-header) {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 55px;
		padding: 0 15px 0 0;
		background-color: var(--el-header-bg-color);
		border-bottom: 1px solid var(--el-header-border-color);
		.header-lf {
			display: flex;
			align-items: center;
			overflow: hidden;
			white-space: nowrap;
			.logo {
				flex-shrink: 0;
				width: 210px;
				margin-right: 16px;
				.logo-text {
					font-size: 21.5px;
					font-weight: bold;
					color: var(--el-header-logo-text-color);
					white-space: nowrap;
					margin-left: 6px;
				}
			}
		}
	}
	.classic-content {
		display: flex;
		height: calc(100% - 55px);
		:deep(.el-aside) {
			width: auto;
			background-color: var(--el-menu-bg-color);
			border-right: 1px solid var(--el-aside-border-color);
			.aside-box {
				display: flex;
				flex-direction: column;
				height: 100%;
				transition: width 0.3s ease;
				.el-menu {
					width: 100%;
					overflow-x: hidden;
					border-right: none;
				}
			}
		}
		.classic-main {
			display: flex;
			flex-direction: column;
		}
	}
}
:deep(.el-splitter-panel) {
	overflow: hidden;
}
</style>
