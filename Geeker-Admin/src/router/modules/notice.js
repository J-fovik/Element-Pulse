export default {
    path: "/notice",
    meta: {
        title: "公告管理"
    },
    icon: 'TrendCharts',
    children: [{
        path: "/notice/list",
        component: () => import('@/pages/notice/list.vue'),
        meta: {
            title: "公告列表"
        },
        icon: 'Ticket',
    }
    ]
}
