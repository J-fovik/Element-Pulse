<template>
	<span
		:class="[
			'gi-dot',
			`gi-dot-${type}`,
			{
				'is-processing': animation,
			},
		]"
	></span>
</template>

<script setup name="Dot">
defineProps({
	animation: {
		type: Boolean,
		default: true,
	},
	type: {
		type: String,
		default: 'primary',
		validator: function (value) {
			// 这里列出 Element UI 支持的 dot 类型
			return ['primary', 'success', 'warning', 'danger', 'info'].includes(value);
		},
	},
});
</script>

<style scoped>
.gi-dot {
	display: inline-block;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	/* 默认样式 */
}

.gi-dot-primary {
	background-color: #409eff;
}

.gi-dot-success {
	background-color: #67c23a;
}

.gi-dot-warning {
	background-color: #e6a23c;
}

.gi-dot-danger {
	background-color: #f56c6c;
}

.gi-dot-info {
	background-color: #909399;
}

.is-processing {
	/* 动画样式 */
	animation: gi-dot-animation 1.5s infinite linear;
}

@keyframes gi-dot-animation {
	0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1);
	}
	100% {
		transform: scale(0);
	}
}
</style>
