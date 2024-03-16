export default {
    path: "/css",
    meta: {
        title: "css动画"
    },
    icon: 'Coin',
    children: [{
        path: "/css/pulsation",
        component: () => import('@/pages/css/pulsation/index.vue'),
        meta: {
            title: "脉动星球"
        },
        icon: 'Odometer',
    }, {
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
        path: "/css/forms",
        component: () => import('@/pages/css/forms/index.vue'),
        meta: {
            title: "登陆表单"
        },
        icon: 'ChatLineSquare',
    }, {
        path: "/css/waveloading",
        component: () => import('@/pages/css/waveloading/index.vue'),
        meta: {
            title: "水波纹loading效果"
        },
        icon: 'DishDot',
    }, {
        path: "/css/cursors",
        component: () => import('@/pages/css/cursors/index.vue'),
        meta: {
            title: "鼠标图标"
        },
        icon: 'Odometer',
    }, {
        path: "/css/componentBoxs",
        component: () => import('@/pages/css/componentBoxs/index.vue'),
        meta: {
            title: "样式组件"
        },
        icon: 'More',
    },{
        path: "/css/generateRegularPolygon",
        component: () => import('@/pages/css/generateRegularPolygon/index.vue'),
        meta: {
            title: "生成多边形"
        },
        icon: 'Edit',
    },{
        path: "/css/codeBgWall",
        component: () => import('@/pages/css/codeBgWall/index.vue'),
        meta: {
            title: "代码墙"
        },
        icon: 'Film',
    },{
        path: "/css/flexContainer",
        component: () => import('@/pages/css/flexContainer/index.vue'),
        meta: {
            title: "弹性盒布局"
        },
        icon: 'Grid',
    }]
}
