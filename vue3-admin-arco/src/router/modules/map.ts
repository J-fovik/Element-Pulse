export default {
  path: '/map',
  name: 'map',
  component: () => import('@/layouts/index.vue'),
  redirect: '/map/baidu',
  meta: {
    requiresAuth: true,
    icon: 'icon-layers',
    title: '地图',
  },
  children: [
    {
      path: '/map/baidu',
      name: 'map-baidu',
      component: () => import('@/views/map/baidu/index.vue'),
      meta: {
        title: '百度地图',
        icon: 'icon-dashboard',
      },
    },
    {
      path: '/map/amap',
      name: 'map-amap',
      component: () => import('@/views/map/amap/index.vue'),
      meta: {
        title: '高德地图',
        icon: 'icon-file',
      },
    },
  ],
}
