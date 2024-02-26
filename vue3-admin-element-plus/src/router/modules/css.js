export default {
    path: "/css",
    meta: {
        title: "css动画"
    },
    icon: 'Coin',
    children: [{
        path: "/css/jumpBlock",
        component: () => import('@/pages/css/jumpBlock/index.vue'),
        meta: {
            title: "能跳动的icon"
        },
        icon: 'IceCream',
    }, {
        path: "/css/shootingStar",
        component: () => import('@/pages/css/shootingStar/index.vue'),
        meta: {
            title: "流星雨"
        },
        icon: 'Star',
    },
    {
        path: "/css/downBtn",
        component: () => import('@/pages/css/downBtn/index.vue'),
        meta: {
            title: "奇怪的下载按钮"
        },
        icon: 'Download',
    }, {
        path: "/css/filpCard",
        component: () => import('@/pages/css/filpCard/index.vue'),
        meta: {
            title: "翻卡片动画"
        },
        icon: 'DocumentCopy',
    }, {
        path: "/css/hoverBorderBtn",
        component: () => import('@/pages/css/hoverBorderBtn/index.vue'),
        meta: {
            title: "悬停按钮效果"
        },
        icon: 'Film',
    }, {
        path: "/css/hoverSlideMenu",
        component: () => import('@/pages/css/hoverSlideMenu/index.vue'),
        meta: {
            title: "菜单扫描效果"
        },
        icon: 'Menu',
    }, {
        path: "/css/hoverFillText",
        component: () => import('@/pages/css/hoverFillText/index.vue'),
        meta: {
            title: "菜单填充效果"
        },
        icon: 'Flag',
    }, {
        path: "/css/hoverShiningBtn",
        component: () => import('@/pages/css/hoverShiningBtn/index.vue'),
        meta: {
            title: "会发光的按钮"
        },
        icon: 'Operation',
    }, {
        path: "/css/slidePic",
        component: () => import('@/pages/css/slidePic/index.vue'),
        meta: {
            title: "图片无缝滚动切换"
        },
        icon: 'Basketball',
    }, {
        path: "/css/waveloading",
        component: () => import('@/pages/css/waveloading/index.vue'),
        meta: {
            title: "水波纹loading效果"
        },
        icon: 'DishDot',
    }
    ]
}
