<template>
	<el-dialog :model-value="true" :close-on-click-modal="false" @close="emits('close')">
		<div id="mse" />
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="emits('close')">取消</el-button>
				<el-button type="primary" @click="emits('close')">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup lang="ts" name="Xgplayer">
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import { isMobile } from '@/utils/other';
// 定义父组件传过来的值
const props = defineProps({
	// 视频地址
	url: {
		type: String,
		required: true,
	},
	// 海报
	poster: {
		type: String,
		default: () =>
			'//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
	},
	// 倍速可选数组
	playbackRate: {
		type: Array,
		default: () => [0.5, 0.75, 1, 1.5, 2],
	},
	// 是否允许截图
	screenShot: {
		type: Boolean,
		default: () => true,
	},
});
// 父组件方法
const emits = defineEmits(['close']);
onMounted(() => {
	setTimeout(() => {
		new Player({
			id: 'mse', // 播放器的唯一标识符
			lang: 'zh', // 播放器使用的语言
			volume: 0, // 音量,默认静音
			autoplay: false, // 是否自动播放
			screenShot: props.screenShot, // 是否允许截图
			videoAttributes: {
				crossOrigin: 'anonymous', // 视频元素的属性，这里设置了 crossOrigin 为 ‘anonymous’，用于处理跨域问题
			},
			url: props.url, // 视频资源的URL
			poster: props.poster, // 视频海报的URL
			fluid: isMobile(), // 是否自适应容器大小
			playbackRate: props.playbackRate, // 播放速度可选数组
		});
	}, 500);
});
</script>
<style scoped>
#mse {
	flex: auto;
	margin: auto;
}
</style>
