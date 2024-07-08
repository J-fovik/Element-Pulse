import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite';
import { resolve } from 'path';
import { wrapperEnv } from './build/getEnv';
import { createProxy } from './build/proxy';
import { createVitePlugins } from './build/plugins';
import pkg from './package.json';
import dayjs from 'dayjs';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import Components from 'unplugin-vue-components/vite'; // 全部注册组件
import AutoImport from 'unplugin-auto-import/vite'; // 自动引入

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
	pkg: { dependencies, devDependencies, name, version },
	lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const root = process.cwd();
	const env = loadEnv(mode, root);
	const viteEnv = wrapperEnv(env);

	return {
		base: viteEnv.VITE_PUBLIC_PATH,
		root,
		resolve: {
			// 路径别名
			alias: {
				'@': resolve(__dirname, './src'),
				'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
			},
		},
		define: {
			__APP_INFO__: JSON.stringify(__APP_INFO__),
		},
		css: {
			// 配置全局变量
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/assets/styles/var.scss";`,
				},
			},
		},
		server: {
			// 服务器监听的地址（允许您的服务器被外部访问）
			host: '0.0.0.0',
			// 服务器监听的端口
			port: viteEnv.VITE_PORT,
			// 启动时是否自动打开浏览器
			open: viteEnv.VITE_OPEN,
			// 是否启用 CORS，接受跨域请求
			cors: true,
			// 本地环境代理配置
			proxy: createProxy(viteEnv.VITE_PROXY),
		},
		plugins: [
			vueSetupExtend(),
			// 配置 Vite 插件
			createVitePlugins(viteEnv),
			// 自动导入vue相关函数，如: ref、reactive、toRef等
			AutoImport({
				// 自动引入的文件
				imports: ['vue', 'vue-router'],
				// 配置文件生成位置
				dts: 'src/auto-import.d.ts',
			}),
			// 指定组件位置，默认是 src/components 自动导入自定义组件
			Components({
				// 本地指定组件位置路径
				dirs: ['src/components'],
				// 文件类型
				extensions: ['vue', 'tsx'],
				// 配置文件生成位置
				dts: 'src/components.d.ts',
			}),
		],
		esbuild: {
			// 打包时删除
			pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
		},
		build: {
			outDir: 'dist',
			minify: 'esbuild',
			// esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
			// minify: "terser",
			// terserOptions: {
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true
			// 	}
			// },
			sourcemap: false,
			// 禁用 gzip 压缩大小报告，可略微减少打包时间
			reportCompressedSize: false,
			// 规定触发警告的 chunk 大小
			chunkSizeWarningLimit: 2000,
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
				},
			},
		},
	};
});
