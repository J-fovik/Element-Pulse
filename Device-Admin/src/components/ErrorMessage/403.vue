<template>
	<div class="flex items-center justify-center w-full h-full">
		<img src="@/assets/images/403.png" class="mr150" alt="403" />
		<el-result
			icon="warning"
			title="403"
			:sub-title="`抱歉，您无权访问该页面~🙅‍♂️🙅‍♀️，${second}秒自动跳转到首页`"
		>
			<template #extra>
				<el-button type="primary" @click="router.replace(HOME_URL)">返回首页</el-button>
			</template>
		</el-result>
	</div>
</template>

<script setup lang="ts" name="403">
import { useCountDown } from '@/hooks';
import { HOME_URL } from '@/config';
const router = useRouter();
// 倒计时返回首页
const { second, startCountDown } = useCountDown(5, 1000, () => {
	router.replace(HOME_URL);
});
startCountDown();
</script>
