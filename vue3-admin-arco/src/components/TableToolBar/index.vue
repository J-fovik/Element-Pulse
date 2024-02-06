<script lang="ts" setup name="TableToolBar">
import { set } from '@vueuse/core'

export interface ToolBarProps {
  showSearch: boolean
  columns?: any
}

const props = withDefaults(defineProps<ToolBarProps>(), {
  showSearch: true,
  columns: [],
})

// 是否显示弹出层
const open = ref(false)
const emit = defineEmits(['update:showSearch', 'query-table'])
const show = () => emit('update:showSearch', !props.showSearch)
// 搜索
const toggleSearch = () => {
  show()
}
// 刷新
const refresh = () => {
  emit('query-table')
}
// 打开显隐列dialog
const showColumn = () => {
  set(open, true)
}
</script>
<template>
  <div class="app-table-action-button">
    <a-space :size="15">
      <a-tooltip class="item" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
        <a-button shape="circle" @click="toggleSearch()">
          <template #icon>
            <icon-search />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip class="item" content="刷新" placement="top">
        <a-button shape="circle" @click="refresh()">
          <template #icon>
            <icon-refresh />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip class="item" content="显隐列" placement="top" v-if="columns">
        <a-button shape="circle" @click="showColumn()">
          <template #icon>
            <icon-list />
          </template>
        </a-button>
      </a-tooltip>
    </a-space>
  </div>
</template>
<style lang="scss"></style>
