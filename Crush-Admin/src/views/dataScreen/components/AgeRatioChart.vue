<template>
	<!-- 年龄比例 -->
	<div class="echarts">
		<ECharts :options="options" />
	</div>
</template>

<script setup lang="ts" name="AgeRatioChart">
interface ChartProp {
	value: number;
	name: string;
	percentage: string;
}
// 数据源
const data = ref([
	{ value: 200, name: '10岁以下', percentage: '16%' },
	{ value: 110, name: '10 - 18岁', percentage: '8%' },
	{ value: 150, name: '18 - 30岁', percentage: '12%' },
	{ value: 310, name: '30 - 40岁', percentage: '24%' },
	{ value: 250, name: '40 - 60岁', percentage: '20%' },
	{ value: 260, name: '60岁以上', percentage: '20%' },
] as ChartProp[]);
// 颜色数组
const colors = ref(['#F6C95C', '#EF7D33', '#1F9393', '#184EA1', '#81C8EF', '#9270CA']);
// 配置
const options = {
	color: colors.value,
	tooltip: {
		show: true,
		trigger: 'item',
		formatter: '{b} <br/>占比：{d}%',
	},
	legend: {
		orient: 'vertical',
		right: '20px',
		top: '15px',
		itemGap: 15,
		itemWidth: 14,
		formatter: function (name: string) {
			let text = '';
			data.value.forEach((val: ChartProp) => {
				if (val.name === name) text = ' ' + name + '　 ' + val.percentage;
			});
			return text;
		},
		textStyle: { color: '#fff' },
	},
	grid: { top: 'bottom', left: 10, bottom: 10 },
	series: [
		{
			zlevel: 1,
			name: '年龄比例',
			type: 'pie',
			selectedMode: 'single',
			radius: [50, 90],
			center: ['35%', '50%'],
			startAngle: 60,
			label: {
				position: 'inside',
				show: true,
				color: '#fff',
				formatter: function (params) {
					return (params.data as ChartProp).percentage;
				},
				rich: {
					b: {
						fontSize: 16,
						lineHeight: 30,
						color: '#fff',
					},
				},
			},
			itemStyle: {
				shadowColor: 'rgba(0, 0, 0, 0.2)',
				shadowBlur: 10,
			},
			data: data.value.map((val: ChartProp, index: number) => {
				return {
					value: val.value,
					name: val.name,
					percentage: val.percentage,
					itemStyle: {
						borderWidth: 10,
						shadowBlur: 20,
						borderColor: colors.value[index],
						borderRadius: 10,
					},
				};
			}),
		},
		{
			name: '',
			type: 'pie',
			selectedMode: 'single',
			radius: [50, 90],
			center: ['35%', '50%'],
			startAngle: 60,
			data: [
				{
					value: 1000,
					name: '',
					label: {
						show: true,
						formatter: '{a|本日总数}',
						rich: {
							a: {
								align: 'center',
								color: 'rgb(98,137,169)',
								fontSize: 14,
							},
						},
						position: 'center',
					},
				},
			],
		},
	],
};
</script>
<style lang="scss" scoped>
.echarts {
	width: 100%;
	height: 100%;
}
</style>
