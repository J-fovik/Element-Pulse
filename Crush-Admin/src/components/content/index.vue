<template>
	<el-card>
		<template shadow="hover" #header>
			<div class="flex items-center justify-between">
				<div>{{ $t(route.meta.title as any) }}</div>
			</div>
		</template>
		<slot></slot>
        
	</el-card>
</template>

<script lang="ts" setup name="content">
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
<style lang="scss" scoped>
:deep(.el-card__header) {
	border-bottom: none;
}
:deep(.el-card__body) {
	padding: 0 20px 20px;
}
</style>
