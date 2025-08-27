import echarts from '@/components/ECharts/config';
let animationDuration = 3000; // 动画时长
export const options1 = {
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	},
	yAxis: {
		type: 'value',
	},
	grid: {
		x: '10%',
		y: '5%',
		x2: '5%',
		y2: '15%',
	},
	series: [
		{
			data: [150, 230, 224, 218, 135, 147, 260],
			type: 'line',
		},
	],
};
export const options2 = {
	grid: {
		x: '10%',
		y: '5%',
		x2: '5%',
		y2: '15%',
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: 'line',
			areaStyle: {},
		},
	],
};
export const options3 = {
	tooltip: {
		trigger: 'axis',
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			name: '邮件营销',
			type: 'line',
			stack: '总量',
			smooth: true,
			showSymbol: true,
			// 矢量画五角星
			symbol: 'path://M150 0 L80 175 L250 75 L50 75 L220 175 Z',
			symbolSize: 12,
			yAxisIndex: 0,
			areaStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: 'rgba(250,180,101,0.3)' },
					{ offset: 1, color: 'rgba(250,180,101,0)' },
				]),
				shadowColor: 'rgba(250,180,101,0.2)',
				shadowBlur: 20,
			},
			itemStyle: { color: '#FF8000' },
			data: [120, 132, 101, 134, 90, 230, 210],
		},
		{
			name: '联盟广告',
			type: 'line',
			stack: '总量',
			smooth: true,
			showSymbol: true,
			symbol: 'emptyCircle',
			symbolSize: 12,
			yAxisIndex: 0,
			areaStyle: {
				color: new echarts.graphic.LinearGradient(
					0,
					0,
					0,
					1,
					[
						{ offset: 0, color: 'rgba(199, 237, 250,0.5)' },
						{ offset: 1, color: 'rgba(199, 237, 250,0.2)' },
					],
					false
				),
			},
			itemStyle: {
				color: '#3bbc86',
			},
			data: [220, 182, 191, 234, 290, 330, 310],
		},
		{
			name: '视频广告',
			type: 'line',
			stack: '总量',
			data: [150, 232, 201, 154, 190, 330, 410],
		},
		{
			name: '直接访问',
			type: 'line',
			stack: '总量',
			data: [320, 332, 301, 334, 390, 330, 320],
		},
		{
			name: '搜索引擎',
			type: 'line',
			stack: '总量',
			data: [820, 932, 901, 934, 1290, 1330, 1320],
		},
	],
	grid: {
		x: '15%',
		y: '5%',
		x2: '1%',
		y2: '15%',
	},
};
export const options4 = {
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [
				120,
				{
					value: 200,
					itemStyle: {
						color: '#a90000',
					},
				},
				150,
				80,
				70,
				110,
				130,
			],
			type: 'bar',
		},
	],
	grid: {
		x: '15%',
		y: '5%',
		x2: '1%',
		y2: '15%',
	},
};
export const options5 = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			// 坐标轴指示器，坐标轴触发有效
			type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
		},
	},
	grid: {
		top: 10,
		left: '2%',
		right: '2%',
		bottom: '3%',
		containLabel: true,
	},
	xAxis: [
		{
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			axisTick: {
				alignWithLabel: true,
			},
		},
	],
	yAxis: [
		{
			type: 'value',
			axisTick: {
				show: false,
			},
		},
	],
	series: [
		{
			name: 'pageA',
			type: 'bar',
			stack: 'vistors',
			barWidth: '60%',
			data: [79, 52, 200, 334, 390, 330, 220],
			animationDuration,
		},
		{
			name: 'pageB',
			type: 'bar',
			stack: 'vistors',
			barWidth: '60%',
			data: [80, 52, 200, 334, 390, 330, 220],
			animationDuration,
		},
		{
			name: 'pageC',
			type: 'bar',
			stack: 'vistors',
			barWidth: '60%',
			data: [30, 52, 200, 334, 390, 330, 220],
			animationDuration,
		},
	],
};
export const options6 = {
	xAxis: {
		type: 'value',
		boundaryGap: [0, 0.01],
	},
	yAxis: {
		type: 'category',
		data: ['巴西', '印尼', '美国', '印度', '中国'],
	},
	series: [
		{
			name: '2011年',
			type: 'bar',
			data: [18203, 23489, 29034, 104970, 131744],
		},
		{
			name: '2012年',
			type: 'bar',
			data: [19325, 23438, 31000, 121594, 134141],
		},
	],
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
	},
	grid: {
		x: '15%',
		y: '5%',
		x2: '1%',
		y2: '15%',
	},
};
export const options7 = {
	series: [
		{
			name: '访问来源',
			type: 'pie',
			radius: '50%',
			data: [
				{ value: 1048, name: '搜索引擎' },
				{ value: 735, name: '直接访问' },
				{ value: 580, name: '邮件营销' },
				{ value: 484, name: '联盟广告' },
				{ value: 300, name: '视频广告' },
			],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)',
				},
			},
		},
	],
	grid: {
		x: '15%',
		y: '5%',
		x2: '1%',
		y2: '15%',
	},
};
export const options8 = {
	series: [
		{
			name: '访问来源',
			type: 'pie',
			radius: ['40%', '70%'],
			avoidLabelOverlap: false,
			itemStyle: {
				borderRadius: 10,
				borderColor: '#fff',
				borderWidth: 2,
			},
			label: {
				show: false,
				position: 'center',
			},
			emphasis: {
				label: {
					show: true,
					fontSize: '20',
					fontWeight: 'bold',
				},
			},
			labelLine: {
				show: false,
			},
			data: [
				{ value: 1048, name: '搜索引擎' },
				{ value: 735, name: '直接访问' },
				{ value: 580, name: '邮件营销' },
				{ value: 484, name: '联盟广告' },
				{ value: 300, name: '视频广告' },
			],
		},
	],
	grid: {
		x: '15%',
		y: '5%',
		x2: '1%',
		y2: '15%',
	},
};
export const options9 = {
	series: [
		{
			name: '面积模式',
			type: 'pie',
			radius: [20, 60],
			center: ['50%', '50%'],
			roseType: 'area',
			itemStyle: {
				borderRadius: 8,
			},
			data: [
				{ value: 40, name: 'rose 1' },
				{ value: 38, name: 'rose 2' },
				{ value: 32, name: 'rose 3' },
				{ value: 30, name: 'rose 4' },
				{ value: 28, name: 'rose 5' },
				{ value: 26, name: 'rose 6' },
				{ value: 22, name: 'rose 7' },
				{ value: 18, name: 'rose 8' },
			],
		},
	],
	grid: {
		x: '15%',
		y: '5%',
		x2: '1%',
		y2: '15%',
	},
};
export const options10 = {
	title: [
		{
			text: '预约量',
			x: '25%',
			y: 30,
			textAlign: 'center',
			textStyle: {
				color: '#a1a1a1',
				fontSize: 16,
				fontFamily: 'Microsoft Yahei',
				fontWeight: '100',
				textAlign: 'center',
			},
		},
		{
			text: '实时客流量',
			x: '75%',
			y: 30,
			textAlign: 'center',
			textStyle: {
				color: '#a1a1a1',
				fontSize: 16,
				fontFamily: 'Microsoft Yahei',
				fontWeight: '100',
				textAlign: 'center',
			},
		},
		{
			text: (0.5 * 100).toFixed(0) + '%',
			left: '25%',
			top: '38%',
			textAlign: 'center',
			textStyle: {
				fontSize: '50',
				fontWeight: '300',
				color: '#a06a0a',
				textAlign: 'center',
				textBorderColor: 'rgba(0, 0, 0, 0)',
				textShadowColor: '#fff',
				textShadowBlur: '0',
				textShadowOffsetX: 0,
				textShadowOffsetY: 1,
			},
		},
		{
			text: (0.5 * 100).toFixed(0) + '%',
			left: '75%',
			top: '38%',
			textAlign: 'center',
			textStyle: {
				fontSize: '50',
				fontWeight: '300',
				color: '#02456d',
				textAlign: 'center',
				textBorderColor: 'rgba(0, 0, 0, 0)',
				textShadowColor: '#fff',
				textShadowBlur: '0',
				textShadowOffsetX: 0,
				textShadowOffsetY: 1,
			},
		},
	],
	series: [
		{
			type: 'liquidFill',
			radius: '50%',
			z: 6,
			center: ['25%', '50%'],
			color: [
				{
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [
						{
							offset: 1,
							color: 'rgba(251, 173, 23, 0)',
						},
						{
							offset: 0.5,
							color: 'rgba(251, 173, 23, .2)',
						},
						{
							offset: 0,
							color: 'rgba(251, 173, 23, 1)',
						},
					],
					globalCoord: false,
				},
			],
			data: [0.5, 0.5, 0.5],
			backgroundStyle: {
				borderWidth: 1,
				color: 'transparent',
			},
			label: {
				normal: {
					formatter: '',
				},
			},
			outline: {
				show: true,
				itemStyle: {
					borderWidth: 0,
				},
				borderDistance: 0,
			},
		},
		{
			name: '第二层白边',
			type: 'pie',
			z: 3,
			radius: ['0%', '55%'],
			center: ['25%', '50%'],
			hoverAnimation: false,
			itemStyle: {
				normal: {
					label: {
						show: false,
					},
				},
			},
			data: [
				{
					value: 100,
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: '#fefefe',
								},
								{
									offset: 1,
									color: '#e7e8ea',
								},
							]),
						},
					},
				},
				{
					value: 0,
					itemStyle: {
						normal: {
							color: 'transparent',
						},
					},
				},
			],
		},
		{
			name: '最外绿边',
			type: 'pie',
			z: 1,
			radius: ['0%', '58%'],
			center: ['25%', '50%'],
			hoverAnimation: false,
			itemStyle: {
				normal: {
					label: {
						show: false,
					},
				},
			},
			data: [
				{
					value: 100,
					itemStyle: {
						color: '#fdc56e',
					},
				},
				{
					value: 0,
					itemStyle: {
						normal: {
							color: 'transparent',
						},
					},
				},
			],
		},
		{
			type: 'liquidFill',
			radius: '50%',
			z: 6,
			center: ['75%', '50%'],
			color: ['#c1dce7', '#90d3f0', '#009bdb'],
			data: [0.6, { value: 0.5, direction: 'left' }, 0.4, 0.3],
			backgroundStyle: {
				borderWidth: 1,
				color: 'transparent',
			},
			label: {
				normal: {
					formatter: '',
				},
			},
			outline: {
				show: true,
				itemStyle: {
					borderWidth: 0,
				},
				borderDistance: 0,
			},
		},
		{
			name: '第二层白边',
			type: 'pie',
			z: 3,
			radius: ['0%', '55%'],
			center: ['75%', '50%'],
			hoverAnimation: false,
			itemStyle: {
				normal: {
					label: {
						show: false,
					},
				},
			},
			data: [
				{
					value: 100,
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: '#fefefe',
								},
								{
									offset: 1,
									color: '#e7e8ea',
								},
							]),
						},
					},
				},
				{
					value: 0,
					itemStyle: {
						normal: {
							color: 'transparent',
						},
					},
				},
			],
		},
		{
			name: '最外蓝边',
			type: 'pie',
			z: 1,
			radius: ['0%', '58%'],
			center: ['75%', '50%'],
			hoverAnimation: false,
			itemStyle: {
				normal: {
					label: {
						show: false,
					},
				},
			},
			data: [
				{
					value: 100,
					itemStyle: {
						color: '#07a2e3',
					},
				},
				{
					value: 0,
					itemStyle: {
						normal: {
							color: 'transparent',
						},
					},
				},
			],
		},
	],
};
// export const options11 = {
// 	tooltip: {
// 		trigger: 'item',
// 	},
// 	geo: {
// 		map: 'china', // 使用注册的地图名称
// 		roam: true, // 开启缩放和平移
// 		emphasis: {
// 			label: {
// 				show: true,
// 			},
// 		},
// 	},
// 	visualMap: {
// 		show: false,
// 		min: 0,
// 		max: 100,
// 		realtime: false,
// 		calculable: false,
// 		inRange: {
// 			color: ['#d2e0f5', '#71A9FF'],
// 		},
// 	},
// 	series: [
// 		{
// 			geoIndex: 0,
// 			name: '地域分布',
// 			type: 'map',
// 			coordinateSystem: 'geo',
// 			map: 'china',
// 			symbolSize: 20,
// 			itemStyle: {
// 				color: '#ff0',
// 			},
// 			data: [
// 				{ name: '北京', value: 100 },
// 				{ name: '上海', value: 100 },
// 				{ name: '广东', value: 100 },
// 				{ name: '浙江', value: 90 },
// 				{ name: '江西', value: 80 },
// 				{ name: '山东', value: 70 },
// 				{ name: '广西', value: 60 },
// 				{ name: '河南', value: 50 },
// 				{ name: '河南', value: 40 },
// 				{ name: '青海', value: 70 },
// 				{ name: '河南', value: 30 },
// 				{ name: '黑龙江', value: 20 },
// 				{ name: '新疆', value: 20 },
// 				{ name: '云南', value: 20 },
// 				{ name: '甘肃', value: 20 },
// 			],
// 		},
// 	],
// };
export const options11 = {
	tooltip: {
		trigger: 'item',
	},
	geo: {
		map: 'china',
		roam: false,
		emphasis: {
			label: {
				show: false,
			},
		},
	},
	visualMap: {
		show: false,
		min: 0,
		max: 100,
		realtime: false,
		calculable: false,
		inRange: {
			color: ['#d2e0f5', '#71A9FF'],
		},
	},
	series: [
		{
			geoIndex: 0,
			name: '地域分布',
			type: 'map',
			coordinateSystem: 'geo',
			map: 'china',
			data: [
				{ name: '北京', value: 100 },
				{ name: '上海', value: 100 },
				{ name: '广东', value: 100 },
				{ name: '浙江', value: 90 },
				{ name: '江西', value: 80 },
				{ name: '山东', value: 70 },
				{ name: '广西', value: 60 },
				{ name: '河南', value: 50 },
				{ name: '河南', value: 40 },
				{ name: '青海', value: 70 },
				{ name: '河南', value: 30 },
				{ name: '黑龙江', value: 20 },
				{ name: '新疆', value: 20 },
				{ name: '云南', value: 20 },
				{ name: '甘肃', value: 20 },
			],
		},
	],
};
export const options12 = {
	series: [
		{
			type: 'wordCloud',
			rotationRange: [0, 0],
			autoSize: {
				enable: true,
				minSize: 14,
			},
			textStyle: {
				fontFamily: '微软雅黑,sans-serif',
				color: function () {
					return (
						'rgb(' +
						[
							Math.round(Math.random() * 160),
							Math.round(Math.random() * 160),
							Math.round(Math.random() * 160),
						].join(',') +
						')'
					);
				},
			},
			data: [
				{
					name: 'Vue',
					value: 10000,
				},
				{
					name: 'React',
					value: 9000,
				},
				{
					name: '图表',
					value: 4000,
				},
				{
					name: '产品',
					value: 7000,
				},
				{
					name: 'vue-manage-system',
					value: 2000,
				},
				{
					name: 'element-plus',
					value: 6000,
				},
				{
					name: '管理系统',
					value: 5000,
				},
				{
					name: '前端',
					value: 4000,
				},
				{
					name: '测试',
					value: 3000,
				},
				{
					name: '后端',
					value: 8000,
				},
				{
					name: '软件开发',
					value: 6000,
				},
				{
					name: '程序员',
					value: 4000,
				},
			],
		},
	],
};
export const options13 = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			// 坐标轴指示器，坐标轴触发有效
			type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
		},
	},
	radar: {
		radius: '66%',
		center: ['50%', '42%'],
		splitNumber: 8,
		splitArea: {
			areaStyle: {
				color: 'rgba(127,95,132,.3)',
				opacity: 1,
				shadowBlur: 45,
				shadowColor: 'rgba(0,0,0,.5)',
				shadowOffsetX: 0,
				shadowOffsetY: 15,
			},
		},
		indicator: [
			{ name: 'Sales', max: 10000 },
			{ name: 'Administration', max: 20000 },
			{ name: 'Information Technology', max: 20000 },
			{ name: 'Customer Support', max: 20000 },
			{ name: 'Development', max: 20000 },
			{ name: 'Marketing', max: 20000 },
		],
	},
	legend: {
		left: 'center',
		bottom: '10',
		data: ['Allocated Budget', 'Expected Spending', 'Actual Spending'],
	},
	series: [
		{
			type: 'radar',
			symbolSize: 0,
			areaStyle: {
				normal: {
					shadowBlur: 13,
					shadowColor: 'rgba(0,0,0,.2)',
					shadowOffsetX: 0,
					shadowOffsetY: 10,
					opacity: 1,
				},
			},
			data: [
				{
					value: [5000, 7000, 12000, 11000, 15000, 14000],
					name: 'Allocated Budget',
				},
				{
					value: [4000, 9000, 15000, 15000, 13000, 11000],
					name: 'Expected Spending',
				},
				{
					value: [5500, 11000, 12000, 15000, 12000, 12000],
					name: 'Actual Spending',
				},
			],
			animationDuration,
		},
	],
};

