export default {
	path: '/link',
	name: 'link',
	redirect: '/link/embedded',
	meta: {
		icon: 'Paperclip',
		order: 8,
		requiresAuth: true,
		title: '内嵌外链',
		isLink: '',
		isHide: false,
		isFull: false,
		isAffix: false,
		isKeepAlive: true,
	},
	children: [
		{
			path: '/link/embedded',
			name: 'embedded',
			meta: {
				icon: 'Menu',
				requiresAuth: true,
				title: '内嵌',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				isKeepAlive: true,
			},
			component: () => import('@/views/link/embedded/index.vue'),
		},
		{
			path: '/link/outerChain',
			name: 'outerChain',
			meta: {
				icon: 'Menu',
				requiresAuth: true,
				title: '外链',
				isLink: 'https://element-plus.org/zh-CN/component/icon.html',
				isHide: false,
				isFull: false,
				isAffix: false,
				isKeepAlive: true,
			},
			component: () => import('@/views/link/outerChain/index.vue'),
		},
	],
};
