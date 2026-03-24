<template>
	<el-progress
		:text-inside="true"
		:stroke-width="20"
		:format="() => `${Math.round(num * 100)}%`"
		:percentage="Math.round(num * 100) > 100 ? 100 : Math.round(num * 100)"
	>
	</el-progress>
</template>
<script setup lang="ts" name="Progress">
const props = defineProps({
	num: {
		type: Number,
		default: 0,
	},
});
</script>
