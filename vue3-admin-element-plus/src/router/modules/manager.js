export default {
    path: "/manager",
    meta: {
        title: "管理员"
    },
    icon: 'User',
    children: [{
        path: "/manager/list",
        component: () => import('@/pages/manager/list.vue'),
        meta: {
            title: "管理员列表"
        },
        icon: 'Compass',
    }
    ]
}
