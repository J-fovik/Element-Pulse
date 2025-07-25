import path from 'path';

/**
 * 是否开发环境
 * @param mode 环境
 */
export function isDevFn(mode: string): boolean {
	return mode === 'development';
}

/**
 * 是否生产环境
 * @param mode 环境
 */
export function isProdFn(mode: string): boolean {
	return mode === 'production';
}

/**
 * 是否测试环境
 * @param mode 环境
 */
export function isTestFn(mode: string): boolean {
	return mode === 'test';
}

/**
 * 是否生成包预览
 */
export function isReportMode(): boolean {
	return process.env.VITE_REPORT === 'true';
}

// 读取所有要处理的环境变量配置文件.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
	const ret: any = {};
	for (const envName of Object.keys(envConf)) {
		let realName = envConf[envName].replace(/\\n/g, '\n');
		realName = realName === 'true' ? true : realName === 'false' ? false : realName;
		if (envName === 'VITE_PORT') realName = Number(realName);
		if (envName === 'VITE_PROXY') {
			try {
				realName = JSON.parse(realName);
			} catch (error) {}
		}
		ret[envName] = realName;
	}
	return ret;
}

/**
 * 获取用户根目录
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
	return path.resolve(process.cwd(), ...dir);
}
