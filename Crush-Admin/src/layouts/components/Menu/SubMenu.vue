<template>
	<!-- 菜单 -->
	<template v-for="subItem in menuList" :key="subItem.path">
		<el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
			<template #title>
				<el-icon v-if="subItem.meta.icon">
					<component :is="subItem.meta.icon"></component>
				</el-icon>
				<span class="sle">{{ subItem.meta.title }}</span>
			</template>
			<SubMenu :menu-list="subItem.children" />
		</el-sub-menu>
		<el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
			<el-icon v-if="subItem.meta.icon">
				<component :is="subItem.meta.icon"></component>
			</el-icon>
			<template #title>
				<span class="sle">{{ subItem.meta.title }}</span>
			</template>
		</el-menu-item>
	</template>
</template>

<script setup lang="ts" name="Menu">
defineProps<{ menuList: Menu.MenuOptions[] }>();

const router = useRouter();
// 点击切换菜单
const handleClickMenu = (subItem: Menu.MenuOptions) => {
	// 如果有isLink，跳转路由并打开新页面
	if (subItem.meta.isLink) {
		router.push(subItem.path);
		window.open(subItem.meta.isLink, '_blank');
	} else {
		router.push(subItem.path);
	}
};
</script>

<style lang="scss">
.el-sub-menu .el-sub-menu__title:hover {
	color: var(--el-menu-hover-text-color) !important;
	background-color: transparent !important;
}
.el-menu--collapse {
	.is-active {
		.el-sub-menu__title {
			color: #ffffff !important;
			background-color: var(--el-color-primary) !important;
		}
	}
}
.el-menu-item {
	&:hover {
		color: var(--el-menu-hover-text-color);
	}
	&.is-active {
		color: var(--el-menu-active-color) !important;
		background-color: var(--el-menu-active-bg-color) !important;
		&::before {
			position: absolute;
			top: 0;
			bottom: 0;
			width: 4px;
			content: '';
			background-color: var(--el-color-primary);
		}
	}
}
.vertical,
.classic,
.transverse {
	.el-menu-item {
		&.is-active {
			&::before {
				left: 0;
			}
		}
	}
}
.columns {
	.el-menu-item {
		&.is-active {
			&::before {
				right: 0;
			}
		}
	}
}
</style>
