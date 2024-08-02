<template>
	<!-- 更多按钮 -->
	<el-dropdown trigger="click" :teleported="false">
		<div class="more-button">
			<i :class="'iconfont icon-xiala'"></i>
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<!-- 刷新 -->
				<el-dropdown-item @click="refresh">
					<el-icon><Refresh /></el-icon>{{ $t('tabs.refresh') }}
				</el-dropdown-item>
				<!-- 最大化 -->
				<el-dropdown-item @click="maximize">
					<el-icon><FullScreen /></el-icon>{{ $t('tabs.maximize') }}
				</el-dropdown-item>
				<!-- 关闭当前页 -->
				<el-dropdown-item divided @click="closeCurrentTab">
					<el-icon><Remove /></el-icon>{{ $t('tabs.closeCurrent') }}
				</el-dropdown-item>
				<!-- 关闭左侧 -->
				<el-dropdown-item @click="tabStore.closeTabsOnSide(route.fullPath, 'left')">
					<el-icon><DArrowLeft /></el-icon>{{ $t('tabs.closeLeft') }}
				</el-dropdown-item>
				<!-- 关闭右侧 -->
				<el-dropdown-item @click="tabStore.closeTabsOnSide(route.fullPath, 'right')">
					<el-icon><DArrowRight /></el-icon>{{ $t('tabs.closeRight') }}
				</el-dropdown-item>
				<!-- 关闭其他 -->
				<el-dropdown-item divided @click="tabStore.closeMultipleTab(route.fullPath)">
					<el-icon><CircleClose /></el-icon>{{ $t('tabs.closeOther') }}
				</el-dropdown-item>
				<!-- 关闭所有 -->
				<el-dropdown-item @click="closeAllTab">
					<el-icon><FolderDelete /></el-icon>{{ $t('tabs.closeAll') }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts" name="MoreButton">
import { HOME_URL } from '@/config';
import { useGlobalStore, useKeepAliveStore, useTabsStore } from '@/stores';

const route = useRoute();
const router = useRouter();
const tabStore = useTabsStore();
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();

// 刷新当前页依赖注入
const refreshCurrentPage: Function = inject('refresh') as Function;
// 刷新当前页
const refresh = () => {
	setTimeout(() => {
		route.meta.isKeepAlive && keepAliveStore.removeKeepAliveName(route.fullPath as string);
		refreshCurrentPage(false);
		nextTick(() => {
			route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.fullPath as string);
			refreshCurrentPage(true);
		});
	}, 0);
};

// 开启最大化
const maximize = () => {
	globalStore.setGlobalState('maximize', true);
};

// 关闭当前页
const closeCurrentTab = () => {
	if (route.meta.isAffix) return;
	tabStore.removeTabs(route.fullPath);
};

// 关闭所有页
const closeAllTab = () => {
	tabStore.closeMultipleTab();
	router.push(HOME_URL);
};
</script>

<style scoped lang="scss">
.el-dropdown {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	.more-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 43px;
		cursor: pointer;
		border-left: 1px solid var(--el-border-color-light);
		transition: all 0.3s;
		&:hover {
			background-color: var(--el-color-info-light-9);
		}
		.iconfont {
			font-size: 12.5px;
		}
	}
}
</style>
