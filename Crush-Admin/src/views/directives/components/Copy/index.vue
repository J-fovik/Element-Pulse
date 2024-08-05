<template>
	<div>
		<el-alert class="mb10" title="使用方式：v-copy='value'" type="success" :closable="false" />
		<el-input v-model="textValue" placeholder="请输入" clearable></el-input>
		<el-button class="mt20" v-copy="textValue">click me</el-button>
	</div>
</template>

<script setup lang="ts" name="Copy">
const textValue = ref('复制的文本');
</script>
