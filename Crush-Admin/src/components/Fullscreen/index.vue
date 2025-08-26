<template>
	<div
		ref="screenRef"
		class="screen"
		:class="[$attrs.class, { 'is-fullscreen': fullscreen }]"
		v-bind="$attrs"
	>
		<!-- 使用插槽实现全屏内容部分 -->
		<slot :fullscreen="fullscreen" :toggleFullscreen="toggleFullscreen"> </slot>
	</div>
</template>

<script setup name="Fullscreen">
// 全屏状态
const fullscreen = ref(false);
// 全屏实例
const screenRef = ref(null);

// 更新全屏状态
const updateFullscreenStatus = () => {
	fullscreen.value = !!(
		document.fullscreenElement ||
		document.webkitFullscreenElement ||
		document.mozFullScreenElement ||
		document.msFullscreenElement
	);
};

// 全屏切换方法
const toggleFullscreen = () => {
	const element = screenRef.value;
	if (fullscreen.value) {
		// 关闭全屏
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	} else {
		// 进入全屏
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.webkitRequestFullScreen) {
			element.webkitRequestFullScreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	}
};

// 监听全屏变化事件
const handleFullscreenChange = () => {
	updateFullscreenStatus();
};

onMounted(() => {
	// 添加全屏变化事件监听
	document.addEventListener('fullscreenchange', handleFullscreenChange);
	document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
	document.addEventListener('mozfullscreenchange', handleFullscreenChange);
	document.addEventListener('MSFullscreenChange', handleFullscreenChange);
});

onUnmounted(() => {
	// 移除事件监听
	document.removeEventListener('fullscreenchange', handleFullscreenChange);
	document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
	document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
	document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
});
</script>

<style lang="scss" scoped>
.screen {
	// 继承父组件样式
	// 全屏时的样式
	&.is-fullscreen {
		width: 100vw !important;
		height: 100vh !important;
		border: none !important;
	}

	// Webkit浏览器全屏样式
	&:-webkit-full-screen {
		width: 100vw !important;
		height: 100vh !important;
		border: none !important;
	}

	// Firefox全屏样式
	&:-moz-full-screen {
		width: 100vw !important;
		height: 100vh !important;
		border: none !important;
	}

	// IE/Edge全屏样式
	&:-ms-fullscreen {
		width: 100vw !important;
		height: 100vh !important;
		border: none !important;
	}
}
</style>
