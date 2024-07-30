export default {
    path: '/iframes',
    name: 'layoutIframeView',
    component: () => import('/@/layout/routerView/iframes.vue'),
    meta: {
        title: 'message.router.layoutIframeView',
        isLink: 'https://element-plus.gitee.io/zh-CN/',
        isHide: false,
        isKeepAlive: true,
        isAffix: false,
        isIframe: true,
        roles: ['admin'],
        icon: 'iconfont icon-neiqianshujuchucun',
    },
}