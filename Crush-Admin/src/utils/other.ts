import * as svg from '@element-plus/icons-vue';
import type { App } from 'vue';
import dayjs from 'dayjs';
import router from '/@/router/index';
import pinia from '/@/stores/index';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { i18n } from '/@/i18n/index';
import { Local } from '/@/utils/storage';
import { verifyUrl } from '/@/utils/toolsValidate';
// 引入组件
const SvgIcon = defineAsyncComponent(() => import('/@/components/svgIcon/index.vue'));

/**
 * 导出全局注册 element plus svg 图标
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
export function elSvg(app: App) {
	const icons = svg as any;
	for (const i in icons) {
		app.component(`ele-${icons[i].name}`, icons[i]);
	}
	app.component('SvgIcon', SvgIcon);
}

/**
 * 设置浏览器标题国际化
 * @method const title = useTitle(); ==> title()
 */
export function useTitle() {
	const stores = useThemeConfig(pinia);
	const { themeConfig } = storeToRefs(stores);
	nextTick(() => {
		let webTitle = '';
		let globalTitle: string = themeConfig.value.globalTitle;
		const { path, meta } = router.currentRoute.value;
		if (path === '/login') {
			webTitle = <string>meta.title;
		} else {
			webTitle = setTagsViewNameI18n(router.currentRoute.value);
		}
		document.title = `${webTitle} - ${globalTitle}` || globalTitle;
	});
}

/**
 * 设置 自定义 tagsView 名称、 自定义 tagsView 名称国际化
 * @param params 路由 query、params 中的 tagsViewName
 * @returns 返回当前 tagsViewName 名称
 */
export function setTagsViewNameI18n(item: any) {
	let tagsViewName: string = '';
	const { query, params, meta } = item;
	// 修复tagsViewName匹配到其他含下列单词的路由
	const pattern = /^\{("(zh-cn|en|zh-tw)":"[^,]+",?){1,3}}$/;
	if (query?.tagsViewName || params?.tagsViewName) {
		if (pattern.test(query?.tagsViewName) || pattern.test(params?.tagsViewName)) {
			// 国际化
			const urlTagsParams =
				(query?.tagsViewName && JSON.parse(query?.tagsViewName)) || (params?.tagsViewName && JSON.parse(params?.tagsViewName));
			tagsViewName = urlTagsParams[i18n.global.locale.value];
		} else {
			// 非国际化
			tagsViewName = query?.tagsViewName || params?.tagsViewName;
		}
	} else {
		// 非自定义 tagsView 名称
		tagsViewName = i18n.global.t(meta.title);
	}
	return tagsViewName;
}

/**
 * 图片懒加载
 * @param el dom 目标元素
 * @param arr 列表数据
 * @description data-xxx 属性用于存储页面或应用程序的私有自定义数据
 */
export const lazyImg = (el: string, arr: EmptyArrayType) => {
	const io = new IntersectionObserver((res) => {
		res.forEach((v: any) => {
			if (v.isIntersecting) {
				const { img, key } = v.target.dataset;
				v.target.src = img;
				v.target.onload = () => {
					io.unobserve(v.target);
					arr[key]['loading'] = false;
				};
			}
		});
	});
	nextTick(() => {
		document.querySelectorAll(el).forEach((img) => io.observe(img));
	});
};

/**
 * 全局组件大小
 * @returns 返回 `window.localStorage` 中读取的缓存值 `globalComponentSize`
 */
export const globalComponentSize = (): string => {
	const stores = useThemeConfig(pinia);
	const { themeConfig } = storeToRefs(stores);
	return Local.get('themeConfig')?.globalComponentSize || themeConfig.value?.globalComponentSize;
};

/**
 * 判断是否是移动端
 */
