import { resolve } from 'path';
import { PluginOption } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html';
import { visualizer } from 'rollup-plugin-visualizer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteCompression from 'vite-plugin-compression';
import Components from 'unplugin-vue-components/vite'; // 全部注册组件
import AutoImport from 'unplugin-auto-import/vite'; // 自动引入
import FullReload from 'vite-plugin-full-reload'; // 修改代码重新编译加载页面
/**
 * 创建 vite 插件
 * @param viteEnv
 */
export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
	const { VITE_GLOB_APP_TITLE, VITE_REPORT, VITE_PWA } = viteEnv;
	return [
		vue(),
		// vue 可以使用 jsx/tsx 语法
		vueJsx(),
		// 创建打包压缩配置
		createCompression(viteEnv),
		// 修改代码重新编译加载页面
		FullReload(['src/**/*'], { delay: 200 }),
		// 注入变量到 html 文件
		createHtmlPlugin({
			minify: true,
			inject: {
				data: { title: VITE_GLOB_APP_TITLE },
			},
		}),
		// 使用 svg 图标
		createSvgIconsPlugin({
			iconDirs: [resolve(process.cwd(), 'src/assets/svgIcons')],
			symbolId: 'icon-[dir]-[name]',
		}),
		// 自动导入vue相关函数，如: ref、reactive、toRef等
		AutoImport({
			// 自动引入的文件
			imports: [
				'vue',
				'vue-router', // 添加mitt到自动导入列表
			],
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
		// vitePWA
		VITE_PWA && createVitePwa(viteEnv),
		// 是否生成包预览，分析依赖包大小做优化处理
		VITE_REPORT &&
			(visualizer({
				filename: 'stats.html',
				gzipSize: true,
				brotliSize: true,
			}) as PluginOption),
	];
};

/**
 * @description 根据 compress 配置，生成不同的压缩规则
 * @param viteEnv
 */
const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
	const { VITE_BUILD_COMPRESS = 'none', VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
	const compressList = VITE_BUILD_COMPRESS.split(',');
	const plugins: PluginOption[] = [];
	if (compressList.includes('gzip')) {
		plugins.push(
			viteCompression({
				ext: '.gz',
				algorithm: 'gzip',
				deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
			})
		);
	}
	if (compressList.includes('brotli')) {
		plugins.push(
			viteCompression({
				ext: '.br',
				algorithm: 'brotliCompress',
				deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
			})
		);
	}
	return plugins;
};

/**
 * @description VitePwa
 * @param viteEnv
 */
const createVitePwa = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
	const { VITE_GLOB_APP_TITLE } = viteEnv;
	return VitePWA({
		registerType: 'autoUpdate',
		manifest: {
			name: VITE_GLOB_APP_TITLE,
			short_name: VITE_GLOB_APP_TITLE,
			theme_color: '#ffffff',
			icons: [
				{
					src: '/logo.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: '/logo.png',
					sizes: '512x512',
					type: 'image/png',
				},
				{
					src: '/logo.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'any maskable',
				},
			],
		},
	});
};