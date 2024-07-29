export default {
	path: '/params',
	name: 'paramsIndex',
	component: () => import('/@/layout/routerView/parent.vue'),
	redirect: '/params/common',
	meta: {
		title: 'message.router.paramsIndex',
		isLink: '',
		isHide: false,
		isKeepAlive: true,
		isAffix: false,
		isIframe: false,
		roles: ['admin'],
		icon: 'fa fa-slack',
	},
	children: [
		{
			path: '/params/common',
			name: 'paramsCommon',
			component: () => import('/@/views/params/common/index.vue'),
			meta: {
				title: 'message.router.paramsCommon',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin'],
				icon: 'iconfont icon-putong',
			},
		},
		{
			path: '/params/common/details',
			name: 'paramsCommonDetails',
			component: () => import('/@/views/params/common/details.vue'),
			meta: {
				title: 'message.router.paramsCommonDetails',
				superiorName: 'paramsCommon',
				isLink: '',
				isHide: true,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin'],
				icon: 'ele-Comment',
			},
		},
		{
			path: '/params/dynamic',
			name: 'paramsDynamic',
			component: () => import('/@/views/params/dynamic/index.vue'),
			meta: {
				title: 'message.router.paramsDynamic',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin'],
				icon: 'iconfont icon-dongtai',
			},
		},
		/**
		 * tagsViewName 为要设置不同的 "tagsView 名称" 字段
		 * 如若需设置不同 "tagsView 名称"，tagsViewName 字段必须要有
		 */
		{
			path: '/params/dynamic/details/:t/:id/:tagsViewName',
			name: 'paramsDynamicDetails',
			component: () => import('/@/views/params/dynamic/details.vue'),
			meta: {
				title: 'message.router.paramsDynamicDetails',
				superiorName: 'paramsDynamic',
				isLink: '',
				isHide: true,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin'],
				icon: 'ele-Lightning',
			},
		},
	],
};
