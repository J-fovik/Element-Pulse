<template>
	<div class="login-container flx-center">
		<div class="login-box">
			<SwitchDark class="dark" />
			<div class="login-left">
				<img class="login-left-img" src="@/assets/images/login_left.png" alt="login" />
			</div>
			<div class="login-form">
				<div class="login-logo">
					<img class="login-icon" src="@/assets/svgIcons/logo.svg" alt="" />
					<h2 class="logo-text">{{ APP_TITLE }}</h2>
				</div>
				<LoginForm />
				<!-- <LoginFormal /> -->
				<!-- <LoginFormUrl /> -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="login">
import LoginForm from './components/LoginForm.vue';
import LoginFormal from './components/LoginFormal.vue';
import LoginFormUrl from './components/LoginFormUrl.vue';

const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE;
</script>

<style scoped lang="scss">
.login-container {
	height: 100%;
	min-height: 550px;
	background-color: #eeeeee;
	background-image: url('@/assets/svgIcons/login_bg.svg');
	background-size: 100% 100%;
	background-size: cover;
	.login-box {
		position: relative;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 96.5%;
		height: 94%;
		padding: 0 50px;
		background-color: rgb(255 255 255 / 80%);
		border-radius: 10px;
		.dark {
			position: absolute;
			top: 13px;
			right: 18px;
		}
		.login-left {
			width: 800px;
			margin-right: 10px;
			.login-left-img {
				width: 100%;
				height: 100%;
			}
		}
		.login-form {
			width: 420px;
			padding: 50px 40px 45px;
			background-color: var(--el-bg-color);
			border-radius: 10px;
			box-shadow: rgb(0 0 0 / 10%) 0 2px 10px 2px;
			.login-logo {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 45px;
				.login-icon {
					width: 60px;
					height: 52px;
				}
				.logo-text {
					padding: 0 0 0 25px;
					margin: 0;
					font-size: 42px;
					font-weight: bold;
					color: #34495e;
					white-space: nowrap;
				}
			}
			.el-form-item {
				margin-bottom: 40px;
			}
		}
	}
}

@media screen and (width <= 1250px) {
	.login-left {
		display: none;
	}
}

@media screen and (width <= 600px) {
	.login-form {
		width: 97% !important;
	}
}
</style>
