<template>
	<div class="layout-pd">
		<el-card shadow="hover">
			<div class="flex items-center justify-center flex-col">
				<!-- 循环背景颜色 -->
				<div v-fadeUp v-waves v-for="(k, i) in 50" :key="k" :style="{ backgroundColor: colorList[i % colorList.length] }" class="item">
					{{ k }}
				</div>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts" setup name="fadeUp">
const colorList = ref(['aqua', 'blue', '#d81e06', '#f4ea2a', '#1afa29', '#1296db', '#7C92FF', '#13227a', '#d4237a', '#707070']);
</script>
<style scoped lang="scss">
.item {
	height: 200px;
	width: 500px;
	border: 1px solid #000000;
	margin-bottom: 20px;
	border-radius: 12px;
	line-height: 200px;
	text-align: center;
}
</style>
