import { getFlatMenuList, elevateTitles } from '@/utils/arrayOperation';

// 模块
const modules = import.meta.glob('./modules/*.ts', { eager: true });
// 处理模块
export const newModules = Object.keys(modules).map((key) => {
	return (modules[key] as any).default;
});
// 返回模块菜单
export const appMenus = elevateTitles(newModules).sort(
	(a: any, b: any) => a.meta.order - b.meta.order
);

// 返回模块路由
export const appRoutes = getFlatMenuList(newModules);
