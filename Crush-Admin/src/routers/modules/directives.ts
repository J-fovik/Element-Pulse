export default {
	path: '/directives',
	name: 'directives',
	meta: {
		icon: 'Cherry',
		order: 7,
		requiresAuth: true,
		title: '自定义指令',
		isLink: '',
		isHide: false,
		isFull: false,
		isAffix: false,
		isKeepAlive: true,
	},
	component: () => import('@/views/directives/index.vue'),
};
