import { formatRoutes } from '@/utils/menu';

// 模块
const modules = import.meta.glob('./modules/*.ts', { eager: true });
// 处理模块
export const newModules = Object.keys(modules).map((key) => {
	return (modules[key] as any).default;
});

// 返回模块路由
export const appRoutes = formatRoutes(newModules);
