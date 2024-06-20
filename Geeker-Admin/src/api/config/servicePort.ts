import { ElMessage } from "element-plus";

// 后端微服务模块前缀
export const PORT1 = "/geeker";
export const PORT2 = "/hooks";

/**
 * @description：请求配置
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  OVERDUE = 401,
  TIMEOUT = 30000,
  TYPE = "success"
}

/**
 * @description：常用的 contentTyp 类型
 */
export enum ContentTypeEnum {
  // json
  JSON = "application/json;charset=UTF-8",
  // text
  TEXT = "text/plain;charset=UTF-8",
  // form-data 一般配合qs
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data 上传
  FORM_DATA = "multipart/form-data;charset=UTF-8"
}
/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number) => {
  switch (status) {
    case 400:
      ElMessage.error("请求失败！请您稍后重试");
      break;
    case 401:
      ElMessage.error("登录失效！请您重新登录");
      break;
    case 403:
      ElMessage.error("当前账号无权限访问！");
      break;
    case 404:
      ElMessage.error("你所访问的资源不存在！");
      break;
    case 405:
      ElMessage.error("请求方式错误！请您稍后重试");
      break;
    case 408:
      ElMessage.error("请求超时！请您稍后重试");
      break;
    case 500:
      ElMessage.error("服务异常！");
      break;
    case 502:
      ElMessage.error("网关错误！");
      break;
    case 503:
      ElMessage.error("服务不可用！");
      break;
    case 504:
      ElMessage.error("网关超时！");
      break;
    default:
      ElMessage.error("请求失败！");
  }
};
