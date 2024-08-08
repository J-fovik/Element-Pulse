/**
 * @name 全局主题
 */

import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
import { DEFAULT_PRIMARY } from '@/config';
import { useGlobalStore } from '@/stores/modules/global';
import { getLightColor, getDarkColor } from '@/utils/color';
import { menuTheme } from '@/assets/styles/theme/menu';
import { asideTheme } from '@/assets/styles/theme/aside';
import { headerTheme } from '@/assets/styles/theme/header';

// 全局主题
export const useTheme = () => {
	const globalStore = useGlobalStore();
	const { primary, isDark, isGrey, isWeak, layout, asideInverted, headerInverted } =
		storeToRefs(globalStore);

	// 切换暗黑模式 ==> 同时修改主题颜色、侧边栏、头部颜色
	const switchDark = () => {
		const html = document.documentElement as HTMLElement;
		if (isDark.value) html.setAttribute('class', 'dark');
		else html.setAttribute('class', '');
		changePrimary(primary.value);
		setAsideTheme();
		setHeaderTheme();
	};

	// 修改主题颜色
	const changePrimary = (val: string | null) => {
		if (!val) {
			val = DEFAULT_PRIMARY;
			ElMessage({ type: 'success', message: `主题颜色已重置为 ${DEFAULT_PRIMARY}` });
		}
		// 计算主题颜色变化
		document.documentElement.style.setProperty('--el-color-primary', val);
		document.documentElement.style.setProperty(
			'--el-color-primary-dark-2',
			isDark.value ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`
		);
		for (let i = 1; i <= 9; i++) {
			const primaryColor = isDark.value
				? `${getDarkColor(val, i / 10)}`
				: `${getLightColor(val, i / 10)}`;
			document.documentElement.style.setProperty(
				`--el-color-primary-light-${i}`,
				primaryColor
			);
		}
		globalStore.setGlobalState('primary', val);
	};

	// 灰色和弱色切换
	const changeGreyOrWeak = (type: GreyOrWeakType, value: boolean) => {
		const body = document.body as HTMLElement;
		if (!value) return body.removeAttribute('style');
		const styles: Record<GreyOrWeakType, string> = {
			grey: 'filter: grayscale(1)',
			weak: 'filter: invert(80%)',
		};
		body.setAttribute('style', styles[type]);
		const propName = type === 'grey' ? 'isWeak' : 'isGrey';
		globalStore.setGlobalState(propName, false);
	};

	// 设置菜单样式
	const setMenuTheme = () => {
		let type: ThemeType = 'light';
		if (layout.value === 'transverse' && headerInverted.value) type = 'inverted';
		if (layout.value !== 'transverse' && asideInverted.value) type = 'inverted';
		if (isDark.value) type = 'dark';
		const theme = menuTheme[type!];
		for (const [key, value] of Object.entries(theme)) {
			document.documentElement.style.setProperty(key, value);
		}
	};

	// 设置侧边栏样式
	const setAsideTheme = () => {
		let type: ThemeType = 'light';
		if (asideInverted.value) type = 'inverted';
		if (isDark.value) type = 'dark';
		const theme = asideTheme[type!];
		for (const [key, value] of Object.entries(theme)) {
			document.documentElement.style.setProperty(key, value);
		}
		setMenuTheme();
	};

	// 设置头部样式
	const setHeaderTheme = () => {
		let type: ThemeType = 'light';
		if (headerInverted.value) type = 'inverted';
		if (isDark.value) type = 'dark';
		const theme = headerTheme[type!];
		for (const [key, value] of Object.entries(theme)) {
			document.documentElement.style.setProperty(key, value);
		}
		setMenuTheme();
	};

	// 初始化设置主题
	const initTheme = () => {
		switchDark();
		if (isGrey.value) changeGreyOrWeak('grey', true);
		if (isWeak.value) changeGreyOrWeak('weak', true);
	};

	return {
		initTheme,
		switchDark,
		changePrimary,
		changeGreyOrWeak,
		setAsideTheme,
		setHeaderTheme,
	};
};

// 灰度效果
export const useGray = (isGray: boolean = false) => {
	// 获取页面中的<html>元素
	const html = document.querySelector('html') as HTMLHtmlElement;
	// 获取<html>元素的style属性
	const style = html.style;
	// 设置filter样式，根据isGray的值决定是否应用灰度效果
	// grayscale(1)表示完全灰度，grayscale(0)表示无灰度
	style.filter = `grayscale(${isGray ? 1 : 0})`;
};
