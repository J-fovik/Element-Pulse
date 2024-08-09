<template>
	<el-scrollbar height="400px">
		<div class="flex items-center justify-center flex-col">
			<!-- 循环背景颜色 -->
			<div
				v-fadeUp
				v-waves
				v-for="(k, i) in 50"
				:key="k"
				:style="{ backgroundColor: colorList[i % colorList.length] }"
				class="item"
			>
				{{ k }}
			</div>
		</div>
	</el-scrollbar>
</template>

<script lang="ts" setup name="FadeUp">
const colorList = ref([
	'#009688',
	'aqua',
	'#daa96e',
	'#0c819f',
	'#409eff',
	'#27ae60',
	'#ff5c93',
	'#e74c3c',
	'#fd726d',
	'#f39c12',
]);
</script>
<style scoped lang="scss">
.item {
	height: 50px;
	width: 300px;
	border: 1px solid #000000;
	margin-bottom: 20px;
	border-radius: 12px;
	line-height: 50px;
	text-align: center;
}
</style>
