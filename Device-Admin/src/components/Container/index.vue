<template>
	<el-card shadow="hover">
		<template #header>
			<!-- <div class="flex items-center justify-between">
				<div>{{ route.meta.title as any }}</div>
			</div> -->
			<!-- <div class="flex items-center">
				<div
					style="
						width: 4px;
						height: 20px;
						background: #1e5eff;
						display: block;
						border-radius: 2px;
					"
				></div>
				<div class="font20" style="font-weight: bold; margin-left: 8px">
					{{ route.meta.title as any }}
				</div>
			</div> -->
		</template>
		<slot></slot>
	</el-card>
</template>

<script lang="ts" setup name="Container">
const route = useRoute();
</script>
<style lang="scss" scoped>
:deep(.el-card__header) {
	border-bottom: none;
	padding: 10px 20px !important;
}
:deep(.el-card__body) {
	padding: 0 10px 20px;
}
</style>
