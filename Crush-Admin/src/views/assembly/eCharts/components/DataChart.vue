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
const yData = ref<any>([]);
// 时间轴
const xData = ref<string[]>([]);
// 图表配置
const chartOption = computed(() => {
	return {
		tooltip: {
			trigger: 'axis',
			formatter: function (params: any) {
				if (params.length > 0) {
					const formattedTime = params[0].axisValueLabel; // 获取X轴的时间标签
					const seriesInfo = params
						.map((param: any) => {
							return `<div style="display: flex; justify-content: space-between;">
                <span>${param.marker}${param.seriesName}</span>
                <span style="margin-left: 30px">${param.value}元</span>
              </div>`;
						})
						.join('');
					return `${formattedTime}<br>${seriesInfo}`;
				}
				return '';
			},
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
		legend: {
			data: yData.value.map((o: any) => o.name),
		},
		grid: {
			left: '3%',
			right: '3%',
			top: '12%',
			bottom: '22%',
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: xData.value,
		},
		yAxis: {
			type: 'value',
			name: '元', // 添加单位
			nameLocation: 'end', // 单位位置
			nameGap: 15, // 单位与轴线之间的距离
		},
		series: yData.value,
	};
});
// 获取折线图数据
const initData = async () => {
	// 请求数据
	// const { res, err } = await curryingRequest(
	// 	() =>
	// 		getLineChartData({
	// 			month: chartDay.value,
	// 		}),
	// 	{
	// 		before: () => setChatLoading(true),
	// 		after: () => setChatLoading(false),
	// 	}
	// );
	// // 处理错误
	// if (err) return;
	// 设置时间
	xData.value = [
		'2023/04/19',
		'2023/04/20',
		'2023/04/21',
		'2023/04/22',
		'2023/04/23',
		'2023/04/24',
		'2023/04/25',
	]; //res?.data.dateList;
	yData.value = [
		{
			name: '查重订单',
			type: 'line',
			data: [120, 132, 101, 134, 6, 230, 210],
		},
		{
			name: '降重订单',
			type: 'line',
			data: [220, 466, 191, 234, 290, 330, 310],
		},
		{
			name: '排版订单',
			type: 'line',
			data: [150, 777, 201, 154, 190, 330, 410],
		},
		{
			name: 'AI写作订单',
			type: 'line',
			data: [320, 1332, 909, 88, 390, 330, 320],
		},
	];
	// // // 设置数据
	// yData.value = res?.data.lineChartInfoVoList.map((o: any) => {
	// 	o.type = 'line';
	// 	return o;
	// });
};
initData();
</script>
