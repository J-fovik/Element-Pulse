<template>
	<!-- 全局配置 -->
	<div class="theme-setting">
		<i :class="'iconfont icon-yifupifu'" class="toolBar-icon" @click="openDrawer"></i>
	</div>
</template>

<script setup lang="ts" name="ThemeSetting">
import mittBus from '@/utils/mittBus';

// 打开抽屉
const openDrawer = () => {
	mittBus.emit('openThemeDrawer');
};
</script>
