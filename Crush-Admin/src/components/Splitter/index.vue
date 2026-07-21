<template>
	<el-splitter>
		<el-splitter-panel size="15%" min="200" max="50%" :collapsible="true">
			<slot name="left"></slot>
		</el-splitter-panel>
		<el-splitter-panel>
			<slot name="right"></slot>
		</el-splitter-panel>
	</el-splitter>
</template>

<script setup lang="ts" name="Splitter"></script>
<style scoped lang="scss"></style>
