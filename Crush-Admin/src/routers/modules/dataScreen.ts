export default {
	path: '/dataScreen',
	name: 'dataScreen',
	meta: {
		icon: 'Histogram',
		order: 2,
		requiresAuth: true,
		title: '数据大屏',
		isLink: '',
		isHide: false,
		isFull: true,
		isAffix: false,
		isKeepAlive: true,
	},
	component: () => import('@/views/dataScreen/index.vue'),
};
