<script lang="ts" setup>
import { useTagStore } from '@/store'
import { computed, ref, watch } from 'vue'
import { HomePath } from '@/config/constants'
import type { ITag } from '@/store/modules/tag'
import { useRoute, useRouter } from 'vue-router'
import { set } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const tagStore = useTagStore()
// 获取tagList数组
const tagList: any = computed(() => tagStore.tagList)
// 当前路由的路径
const pathname = ref(router.currentRoute.value.path)
// 计算 tag 的样式类
const tagListCls = (tag: ITag) => [{ 'tag-active': pathname.value === tag.path }, { 'tag-home': HomePath === tag.path }]
// 判断标签是否可关闭
const closable = (tag: ITag) => tag.path !== HomePath
// 监听路由变化，更新当前路由的路径
watch(
  () => route.path,
  (val: any) => {
    set(pathname, val)
  },
  {
    immediate: true,
    deep: true,
  }
)
// 处理标签点击事件
const handleClick = (path: string) => {
  router.push(path)
}
// 处理关闭标签
const toRid = (tag: ITag) => {
  const { path } = tag // 获取标签的路径
  let to = HomePath // 初始化跳转的目标路径为主页路径
  if (path === pathname.value) { // 判断要关闭的标签是否是当前激活的标签
    // 处理关闭当前标签
    tagList.value.some((item: any, index: number) => {
      if (item.path === path) {
        // 如果要关闭的标签是当前激活的标签，计算下一个要激活的标签的路径
        to = index < tagList.value.length - 1 ? tagList.value[index + 1]?.path : tagList.value[index - 1]?.path
        return true // 终止循环
      }
      return false
    })
    router.push(to) // 使用路由器进行页面跳转
  }
}
// 处理标签关闭事件
const onClose = (tag: ITag) => {
  toRid(tag)
  // 删除该tag
  tagStore.deleteTag(tag)
}
// 处理右键菜单事件
const onContextMenu = (val: string, tag: any, index: number) => {
  console.log(val, tag, index)
  switch (val) {
    case '1':
      tagStore.closeRightTags(tag.path, index) // 关闭右侧
      break
    case '2':
      tagStore.closeOtherTag({ tag }) // 关闭其它
      break
    case '3':
      tagStore.emptyTag() // 关闭全部
      break
    default:
      console.log('default')
  }
}
</script>
<template>
  <ul class="tags-wrap">
    <li v-for="(tag, index) in tagList" :key="tag.path" :class="tagListCls(tag)">
      <a-dropdown class="app-tags-contextmenu" trigger="contextMenu" :style="{ display: 'block' }" @select="(v: any) => onContextMenu(v, tag, index)">
        <a-tag :closable="closable(tag)" @close="onClose(tag)" @click="handleClick(tag)">
          <template v-if="tag.path === HomePath"><icon-home /></template>
          <template v-else>{{ tag.title }}</template>
        </a-tag>
        <template #content>
          <a-doption value="1">关闭右侧</a-doption>
          <a-doption value="2">关闭其它</a-doption>
          <a-doption value="3">关闭全部</a-doption>
        </template>
      </a-dropdown>
    </li>
  </ul>
</template>
<style lang="scss"></style>
