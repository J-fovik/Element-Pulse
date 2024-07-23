<template>
	<div class="flex items-center justify-center w-full h-full">
		<img src="@/assets/images/403.png" class="mr150" alt="403" />
		<el-result icon="warning" title="403" sub-title="抱歉，您无权访问该页面~🙅‍♂️🙅‍♀️">
			<template #extra>
				<el-button type="primary" @click="router.back">返回上一页</el-button>
			</template>
		</el-result>
	</div>
</template>

<script setup lang="ts" name="403">
const router = useRouter();
</script>
