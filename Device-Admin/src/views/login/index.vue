<template>
	<div class="login-container flx-center">
		<div class="login-box">
			<LoginForm />
		</div>
	</div>
</template>

<script setup lang="ts" name="login">
import LoginForm from './components/LoginForm.vue';
</script>

<style scoped lang="scss">
.login-container {
	position: relative;
	height: 100vh; /* 使用视口高度确保容器占满整个屏幕 */
	overflow: hidden; /* 防止内容溢出 */
	background: url('@/assets/images/logoBg.png') no-repeat center center;
	background-size: cover;

	.login-box {
		position: fixed; /* 使用固定定位 */
		top: 54%;
		left: 67%;
		width: 300px;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex-direction: column;
	}
}
</style>
