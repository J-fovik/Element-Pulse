export default {
  path: '/video',
  name: 'video',
  component: () => import('@/layouts/index.vue'),
  redirect: '/video/xgplayer',
  meta: {
    requiresAuth: true,
    icon: 'icon-file-video',
    title: '视频',
  },
  children: [
    {
      path: '/video/xgplayer',
      name: 'video-xgplayer',
      component: () => import('@/views/video/xgplayer/index.vue'),
      meta: {
        title: '西瓜视频',
        icon: 'icon-file-video',
      },
    },
    {
      path: '/video/videojs',
      name: 'videojs',
      component: () => import('@/views/video/videojs/index.vue'),
      meta: {
        title: 'Videojs',
        icon: 'icon-video-camera',
      },
    },
  ],
}
