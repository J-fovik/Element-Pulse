import { ElNotification, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'
// 消息提示
export function toast(message, type = "success", dangerouslyUseHTMLString = false) {
  ElNotification({
    message,// 提示内容
    type,// 类型
    dangerouslyUseHTMLString,//是否将 message 属性作为 HTML 片段处理
    duration: 3000// 时长
  })
}

// 显示全屏loading
export function showFullLoading() {
  nprogress.start()
}

// 隐藏全屏loading
export function hideFullLoading() {
  nprogress.done()
}
// 模态框提示
export function showModal(content = "提示内容", type = "warning", title = "") {
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type,
    }
  )
}
