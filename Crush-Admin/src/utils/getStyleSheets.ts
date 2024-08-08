/**
 * @name 获取样式表
 */

import * as svg from '@element-plus/icons-vue';

/**
 * @description 获取 iconfont(阿里) 字体图标
 * @returns {Promise}
 */
const getAlicdnIconfont = () => {
	return new Promise((resolve, reject) => {
		nextTick(() => {
			const styles: any = document.styleSheets;
			let sheetsList = [] as any;
			let sheetsIconList = [] as any;
			for (let i = 0; i < styles.length; i++) {
				if (styles[i].href && styles[i].href.indexOf('at.alicdn.com') > -1) {
					sheetsList.push(styles[i]);
				}
			}
			for (let i = 0; i < sheetsList.length; i++) {
				for (let j = 0; j < sheetsList[i].cssRules.length; j++) {
					if (
						sheetsList[i].cssRules[j].selectorText &&
						sheetsList[i].cssRules[j].selectorText.indexOf('.icon-') > -1
					) {
						sheetsIconList.push(
							`${sheetsList[i].cssRules[j].selectorText
								.substring(1, sheetsList[i].cssRules[j].selectorText.length)
								.replace(/\:\:before/gi, '')}`
						);
					}
				}
			}
			if (sheetsIconList.length > 0) resolve(sheetsIconList);
			else reject('未获取到值，请刷新重试');
		});
	});
};

/**
 * @description 获取 fontawesome 字体图标
 * @returns {Promise}
 */
const getAwesomeIconfont = () => {
	return new Promise((resolve, reject) => {
		nextTick(() => {
			const styles: any = document.styleSheets;
			let sheetsList = [] as any;
			let sheetsIconList = [] as any;
			for (let i = 0; i < styles.length; i++) {
				if (styles[i].href && styles[i].href.indexOf('netdna.bootstrapcdn.com') > -1) {
					sheetsList.push(styles[i]);
				}
			}
			for (let i = 0; i < sheetsList.length; i++) {
				for (let j = 0; j < sheetsList[i].cssRules.length; j++) {
					if (
						sheetsList[i].cssRules[j].selectorText &&
						sheetsList[i].cssRules[j].selectorText.indexOf('.fa-') === 0 &&
						sheetsList[i].cssRules[j].selectorText.indexOf(',') === -1
					) {
						if (/::before/.test(sheetsList[i].cssRules[j].selectorText)) {
							sheetsIconList.push(
								`${sheetsList[i].cssRules[j].selectorText
									.substring(1, sheetsList[i].cssRules[j].selectorText.length)
									.replace(/\:\:before/gi, '')}`
							);
						}
					}
				}
			}
			if (sheetsIconList.length > 0) resolve(sheetsIconList.reverse());
			else reject('未获取到值，请刷新重试');
		});
	});
};

/**
 * @description 获取 element 自带 svg 的图标
 * @returns {Promise}
 */
const getElementPlusIconfont = () => {
	return new Promise((resolve, reject) => {
		nextTick(() => {
			const icons = svg as any;
			const sheetsIconList = [] as any;
			for (const i in icons) {
				sheetsIconList.push(`${icons[i].name}`);
			}
			if (sheetsIconList.length > 0) resolve(sheetsIconList);
			else reject('未获取到值，请刷新重试');
		});
	});
};

/**
 * @description 获取字体图标 `document.styleSheets`
 * @method ali 获取 iconfont 字体图标 `<i class="iconfont 图标类名"></i>`
 * @method ali 获取 fontawesome 字体图标 `<i class="fa 图标类名"></i>`
 * @method ele 获取 element plus 自带图标 `<i class="图标类名"></i>`
 */
const initIconfont = {
	// iconfont
	ali: () => {
		return getAlicdnIconfont();
	},
	// fontawesome
	awe: () => {
		return getAwesomeIconfont();
	},
	// element plus
	ele: () => {
		return getElementPlusIconfont();
	},
};

// 导出方法
export default initIconfont;
