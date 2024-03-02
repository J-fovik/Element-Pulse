export default 	{
    path: '/tools',
    name: 'tools',
    component: () => import('/@/views/tools/index.vue'),
    meta: {
        title: 'message.router.tools',
        isLink: '',
        isHide: false,
        isKeepAlive: true,
        isAffix: false,
        isIframe: false,
        roles: ['admin', 'common'],
        icon: 'iconfont icon-gongju',
    },
}