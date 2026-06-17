<template>
	<div
		class="card-tree container flex justify-center items-center"
		style="box-shadow: var(--el-border-color-light) 0px 0px 10px"
	>
		<el-splitter>
			<el-splitter-panel size="15%" min="200" :collapsible="true">
				<slot name="left"></slot>
			</el-splitter-panel>
			<el-splitter-panel>
				<slot name="right"></slot>
			</el-splitter-panel>
		</el-splitter>
	</div>
</template>

<script setup lang="ts" name="Splitter"></script>
<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	overflow-y: auto;
	.descriptions-box {
		display: flex;
		flex: 1;
		flex-direction: column;
		/* height: 100%; */
		overflow-y: auto !important;
	}
}
</style>
