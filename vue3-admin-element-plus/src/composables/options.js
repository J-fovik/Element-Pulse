// 
export const MENUS = [
    {
        desc: "index",
        frontpath: '/',
        icon: "home-filled",
        name: "主控台",
        child: [

        ]
    },
    {
        desc: "basic",
        frontpath: null,
        icon: "help",
        name: "基础",
        child: [
            {
                desc: "basic",
                frontpath: "/basic/doc",
                icon: "help",
                name: "文档",
                child: []
            },
        ]
    }, 
    {
        desc: "setting",
        frontpath: null,
        icon: "help",
        name: "配置",
        child: [
            {
                desc: "setting",
                frontpath: "/setting/base",
                icon: "help",
                name: "你好",
                child: []
            },
        ]
    }
]