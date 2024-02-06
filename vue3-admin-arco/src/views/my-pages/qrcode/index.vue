<script lang="ts" setup>
import View from '@/components/View/index.vue'
import { downLoadQRcode } from '@/utils'
import QrcodeVue from 'qrcode.vue'

const local = ref(location.href)
const size = 150

const state = reactive({
  url: 'http://www.baidu.com',
  qrUrl: 'http://www.baidu.com',
})

const onCreate = () => {
  state.qrUrl = state.url
}
const onDownload = (id: string) => {
  downLoadQRcode(id)
}
</script>
<template>
  <View class="app-page">
    <ol class="app-order-list px-3">
      <li>
        <h3>
          <a-space :size="15">
            <span>当前页面 url</span>
          </a-space>
        </h3>
        <div class="mb-5">
          <a-space :size="15">
            <a-input v-model="local" :style="{ width: '450px' }" class="mr-2" disabled />
            <a-button type="primary" status="success" @click="onDownload('js-qrcode-1')">下载</a-button>
          </a-space>
        </div>
        <qrcode-vue id="js-qrcode-1" :value="local" :size="size" level="H" />
      </li>
      <li>
        <h3>
          <a-space :size="15">
            <span>根据输入 url 生成</span>
          </a-space>
        </h3>
        <div class="mb-5">
          <a-space :size="15">
            <a-input v-model="state.url" :style="{ width: '450px' }" class="mr-2" allow-clear />
            <a-button type="primary" @click="onCreate">生成</a-button>
            <a-button type="primary" status="success" @click="onDownload('js-qrcode-2')">下载</a-button>
          </a-space>
        </div>
        <qrcode-vue id="js-qrcode-2" :value="state.qrUrl" :size="size" level="H" />
      </li>
    </ol>
  </View>
</template>
<style lang="scss"></style>
