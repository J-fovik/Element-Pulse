/**
 * @name 设置字体图标
 */

// 第三方字体图标 css 路径数组
const cssCdnUrlList: Array<string> = [
	'//at.alicdn.com/t/c/font_4647130_8ge5t73drp.css',
	'//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
];

// 第三方字体图标 js 路径数组
const jsCdnUrlList: Array<string> = [];

/**
 * @description 动态批量设置字体图标
 */
export function setCssCdn() {
	if (cssCdnUrlList.length <= 0) return false;
	cssCdnUrlList.map((v) => {
		let link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = v;
		link.crossOrigin = 'anonymous';
		document.getElementsByTagName('head')[0].appendChild(link);
	});
}

/**
 * @description 动态批量设置第三方js
 */
export function setJsCdn() {
	if (jsCdnUrlList.length <= 0) return false;
	jsCdnUrlList.map((v) => {
		let link = document.createElement('script');
		link.src = v;
		document.body.appendChild(link);
	});
}

/**
 * 批量设置字体图标、动态js
 * @method cssCdn 动态批量设置字体图标
 * @method jsCdn 动态批量设置第三方js
 */
const setIntroduction = {
	// 设置css
	cssCdn: () => {
		setCssCdn();
	},
	// 设置js
	jsCdn: () => {
		setJsCdn();
	},
};

// 导出函数方法
export default setIntroduction;
