export default {
	path: '/basicData',
	name: 'basicData',
	redirect: '/basicData/equipmentIntegration',
	meta: {
		icon: 'Menu',
		order: 4,
		requiresAuth: true,
		title: '基础数据管理',
		isLink: '',
		isHide: false,
		isFull: false,
		isAffix: false,
		isKeepAlive: true,
	},
	children: [
		{
			path: '/basicData/equipmentIntegration',
			name: 'equipmentIntegration',
			meta: {
				icon: 'Menu',
				requiresAuth: true,
				title: '设备集成信息',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				isKeepAlive: true,
			},
			component: () => import('@/views/basicData/equipmentIntegration/index.vue'),
		},
	],
};
