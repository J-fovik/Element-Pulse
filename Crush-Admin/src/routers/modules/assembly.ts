export default {
	path: '/assembly',
	name: 'assembly',
	redirect: '/assembly/iconSelector',
	meta: {
		icon: 'Briefcase',
		order: 5,
		requiresAuth: true,
		title: '常用组件',
		isLink: '',
		isHide: false,
		isFull: false,
		isAffix: false,
		isKeepAlive: true,
	},
	children: [
		{
			path: '/assembly/iconSelector',
			name: 'iconSelector',
			meta: {
				icon: 'Menu',
				requiresAuth: true,
				title: '图标选择器',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				isKeepAlive: true,
			},
			component: () => import('@/views/assembly/iconSelector/index.vue'),
		},
		{
			path: '/assembly/selectFilter',
			name: 'selectFilter',
			meta: {
				icon: 'Menu',
				requiresAuth: true,
				title: '分类筛选器',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				isKeepAlive: true,
			},
			component: () => import('@/views/assembly/selectFilter/index.vue'),
		},
		{
			path: '/assembly/treeSelector',
			name: 'treeSelector',
			meta: {
				icon: 'Menu',
				requiresAuth: true,
				title: '树形筛选器',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				isKeepAlive: true,
			},
			component: () => import('@/views/assembly/treeSelector/index.vue'),
		},
		{
			path: '/assembly/multiIcon',
			name: 'multiIcon',
			meta: {
				icon: 'Menu',
				title: '多功能图标',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				requiresAuth: true,
				isKeepAlive: true,
			},
			component: () => import('@/views/assembly/multiIcon/index.vue'),
		},
		{
			path: '/assembly/wangEditor',
			name: 'wangEditor',
			meta: {
				icon: 'Menu',
				requiresAuth: true,
				title: '富文本编辑器',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				isKeepAlive: true,
			},
			component: () => import('@/views/assembly/wangEditor/index.vue'),
		},
		{
			path: '/assembly/eCharts',
			name: 'eCharts',
			meta: {
				icon: 'Menu',
				requiresAuth: true,
				title: 'ECharts图表',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				isKeepAlive: true,
			},
			component: () => import('@/views/assembly/eCharts/index.vue'),
		},
		{
			path: '/assembly/noticeBar',
			name: 'noticeBar',
			meta: {
				icon: 'Menu',
				title: '滚动通知栏',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				requiresAuth: true,
				isKeepAlive: true,
			},
			component: () => import('@/views/assembly/noticeBar/index.vue'),
		},
		{
			path: '/assembly/tablePlus',
			name: 'tablePlus',
			meta: {
				icon: 'Menu',
				title: '超级表格',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				requiresAuth: true,
				isKeepAlive: true,
			},
			component: () => import('@/views/assembly/tablePlus/index.vue'),
		},
		{
			path: '/assembly/previewFile',
			name: 'previewFile',
			meta: {
				icon: 'Menu',
				requiresAuth: true,
				title: '预览文件',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				isKeepAlive: true,
			},
			component: () => import('@/views/assembly/previewFile/index.vue'),
		},
		{
			path: '/assembly/rollNumber',
			name: 'rollNumber',
			meta: {
				icon: 'Menu',
				title: '滚动数字',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				requiresAuth: true,
				isKeepAlive: true,
			},
			component: () => import('@/views/assembly/rollNumber/index.vue'),
		},
		{
			path: '/assembly/cropImage',
			name: 'cropImage',
			meta: {
				icon: 'Menu',
				title: '裁剪图片',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				requiresAuth: true,
				isKeepAlive: true,
			},
			component: () => import('@/views/assembly/cropImage/index.vue'),
		},
		{
			path: '/assembly/videoPlayer',
			name: 'videoPlayer',
			meta: {
				icon: 'Menu',
				title: '视频播放器',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				requiresAuth: true,
				isKeepAlive: true,
			},
			component: () => import('@/views/assembly/videoPlayer/index.vue'),
		},
		{
			path: '/assembly/uploadFile',
			name: 'uploadFile',
			meta: {
				icon: 'Menu',
				title: '上传文件',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				requiresAuth: true,
				isKeepAlive: true,
			},
			component: () => import('@/views/assembly/uploadFile/index.vue'),
		},
		{
			path: '/assembly/proportion',
			name: 'proportion',
			meta: {
				icon: 'Menu',
				title: '比例进度条',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				requiresAuth: true,
				isKeepAlive: true,
			},
			component: () => import('@/views/assembly/proportion/index.vue'),
		},
		{
			path: '/assembly/drag',
			name: 'drag',
			meta: {
				icon: 'Menu',
				title: '拖拽组件',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				requiresAuth: true,
				isKeepAlive: true,
			},
			component: () => import('@/views/assembly/drag/index.vue'),
		},
		{
			path: '/assembly/miniTool',
			name: 'miniTool',
			meta: {
				icon: 'Menu',
				title: '组件小工具',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: false,
				requiresAuth: true,
				isKeepAlive: true,
			},
			component: () => import('@/views/assembly/miniTool/index.vue'),
		},
	],
};
