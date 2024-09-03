<template>
	<Container>
		<el-alert
			title="方式一：感谢优秀的 `vue-grid-layout`，项目地址：https://www.npmjs.com/package/vue-grid-layout/v/2.3.7`"
			type="warning"
			:closable="false"
			class="mb15"
		/>
		<el-button type="primary" @click="restoreInitValue" class="mb20">恢复初始值</el-button>
		<grid-layout
			:layout="layoutList"
			:col-num="12"
			:row-height="30"
			:is-draggable="true"
			:is-resizable="true"
			:vertical-compact="true"
			:responsive="true"
			:margin="[10, 10]"
			:use-css-transforms="false"
			@layout-updated="layoutUpdatedEvent"
		>
			<grid-item
				v-for="item in layoutList"
				:x="item.x"
				:y="item.y"
				:w="item.w"
				:h="item.h"
				:i="item.i"
				:key="item.i"
				class="flx-center"
			>
				<div>{{ item.i }}</div>
			</grid-item>
		</grid-layout>
	</Container>
</template>

<script setup lang="ts" name="gridLayout">
import { Session } from '@/utils/storage';
// 定义变量内容
const layoutList = ref([
	{ x: 0, y: 0, w: 2, h: 2, i: '0' },
	{ x: 2, y: 0, w: 2, h: 4, i: '1' },
	{ x: 4, y: 0, w: 2, h: 5, i: '2' },
	{ x: 6, y: 0, w: 2, h: 3, i: '3' },
	{ x: 8, y: 0, w: 2, h: 3, i: '4' },
	{ x: 10, y: 0, w: 2, h: 3, i: '5' },
	{ x: 0, y: 5, w: 2, h: 5, i: '6' },
	{ x: 2, y: 5, w: 2, h: 5, i: '7' },
	{ x: 4, y: 5, w: 2, h: 5, i: '8' },
	{ x: 6, y: 3, w: 2, h: 4, i: '9' },
	{ x: 8, y: 4, w: 2, h: 4, i: '10' },
	{ x: 10, y: 4, w: 2, h: 4, i: '11' },
	{ x: 0, y: 10, w: 2, h: 5, i: '12' },
	{ x: 2, y: 10, w: 2, h: 5, i: '13' },
	{ x: 4, y: 8, w: 2, h: 4, i: '14' },
	{ x: 6, y: 8, w: 2, h: 4, i: '15' },
	{ x: 8, y: 10, w: 2, h: 5, i: '16' },
	{ x: 10, y: 4, w: 2, h: 2, i: '17' },
	{ x: 0, y: 9, w: 2, h: 3, i: '18' },
	{ x: 2, y: 6, w: 2, h: 2, i: '19' },
]);
// 更新事件（布局更新或栅格元素的位置重新计算）
const layoutUpdatedEvent = (newLayout) => {
	Session.set('gridList', newLayout);
};
// 恢复初始值
const restoreInitValue = () => {
	layoutList.value = [
		{ x: 0, y: 0, w: 2, h: 2, i: '0' },
		{ x: 2, y: 0, w: 2, h: 4, i: '1' },
		{ x: 4, y: 0, w: 2, h: 5, i: '2' },
		{ x: 6, y: 0, w: 2, h: 3, i: '3' },
		{ x: 8, y: 0, w: 2, h: 3, i: '4' },
		{ x: 10, y: 0, w: 2, h: 3, i: '5' },
		{ x: 0, y: 5, w: 2, h: 5, i: '6' },
		{ x: 2, y: 5, w: 2, h: 5, i: '7' },
		{ x: 4, y: 5, w: 2, h: 5, i: '8' },
		{ x: 6, y: 3, w: 2, h: 4, i: '9' },
		{ x: 8, y: 4, w: 2, h: 4, i: '10' },
		{ x: 10, y: 4, w: 2, h: 4, i: '11' },
		{ x: 0, y: 10, w: 2, h: 5, i: '12' },
		{ x: 2, y: 10, w: 2, h: 5, i: '13' },
		{ x: 4, y: 8, w: 2, h: 4, i: '14' },
		{ x: 6, y: 8, w: 2, h: 4, i: '15' },
		{ x: 8, y: 10, w: 2, h: 5, i: '16' },
		{ x: 10, y: 4, w: 2, h: 2, i: '17' },
		{ x: 0, y: 9, w: 2, h: 3, i: '18' },
		{ x: 2, y: 6, w: 2, h: 2, i: '19' },
	];
};
onActivated(() => {
	layoutList.value = Session.get('gridList') ?? layoutList.value;
});
</script>

<style scoped lang="scss">
.vue-grid-item {
	background-color: var(--el-color-primary) !important;
	color: var(--el-color-white);
}
</style>
