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

<script lang="ts" setup name="DataChart">
import * as echarts from 'echarts';
import dayjs from 'dayjs';
import { useBasicsState } from '@/hooks';
// 控制时间选择
const [chartDay, setChartDay] = useBasicsState(1, () => initData());
// chatLoading控制
const [chatLoading, setChatLoading] = useBasicsState<boolean>(false);
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
const chartsData = ref<AnyObject[]>([]);
// 图表配置
const chartOption = computed(() => {
	return (
		chartsData.value.length && {
			grid: {
				left: '3%',
				right: '3%',
				top: '12%',
				bottom: '22%',
			},
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
			xAxis: {
				type: 'category',
				offset: 2,
				data: chartsData.value.map((item) => item.x),
				boundaryGap: false,
				axisLabel: {
					color: '#4E5969',
					formatter(value: number, idx: number) {
						if (idx === 0) return '';
						if (idx === chartsData.value.length - 1) return '';
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
						if (idx === chartsData.value.length - 1) return false;
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
					data: chartsData.value.map((item) => item.y),
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
		}
	);
});
// 模拟数据
const initData = () => {
	chartsData.value = new Array(30).fill(0).map((el, idx) => ({
		x: dayjs()
			.day(idx - 2)
			.format('YYYY-MM-DD'),
		y: (Math.random() * 10000).toFixed(2),
	}));
};
initData();
</script>
