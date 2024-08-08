import { createI18n } from 'vue-i18n';
import { getBrowserLang } from '@/utils/other';

import zh from './modules/zh';
import en from './modules/en';

const i18n = createI18n({
	// 使用组合API，设置为false
	allowComposition: true,
	legacy: false,
	locale: getBrowserLang(), // 获取浏览器默认语言
	messages: {
		zh,
		en,
	},
});

export default i18n;
