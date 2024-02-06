export default {
  path: '/table',
  name: 'table',
  component: () => import('@/layouts/index.vue'),
  redirect: '/table/list',
  meta: {
    requiresAuth: true,
    icon: 'icon-nav',
    title: '表格',
  },
  children: [
    {
      path: '/table/list',
      name: 'table',
      component: () => import('@/views/table/list/index.vue'),
      meta: {
        title: '查询表格',
        icon: 'icon-dashboard',
      },
    },
    {
      path: '/table/standard',
      name: 'standard',
      component: () => import('@/views/table/standard/index.vue'),
      meta: {
        title: '标准表格',
        icon: 'icon-file',
      },
    },
  ],
}
