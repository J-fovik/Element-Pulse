const Layout = () => import('@/layouts/index.vue')

export default {
  path: '/my-pages',
  name: 'my-pages',
  component: Layout,
  redirect: '/my-pages/table',
  meta: {
    requiresAuth: true,
    icon: 'icon-drive-file',
    title: '页面',
  },
  children: [
    {
      path: '/my-pages/print',
      name: 'print',
      component: () => import('@/views/my-pages/print/index.vue'),
      meta: {
        title: '打印',
        icon: 'icon-drive-file',
      },
    },
    {
      path: '/my-pages/pdf',
      name: 'pdf',
      component: () => import('@/views/my-pages/pdf/index.vue'),
      meta: {
        title: 'PDF预览',
        icon: 'icon-file-pdf',
      },
    },
    {
      path: '/my-pages/qa',
      name: 'qa',
      meta: {
        title: '反馈页面',
        icon: 'icon-close-circle',
      },
      redirect: '/my-pages/qa/success',
      component: () => import('@/views/basic/qa/index.vue'),
      children: [
        {
          path: '/my-pages/qa/success',
          name: 'page-qa-success',
          component: () => import('@/views/basic/qa/success/index.vue'),
          meta: {
            title: '操作成功',
            icon: 'icon-file',
          },
        },
        {
          path: '/my-pages/qa/fail',
          name: 'page-qa-fail',
          component: () => import('@/views/basic/qa/fail/index.vue'),
          meta: {
            title: '操作失败',
            icon: 'icon-file',
          },
        },
      ],
    },
    {
      path: '/my-pages/error',
      name: 'error',
      meta: {
        title: '错误页面',
        icon: 'icon-close-circle',
      },
      redirect: '/my-pages/error/404',
      component: () => import('@/views/my-pages/error/index.vue'),
      children: [
        {
          path: '/my-pages/error/404',
          name: '404',
          component: () => import('@/views/my-pages/error/404/index.vue'),
          meta: {
            title: '404',
            icon: 'icon-file',
          },
        },
        {
          path: '/my-pages/error/403',
          name: '403',
          component: () => import('@/views/my-pages/error/403/index.vue'),
          meta: {
            title: '403',
            icon: 'icon-file',
          },
        },
      ],
    },
    {
      path: '/my-pages/qrcode',
      name: 'qrcode',
      component: () => import('@/views/my-pages/qrcode/index.vue'),
      meta: {
        title: '二维码',
        icon: 'icon-qrcode',
      },
    },
    {
      path: '/my-pages/viewer',
      name: 'viewer',
      component: () => import('@/views/my-pages/viewer/index.vue'),
      meta: {
        title: '图片预览',
        icon: 'icon-image',
      },
    },
    {
      path: '/my-pages/music-player',
      name: 'music-player',
      component: () => import('@/views/my-pages/music-player/index.vue'),
      meta: {
        title: '音乐播放器',
        icon: 'icon-music',
      },
    },
    {
      path: '/my-pages/watermark',
      name: 'watermark',
      component: () => import('@/views/my-pages/watermark/index.vue'),
      meta: {
        title: '水印',
        icon: 'icon-mosaic',
      },
    },
    {
      path: '/my-pages/baberrage',
      name: 'baberrage',
      component: () => import('@/views/my-pages/baberrage/index.vue'),
      meta: {
        title: '弹幕',
        icon: 'icon-align-right',
      },
    },
  ],
}
