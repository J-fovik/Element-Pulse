export default {
	path: '/tools',
	name: 'tools',
	meta: {
		icon: 'Tools',
		order: 11,
		requiresAuth: true,
		title: '工具校验集合',
		isLink: '',
		isHide: false,
		isFull: false,
		isAffix: false,
		isKeepAlive: true,
	},
	component: () => import('@/views/tools/index.vue'),
};
