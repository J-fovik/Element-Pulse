<!-- 纵向布局 -->
<template>
	<el-container class="layout">
		<el-aside class="h-full">
			<div class="aside-box" :style="{ width: isCollapse ? '65px' : '210px' }">
				<div class="logo flx-center">
					<img class="logo-img" src="@/assets/svgIcons/logo.svg" alt="logo" />
					<span v-show="!isCollapse" class="logo-text">{{ title }}</span>
				</div>
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
		<el-container>
			<el-header>
				<ToolBarLeft />
				<ToolBarRight />
			</el-header>
			<Main />
		</el-container>
	</el-container>
</template>

<script setup lang="ts" name="LayoutVertical">
import { useAuthStore } from '@/stores/modules/auth';
import { useGlobalStore } from '@/stores/modules/global';
import Main from '@/layouts/components/Main/index.vue';
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue';
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue';
import SubMenu from '@/layouts/components/Menu/SubMenu.vue';
// LOGO标题
const title = import.meta.env.VITE_GLOB_APP_TITLE;

const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

// 是否手风琴
const accordion = computed(() => globalStore.accordion);
// 是否水平折叠收起菜单
const isCollapse = computed(() => globalStore.isCollapse);
// 路由数组
const menuList = computed(() => authStore.showMenuListGet);
// 活跃菜单
const activeMenu = computed(
	() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string
);
</script>

<style scoped lang="scss">
.el-container {
	width: 100%;
	height: 100%;
	:deep(.el-aside) {
		width: auto;
		background-color: var(--el-menu-bg-color);
		border-right: 1px solid var(--el-aside-border-color);
		.aside-box {
			display: flex;
			flex-direction: column;
			height: 100%;
			transition: width 0.3s ease;
			.el-scrollbar {
				height: calc(100% - 55px);
				.el-menu {
					width: 100%;
					overflow-x: hidden;
					border-right: none;
				}
			}
			.logo {
				box-sizing: border-box;
				height: 55px;
				.logo-img {
					width: 28px;
					margin-right: 6px;
					object-fit: contain;
				}
				.logo-text {
					font-size: 21.5px;
					font-weight: bold;
					color: var(--el-aside-logo-text-color);
					white-space: nowrap;
				}
			}
		}
	}
	.el-header {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 55px;
		padding: 0 15px;
		background-color: var(--el-header-bg-color);
		border-bottom: 1px solid var(--el-header-border-color);
	}
}
</style>
