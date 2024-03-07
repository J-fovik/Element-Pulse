<template>
	<div class="layout-padding">
		<el-card shadow="hover" class="h100 flex items-center justify-center">
			<FlopTime></FlopTime>
		</el-card>
	</div>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

// 引入组件
const FlopTime = defineAsyncComponent(() => import('/@/components/FlopTime/index.vue'));
</script>

<style scoped lang="scss"></style>
