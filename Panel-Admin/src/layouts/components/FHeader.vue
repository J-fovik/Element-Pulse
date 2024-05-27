<template>
    <div class="f-header">
        <span class="logo">
            <img src="/src/assets/logo.png" class="w-16 mr-1" alt="">
            J-fovik-CY
        </span>
        <!-- 点击派发handleAsideWidth改变宽度 -->
        <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
            <fold v-if="$store.state.asideWidth == '250px'" />
            <Expand v-else />
        </el-icon>
        <el-tooltip effect="dark" content="刷新" placement="bottom">
            <el-icon class="icon-btn" @click="handleRefresh">
                <refresh />
            </el-icon>
        </el-tooltip>

        <div class="ml-auto flex items-center">
            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <el-icon class="icon-btn" @click="toggle">
                    <full-screen v-if="!isFullscreen" />
                    <aim v-else />
                </el-icon>
            </el-tooltip>
            <!-- 下拉组件 -->
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-light-50">
                    <!-- <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }} -->
                    <el-avatar class="mr-2" :size="25" src="/src/assets/avatar.png" />
                    Yue
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="editCropper">裁剪头像</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

    <form-drawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password></el-input>
            </el-form-item>
        </el-form>
    </form-drawer>
    <EditCropper ref="editCropperRef"></EditCropper>
</template>
<script setup>
import FormDrawer from '@/components/FormDrawer.vue'
import EditCropper from '@/components/EditCropper.vue'
import { useFullscreen } from '@vueuse/core'
import { ref } from 'vue'
// 导入封装的修改密码和退出登录方法
import { useRepassword, useLogout } from "@/composables/useManager"
const {
    // 是否全屏状态
    isFullscreen,
    // 切换全屏
    toggle
} = useFullscreen()

const {
    formDrawerRef, // 导出控制侧边栏的节点，在封装的FormDrawer组件里
    form, // 提交的表单
    rules, // 规则
    formRef, // 表单节点
    onSubmit, // 重置提交事件
    openRePasswordForm // 打开侧边栏函数
} = useRepassword()
// 定义修改头像实例
const editCropperRef = ref(null)
const {
    handleLogout // 退出登录方法 
} = useLogout()
// el-dropdown根据属性command名字判断
const handleCommand = (c) => {
    switch (c) {
        case "logout":
            handleLogout()
            break;
        case "rePassword":
            openRePasswordForm()
            break;
        case "editCropper":
            editCropperRef.value.editCropper()// 调用修改头像实例方法
            break;
    }
}

// 刷新
const handleRefresh = () => location.reload()

</script>
<style>
.f-header {
    @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
    height: 64px;
    z-index: 1000;
}
.el-dialog {
	position: relative;
	left: 0;
	margin: 0 auto;
	transform: none;
}
.logo {
    width: 250px;
    @apply flex justify-center items-center text-xl font-bold;
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-indigo-600;
}

.f-header .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5;
}
</style>