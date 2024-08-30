<template>
	<div>
		<el-card shadow="hover" header="引导页" class="mb20">
			<DriverJs />
		</el-card>
		<el-card shadow="hover" header="打字效果" class="mb20">
			<TypedJs />
		</el-card>
	</div>
</template>

<script setup lang="ts" name="miniPlugin">
import DriverJs from './components/DriverJs.vue';
import TypedJs from './components/TypedJs.vue';
</script>
<style scoped lang="scss"></style>
