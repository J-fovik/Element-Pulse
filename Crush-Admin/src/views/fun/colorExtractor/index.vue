<template>
	<div class="layout-padding">
		<el-card shadow="hover" header="vueuse取色器" class="h100">
			<div class="flex items-center flex-col justify-center">
				<ColorExtractor @color="getColor"></ColorExtractor>
				<div :style="{ color: colorValue }">选择的颜色：{{ colorValue }}</div>
			</div>
		</el-card>
	</div>
</template>
<script setup name="funColorExtractor">
import { useChangeColor } from '/@/utils/theme';
const { randomColor } = useChangeColor();
// 生成随机颜色
const colorValue = ref(randomColor());
// 获取颜色
const getColor = (e) => {
	colorValue.value = e;
};
</script>
