<script lang="ts" setup>
import Codemirror from 'codemirror-editor-vue3'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/theme/dracula.css'

const html = ref(`<script lang="ts" setup>
import Codemirror from 'codemirror-editor-vue3'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/theme/dracula.css'

const html = ref('')
const cmOptions = reactive({
  mode: 'text/javascript', // Language mode
  theme: 'dracula', // Theme
  lineNumbers: true, // Show line number
  smartIndent: true, // Smart indent
  indentUnit: 2, // The smart indent unit is 2 spaces in length
  foldGutter: true, // Code folding
  styleActiveLine: true, // Display the style of the selected row
})
<\/script>
<template>
  <div class="editor-container">
    <Codemirror v-model:value="html" :options="cmOptions" class="code-container" />
  </div>
</template>
<style lang="scss">
textarea {
  color: #000;
  resize: none;
}

.code-container {
  border: 1px solid #999;
  font-size: 17px;
  min-height: calc(100vh - 140px);
  line-height: 23px;
}
</style>`)
const cmOptions = reactive({
  mode: 'text/javascript', // Language mode
  theme: 'dracula', // Theme
  lineNumbers: true, // Show line number
  smartIndent: true, // Smart indent
  indentUnit: 2, // The smart indent unit is 2 spaces in length
  foldGutter: true, // Code folding
  styleActiveLine: true, // Display the style of the selected row
})
</script>
<template>
  <div class="editor-container">
    <Codemirror v-model:value="html" :options="cmOptions" class="code-container" />
  </div>
</template>
<style lang="scss">
textarea {
  color: #000;
  resize: none;
}

.code-container {
  border: 1px solid #999;
  font-size: 17px;
  min-height: calc(100vh - 140px);
  line-height: 23px;
}
</style>
