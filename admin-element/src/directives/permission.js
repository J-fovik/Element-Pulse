import store from "@/store"
function hasPermission(value, el = false) {
    if (!Array.isArray(value)) {
        throw new Error(`需要配置权限，例如 v-permission="['getStatistics3,GET']"`)
    }
    // 存在
    const hasAuth = value.findIndex(v => store.state.ruleNames.includes(v)) != -1
    // 有节点并且不存在
    if (el && !hasAuth) {
        // 移出节点
        el.parentNode && el.parentNode.removeChild(el)
    }
    return hasAuth
}

export default {
    install(app) {
        // 自定义permission指令，v-permission
        app.directive("permission", {
            mounted(el, binding) {
                // 调用函数
                hasPermission(binding.value, el)
            }
        })
    }
}