<template>
	<!-- 标签页 -->
	<div class="tabs-box">
		<div class="tabs-menu">
			<el-tabs
				v-model="tabsMenuValue"
				type="card"
				@tab-click="tabClick"
				@tab-remove="tabRemove"
			>
				<el-tab-pane
					v-for="item in tabsMenuList"
					:key="item.path"
					:label="item.title"
					:name="item.path"
					:closable="item.close"
				>
					<template #label>
						<el-icon v-if="item.icon && tabsIcon" class="tabs-icon">
							<component :is="item.icon"></component>
						</el-icon>
						{{ item.title }}
					</template>
				</el-tab-pane>
			</el-tabs>
			<!-- 更多按钮 -->
			<MoreButton />
		</div>
	</div>
</template>

<script setup lang="ts" name="Tabs">
import Sortable from 'sortablejs';
import { useGlobalStore, useTabsStore, useUserStore } from '@/stores';
import { TabsPaneContext, TabPaneName } from 'element-plus';
import MoreButton from './components/MoreButton.vue';

const route = useRoute();
const router = useRouter();
const tabStore = useTabsStore();
const userStore = useUserStore();
const globalStore = useGlobalStore();
// 当前标签
const tabsMenuValue = ref(route.fullPath);
// 标签数组
const tabsMenuList = computed(() => tabStore.tabsMenuList);
// 标签图标
const tabsIcon = computed(() => globalStore.tabsIcon);

onMounted(() => {
	tabsDrop();
	initTabs();
});

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
	() => route.fullPath,
	() => {
		// if (route.meta.isFull) return;
		tabsMenuValue.value = route.fullPath;
		const tabsParams = {
			icon: route.meta.icon as string,
			title: route.meta.title as string,
			path: route.fullPath,
			name: route.name as string,
			close: !route.meta.isAffix,
			isKeepAlive: route.meta.isKeepAlive as boolean,
		};
		tabStore.addTabs(tabsParams);
	},
	{ immediate: true }
);

// 初始化需要固定的 tabs
const initTabs = () => {
	userStore.flatMenuListGet().forEach((item) => {
		if (item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
			const tabsParams = {
				icon: item.meta.icon,
				title: item.meta.title,
				path: item.path,
				name: item.name,
				close: !item.meta.isAffix,
				isKeepAlive: item.meta.isKeepAlive,
			};
			tabStore.addTabs(tabsParams);
		}
	});
};

// tabs 拖拽排序
const tabsDrop = () => {
	Sortable.create(document.querySelector('.el-tabs__nav') as HTMLElement, {
		draggable: '.el-tabs__item',
		animation: 300,
		onEnd({ newIndex, oldIndex }) {
			const tabsList = [...tabStore.tabsMenuList];
			const currRow = tabsList.splice(oldIndex as number, 1)[0];
			tabsList.splice(newIndex as number, 0, currRow);
			tabStore.setTabs(tabsList);
		},
	});
};

// 点击标签跳转页面
const tabClick = (tabItem: TabsPaneContext) => {
	const fullPath = tabItem.props.name as string;
	router.push(fullPath);
};

// 点击删除标签
const tabRemove = (fullPath: TabPaneName) => {
	tabStore.removeTabs(fullPath as string, fullPath == route.fullPath);
};
</script>

<style scoped lang="scss">
.tabs-box {
	background-color: var(--el-bg-color);
	.tabs-menu {
		position: relative;
		width: 100%;
		:deep(.el-tabs) {
			.el-tabs__header {
				box-sizing: border-box;
				height: 40px;
				padding: 0 10px;
				margin: 0;
				.el-tabs__nav-wrap {
					position: absolute;
					width: calc(100% - 70px);
					.el-tabs__nav {
						display: flex;
						border: none;
						.el-tabs__item {
							display: flex;
							align-items: center;
							justify-content: center;
							color: #afafaf;
							border: none;
							.tabs-icon {
								margin: 1.5px 4px 0 0;
								font-size: 15px;
							}
							.is-icon-close {
								margin-top: 1px;
							}
							&.is-active {
								color: var(--el-color-primary);
								&::before {
									position: absolute;
									bottom: 0;
									width: 100%;
									height: 0;
									content: '';
									border-bottom: 2px solid var(--el-color-primary) !important;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
