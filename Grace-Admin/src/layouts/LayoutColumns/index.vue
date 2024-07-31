<!-- 分栏布局 -->
<template>
	<el-container class="layout">
		<div class="aside-split" style="z-index: 999; height: 100vh !important">
			<div class="logo flx-center">
				<Logo />
			</div>
			<el-scrollbar>
				<div class="split-list">
					<div
						v-for="item in menuList"
						:key="item.path"
						class="split-item"
						:class="{
							'split-active':
								splitActive === item.path ||
								`/${splitActive.split('/')[1]}` === item.path,
						}"
						@click="changeSubMenu(item)"
					>
						<el-icon>
							<component :is="item.meta.icon"></component>
						</el-icon>
						<span class="title">{{ item.meta.title }}</span>
					</div>
				</div>
			</el-scrollbar>
		</div>
		<el-aside
			:class="{ 'not-aside': !subMenuList.length }"
			:style="{ width: isCollapse ? '65px' : '210px' }"
		>
			<div class="logo flx-center">
				<span v-show="subMenuList.length" class="logo-text">{{
					isCollapse ? 'G' : title
				}}</span>
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
					<SubMenu :menu-list="subMenuList" />
				</el-menu>
			</el-scrollbar>
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

<script setup lang="ts" name="LayoutColumns">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/modules/user';
import { useGlobalStore } from '@/stores/modules/global';
import Main from '@/layouts/components/Main/index.vue';
import Logo from '@/layouts/components/Logo/index.vue';
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue';
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue';
import SubMenu from '@/layouts/components/Menu/SubMenu.vue';
// LOGO标题
const title = import.meta.env.VITE_GLOB_APP_TITLE;

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const globalStore = useGlobalStore();

// 是否手风琴、是否水平折叠收起菜单
const { accordion, isCollapse } = storeToRefs(globalStore);
// 路由数组
const menuList = computed(() => userStore.showMenuListGet());
// 活跃菜单
const activeMenu = computed(
	() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string
);

const subMenuList = ref<Menu.MenuOptions[]>([]);
const splitActive = ref('');
watch(
	() => [menuList, route],
	() => {
		// 当前菜单没有数据直接 return
		if (!menuList.value.length) return;
		splitActive.value = route.path;
		const menuItem = menuList.value.filter((item: Menu.MenuOptions) => {
			return route.path === item.path || `/${route.path.split('/')[1]}` === item.path;
		});
		if (menuItem[0].children?.length) return (subMenuList.value = menuItem[0].children);
		subMenuList.value = [];
	},
	{
		deep: true,
		immediate: true,
	}
);

// 切换菜单
const changeSubMenu = (item: Menu.MenuOptions) => {
	splitActive.value = item.path;
	// 更新当前激活的菜单项
	if (item.children?.length) {
		subMenuList.value = item.children;
	} else {
		subMenuList.value = [];
	}
	// 跳转到 item.redirect 路由 或 item.children[0].path 或 item.path
	router.push(item.redirect || (item.children && item.children[0].path) || item.path);
};
</script>

<style scoped lang="scss">
.el-container {
	width: 100%;
	height: 100%;
	.aside-split {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		width: 70px;
		height: 100%;
		background-color: var(--el-menu-bg-color);
		border-right: 1px solid var(--el-aside-border-color);
		.logo {
			box-sizing: border-box;
			height: 55px;
		}
		.el-scrollbar {
			height: calc(100% - 55px);
			.split-list {
				flex: 1;
				.split-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					height: 70px;
					cursor: pointer;
					transition: all 0.3s ease;
					.el-icon {
						font-size: 20px;
					}
					.title {
						margin-top: 6px;
						font-size: 12px;
					}
					.el-icon,
					.title {
						color: var(--el-menu-text-color);
					}
				}
				.split-active {
					background-color: var(--el-color-primary) !important;
					.el-icon,
					.title {
						color: #ffffff !important;
					}
				}
			}
		}
	}
	.not-aside {
		width: 0 !important;
		border-right: none !important;
	}
	.el-aside {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
		background-color: var(--el-menu-bg-color);
		border-right: 1px solid var(--el-aside-border-color);
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
			.logo-text {
				font-size: 24px;
				font-weight: bold;
				color: var(--el-aside-logo-text-color);
				white-space: nowrap;
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
		border-bottom: 1px solid var(--el-border-color-light);
	}
}
</style>
