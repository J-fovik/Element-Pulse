import echarts from '@/components/ECharts/config';

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
			data: [120, 132, 101, 134, 90, 230, 210],
		},
		{
			name: '联盟广告',
			type: 'line',
			stack: '总量',
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
			data: [120, 200, 150, 80, 70, 110, 130],
			type: 'bar',
			showBackground: true,
			backgroundStyle: {
				color: 'rgba(180, 180, 180, 0.2)',
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
export const options5 = {
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
