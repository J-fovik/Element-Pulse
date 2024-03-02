export default {
    path: '/system',
    name: 'system',
    component: () => import('/@/layout/routerView/parent.vue'),
    redirect: '/system/menu',
    meta: {
        title: 'message.router.system',
        isLink: '',
        isHide: false,
        isKeepAlive: true,
        isAffix: false,
        isIframe: false,
        roles: ['admin'],
        icon: 'iconfont icon-xitongshezhi',
    },
    children: [
        {
            path: '/system/menu',
            name: 'systemMenu',
            component: () => import('/@/views/system/menu/index.vue'),
            meta: {
                title: 'message.router.systemMenu',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                isAffix: false,
                isIframe: false,
                roles: ['admin'],
                icon: 'iconfont icon-caidan',
            },
        },

        {
            path: '/system/user',
            name: 'systemUser',
            component: () => import('/@/views/system/user/index.vue'),
            meta: {
                title: 'message.router.systemUser',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                isAffix: false,
                isIframe: false,
                roles: ['admin'],
                icon: 'iconfont icon-icon-',
            },
        },
    ],
}