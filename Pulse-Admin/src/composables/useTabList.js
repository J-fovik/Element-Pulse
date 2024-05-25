import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies'
import  {router}  from '@/router';


export function useTabList() {
    const route = useRoute()
    const cookie = useCookies()
    // 初始赋值当前活跃路由
    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '后台首页',
            path: "/"
        },
    ])

    // 添加标签导航
    function addTab(tab) {
        // 传过来的对象的path是否和数组的path相等的
        let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
        // 如果为-1，没有的情况
        if (noTab) {
            // 将对象push进数组
            tabList.value.push(tab)
        }
        // 存储数组
        cookie.set("tabList", tabList.value)
    }

    // 初始化标签导航列表
    function initTabList() {
        let tbs = cookie.get("tabList")

        if (tbs) {
            // 初始赋值tab数组
            tabList.value = tbs
        }
    }
    // 初始化执行
    initTabList()
    // router的监听方法
    onBeforeRouteUpdate((to, from) => {
        // 改变当前活跃值
        activeTab.value = to.path
        // 调用添加方法，将点击的对象传入
        addTab({
            title: to.meta.title,
            path: to.path
        })
    })

    // 监听tab改变
    const changeTab = (t) => {
        // 赋值当前活跃并跳转路由
        activeTab.value = t
        router.push(t)
    }
    // 删除tab
    const removeTab = (t) => {
        // 获取tab数组
        let tabs = tabList.value
        // 获取当前活跃
        let a = activeTab.value
        // 如果点击的是点前活跃
        if (a == t) {
            tabs.forEach((tab, index) => {
                if (tab.path == t) {
                    // 如果删除的是当前活跃，拿到tab数组的下一个或者上一个
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        // 赋值当前活跃
                        a = nextTab.path
                    }
                }
            })
        }
        // 赋值当前活跃
        activeTab.value = a
        // 将数组过滤点击当前关闭
        tabList.value = tabList.value.filter(tab => tab.path != t)
        // 存储实时tab数组
        cookie.set("tabList", tabList.value)
    }
    // 关闭其他和全部关闭
    const handleClose = (c) => {
        if (c == "clearAll") {
            // 切换回首页
            activeTab.value = "/"
            // 过滤只剩下首页
            tabList.value = [{
                title: '后台首页',
                path: "/"
            }]
            router.push({path: "/"})
        } else if (c == "clearOther") {
            // 过滤只剩下首页和当前激活
            tabList.value = tabList.value.filter(tab => tab.path == "/" || tab.path == activeTab.value)
        }
        // 存储实时数组
        cookie.set("tabList", tabList.value)
    }

    return {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose
    }
}