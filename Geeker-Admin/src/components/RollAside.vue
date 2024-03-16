<template>
    <el-aside width="220px" class="roll-aside" v-loading="loading">
        <div class="top">
            <div v-for="i in 100" :key="i">{{ i }}</div>
        </div>
        <div class="bottom">
            分页区域
        </div>
    </el-aside>
    <!-- 因为新增是在本页面所以抽屉写在本页面比较合适 -->
    <FormDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">

        </el-form>
    </FormDrawer>
</template>
<script setup>
import { reactive, ref, computed } from "vue";
import FormDrawer from "./FormDrawer.vue"
// 加载动画
const loading = ref(false)
// 定义抽屉实例
const formDrawerRef = ref(null)
const form = reactive({
    name: "",
})
// 定义表单节点
const formRef = ref(null)
const rules = {
    name: [{
        required: true,
        message: '名称不能为空',
        trigger: 'blur'
    }]
}
// 初始值为零
const editId = ref(0)
// 标题根据editId计算是修改还是新增
const drawerTitle = computed(() => editId.value ? "修改" : "新增")
// 新增按钮
const handleCreate = () => {
    // 表示新增
    editId.value = 0
    // 调用侧边抽屉的open方法，打开侧边抽屉
    formDrawerRef.value.open()
}
// 点击提交
const handleSubmit = () => {
    // 表单验证
    formRef.value.validate((valid) => {
        if (!valid) return
        // 抽屉开启loading
        formDrawerRef.value.showLoading()
        // 根据editId判断是新增还是修改
        // const fun = editId.value ? updateImageClass(editId.value, form) : createImageClass(form)

        // fun.then(res => {
        //     // 提示
        //     toast(drawerTitle.value + "成功")
        //     // 调用列表
        //     getData(editId.value ? currentPage.value : 1)
        //     // 关闭抽屉
        //     formDrawerRef.value.close()
        // })
        //     .finally(() => {
        //         // 关闭loading
        //         formDrawerRef.value.hideLoading()
        //     })
    })
}
// 向父组件暴漏按钮事件
defineExpose({
    handleCreate
})
</script>
<style>
.roll-aside {
    border-right: 1px solid #eeeeee;
    position: relative;
}

.roll-aside .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.roll-aside .bottom {
    position: absolute;
    bottom: 0;
    height: 50px;
    left: 0;
    right: 0;
    @apply flex items-center justify-center;
}
</style>