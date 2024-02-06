export default {
  path: '/canvas',
  name: 'canvas',
  component: () => import('@/layouts/index.vue'),
  redirect: '/canvas/draw',
  meta: {
    requiresAuth: true,
    icon: 'icon-star',
    title: 'Canvas',
  },
  children: [
    {
      path: '/canvas/draw',
      name: 'canvas-draw',
      component: () => import('@/views/canvas/draw/index.vue'),
      meta: {
        title: '画板',
        icon: 'icon-drive-file',
      },
    },
  ],
}
