export default {
	path: '/home',
	name: 'home',
	meta: {
		icon: 'HomeFilled',
		order: 1,
		requiresAuth: true,
		title: '首页',
		isLink: '',
		isHide: false,
		isFull: false,
		isAffix: true,
		isKeepAlive: true,
	},
	component: () => import('@/views/home/index.vue'),
};
