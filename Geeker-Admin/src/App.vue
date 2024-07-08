<template>
	<el-config-provider :locale="locale" :size="assemblySize" :button="buttonConfig">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup lang="ts" name="App">
import { useI18n } from 'vue-i18n';
import { getBrowserLang } from '@/utils';
import { useTheme } from '@/hooks';
import { ElConfigProvider } from 'element-plus';
import { LanguageType } from './stores/interface';
import { useGlobalStore } from '@/stores/modules/global';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const globalStore = useGlobalStore();

// 初始化设置主题
const { initTheme } = useTheme();
initTheme();

// 初始化设置语言
const i18n = useI18n();
onMounted(() => {
	const language = globalStore.language ?? getBrowserLang();
	i18n.locale.value = language;
	globalStore.setGlobalState('language', language as LanguageType);
});

// element language
const locale = computed(() => {
	if (globalStore.language == 'zh') return zhCn;
	if (globalStore.language == 'en') return en;
	return getBrowserLang() == 'zh' ? zhCn : en;
});

// element assemblySize
const assemblySize = computed(() => globalStore.assemblySize);

// element button config
const buttonConfig = reactive({ autoInsertSpace: false });
</script>
