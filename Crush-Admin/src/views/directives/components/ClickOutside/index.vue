<template>
	<div>
		<el-alert
			class="mb10"
			title="使用方式：v-clickOutside='fn'"
			type="success"
			:closable="false"
		/>
		<div class="text-center mb20">
			<el-tag>{{ isOutSide ? '外部' : '内部' }}</el-tag>
		</div>
		<div class="father flx-center">
			<div class="cursor-pointer outSide flx-center" v-clickOutside="clickOutside">
				随便点
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="ClickOutside">
import { useGlobalStore } from '@/stores';
import { ElMessage } from 'element-plus';
const globalStore = useGlobalStore();
// 主题色
const primary = computed(() => globalStore.primary);
const isOutSide = ref(false);
// 点击内部触发事件
const clickOutside = (type) => {
	isOutSide.value = type;
	if (!isOutSide.value) {
		ElMessage.success('您点击的是里面');
	}
};
</script>
<style scoped>
.father {
	height: 200px;
	background: v-bind(primary);
	position: relative;
}
.outSide {
	width: 100px;
	height: 100px;
	background-color: blueviolet;
	position: absolute;
}
</style>
