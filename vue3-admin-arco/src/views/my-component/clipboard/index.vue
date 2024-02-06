<script lang="ts" setup>
import View from '@/components/View/index.vue'
import Clipboard from '@/components/Clipboard/index.vue'
import axios from 'axios'
import { set } from '@vueuse/core'

const data1 = '仙佛茫茫两未成，只知独夜不平鸣。'
const data2 = '天若有情天亦老，人间正道是沧桑。'
const data3 = '侯门一入深如海，从此萧郎是路人。'

const content = ref()
const getPoem = () => {
  const url = 'https://v2.jinrishici.com/one.json?client=browser-sdk/1.2?t=' + new Date().getTime()
  axios.get(url).then((res) => {
    set(content, res.data.data.content)
  })
}

getPoem()
</script>
<template>
  <View title="剪切板">
    <a-card>
      <a-row :gutter="[24, 24]">
        <a-col :span="12">
          <div class="form-fields">
            <a-tooltip :content="data1">
              <span class="fields">{{ data1 }}</span>
            </a-tooltip>
            <span class="fields-clip">
              <Clipboard :text="data1" />
            </span>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-fields">
            <a-tooltip :content="data2">
              <span class="fields">{{ data2 }}</span>
            </a-tooltip>
            <span class="fields-clip">
              <Clipboard :text="data2" />
            </span>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="flex">
            <a-input class="relative" v-model="data3" placeholder="Please enter something" allow-clear />
            <Clipboard :text="data3" />
          </div>
        </a-col>
        <a-col :span="12">
          <div class="flex">
            <a-input class="relative" v-model="content" placeholder="Please enter something" allow-clear />
            <Clipboard :text="content" />
          </div>
        </a-col>
      </a-row>
    </a-card>
  </View>
</template>
<style lang="scss">
.form-fields {
  border: 1px solid #cdd4e2;
  border-radius: 10px;
  padding: 5px 5px 5px 10px;
  display: flex;
  align-items: center;
  .fields,
  .fields-clip {
    vertical-align: middle;
  }
  .fields {
    @include ellipsis(95%);
  }
}
</style>
