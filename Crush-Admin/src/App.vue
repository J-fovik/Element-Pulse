<template>
	<el-config-provider :locale="locale" :size="assemblySize" :button="buttonConfig">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup lang="ts" name="App">
import { useI18n } from 'vue-i18n';
import { ElConfigProvider } from 'element-plus';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
// 引入初始化语言方法
import { getBrowserLang } from '@/utils/other';
// 引入自定义图标方法
import setIntroduction from '@/utils/setIconfont';
import { useTheme } from '@/hooks';
import { LanguageType } from './stores/interface';
import { useGlobalStore } from '@/stores/modules/global';

const globalStore = useGlobalStore();

// 初始化设置主题
const { initTheme } = useTheme();
initTheme();

// 初始化设置语言
const i18n = useI18n();

// 设置初始化，防止刷新时恢复默认
onBeforeMount(() => {
	// 设置批量第三方 icon 图标
	setIntroduction.cssCdn();
	// 设置批量第三方 js
	setIntroduction.jsCdn();
});
onMounted(() => {
	const language = globalStore.language ?? getBrowserLang();
	i18n.locale.value = language;
	globalStore.setGlobalState('language', language as LanguageType);
});

// element 语言
const locale = computed(() => {
	if (globalStore.language == 'zh') return zhCn;
	if (globalStore.language == 'en') return en;
	return getBrowserLang() == 'zh' ? zhCn : en;
});

// element 组装尺寸
const assemblySize = computed(() => globalStore.assemblySize);

// element 按钮配置
const buttonConfig = reactive({ autoInsertSpace: false });
</script>
