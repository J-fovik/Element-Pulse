import { ref, reactive } from 'vue'
// 导入退出和修改密码接口
import { logout, updatepassword } from "@/api/manager"
import { showModal, toast } from "@/composables/util"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
// 修改密码
export function useRepassword() {
    const router = useRouter()
    const store = useStore()
    // 修改密码
    const formDrawerRef = ref(null)
    const form = reactive({
        oldpassword: "",
        password: "",
        repassword: ""
    })
    // 修改密码规则
    const rules = {
        oldpassword: [
            {
                required: true,
                message: '旧密码不能为空',
                trigger: 'blur'
            },
        ],
        password: [
            {
                required: true,
                message: '新密码不能为空',
                trigger: 'blur'
            },
        ],
        repassword: [
            {
                required: true,
                message: '确认密码不能为空',
                trigger: 'blur'
            },
        ]
    }
    const formRef = ref(null)
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            formDrawerRef.value.showLoading()
            updatepassword(form)
                .then(res => {
                    toast("修改密码成功，请重新登录")
                    store.dispatch("logout")
                    // 跳转回登录页
                    router.push("/login")
                })
                .finally(() => {
                    formDrawerRef.value.hideLoading()
                })

        })
    }
    // 打开formDrawerRef节点
    const openRePasswordForm = () => formDrawerRef.value.open()// 调用FormDrawer组件暴漏的open方法
    return {
        formDrawerRef,
        form,// 表单数据
        rules,// 表单规则
        formRef,// 表单节点
        onSubmit,// 提交方法
        openRePasswordForm// 打开抽屉节点
    }
}
// 退出登录
export function useLogout() {
    const router = useRouter()
    const store = useStore()
    function handleLogout() {
        showModal("是否要退出登录？").then(res => {
            logout().finally(() => {
                // 调用退出接口
                store.dispatch("logout")
                // 跳转回登录页
                router.push("/login")
                // 提示退出登录成功
                toast("退出登录成功")
            })
        })
    }
    // 导出方法
    return {
        handleLogout
    }
}