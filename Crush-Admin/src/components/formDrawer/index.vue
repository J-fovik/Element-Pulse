<template>
	<el-drawer v-model="showDrawer" :title="title" :size="size" :close-on-click-modal="false" :destroy-on-close="destroyOnClose">
		<div class="formDrawer">
			<div class="body">
				<slot></slot>
			</div>
			<div class="actions">
				<el-button type="primary" @click="submit" :loading="loading">{{ confirmText }}</el-button>
				<el-button type="default" @click="close">取消</el-button>
			</div>
		</div>
	</el-drawer>
</template>
<script setup>
const showDrawer = ref(false);
const props = defineProps({
	title: String, // 名称
	// 宽度
	size: {
		type: String,
		default: '45%',
	},
	// 控制是否在关闭 Drawer 之后将子元素全部销毁
	destroyOnClose: {
		type: Boolean,
		default: false,
	},
	// 按钮标题
	confirmText: {
		type: String,
		default: '提交',
	},
});

const loading = ref(false);
// 开启loading方法
const showLoading = () => (loading.value = true);
// 关闭loading方法
const hideLoading = () => (loading.value = false);

// 打开
const open = () => (showDrawer.value = true);

// 关闭
const close = () => (showDrawer.value = false);

// 提交=>子传夫
const emit = defineEmits(['submit']);
const submit = () => emit('submit');

// 向父组件暴露以下方法
defineExpose({
	open,
	close,
	showLoading,
	hideLoading,
});
</script>
<style scoped>
.formDrawer {
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
}

.formDrawer .body {
	flex: 1;
	position: absolute;
	top: 20px;
	left: 20px;
	right: 20px;
	bottom: 50px;
	overflow-y: auto;
}

.formDrawer .actions {
	height: 50px;
	margin-top: auto;
	display: flex;
	padding-left: 20px;
	padding-right: 20px;
	align-items: center;
}
</style>
