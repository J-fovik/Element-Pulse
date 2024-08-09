<template>
	<div>
		<el-alert
			class="mb10"
			title="使用方式：v-scrollTo=''.className' 或 v-scrollTo=''#idName' 要唯一"
			type="success"
			:closable="false"
		/>
		<div class="flex gap-2 flex-wrap">
			<el-tag
				:type="currentIndex === index ? 'primary' : 'success'"
				class="mr5 cursor-pointer"
				v-for="(item, index) in 40"
				:key="index"
				v-scrollTo="'#item-' + index"
				@click="currentIndex = index"
				>{{ item }}</el-tag
			>
		</div>
		<el-divider />
		<el-scrollbar height="200px">
			<div class="mb25" v-for="(item, index) in 40" :key="index">
				<div class="flx-center flex-col" :id="'item-' + index">
					{{ item }}
				</div>
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts" name="ScrollTo">
const currentIndex = ref(-1); // 初始化时设置为-1，表示没有点击任何tag
import { useWindowScroll } from '@vueuse/core';

const { x, y } = useWindowScroll();
onMounted(() => {
	window.addEventListener('scroll', handleScroll);
});

function handleScroll() {
	const scrollY = y.value; // 获取当前滚动位置
	console.log(y);

	// 根据滚动位置更新currentIndex的值
	// 这里只是一个示例，具体逻辑需要根据您的需求来调整
	// 例如，您可以根据滚动位置来判断哪个元素在视口范围内
	// 然后将对应的index赋值给currentIndex
	// 这里只是简单地将currentIndex设置为滚动位置的整数部分
}
</script>
