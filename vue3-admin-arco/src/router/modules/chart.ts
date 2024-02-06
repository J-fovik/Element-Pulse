export default {
  path: '/chart',
  name: 'chart',
  component: () => import('@/layouts/index.vue'),
  redirect: '/chart/line',
  meta: {
    requiresAuth: true,
    icon: 'icon-bar-chart',
    title: '图表',
  },
  children: [
    {
      path: '/chart/line',
      name: 'chart-line',
      component: () => import('@/views/chart/line/index.vue'),
      meta: {
        title: '折线图',
        icon: 'icon-drive-file',
      },
    },
    {
      path: '/chart/pie',
      name: 'chart-pie',
      component: () => import('@/views/chart/pie/index.vue'),
      meta: {
        title: '饼图',
        icon: 'icon-compass',
      },
    },
    {
      path: '/chart/bar',
      name: 'chart-bar',
      component: () => import('@/views/chart/bar/index.vue'),
      meta: {
        title: '柱状图',
        icon: 'icon-bar-chart',
      },
    },
    {
      path: '/chart/horizontal-bar',
      name: 'chart-horizontal-bar',
      component: () => import('@/views/chart/horizontal-bar/index.vue'),
      meta: {
        title: '水平柱状图',
        icon: 'icon-bar-chart',
      },
    },
    {
      path: '/chart/progress',
      name: 'chart-progress',
      component: () => import('@/views/chart/progress/index.vue'),
      meta: {
        title: '进度条',
        icon: 'icon-sort',
      },
    },
    {
      path: '/chart/map',
      name: 'chart-map',
      component: () => import('@/views/chart/map/index.vue'),
      meta: {
        title: '地图下钻',
        icon: 'icon-location',
      },
    },
  ],
}