const xAxisData: number[] = [];
const data: number[] = [];
const data2: number[] = [];
for (let i = 0; i < 50; i++) {
	xAxisData.push(i);
	data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
	data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3);
}
export const options14 = {
	backgroundColor: '#08263a',
	grid: {
		left: '5%',
		right: '5%',
	},
	xAxis: [
		{
			show: false,
			data: xAxisData,
		},
		{
			show: false,
			data: xAxisData,
		},
	],
	visualMap: {
		show: false,
		min: 0,
		max: 50,
		dimension: 0,
		inRange: {
			color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055'],
		},
	},
	yAxis: {
		axisLine: {
			show: false,
		},
		axisLabel: {
			textStyle: {
				color: '#4a657a',
			},
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: '#08263f',
			},
		},
		axisTick: {
			show: false,
		},
	},
	series: [
		{
			name: 'back',
			type: 'bar',
			data: data2,
			z: 1,
			itemStyle: {
				normal: {
					opacity: 0.4,
					barBorderRadius: 5,
					shadowBlur: 3,
					shadowColor: '#111',
				},
			},
		},
		{
			name: 'Simulate Shadow',
			type: 'line',
			data,
			z: 2,
			showSymbol: false,
			animationDelay: 0,
			animationEasing: 'linear',
			animationDuration: 1200,
			lineStyle: {
				normal: {
					color: 'transparent',
				},
			},
			areaStyle: {
				normal: {
					color: '#08263a',
					shadowBlur: 50,
					shadowColor: '#000',
				},
			},
		},
		{
			name: 'front',
			type: 'bar',
			data,
			xAxisIndex: 1,
			z: 3,
			itemStyle: {
				normal: {
					barBorderRadius: 5,
				},
			},
		},
	],
	animationEasing: 'elasticOut',
	animationEasingUpdate: 'elasticOut',
	animationDelay(idx) {
		return idx * 20;
	},
	animationDelayUpdate(idx) {
		return idx * 20;
	},
};
