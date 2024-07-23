<template>
	<!-- 全局配置 -->
	<div class="theme-setting">
		<i :class="'iconfont icon-zhuti'" class="toolBar-icon" @click="openDrawer"></i>
	</div>
</template>

<script setup lang="ts">
import mittBus from '@/utils/mittBus';

// 打开抽屉
const openDrawer = () => {
	mittBus.emit('openThemeDrawer');
};
</script>
