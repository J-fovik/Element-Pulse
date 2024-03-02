import { RouteRecordRaw } from 'vue-router';
/**
 * 建议：路由 path 路径与文件夹名称相同，找文件可浏览器地址找，方便定位文件位置
 *
 *  {
		// 菜单路径，用于跳转
		path: '/home',
		// 菜单 name，用于界面 keep-alive 路由缓存。
		// 此 name 需要与 component 组件中的 name 值相同（唯一）
		name: 'home',
		// 组件路径
		component: () => import('/@/views/home/index.vue'),
		// 附加自定义数据
		meta: {
			// 菜单标题（国际化写法）
			title: 'message.router.home',
			// 菜单外链链接
			// 开启外链条件，`1、isLink: true 2、链接地址不为空（meta.isLink） 3、isIframe: false`
			isLink: '',
			// 菜单是否隐藏（菜单不显示在界面，但可以进行跳转）
			isHide: false,
			// 菜单是否缓存
			isKeepAlive: true,
			// 菜单是否固定（固定在 tagsView 中，不可进行关闭），右键菜单无 `关闭` 项
			isAffix: true,
			// 是否内嵌
			// 开启条件，`1、isIframe: true 2、链接地址不为空（meta.isLink）`
			isIframe: false,
			// 当前路由权限标识，取角色管理。控制路由显示、隐藏。超级管理员：admin 普通角色：common
			// 之前 auth 取用户（角色下有多个用户）
			roles: ['admin', 'common'],
			// 菜单图标
			icon: 'iconfont icon-shouye',
 	 	},
	}
*/
/**
	 * 打开内置全屏
	 * component 都为 `() => import('/@/layout/routerView/link.vue')`
	 * isLink 链接为内置的路由地址，地址为 staticRoutes 中定义
*/
// 扩展 RouteMeta 接口
declare module 'vue-router' {
	interface RouteMeta {
		title?: string;
		isLink?: string;
		isHide?: boolean;
		isKeepAlive?: boolean;
		isAffix?: boolean;
		isIframe?: boolean;
		roles?: string[];
		icon?: string;
	}
}
// 使用 import.meta.globEager 导入所有模块文件
const modules = import.meta.glob('./modules/*.ts', { eager: true, import: 'default' })
// 处理模块
export const routerArray = Object.keys(modules).map((key) => {
    return (modules[key] as any);
});
/**
 * 定义动态路由
 * 前端添加路由，请在顶级节点的 `children 数组` 里添加
 * @description 未开启 isRequestRoutes 为 true 时使用（前端控制路由），开启时第一个顶级 children 的路由将被替换成接口请求回来的路由数据
 * @description 各字段请查看 `/@/views/system/menu/component/addMenu.vue 下的 ruleForm`
 * @returns 返回路由菜单数据
 */
export const dynamicRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '/',
		component: () => import('/@/layout/index.vue'),
		redirect: '/home',
		meta: {
			isKeepAlive: true,
		},
		children: [
			...routerArray,
		],
	},
];

/**
 * 定义404、401界面
 * @link 参考：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
export const notFoundAndNoPower = [
	{
		path: '/:path(.*)*',
		name: 'notFound',
		component: () => import('/@/views/error/404.vue'),
		meta: {
			title: 'message.staticRoutes.notFound',
			isHide: true,
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('/@/views/error/401.vue'),
		meta: {
			title: 'message.staticRoutes.noPower',
			isHide: true,
		},
	},
];

/**
 * 定义静态路由（默认路由）
 * 此路由不要动，前端添加路由的话，请在 `dynamicRoutes 数组` 中添加
 * @description 前端控制直接改 dynamicRoutes 中的路由，后端控制不需要修改，请求接口路由数据时，会覆盖 dynamicRoutes 第一个顶级 children 的内容（全屏，不包含 layout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('/@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
	/**
	 * 提示：写在这里的为全屏界面，不建议写在这里
	 * 请写在 `dynamicRoutes` 路由数组中
	 */
	{
		path: '/personal',
		name: 'personal',
		component: () => import('/@/views/personal/index.vue'),
		meta: {
			title: 'message.router.personal',
			isLink: '',
			isHide: false,
			isKeepAlive: true,
			isAffix: false,
			isIframe: false,
			roles: ['admin', 'common'],
			icon: 'iconfont icon-gerenzhongxin',
		},
	},
];
