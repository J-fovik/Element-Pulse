<template>
  <div class="fullHeihgt">
    <div style="display: flex; flex-direction: column; height: 100%">
      <a-card>
        <div class="center-data-item-wrapper">
          <CenterTitle />
        </div>
      </a-card>


      <a-table :data="dataList" :pagination="false" :bordered="false">
        <template #columns>
          <a-table-column data-index="projectName" :width="180" title="项目名" />
          <a-table-column title="版权">
            <template #cell="{ record }">
              <a-tag :color="record.isEmpower ? 'red' : ''">
                {{ record.isEmpower ? '付费授权' : '免费开源' }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="状态">
            <template #cell="{ record }">
              <a-tag :color="record.status === '持续更新' ? 'blue' : 'red'">
                {{ record.status }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="标签">
            <template #cell="{ record }">
              <a-tag v-for="tag of record.tags" color="arcoblue" :key="tag" style="margin-right: 10px">
                {{ tag }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column data-index="status" title="操作">
            <template #cell="{ record }">
              <a-button size="mini" type="primary" status="success" style="margin-right: 10px" @click="onPreview(record)">
                预览
              </a-button>
              <a-popover position="left">
                <template #content>
                  <div v-if="!record.isEmpower" style="text-align: center">
                    <img style="width: 150px" :src="WeiXin" />
                    <div> 关注公众号《知码前端》获取源码下载链接 </div>
                  </div>
                  <div v-else style="text-align: center">
                    <img style="width: 150px" :src="WeiXinCustom" />
                    <div> 咨询获取授权详情，请添加微信好友 </div>
                  </div>
                </template>
                <a-button size="mini" type="primary" status="warning"> 获取源码 </a-button>
              </a-popover>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>

  </div>
</template>

<script lang="ts" setup >
import { computed, ref, unref, watch } from 'vue'
import useAppConfigStore from '@/store/modules/app-config'
import CenterTitle from './components/CenterTitle.vue'
import WeiXin from '@/assets/qrcode.jpg'
import WeiXinCustom from '@/assets/custom_weixin.jpg'
const appStore = useAppConfigStore()

const enrollmentChannelsChart = ref()
const weekSalesChart = ref()
const hotProductChart = ref()
const fullYearSalesChart = ref()
const orderChart = ref()
const onResize = () => {
  setTimeout(() => {
    unref(enrollmentChannelsChart).updateChart()
    unref(weekSalesChart).updateChart()
    unref(hotProductChart).updateChart()
    unref(fullYearSalesChart).updateChart()
    unref(orderChart).updateChart()
  }, 500)
}
const collapse = computed(() => {
  return appStore.isCollapse
})
const dataList = [
  {
    key: '1',
    projectName: 'Admin Work Pro',
    tags: ['vue3', 'vite', 'naive-ui', 'typescript'],
    isEmpower: true,
    status: '持续更新',
    target: 'http://p.vueadminwork.com',
  },
  {
    key: '2',
    projectName: 'Arco Work',
    tags: ['vue3', 'vite', 'arco-design', 'typescript'],
    isEmpower: false,
    status: '持续更新',
    target: 'http://arco.vueadminwork.com',
  },
  {
    key: '3',
    projectName: 'Admin Work',
    tags: ['vue3', 'vite', 'naive-ui', 'typescript'],
    isEmpower: false,
    status: '持续更新',
    target: 'http://aw.vueadminwork.com',
  },
  {
    key: '4',
    projectName: 'Admin Work X',
    tags: ['vue3', 'vite/webpack', 'element-plus', 'typescript'],
    isEmpower: false,
    status: '持续更新',
    target: 'http://x.vueadminwork.com',
  },
  {
    key: '5',
    projectName: 'Admin Work A',
    tags: ['vue3', 'vite', 'ant-design', 'typescript'],
    isEmpower: false,
    status: '持续更新',
    target: 'http://a.vueadminwork.com',
  },
  {
    key: '6',
    projectName: 'Admin Work Basic',
    tags: ['vue2', 'webpack', 'element-ui', 'javascript'],
    isEmpower: false,
    status: '停止维护',
    target: 'http://qingqingxuan.gitee.io/arco-work',
  },
]
const onPreview = (item: any) => {
  window.open(item.target)
}
watch(collapse, () => {
  onResize()
})
</script>

<style lang="less" scoped>
:deep(.arco-card) {
  border-radius: 5px;
  border: none;
  box-shadow: 0px 8px 8px 0px rgba(162, 173, 200, 0.15);
}

:deep(.arco-card-body) {
  padding: 0;
  height: 100%;
}

.center-data-item-wrapper {
  display: flex;
  margin: 10px 0;

  .item {
    flex: 1;
  }
}
</style>
