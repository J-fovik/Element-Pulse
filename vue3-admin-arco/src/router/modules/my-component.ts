export default {
  path: '/my-component',
  name: 'my-component',
  component: () => import('@/layouts/index.vue'),
  redirect: '/my-component/tinymce',
  meta: {
    requiresAuth: true,
    icon: 'icon-apps',
    title: '组件',
  },
  children: [
    {
      path: '/my-component/tinymce',
      name: 'tinymce',
      component: () => import('@/views/my-component/tinymce/index.vue'),
      meta: {
        title: '富文本',
        icon: 'icon-dashboard',
      },
    },
    {
      path: '/my-component/markdown',
      name: 'markdown',
      component: () => import('@/views/my-component/markdown/index.vue'),
      meta: {
        title: 'Markdown',
        icon: 'icon-file',
      },
    },
    {
      path: '/my-component/codemirror',
      name: 'Codemirror',
      component: () => import('@/views/my-component/codemirror/index.vue'),
      meta: {
        title: 'Codemirror',
        icon: 'icon-file',
      },
    },
    {
      path: '/my-component/clipboard',
      name: 'Clipboard',
      component: () => import('@/views/my-component/clipboard/index.vue'),
      meta: {
        title: '剪切板',
        icon: 'icon-file',
      },
    },
    {
      path: '/my-component/my-icon',
      name: 'MyIcon',
      component: () => import('@/views/my-component/my-icon/index.vue'),
      meta: {
        title: '图标',
        icon: 'icon-file',
      },
    },
    {
      path: '/my-component/upload',
      name: 'MyUpload',
      component: () => import('@/views/my-component/upload/index.vue'),
      meta: {
        title: '上传图片',
        icon: 'icon-file',
      },
    },
  ],
}
