<template>
	<div>
		<el-card
			shadow="hover"
			header="折线图"
			:body-style="{ padding: '10px' }"
			:header-style="{ padding: '10px' }"
		>
			<el-row :gutter="24">
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 200px">
					<ECharts :options="options1" renderer="svg" />
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 200px">
					<ECharts :options="options2" renderer="svg" />
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 200px">
					<ECharts :options="options3" renderer="svg" />
				</el-col>
			</el-row>
		</el-card>
		<el-card
			shadow="hover"
			header="柱状图"
			:body-style="{ padding: '10px' }"
			:header-style="{ padding: '10px' }"
			class="mt10"
		>
			<el-row :gutter="24">
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 200px">
					<ECharts :options="options4" :theme="isDark" />
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 200px">
					<ECharts :options="options5" :theme="isDark" />
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 200px">
					<ECharts :options="options6" :theme="isDark" />
				</el-col>
			</el-row>
		</el-card>
		<el-card
			shadow="hover"
			header="饼状图"
			class="mt10"
			:content-style="{ padding: '10px' }"
			:header-style="{ padding: '10px' }"
		>
			<el-row :gutter="24">
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 200px">
					<ECharts :options="options7" :width="'300px'" />
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 300px">
					<ECharts :options="options8" :height="'300px'" />
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 200px">
					<ECharts :options="options9" :on-click="echartsClick" />
				</el-col>
			</el-row>
		</el-card>
		<el-card
			shadow="hover"
			header="水型图"
			class="mt10"
			:content-style="{ padding: '10px' }"
			:header-style="{ padding: '10px' }"
		>
			<div style="height: 400px">
				<ECharts :options="options10" />
			</div>
		</el-card>
		<el-card
			shadow="hover"
			class="mt10"
			:content-style="{ padding: '10px' }"
			:header-style="{ padding: '10px' }"
			><template #header>
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
				<ECharts :options="options11" />
			</div>
		</el-card>
		<el-card
			shadow="hover"
			header="配置项 📚"
			class="mt10"
			:content-style="{ padding: '10px' }"
			:header-style="{ padding: '10px' }"
		>
			<el-descriptions :column="1" border>
				<el-descriptions-item label="options"> 图表配置选项</el-descriptions-item>
				<el-descriptions-item label="renderer">
					图表渲染方式('canvas' | 'svg',默认'canvas')
				</el-descriptions-item>
				<el-descriptions-item label="theme"> 图表主题,默认'light'</el-descriptions-item>
				<el-descriptions-item label="width"> 图标宽度，默认'100%' </el-descriptions-item>
				<el-descriptions-item label="height"> 图标高度，默认'100%' </el-descriptions-item>
				<el-descriptions-item label="onClick">
					图表点击事件的处理函数
				</el-descriptions-item>
			</el-descriptions>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="eCharts">
import { useGlobalStore } from '@/stores';
import echarts from '@/components/ECharts/config';
import { useBasicsState } from '@/hooks';
import {
	options1,
	options2,
	options3,
	options4,
	options5,
	options6,
	options7,
	options8,
	options9,
	options10,
} from './options';
const globalStore = useGlobalStore();
// 主题色
const isDark = computed(() => (globalStore.isDark ? 'dark' : 'light'));
const echartsClick = (e) => {
	console.log('点击', e);
};
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
const yData = ref<number[]>([]);
// 时间轴
const xData = ref<string[]>([]);
// 图表配置
const options11 = computed(() => {
	return {
		grid: {
			left: '5%',
			right: '5%',
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
			data: xData.value,
			boundaryGap: false,
			axisLabel: {
				color: '#4E5969',
				formatter(value: number, idx: number) {
					if (idx === 0) return '';
					if (idx === xData.value.length - 1) return '';
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
					if (idx === xData.value.length - 1) return false;
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
				data: yData.value,
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
// 获取数据
const initData = async () => {
	if (chartDay.value === 1) {
		// 设置数据
		yData.value = [
			3221, 3654, 3782, 4023, 4277, 4212, 105, 208, 356, 499, 866, 1065, 1865, 2522, 2699,
			2254, 2344, 1986, 1602, 1787, 2654, 2877,
		];
		// 设置时间
		xData.value = [
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
		];
	} else if (chartDay.value === 3) {
		// 设置数据
		yData.value = [
			222, 333, 444, 555, 866, 1065, 1865, 2522, 2699, 2254, 2344, 1986, 1602, 1787, 2654,
			2877, 3221, 3654, 3782, 4023, 4277, 4212,
		];
		// 设置时间
		xData.value = [
			'2024/04/19',
			'2024/04/20',
			'2024/04/21',
			'2024/04/22',
			'2024/04/23',
			'2024/04/24',
			'2024/04/25',
			'2024/04/26',
			'2024/04/27',
			'2024/04/28',
			'2024/04/29',
			'2024/04/30',
			'2024/05/01',
			'2024/05/02',
			'2024/05/03',
			'2024/05/04',
			'2024/05/05',
			'2024/05/06',
			'2024/05/07',
			'2024/05/08',
			'2024/05/09',
			'2024/05/10',
		];
	} else {
		// 设置数据
		yData.value = [
			1865, 2522, 2699, 2254, 2344, 1986, 1602, 222, 333, 444, 555, 866, 1065, 1787, 2654,
			2877, 3221, 3654, 3782, 4023, 4277, 4212,
		];
		// 设置时间
		xData.value = [
			'2025/04/19',
			'2025/04/20',
			'2025/04/21',
			'2025/04/22',
			'2025/04/23',
			'2025/04/24',
			'2025/04/25',
			'2025/04/26',
			'2025/04/27',
			'2025/04/28',
			'2025/04/29',
			'2025/04/30',
			'2025/05/01',
			'2025/05/02',
			'2025/05/03',
			'2025/05/04',
			'2025/05/05',
			'2025/05/06',
			'2025/05/07',
			'2025/05/08',
			'2025/05/09',
			'2025/05/10',
		];
	}
};
initData();
</script>
