<script lang="ts" setup>
import { useAppStore } from '@/store'
import item from './item.vue'

interface Porps {
  title: string
  options: any
}

const props = defineProps<Porps>()
const appStore = useAppStore()
// 处理设置的改变
const handleChange = async ({ key, value }: { key: string; value: string }) => {
  // 检查是否提供了值且 key 为 'colorWeek'
  if (value && key === 'colorWeek') {
    // 如果是 'colorWeek'，则给 body 元素添加 'app-color-week' 类，并设置 'arco-theme' 属性为 'dark'
    document.body.classList.add('app-color-week')
    document.body.setAttribute('arco-theme', 'dark')
  }
  // 检查是否未提供值且 key 为 'colorWeek'
  if (!value && key === 'colorWeek') {
    // 如果是 'colorWeek'，则移除 body 元素的 'app-color-week' 类，并移除 'arco-theme' 属性
    document.body.classList.remove('app-color-week')
    document.body.removeAttribute('arco-theme')
  }
  // 调用 appStore.updateSettings 方法，将新的设置更新到应用的状态中
  await appStore.updateSettings({ [key]: value })
  console.log(appStore.menu)
}
</script>
<template>
  <div class="app-settings-column">
    <h5 class="title">{{ props.title }}</h5>
    <a-space direction="vertical" fill>
      <div v-for="option in props.options" :key="option.name" class="switch-wrapper">
        <span>{{ option.name }}</span>
        <item :type="option.type || 'switch'" :name="option.key" :default-value="option.defaultVal"
          @input-change="handleChange" />
      </div>
    </a-space>
  </div>
</template>
<style lang="scss">
.title {
  margin: 10px 0;
  padding: 0;
  font-size: 16px;
}

.switch-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
}
</style>
