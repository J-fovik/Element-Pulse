<template>
	<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
		<el-form-item :label="label">
			<slot />
		</el-form-item>
	</el-col>
</template>
<script setup>
defineProps({
	label: String,
});
</script>
