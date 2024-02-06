<script lang="ts" setup>
import { onMounted, onActivated, onDeactivated, onUnmounted } from 'vue'
import { useEditor } from '@/hooks/core/useEditor'
import Settings from './settings'
import { useScriptTag } from '@vueuse/core'

const props = defineProps({
  id: String,
  width: String,
  height: String,
  value: String,
  disabled: Boolean,
  debug: Boolean,
})
const emit = defineEmits(['onClick', 'update:content'])
const tinymceId = props.id || 'vue-tinymce-' + +new Date()
const { toolbar, plugins } = Settings
const BaseUrl = import.meta.env.VITE_BASE_URL as string
const SCRIPT_URL = BaseUrl + '/tinymce4.7.5/tinymce.min.js?&t=' + new Date().getTime()

const editor = useEditor({
  ...props,
  tinymceId,
  toolbar,
  plugins,
  BaseUrl,
  value: props.value,
  emit,
})
onMounted(async () => {
  const { load } = useScriptTag(SCRIPT_URL, () => {}, {
    manual: true,
  })
  await load()

  editor.initTinymce()
})

onActivated(() => {
  editor.initTinymce()
})

onDeactivated(() => {
  editor.destroyTinymce()
})

onUnmounted(() => {
  editor.destroyTinymce()
})
</script>
<template>
  <div class="tinymce-container editor-container">
    <textarea :id="tinymceId" class="tinymce-textarea"></textarea>
    <div class="editor-custom-btn-container">
      <!-- <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" /> -->
    </div>
  </div>
</template>
<style lang="scss">
.tinymce-container {
  position: relative;
  .mce-container-body {
    > .mce-edit-area {
      min-height: calc(100vh - 360px);
    }
  }
}
.tinymce-container ::v-deep(.mce-fullscreen) {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 10px;
  top: 2px;
  /*z-index: 2005;*/
}
.editor-upload-btn {
  display: inline-block;
}
</style>
