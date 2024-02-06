<script setup lang="ts">
import View from '@/components/View/index.vue'
import OrderList from './order-list.vue'

const data = [
  {
    label: '创建人',
    value: '管理员',
  },
  {
    label: 'QQ 群',
    value: 'Vue前端群 631586939',
  },
  {
    label: '联系方式',
    value: 'jikeytang@163.com',
  },
  {
    label: '更新时间',
    value: '2022-01-28 12:43:06',
  },
  {
    label: '地址',
    value: 'Yingdu Building, Zhichun Road, Beijing',
  },
  {
    label: '签名',
    value: '冗长的黑暗中，你是我唯一的光',
  },
]
</script>
<template>
  <a-space direction="vertical" :size="15">
    <View style="min-height: 150px" class="app-dashboard relative">
      <a class="app-gitee" target="_blank" href="https://gitee.com/iyuei">
        <img src="/src/assets/images/iyuei.svg" alt="Fork me on Gitee" />
      </a>
      <a-descriptions :data="data" title="项目信息" />
    </View>
    <View title="订单信息" style="min-height: calc(100vh - 320px)" class="app-dashboard">
      <order-list />
    </View>
  </a-space>
</template>
<style lang="scss">
.app-gitee {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 555;
}
</style>
