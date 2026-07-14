import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores';
import NProgress from '@/config/nprogress';
import { Session } from '@/utils/storage';
import { collectKeySpecifiedValues } from '@/utils/arrayOperation';
import { RouteRecordRaw } from 'vue-router';
import { HOME_URL, LOGIN_URL } from '@/config';
import { appRoutes } from '@/routers/base';
const mode = import.meta.env.VITE_ROUTER_MODE;
/**
 * staticRouter (静态路由)
 */
const staticRouter: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: HOME_URL,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: LOGIN_URL,
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录',
			requiresAuth: false,
		},
	},
	{
		path: '/layout',
		name: 'layout',
		component: () => import('@/layouts/index.vue'),
		// component: () => import("@/layouts/indexAsync.vue"),
		redirect: HOME_URL,
		children: appRoutes,
		meta: {
			requiresAuth: true,
		},
	},
	// 全屏页面
	{
		path: '/dataScreen',
		name: 'dataScreen',
		meta: {
			requiresAuth: true,
		},
		component: () => import('@/views/dataScreen/index.vue'),
	},
];

/**
 * errorRouter (错误页面路由)
 */
const errorRouter = [
	{
		path: '/403',
		name: '403',
		component: () => import('@/components/ErrorMessage/403.vue'),
		meta: {
			title: '403页面',
			requiresAuth: false,
		},
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/components/ErrorMessage/404.vue'),
		meta: {
			title: '404页面',
			requiresAuth: false,
		},
	},
	{
		path: '/500',
		name: '500',
		component: () => import('@/components/ErrorMessage/500.vue'),
		meta: {
			title: '500页面',
			requiresAuth: false,
		},
	},
	// 解决刷新页面、路由警告问题
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/components/ErrorMessage/404.vue'),
	},
];
const routerMode = {
	hash: () => createWebHashHistory(),
	history: () => createWebHistory(),
};

/**
 * @description 📚 路由参数配置简介
 * @param path ==> 路由菜单访问路径
 * @param name ==> 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选)
 * @param redirect ==> 路由重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 路由菜单元信息
 * @param meta.icon ==> 菜单和面包屑对应的图标
 * @param meta.title ==> 路由标题 (用作 document.title || 菜单的名称)
 * @param meta.order ==> 排序
 * @param meta.requiresAuth ==> 是否需要认证
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单*保证返回上级路由*
 * @param meta.isLink ==> 路由外链时填写的访问地址
 * @param meta.isHide ==> 是否在菜单中隐藏 (通常列表详情页需要隐藏)
 * @param meta.isFull ==> 菜单是否全屏 (示例：数据大屏页面)
 * @param meta.isAffix ==> 菜单是否固定在标签页中 (首页通常是固定项)
 * @param meta.isKeepAlive ==> 当前路由是否缓存
 * */
const router = createRouter({
	history: routerMode[mode](),
	routes: [...staticRouter, ...errorRouter],
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to) => {
	// NProgress 开始
	NProgress.start();

	// 动态设置标题
	const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE;
	document.title = to.meta.title ? `${to.meta.title} - ${APP_TITLE}` : APP_TITLE;
	// 查询用户信息
	const userStore = useUserStore();
	// 用户cookie
	const userToken = Session.get('userToken');
	// 是否需要认证
	if (to.meta.requiresAuth) {
		// 不存在用户信息时
		if (!userStore.userInfo.userId) {
			// 判断token
			if (userToken) {
				// 判断是否可以获取到用户信息
				const isLogin = await userStore.initUserInfo();
				// 业务判断 路由拦截
				if (!isLogin)
					return {
						path: '/login',
						query: { redirect: to.fullPath },
					};
			} else {
				return {
					path: '/login',
					query: { redirect: to.fullPath },
				};
			}
		}

		// // 权限控制
		// if (!collectKeySpecifiedValues(userStore.authMenuList)?.includes(to.name as any)) {
		// 	// 详情页面不做权限处理;
		// 	if (!to.meta.activeMenu) {
		// 		return {
		// 			path: '/403',
		// 			query: { redirect: to.fullPath },
		// 		};
		// 	}
		// }
		const authNames = collectKeySpecifiedValues(userStore.authMenuList) || [];
		const prefixWhitelist = ['dynamicMenu']; // 白名单

		function hasRoutePermission(routeName) {
			if (authNames.includes(routeName)) return true;
			for (const prefix of prefixWhitelist) {
				if (
					routeName.startsWith(prefix) &&
					authNames.some((name) => name.startsWith(prefix))
				) {
					return true;
				}
			}
			return false;
		}

		if (!hasRoutePermission(to.name)) {
			if (!to.meta.activeMenu) {
				return {
					path: '/403',
					query: { redirect: to.fullPath },
				};
			}
		}
		// 存储 routerName 做按钮权限筛选
		userStore.setRouteName(to.name as string);
	}
	return true;
});
/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
	NProgress.done();
	console.warn('路由错误', error.message);
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
	NProgress.done();
});

export default router;
