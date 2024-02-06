<script lang="ts" setup>
import { Notification } from '@arco-design/web-vue'

// 接收父组件参数，并设置默认值
interface ClipboardProps {
  text: string
}
const props = withDefaults(defineProps<ClipboardProps>(), {
  text: '',
})

const onSuccess = () => {
  Notification.success('复制成功！')
}

const onError = () => {
  Notification.success('复制失败！')
}
</script>
<template>
  <a-tooltip content="点击复制">
    <a-button v-clipboard:copy="props.text" v-clipboard:success="onSuccess" v-clipboard:error="onError">
      <template #icon>
        <icon-copy />
      </template>
    </a-button>
  </a-tooltip>
</template>
<style lang="scss"></style>
