<template>
	<div>
		<Container>
			<div class="text mb20">params:{{ route.params }}</div>
			<el-input v-model="value" placeholder="测试详情页缓存"></el-input>
		</Container>
		<div style="height: 100px"></div>
		<el-card class="footerCard flex justify-end items-end">
			<el-space>
				<el-button type="primary" @click="jumpTabName()">返回</el-button>
			</el-space>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="tabsDetail">
import { useTabsStore } from '@/stores';
const route = useRoute();
const { setTabsTitle, jumpTabName } = useTabsStore();
setTabsTitle(`No.${route.params.id} - ${route.meta.title}`);
const value = ref('');
</script>
