export default {
    path: '/link',
    name: 'layoutLinkView',
    component: () => import('/@/layout/routerView/link.vue'),
    meta: {
        title: 'message.router.layoutLinkView',
        isLink: 'https://element-plus.gitee.io/#/zh-CN/component/installation',
        isHide: false,
        isKeepAlive: false,
        isAffix: false,
        isIframe: false,
        roles: ['admin'],
        icon: 'iconfont icon-caozuo-wailian',
    },
}