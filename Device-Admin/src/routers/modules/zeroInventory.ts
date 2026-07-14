export default {
	path: '/zeroInventory',
	name: 'zeroInventory',
	redirect: '/zeroInventory/inventoryManage',
	meta: {
		icon: 'Menu',
		order: 6,
		requiresAuth: true,
		title: '零库存',
		isLink: '',
		isHide: false,
		isFull: false,
		isAffix: false,
		isKeepAlive: true,
	},
	children: [
		{
			path: '/zeroInventory/inventoryManage',
			name: 'inventoryManage',
			meta: {
				icon: 'Menu',
				requiresAuth: true,
				title: '零库存管理',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				isKeepAlive: true,
			},
			component: () => import('@/views/zeroInventory/inventoryManage/index.vue'),
		},
	],
};
