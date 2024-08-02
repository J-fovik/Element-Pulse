<template>
	<div class="flex items-center justify-center w-full h-full">
		<img src="@/assets/images/500.png" class="mr150" alt="500" />
		<el-result icon="warning" title="500" sub-title="抱歉，您的网络不见了~🤦‍♂️🤦‍♀️">
			<template #extra>
				<el-button type="primary" @click="router.back">返回上一页</el-button>
			</template>
		</el-result>
	</div>
</template>

<script setup lang="ts" name="500">
const router = useRouter();
</script>