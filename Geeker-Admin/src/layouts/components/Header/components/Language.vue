<template>
  <!-- 语言设置 -->
  <el-dropdown trigger="click" @command="changeLanguage">
    <i :class="'iconfont icon-zhongyingwen'" class="toolBar-icon"></i>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languageList"
          :key="item.value"
          :command="item.value"
          :disabled="language === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useGlobalStore } from "@/stores/modules/global";
import { LanguageType } from "@/stores/interface";

const i18n = useI18n();
const globalStore = useGlobalStore();
const language = computed(() => globalStore.language);
// 语言列表
const languageList = [
  { label: "简体中文", value: "zh" },
  { label: "English", value: "en" }
];
// 改变语言
const changeLanguage = (lang: string) => {
  i18n.locale.value = lang;
  globalStore.setGlobalState("language", lang as LanguageType);
};
</script>
