<template>
	<el-dialog
		:model-value="true"
		title="视频播放"
		width="80vw"
		destroy-on-close
		:close-on-click-modal="true"
		@close="emits('close')"
	>
		<video
			ref="videoPlayer"
			width="100%"
			height="500"
			controls
			autoplay
			muted
			@loadeddata="handleVideoLoaded"
		>
			<source :src="form.videoUrl" type="video/mp4" />
			您的浏览器不支持视频播放
		</video>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="emits('close')">关闭</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="VideoPlay">
import { useForm } from '@/hooks';
/* 接受父组件参数 */
const props = defineProps({
	data: {
		type: Object,
		default: {},
	},
});
/* 父组件方法 */
const emits = defineEmits(['close', 'success']);
/* 表单 */
const { form } = useForm<any>(() => ({
	...props.data,
}));
const videoPlayer = ref<HTMLVideoElement>();

const handleVideoLoaded = () => {
	if (videoPlayer.value) {
		videoPlayer.value.play().catch((err) => {
			console.error('自动播放失败:', err);
		});
	}
};
// 缓存组件销毁
onDeactivated(() => {
	if (videoPlayer) videoPlayer.value?.pause();
});
// 离开页面之前卸载实例
onBeforeUnmount(() => {
	if (videoPlayer) videoPlayer.value?.pause();
});
</script>

<style scoped>
.transfer-footer {
	margin-left: 15px;
	padding: 6px 5px;
}
.el-table .cell {
	padding: 0 5px;
}
</style>
