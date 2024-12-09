<template>
	<div :class="{ width: width, height: height }">
		<ECharts :options="chartOption" />
	</div>
</template>
<script setup lang="ts" name="CircleIndex">
// 父组件参数
const props = withDefaults(
	defineProps<{
		width?: string;
		height?: string;
		value: number;
		color?: string;
		maxValue?: number;
	}>(),
	{
		width: '150px',
		height: '150px',
		value: 0,
		color: '#FFA864',
		maxValue: 5,
	}
);

// 图例
const chartOption = computed(() => {
	return {
		//饼图中间显示文字
		graphic: {
			type: 'text',
			left: 'center',
			top: 'center',
			style: {
				text: props.value, //文字内容
				fill: props.color, //文字颜色
				fontSize: 18, //文字字号
				fontWeight: 700,
			},
		},
		tooltip: {
			trigger: 'item',
		},
		series: [
			{
				//第一张圆环
				type: 'pie',
				radius: ['77%', '90%'],
				center: ['50%', '50%'],
				// 隐藏指示线
				labelLine: { show: false },
				//隐藏圆环上文字
				label: {
					show: false,
				},
				data: [
					//value当前进度 + 颜色
					{
						value: props.value,
						itemStyle: {
							color: props.color,
							borderRadius: '25%',
						},
					},
					{
						value: props.maxValue - props.value,
						itemStyle: {
							color: '#f8f8f8',
						},
					},
				],
			},
		],
	};
});
</script>
