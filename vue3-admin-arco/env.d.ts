// / <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  tinymce: any
  BMap: any
  BMap_ANCHOR_BOTTOM_LEFT: any
  BMap_ANCHOR_BOTTOM_RIGHT: any
  BMap_ANIMATION_BOUNCE: any
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 打印
declare module 'vue3-print-nb'
// pdf预览
declare module 'vue3-pdfjs/esm'
// 水印
declare module 'watermark-plus'
declare module 'xgplayer/dist/controls/play'
declare module 'xgplayer/dist/controls/fullscreen'
declare module 'xgplayer/dist/controls/progress'
declare module 'xgplayer/dist/controls/volume'
declare module 'xgplayer/dist/controls/pip'
declare module 'xgplayer/dist/controls/flex'
