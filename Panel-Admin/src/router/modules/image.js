export default {
    path: "/image",
    meta: {
        title: "图库管理"
    },
    icon: 'Picture',
    children: [{
        path: "/image/list",
        component: () => import('@/pages/image/list.vue'),
        meta: {
            title: "图库列表"
        },
        icon: 'Monitor',
    }]
}
