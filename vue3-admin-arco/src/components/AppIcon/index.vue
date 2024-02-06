<script lang="ts">
import { h, resolveDynamicComponent, type VNode } from 'vue'
// 定义 AppIcon 组件，接受一个 props 对象
function AppIcon(props: any) {
  // 使用 resolveDynamicComponent 动态解析组件类型
  const Component = resolveDynamicComponent(props.type)
  // 使用 h 函数创建 VNode，渲染动态解析的组件
  return h(Component as VNode)
}
// 导出 AppIcon 组件
export default AppIcon
</script>
