export default {
	path: '/visualization',
	name: 'visualization',
	component: () => import('/@/layout/routerView/parent.vue'),
	redirect: '/visualization/baidu',
	meta: {
		title: 'message.router.visualization',
		isLink: '',
		isHide: false,
		isKeepAlive: true,
		isAffix: false,
		isIframe: false,
		roles: ['admin'],
		icon: 'ele-Present',
	},
	children: [
		{
			path: '/visualization/baidu',
			name: 'visualizationBaidu',
			component: () => import('/@/views/visualization/baidu/index.vue'),
			meta: {
				title: 'message.router.visualizationBaidu',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin', 'common'],
				icon: 'iconfont icon-diqiu1',
			},
		},
		{
			path: '/visualization/gaode',
			name: 'visualizationGaode',
			component: () => import('/@/views/visualization/gaode/index.vue'),
			meta: {
				title: 'message.router.visualizationGaode',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin', 'common'],
				icon: 'iconfont icon-diqiu',
			},
		},
		{
			path: '/visualization/mapEcharts',
			name: 'visualizationMapEcharts',
			component: () => import('/@/views/visualization/mapEcharts/index.vue'),
			meta: {
				title: 'message.router.visualizationMapEcharts',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin', 'common'],
				icon: 'iconfont icon-ditu',
			},
		},
		{
			path: '/visualization/wangEditor',
			name: 'visualizationWangEditor',
			component: () => import('/@/views/visualization/wangEditor/index.vue'),
			meta: {
				title: 'message.router.visualizationWangEditor',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin', 'common'],
				icon: 'iconfont icon-fuwenbenkuang',
			},
		},
		{
			path: '/visualization/chartEcharts',
			name: 'visualizationChartEcharts',
			component: () => import('/@/views/visualization/chartEcharts/index.vue'),
			meta: {
				title: 'message.router.visualizationChartEcharts',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin', 'common'],
				icon: 'iconfont icon-ico_shuju',
			},
		},
	],
};
