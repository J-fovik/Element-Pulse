import axios from '@/axios'
// 登录
export function login(username,password){
    return axios.post("/admin/login",{
        username,
        password
    })
}
// 获取用户信息
export function getinfo(){
    return axios.post("/admin/getinfo")
}
// 退出登录
export function logout(){
    return axios.post("/admin/logout")
}
// 修改密码
export function updatepassword(data){
    return axios.post("/admin/updatepassword",data)
}