import { HomePath } from '@/config/constants' // 首页路径
import { useStorage } from '@/hooks/core/useStorage'
import { isPlainObject } from 'lodash'
import { defineStore } from 'pinia'
import type { TagState } from './types'
// 定义类型
export interface ITag {
  path: string
  title: string
}
// 默认固定的tags
const fixed = { title: '公告板', path: HomePath }
const { localSet, localGet } = useStorage()
// 定义tag仓库
const useTagStore = defineStore('tag', {
  state: (): TagState => {
    const opened: any = localGet({ path: 'tags.opened' })
    return {
      // isPlainObject用于检查给定的值是否是一个纯对象
      tagList: isPlainObject(opened) ? [fixed] : [...opened],
    }
  },
  getters: {
    tagInfo(state: TagState): TagState {
      return { ...state }
    },
  },

  actions: {
    // Reset tag information
    resetTag() {
      this.$reset()
    },
    // tag数组
    save(value: any) {
      localSet({ path: 'tags.opened', value })
    },
    // 当前活跃的tag对象
    addTag(tag: any) {
      const hasTag = this.tagList.some((item: any) => item.path === tag.path)
      // 点击的tag对象存在则添加到tagList数组中
      const newTag = hasTag ? this.tagList : [...this.tagList, tag]
      this.tagList = newTag
      // 保存tag数组
      this.save(newTag)
    },
    // 删除当前tag对象
    deleteTag(tag: any) {
      // 过滤点击的当前对象
      const newTag = [...this.tagList.filter((item: any) => item !== tag)]
      this.tagList = newTag
      // 保存tag数组
      this.save(newTag)
    },
    // 关闭全部
    emptyTag() {
      // 过滤路径为首页的队形
      const newTag = [...this.tagList.filter((item: any) => item.path === HomePath)]
      this.tagList = newTag
      // 保存tag数组
      this.save(newTag)
    },

    // 关闭左侧tag
    closeLeftTags(path: string, index: number) {
      // 如果未提供索引，则通过路径查找当前标签的索引
      const curIndex = index ?? this.tagList.findIndex((item: any) => item.path === path)
      // 使用过滤函数创建一个新的标签数组，仅包含当前标签及其左侧的标签
      const newTag = this.tagList.filter((item: any, i: number) => i >= curIndex)
      this.tagList = newTag
      // 保存tagList
      this.save(newTag)
    },
    // 关闭右侧tag
    closeRightTags(path: string, index: number) {
      // 如果未提供索引，则通过路径查找当前标签的索引
      const curIndex = index ?? this.tagList.findIndex((item: any) => item.path === path)
      // 使用过滤函数创建一个新的标签数组，仅包含当前标签及其右侧的标签
      const newTag = this.tagList.filter((item: any, i: number) => i <= curIndex)
      this.tagList = newTag
      // 保存tagList
      this.save(newTag)
    },
    // 关闭其他tag
    closeOtherTag(action: any) {
      // 过滤传过来的路径以及首页路径
      const newTag = [...this.tagList.filter((item: any) => item.path === HomePath || item === action.tag)]
      this.tagList = newTag
      // 保存list
      this.save(newTag)
    },
  },
})

export default useTagStore
