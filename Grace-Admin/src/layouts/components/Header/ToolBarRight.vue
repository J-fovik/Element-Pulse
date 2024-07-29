<template>
	<div class="tool-bar-ri">
		<div class="header-icon">
			<!-- 组件大小 -->
			<AssemblySize id="assemblySize" />
			<!-- 语言 -->
			<Language id="language" />
			<!-- 搜索菜单 -->
			<SearchMenu id="searchMenu" />
			<!-- 全局设置 -->
			<ThemeSetting id="themeSetting" />
			<!-- 消息 -->
			<Message id="message" />
			<!-- 全屏 -->
			<Fullscreen id="fullscreen" />
		</div>
		<span class="username">{{ username }}</span>
		<!-- 头像 -->
		<Avatar />
	</div>
</template>

<script setup lang="ts" name="ToolBarRight">
import { useUserStore } from '@/stores/modules/user';
import AssemblySize from './components/AssemblySize.vue';
import Language from './components/Language.vue';
import SearchMenu from './components/SearchMenu.vue';
import ThemeSetting from './components/ThemeSetting.vue';
import Message from './components/Message.vue';
import Fullscreen from './components/Fullscreen.vue';
import Avatar from './components/Avatar.vue';

const { userInfo } = useUserStore();
const username = computed(() => userInfo.name);
</script>

<style scoped lang="scss">
.tool-bar-ri {
	display: flex;
	align-items: center;
	justify-content: center;
	padding-right: 25px;
	.header-icon {
		display: flex;
		align-items: center;
		& > * {
			margin-left: 21px;
			color: var(--el-header-text-color);
		}
	}
	.username {
		margin: 0 20px;
		font-size: 15px;
		color: var(--el-header-text-color);
	}
}
</style>
