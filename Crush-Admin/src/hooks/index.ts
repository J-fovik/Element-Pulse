import useCreateScript from './modules/useCreateScript'; // 创建text/javascript的script标签
import useGray from './modules/useGray'; // 页面灰度效果
import useDevice from './modules/useDevice'; // 响应式布局容器固定宽度
import useEcharts from './modules/useEcharts'; // 响应式布局容器固定宽度
export type { TableCustomColumnData } from './modules/useTable';
export { useBasicsState, useBasicsSet, useBasicsMap } from './modules/useBase'; // 唯一值 set map
export { useAsyncData, useAsyncNoInitData, useAsyncWatchData } from './modules/useAsyncRequest'; // 异步请求封装
export { useForm, useTable } from './modules/useTable'; // 表格表单
export { curryingRequest } from './modules/useRequest'; // 请求封装
export { useHandleData } from './modules/useHandleData'; // 操作前确认提示
export { useOnline } from './modules/useOnline'; // 网络是否可用
export { useCreateScript, useGray, useDevice, useEcharts };
