export default
  {
    path: '/components',
    meta: {
      title: '功能组件'
    },
    icon:'Guide',
    children: [{
        path: "/components/IconSelect",
        component: () => import('@/pages/components/IconSelect/index.vue'),
        meta: {
            title: "筛选图标"
        },
        icon: 'Shop',
    },{
      path: "/components/PanThumb",
      component: () => import('@/pages/components/PanThumb/index.vue'),
      meta: {
          title: "图片hover效果"
      },
      icon: 'Shop',
  }]
  }