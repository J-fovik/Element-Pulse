<template>
	<div class="flex items-center justify-center w-full h-full">
		<img src="@/assets/images/404.png" class="mr150" alt="404" />
		<el-result
			icon="warning"
			title="404"
			:sub-title="`抱歉，您访问的页面不存在~🤷‍♂️🤷‍♀️，${second}秒自动跳转到首页`"
		>
			<template #extra>
				<el-button type="primary" @click="fn">返回首页</el-button>
			</template>
		</el-result>
	</div>
</template>

<script setup lang="ts" name="404">
import { useCountDown } from '@/hooks';
import { HOME_URL } from '@/config';
const router = useRouter();
// 倒计时返回首页
const { second, startCountDown } = useCountDown(5, 1000, () => {
	router.replace(HOME_URL);
});
startCountDown();
const fn = () => {
	console.log(11);
};
</script>