export function isMobile() {
	if (
		navigator.userAgent.match(
			/('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i
		)
	) {
		return true;
	} else {
		return false;
	}
}

/**
 * 打开外部链接
 * @param val 当前点击项菜单
 */
export function handleOpenLink(val: RouteItem) {
	const { origin, pathname } = window.location;
	router.push(val.path);
	if (verifyUrl(<string>val.meta?.isLink)) window.open(val.meta?.isLink);
	else window.open(`${origin}${pathname}#${val.meta?.isLink}`);
}
// 获取验证码
export function getCode(time: any) {
	let setInter: any = null,
		codeText = '';
	setInter = setInterval(() => {
		if (time < 1) {
			clearInterval(setInter);
			codeText = '获取验证码';
		} else {
			codeText = `已发送${time}s`;
			time--;
		}
	}, 1000);
}

// 检测数据是否为空数据
export const isEmpty = (data: unknown) => {
	if (data === '' || data === 'undefined' || data === undefined || data === null || data === 'null') {
		return true;
	}
	if (JSON.stringify(data) == '{}' || JSON.stringify(data) == '[]' || JSON.stringify(data) == '[{}]') {
		return true;
	}
	return false;
};
// 驼峰
export const toHump = (str: string): string => {
	if (!str) return str;
	return str.replace(/\_(\w)/g, function (all, letter) {
		// 将中划线后面的第一个字母大写
		return letter.toUpperCase();
	});
};
/**
 * 去除字符串的元素标记
 * @param Fragment 为标签内容<div>111</div>
 */
export const removeFragmentTag = (Fragment: any) => {
	return new DOMParser().parseFromString(Fragment, 'text/html').body.textContent || '';
};

// 解析身份证信息
export const resolveIdNumberInfo = (idCard: string) => {
	const birthday = dayjs(idCard.substring(6, 14)).format('YYYY-MM-DD');
	const gender = (idCard.substring(16, 17) as any) % 2 === 0 ? '0' : '1';
	return { birthday, gender };
};
// 自定义customRef实现防抖
export const debounceCustomRef = (value: any, duration = 1000) => {
	let timer: any;
	return customRef((track, trigger) => {
		return {
			get() {
				track();
				return value;
			},
			set(val) {
				clearTimeout(timer);
				timer = setTimeout(() => {
					trigger();
					value = val;
				}, duration);
			},
		};
	});
};
// 检查浏览器类型
export const detectBrowser = () => {
	const { userAgent } = navigator;
	if (userAgent.indexOf('Chrome') > -1) {
		return 'Chrome';
	} else if (userAgent.indexOf('Safari') > -1) {
		return 'Safari';
	} else if (userAgent.indexOf('Firefox') > -1) {
		return 'Firefox';
	} else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
		return 'IE';
	}
	return 'Unknown';
};
// 计算元素到文档顶部的距离
export function getElementOffsetTop(element: any) {
	let offsetTop = 0;
	while (element) {
		offsetTop += element.offsetTop;
		element = element.offsetParent;
	}
	return offsetTop;
}
/**
 * 统一批量导出
 * @method elSvg 导出全局注册 element plus svg 图标
 * @method useTitle 设置浏览器标题国际化
 * @method setTagsViewNameI18n 设置 自定义 tagsView 名称、 自定义 tagsView 名称国际化
 * @method lazyImg 图片懒加载
 * @method globalComponentSize() element plus 全局组件大小
 * @method isMobile 判断是否是移动端
 * @method handleOpenLink 打开外部链接
 */
const other = {
	elSvg: (app: App) => {
		elSvg(app);
	},
	useTitle: () => {
		useTitle();
	},
	setTagsViewNameI18n(route: RouteToFrom) {
		return setTagsViewNameI18n(route);
	},
	lazyImg: (el: string, arr: EmptyArrayType) => {
		lazyImg(el, arr);
	},
	globalComponentSize: () => {
		return globalComponentSize();
	},
	isMobile: () => {
		return isMobile();
	},
	handleOpenLink: (val: RouteItem) => {
		handleOpenLink(val);
	},
	getCode: (time: any) => {
		getCode(time);
	},
};

// 统一批量导出
export default other;
