export default {
	path: '/echarts',
	name: 'echarts',
	redirect: '/echarts/waterChart',
	meta: {
		icon: 'TrendCharts',
		order: 6,
		title: 'ECharts',
		isLink: '',
		isHide: false,
		isFull: false,
		isAffix: false,
		isKeepAlive: true,
	},
	children: [
		{
			path: '/echarts/waterChart',
			name: 'waterChart',
			component: '/echarts/waterChart/index',
			meta: {
				icon: 'Menu',
				title: '水型图',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				isKeepAlive: true,
			},
		},
		{
			path: '/echarts/columnChart',
			name: 'columnChart',
			component: '/echarts/columnChart/index',
			meta: {
				icon: 'Menu',
				title: '柱状图',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				isKeepAlive: true,
			},
		},
		{
			path: '/echarts/lineChart',
			name: 'lineChart',
			component: '/echarts/lineChart/index',
			meta: {
				icon: 'Menu',
				title: '折线图',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				isKeepAlive: true,
			},
		},
		{
			path: '/echarts/pieChart',
			name: 'pieChart',
			component: '/echarts/pieChart/index',
			meta: {
				icon: 'Menu',
				title: '饼图',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				isKeepAlive: true,
			},
		},
		{
			path: '/echarts/radarChart',
			name: 'radarChart',
			component: '/echarts/radarChart/index',
			meta: {
				icon: 'Menu',
				title: '雷达图',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				isKeepAlive: true,
			},
		},
		{
			path: '/echarts/nestedChart',
			name: 'nestedChart',
			component: '/echarts/nestedChart/index',
			meta: {
				icon: 'Menu',
				title: '嵌套环形图',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				isKeepAlive: true,
			},
		},
	],
};