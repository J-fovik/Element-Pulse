<script lang="ts" setup>
import View from '@/components/View/index.vue'
import vueDanmaku from 'vue3-danmaku'
import { useDanmu, danmukuValueProps } from '@/hooks/web/useDanmuku'

// 创建0-50的数组
// const arr = [...new Array(50)].map((_, index) => String(index))
const arr = '春江潮水连海平,海上明月共潮生, 滟滟随波千万里,何处春江无月明, 江流宛转绕芳甸,月照花林皆似霰, 空里流霜不觉飞,汀上白沙看不见, 江天一色无纤尘,皎皎空中孤月轮, 江畔何人初见月,江月何年初照人, 人生代代无穷已,江月年年望相似, 不知江月待何人,但见长江送流水, 白云一片去悠悠,青枫浦上不胜愁, 谁家今夜扁舟子,何处相思明月楼, 可怜楼上月徘徊,应照离人妆镜台, 玉户帘中卷不去,捣衣砧上拂还来, 此时相望不相闻,愿逐月华流照君, 鸿雁长飞光不度,鱼龙潜跃水成文, 昨夜闲潭梦落花,可怜春半不还家, 江水流春去欲尽,江潭落月复西斜, 斜月沉沉藏海雾,碣石潇湘无限路, 不知乘月几人归,落月摇情满江树'.split(',')

const danmus = ref<Array<String>>(arr)
const danmakuRef = ref<any>(null)
const $danmuku = ref<danmukuValueProps>({} as any)

const config = reactive({
  autoplay: true, // 自动播放
  loop: true, // 是否循环
  speeds: 150, // 滑动速度
  top: 100, // 垂直间距
  right: 0, // 水平间距
})

$danmuku.value = useDanmu(danmakuRef, config)
</script>

<template>
  <View class="app-page">
    <div class="app-danmaku-title">
      <a-space>
        <a-button-group>
          <a-button status="success" @click="danmakuRef.play()">播放</a-button>
          <a-button status="warning" @click="danmakuRef.pause()">暂停</a-button>
          <a-button status="danger" @click="danmakuRef.stop()">清空</a-button>
          <a-button @click="$danmuku.speedUp(100)">加速&gt;&gt;</a-button>
          <a-button @click="$danmuku.speedDown(100)">减速&lt;&lt;</a-button>
          <a-button @click="$danmuku.gapUp(50)">间距拉长</a-button>
          <a-button @click="$danmuku.gapDown(50)">间距缩短</a-button>
        </a-button-group>
        <ul class="ml-5 flex">
          <li class="mr-5"> 速度: {{ config.speeds }} </li>
          <li class=""> 水平/垂直间距: {{ `(${config.right} , ${config.top})` }} </li>
        </ul>
      </a-space>
    </div>
    <div class="flex">
      <vue-danmaku ref="danmakuRef" :speeds="config.speeds" :top="config.top" :right="config.right" :autoplay="config.autoplay" :loop="config.loop" v-model:danmus="danmus" class="app-page__danmaku" />
    </div>
  </View>
</template>

<style lang="scss">
.app-page__danmaku {
  background: linear-gradient(45deg, #5ac381, #20568b);
  width: calc(100vw - 300px);
  height: calc(100vh - 210px);
}
.vue-danmaku .danmus {
  top: 50px !important;
}
</style>
