import { ElNotification, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'


// 显示全屏loading
export function showFullLoading() {
  nprogress.start()
}

// 隐藏全屏loading
export function hideFullLoading() {
  nprogress.done()
}
// 消息提示
export function toast(message, type = "success", dangerouslyUseHTMLString = false) {
  ElNotification({
    message,// 提示内容
    type,// 类型
    dangerouslyUseHTMLString,//是否将 message 属性作为 HTML 片段处理
    duration: 3000// 时长
  })
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
// 弹出输入框
export function showPrompt(tip,value = ""){
  return ElMessageBox.prompt(tip, '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue:value
  })
}
// 将query对象转成url参数
export function queryParams(query){
  let q = []
  // 遍历传过来的query参数
  for (const key in query) {
      // 如果有key，以键值对的形式push到q里
      if(query[key]){
          // encodeURIComponent保证有值
          q.push(`${key}=${encodeURIComponent(query[key])}`)
      }
  }
  // 中间用&拼接
  let r = q.join("&")
  // 用问号的形式拼接到接口上
  r = r ? ("?"+r) : ""
  return r
}
// 上移
export function useArrayMoveUp(arr,index){
  swapArray(arr,index,index - 1)
}

// 下移
export function useArrayMoveDown(arr,index){
  swapArray(arr,index,index + 1)
}

function swapArray(arr,index1,index2){
  arr[index1] = arr.splice(index2,1,arr[index1])[0]
  return arr
}


// download二进制文件
export const downloadBlob = (res, name) => {
	const blob = new Blob([res], {
		type: 'text/plain;charset=utf-8',
	});
	const downloadElement = document.createElement('a'); //创建一个a 虚拟标签
	const href = window.URL.createObjectURL(blob); // 创建下载的链接
	downloadElement.href = href;
	downloadElement.download = decodeURI(name ?? ''); // 下载后文件名
	document.body.appendChild(downloadElement);
	downloadElement.click(); // 点击下载
	document.body.removeChild(downloadElement); // 下载完成移除元素
	window.URL.revokeObjectURL(href);
};