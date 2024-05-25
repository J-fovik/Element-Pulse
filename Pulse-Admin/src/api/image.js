import axios from "@/axios"

export const uploadImageAction = "/api/admin/image/upload"
// 上传图片也根据环境匹配
// export const uploadImageAction = import.meta.env.VITE_APP_BASE_API + "/admin/image/upload"