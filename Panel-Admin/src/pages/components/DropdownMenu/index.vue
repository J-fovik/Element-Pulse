<template>
	<el-card class="box-card" header="Share">
		<div class="component-item" style="height: 420px">
			<DropdownMenu :items="articleList" style="margin: 0 auto" title="系列文章" />
		</div>
	</el-card>
</template>
<script setup>
import { ref } from 'vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
const articleList = [
	{ title: '基础篇', href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2' },
	{ title: '登录权限篇', href: 'https://juejin.im/post/591aa14f570c35006961acac' },
	{ title: '实战篇', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' },
	{ title: 'vue-admin-template 篇', href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56' },
	{ title: 'v4.0 篇', href: 'https://juejin.im/post/5c92ff94f265da6128275a85' },
	{ title: '优雅的使用 icon', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
];
</script>
