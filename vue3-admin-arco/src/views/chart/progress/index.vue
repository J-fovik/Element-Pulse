<script lang="ts" setup>
import View from '@/components/View/index.vue'
import ProgressBar from '@/components/ProgressBar/index.vue'

const count1 = ref(26.5)
const count2 = ref(30)
const count3 = ref(80)
const count4 = ref(100)
</script>
<template>
  <View class="app-page-progress">
    <a-card>
      <a-row>
        <a-col :span="12">
          <a-space direction="vertical" :size="20" class="flex">
            <div class="progress">
              <div class="flex">
                <span class="mr-5 font-bold">当前完成量</span>
                <ProgressBar class="flex-1" :label="`${count1} %`" title="当前完成量" :value="count1" />
              </div>
            </div>
            <div class="progress">
              <div class="flex">
                <span class="mr-5 font-bold">已经完成量</span>
                <ProgressBar class="flex-1" classes="success" title="已经完成量" :label="`${count2} %`" :value="count2" />
              </div>
            </div>
            <div class="progress">
              <ProgressBar classes="warning" title="剩余完成量" :label="`${count3} %`" :value="count3" />
            </div>
            <div class="progress">
              <ProgressBar classes="danger" title="超额完成量" :label="`${count4} %`" :value="count4" />
            </div>
          </a-space>
        </a-col>
      </a-row>
    </a-card>
  </View>
</template>
<style lang="scss"></style>
