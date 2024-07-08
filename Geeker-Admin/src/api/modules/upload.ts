import { PORT1 } from "@/api/config/servicePort";
import request from "@/api/request";

/**
 * @name 文件上传模块
 */
// 图片上传
export const uploadImg = (data: FormData) => {
  return request({
    url: PORT1 + `/file/upload/img`,
    method: "post",
    data
  });
};
// 视频上传
export const uploadVideo = (data: FormData) => {
  return request({
    url: PORT1 + `/file/upload/video`,
    method: "post",
    data
  });
};
