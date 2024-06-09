export default {
	path: '/components',
	meta: {
		title: '功能组件',
	},
	icon: 'Guide',
	children: [
		{
			path: '/components/IconSelect',
			component: () => import('@/pages/components/IconSelect/index.vue'),
			meta: {
				title: '筛选图标',
			},
			icon: 'Shop',
		},
		{
			path: '/components/PanThumb',
			component: () => import('@/pages/components/PanThumb/index.vue'),
			meta: {
				title: '图片hover效果',
			},
			icon: 'Shop',
		},
		{
			path: '/components/DropdownMenu',
			component: () => import('@/pages/components/DropdownMenu/index.vue'),
			meta: {
				title: '分享下拉菜单',
			},
			icon: 'Shop',
		},
	],
};
