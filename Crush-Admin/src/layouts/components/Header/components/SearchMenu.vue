<template>
	<!-- 搜索菜单 -->
	<div class="search-menu">
		<i :class="'iconfont icon-sousuo'" class="toolBar-icon" @click="handleOpen"></i>
		<el-dialog
			class="search-dialog"
			v-model="isShowSearch"
			:width="600"
			:show-close="false"
			top="10vh"
		>
			<el-input
				v-model="searchMenu"
				ref="menuInputRef"
				placeholder="菜单搜索：支持菜单名称、路径"
				clearable
				:prefix-icon="Search"
			></el-input>
			<div v-if="searchList.length" class="menu-list" ref="menuListRef">
				<div
					v-for="item in searchList"
					:key="item.path"
					:class="['menu-item', { 'menu-active': item.path === activePath }]"
					@mouseenter="mouseoverMenuItem(item)"
					@click="handleClickMenu()"
				>
					<div class="menu-lf">
						<el-icon class="menu-icon">
							<component :is="item.meta.icon"></component>
						</el-icon>
						<span class="menu-title">{{ item.meta.title }}</span>
					</div>
					<i :class="'iconfont icon-huiche'" class="menu-enter" @click="handleOpen"></i>
				</div>
			</div>
			<el-empty v-else class="mt20 mb20" :image-size="100" description="暂无菜单" />
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="SearchMenu">
import { InputInstance } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores';
import { useDebounceFn } from '@vueuse/core';

const router = useRouter();
const userStore = useUserStore();
// 路由数组
const menuList = computed(() => userStore.flatMenuListGet().filter((item) => !item.meta.isHide));
// 当前活跃路径
const activePath = ref('');
// 移动菜单项
const mouseoverMenuItem = (menu: Menu.MenuOptions) => {
	activePath.value = menu.path;
};
// 菜单输入框实例
const menuInputRef = ref<InputInstance | null>(null);
// 是否显示搜索
const isShowSearch = ref<boolean>(false);
// 搜索菜单输入框
const searchMenu = ref<string>('');
// 点击打开
const handleOpen = () => {
	isShowSearch.value = true;
	nextTick(() => {
		setTimeout(() => {
			menuInputRef.value?.focus();
		});
	});
};
// 搜索列表
const searchList = ref<Menu.MenuOptions[]>([]);
// 更新搜索列表
const updateSearchList = () => {
	searchList.value = searchMenu.value
		? menuList.value.filter(
				(item) =>
					(item.path.toLowerCase().includes(searchMenu.value.toLowerCase()) ||
						item.meta.title.toLowerCase().includes(searchMenu.value.toLowerCase())) &&
					!item.meta?.isHide
		  )
		: [];
	activePath.value = searchList.value.length ? searchList.value[0].path : '';
};
// 防抖
const debouncedUpdateSearchList = useDebounceFn(updateSearchList, 300);

watch(searchMenu, debouncedUpdateSearchList);
// 菜单列表实例
const menuListRef = ref<Element | null>(null);
// 操作上下箭头键
const keyPressUpOrDown = (direction: number) => {
	const length = searchList.value.length;
	if (length === 0) return;
	const index = searchList.value.findIndex((item) => item.path === activePath.value);
	const newIndex = (index + direction + length) % length;
	activePath.value = searchList.value[newIndex].path;
	nextTick(() => {
		if (!menuListRef.value?.firstElementChild) return;
		const menuItemHeight = menuListRef.value.firstElementChild.clientHeight + 12 || 0;
		menuListRef.value.scrollTop = newIndex * menuItemHeight;
	});
};
// 键盘判断
const keyboardOperation = (event: KeyboardEvent) => {
	// 上箭头键
	if (event.key === 'ArrowUp') {
		event.preventDefault();
		keyPressUpOrDown(-1);
		// 下箭头键
	} else if (event.key === 'ArrowDown') {
		event.preventDefault();
		keyPressUpOrDown(1);
		// 回车键
	} else if (event.key === 'Enter') {
		event.preventDefault();
		handleClickMenu();
	}
};
// 点击菜单
const handleClickMenu = () => {
	const menu = searchList.value.find((item) => item.path === activePath.value);
	if (!menu) return;
	if (menu.meta?.isLink) window.open(menu.meta.isLink, '_blank');
	else router.push(menu.path);
	searchMenu.value = '';
	isShowSearch.value = false;
};
// 监听是否显示搜索
watch(isShowSearch, (val) => {
	if (val) {
		document.addEventListener('keydown', keyboardOperation);
	} else {
		document.removeEventListener('keydown', keyboardOperation);
	}
});
</script>

<style scoped lang="scss">
.search-menu {
	:deep(.el-dialog) {
		border-radius: 4px;
		.el-dialog__header {
			display: none;
		}
	}
	.menu-list {
		max-height: 515px;
		margin-top: 15px;
		overflow: auto;
		.menu-item {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 45px;
			padding: 0 20px;
			margin: 10px 0;
			color: var(--el-text-color-secondary);
			cursor: pointer;
			background-color: transparent;
			border: 1px solid var(--el-border-color);
			border-radius: 6px;
			transition: all 0.2s ease;
			.menu-lf {
				display: flex;
				align-items: center;
			}
			.menu-icon {
				margin-right: 8px;
				font-size: 16px;
			}
			.menu-title {
				font-size: 14px;
			}
			.menu-enter {
				font-size: 17px;
			}
		}
		.menu-active {
			color: #ffffff;
			background-color: var(--el-color-primary);
			.menu-icon {
				font-size: 18px;
			}
			.menu-title {
				font-size: 16px;
			}
			.menu-enter {
				font-size: 19px;
			}
		}
	}
}
</style>
