/* Menu */
declare namespace Menu {
	interface MenuOptions {
		path: string;
		name: string;
		component?: string | (() => Promise<unknown>);
		redirect?: string;
		meta: MetaProps;
		children?: MenuOptions[];
	}
	interface MetaProps {
		icon: string;
		title: string;
		activeMenu?: string;
		isLink?: string;
		isHide: boolean;
		isFull: boolean;
		isAffix: boolean;
		isKeepAlive: boolean;
	}
}

/* utils */
type ArrayItem = {
	[key: string]: any;
};
// 申明 数组
declare type EmptyArrayType<T = any> = T[];
// 申明 对象
declare type EmptyObjectType<T = any> = {
	[key: string]: T;
};

/* hooks */
type Dispatch<A> = (value: A) => void;
interface AnyObject {
	[key: string]: any;
}

/* FileType */
declare namespace File {
	type ImageMimeType =
		| 'image/apng'
		| 'image/bmp'
		| 'image/gif'
		| 'image/jpeg'
		| 'image/pjpeg'
		| 'image/png'
		| 'image/svg+xml'
		| 'image/tiff'
		| 'image/webp'
		| 'image/x-icon';

	type ExcelMimeType =
		| 'application/vnd.ms-excel'
		| 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
}

/* Vite */
declare type Recordable<T = any> = Record<string, T>;
declare interface ViteEnv {
	VITE_USER_NODE_ENV: 'development' | 'production' | 'test';
	VITE_GLOB_APP_TITLE: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_REPORT: boolean;
	VITE_ROUTER_MODE: 'hash' | 'history';
	VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'gzip,brotli' | 'none';
	VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
	VITE_DROP_CONSOLE: boolean;
	VITE_PWA: boolean;
	VITE_PUBLIC_PATH: string;
	VITE_API_URL: string;
	VITE_PROXY: [string, string][];
}
interface ImportMetaEnv extends ViteEnv {
	__: unknown;
}

/* __APP_INFO__ */
declare const __APP_INFO__: {
	pkg: {
		name: string;
		version: string;
		dependencies: Recordable<string>;
		devDependencies: Recordable<string>;
	};
	lastBuildTime: string;
};
/* 主题色 */
type ThemeType = 'light' | 'inverted' | 'dark';
type GreyOrWeakType = 'grey' | 'weak';

/* 三方插件 */
declare module 'js-cookie' {
	export const set: (key: string, value: string) => void;
	export const get: (key?: string) => string;
	export const remove: (key: string) => void;
}
/* file */
interface GetImageWidthHeightFn {
	(url: string): Promise<{ width: number; height: number }>;
}