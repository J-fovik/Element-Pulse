<template>
	<el-card
		shadow="hover"
		:content-style="{ padding: '10px' }"
		:header-style="{ padding: '10px' }"
	>
		<template #header>
			<div class="flex items-center justify-between">
				<div>订单趋势</div>
				<el-dropdown trigger="click">
					<div>
						{{ chartDayTitle }}
						<el-icon size="20"><ArrowDownBold /></el-icon>
					</div>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item @click="setChartDay(1)">
								<el-icon><Select v-if="chartDay === 1" /></el-icon>
								最近一个月
							</el-dropdown-item>
							<el-dropdown-item @click="setChartDay(3)">
								<el-icon><Select v-if="chartDay === 3" /></el-icon>
								最近三个月
							</el-dropdown-item>
							<el-dropdown-item @click="setChartDay(6)">
								<el-icon><Select v-if="chartDay === 6" /></el-icon>
								最近半年
							</el-dropdown-item>
							<el-dropdown-item @click="setChartDay(12)">
								<el-icon><Select v-if="chartDay === 12" /></el-icon>
								最近一年
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</template>
		<div style="height: 400px">
			<ECharts :options="chartOption" />
		</div>
	</el-card>
</template>
<script setup lang="ts" name="OrderTrend">
import echarts from '@/components/ECharts/config';
import { useBasicsState, useAsyncData } from '@/hooks';
// 控制时间选择
const [chartDay, setChartDay] = useBasicsState(1, () => initData());
// 时间
const chartDayTitle = computed(() => {
	switch (chartDay.value) {
		case 1:
			return '最近一个月';
		case 3:
			return '最近三个月';
		case 6:
			return '最近半年';
		case 12:
			return '最近一年';
		default:
			return '';
	}
});
// 图表数据
const chartsData = ref({
	xData: [
		'2023/04/19',
		'2023/04/20',
		'2023/04/21',
		'2023/04/22',
		'2023/04/23',
		'2023/04/24',
		'2023/04/25',
		'2023/04/26',
		'2023/04/27',
		'2023/04/28',
		'2023/04/29',
		'2023/04/30',
		'2023/05/01',
		'2023/05/02',
		'2023/05/03',
		'2023/05/04',
		'2023/05/05',
		'2023/05/06',
		'2023/05/07',
		'2023/05/08',
		'2023/05/09',
		'2023/05/10',
	],
	yData: [
		3221, 3654, 3782, 4023, 4277, 4212, 105, 208, 356, 499, 866, 1065, 1865, 2522, 2699, 2254,
		2344, 1986, 1602, 1787, 2654, 2877,
	],
});
// 图表配置
const chartOption = computed(() => {
	return {
		// 间距
		grid: {
			left: '5%',
			right: '5%',
			top: '12%',
			bottom: '22%',
		},
		// 底部滑条
		dataZoom: [
			{
				show: true,
				realtime: true,
				start: 0,
				end: 100,
			},
			{
				type: 'inside',
				realtime: true,
				start: 0,
				end: 100,
			},
		],
		// X轴配置
		xAxis: {
			type: 'category',
			offset: 2,
			data: chartsData.value.xData,
			boundaryGap: false,
			axisLabel: {
				color: '#4E5969',
				formatter(value: number, idx: number) {
					if (idx === 0) return '';
					if (idx === chartsData.value.xData.length - 1) return '';
					return `${value}`;
				},
			},
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			splitLine: {
				show: true,
				interval: (idx: number) => {
					if (idx === 0) return false;
					if (idx === chartsData.value.xData.length - 1) return false;
					return true;
				},
				lineStyle: {
					color: '#E5E8EF',
				},
			},
			axisPointer: {
				show: true,
				lineStyle: {
					color: '#23ADFF',
					width: 2,
				},
			},
		},
		// Y轴配置
		yAxis: {
			type: 'value',
			axisLine: {
				show: false,
			},
			splitLine: {
				show: true,
				lineStyle: {
					type: 'dashed',
					color: '#E5E8EF',
				},
			},
		},
		tooltip: {
			trigger: 'axis',
			formatter(params: any) {
				const [firstElement] = params;
				return `<div>
							<p class="tooltip-title">${firstElement.axisValueLabel}</p>
							<div class="content-panel">
								<span>订单量</span>
								<span class="tooltip-value">${firstElement.value}</span>
							</div>
          				</div>`;
			},
			className: 'echarts-tooltip-diy',
		},
		series: [
			{
				data: chartsData.value.yData,
				type: 'line',
				smooth: true,
				symbolSize: 12,
				emphasis: {
					focus: 'series',
					itemStyle: {
						borderWidth: 2,
					},
				},
				markPoint: {
					data: [
						{ type: 'max', name: 'Max' },
						{ type: 'min', name: 'Min' },
					],
				},
				markLine: {
					data: [{ type: 'average', name: 'Avg', silent: true }],
				},
				lineStyle: {
					width: 3,
					color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
						{
							offset: 0,
							color: 'rgba(30, 231, 255, 1)',
						},
						{
							offset: 0.5,
							color: 'rgba(36, 154, 255, 1)',
						},
						{
							offset: 1,
							color: 'rgba(111, 66, 251, 1)',
						},
					]),
				},
				showSymbol: false,
				areaStyle: {
					opacity: 0.8,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: 'rgba(17, 126, 255, 0.16)',
						},
						{
							offset: 1,
							color: 'rgba(17, 128, 255, 0)',
						},
					]),
				},
			},
		],
	};
});
const {
	data: chartData,
	loading,
	initData,
} = useAsyncData(
	async () => {
		// 请求数据
		// const { res, err } = await curryingRequest(
		// 	() =>
		// 		getLineChartData({
		// 			month: chartDay.value,
		// 		}),
		// );
		// // 处理错误
		// if (err) return;
		// 返回处理后的数据
		return chartsData.value;
	},
	{
		xData: [],
		yData: [],
	}
);
</script>
