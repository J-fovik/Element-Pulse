<template>
	<el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="4">
		<el-form-item :label="label">
			<slot />
		</el-form-item>
	</el-col>
</template>
<script setup name="SearchItem">
defineProps({
	label: String,
});
</script>
