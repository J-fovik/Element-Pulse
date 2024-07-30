<template>
	<!-- 页脚 -->
	<div class="footer flx-center">
		<a href="/" target="_blank"> 2024 © {{ PROJECT_NAME }} ❤️. </a>
	</div>
</template>
<script setup lang="ts" name="Footer">
import { PROJECT_NAME } from '@/config';
</script>
<style scoped lang="scss">
.footer {
	height: 30px;
	background-color: var(--el-bg-color);
	border-top: 1px solid var(--el-border-color-light);
	a {
		font-size: 14px;
		color: var(--el-text-color-secondary);
		text-decoration: none;
		letter-spacing: 0.5px;
	}
}
</style>
