<template>
  <el-card shadow="never" class="border-0" style="height: calc(100vh - 144px);overflow: auto;;">
    <!-- 新增|刷新 -->
    <div class="flex items-center justify-between mb-4">
      <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
      <!-- 点击刷新数据调用getData方法 -->
      <el-tooltip effect="dark" content="刷新数据" placement="top">
        <el-button text @click="getData">
          <el-icon :size="20">
            <Refresh />
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="公告标题" />
      <el-table-column prop="create_time" label="发布时间" width="380" />
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <!-- 点击修改 -->
          <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
          <!-- 点击删除 -->
          <el-popconfirm title="是否要删除该公告？" confirmButtonText="确认" cancelButtonText="取消"
            @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button text type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="flex items-center justify-center mt-5">
      <el-pagination background layout="prev, pager ,next" :total="total" :current-page="currentPage" :page-size="limit"
        @current-change="getData" />
    </div>
    <!-- 抽屉组件 -->
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title" placeholder="公告标题"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>

  </el-card>
</template>
<script setup>
import { ref, reactive, computed } from "vue"
import FormDrawer from "@/components/FormDrawer.vue";
import {
  getNoticeList,// 获取列表
  createNotice, // 新增
  updateNotice, // 修改
  deleteNotice // 删除
} from "@/api/notice"
import {
  toast
} from "@/composables/util"
// 定义表格数据
const tableData = ref([])
const loading = ref(false)

// 分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)

// 获取数据，分页点击数组调用相应列表
function getData(p = null) {
  // 接受参数p默认为null，判断p为number类型，让当前页码赋值p
  if (typeof p == "number") {
    currentPage.value = p
  }
  loading.value = true
  // 获取列表
  getNoticeList(currentPage.value)
    .then(res => {
      // 赋值数组以及最大页码
      tableData.value = res.list
      total.value = res.totalCount
    })
    .finally(() => {
      loading.value = false
    })
}
// 初始化执行函数
getData()

// 删除
const handleDelete = (id) => {
  loading.value = true
  deleteNotice(id).then(res => {
    toast("删除成功")
    getData()
  })
    .finally(() => {
      loading.value = false
    })
}

// 表单部分
const formDrawerRef = ref(null)
const formRef = ref(null)
const form = reactive({
  title: "",
  content: ""
})
const rules = {
  title: [{
    required: true,
    message: '公告标题不能为空',
    trigger: 'blur'
  }],
  content: [{
    required: true,
    message: '公告内容不能为空',
    trigger: 'blur'
  }]
}
// 定义editId可判断新增还是修改
const editId = ref(0)
// 计算标题名称
const drawerTitle = computed(() => editId.value ? "修改" : "新增")
// 提交事件
const handleSubmit = () => {
  // 判断空值
  formRef.value.validate((valid) => {
    if (!valid) return
    formDrawerRef.value.showLoading()
    // 定义fun 根据是否有editId 判断是新增还是修改
    const fun = editId.value ? updateNotice(editId.value, form) : createNotice(form)
    // 成功后提示并且更新列表
    fun.then(res => {
      toast(drawerTitle.value + "成功")
      // 修改刷新当前页，新增刷新第一页
      getData(editId.value ? false : 1)
      formDrawerRef.value.close()
    })
      .finally(() => {
        formDrawerRef.value.hideLoading()
      })

  })
}

// 重置表单，初始row为false，可根据是否拿到row判断是新增还是修改
function resetForm(row = false) {
  // 如果表单有数据，则清空
  if (formRef.value) formRef.value.clearValidate()
  // 如果接受row则拿到row的key赋值表单数据
  if (row) {
    for (const key in form) {
      form[key] = row[key]
    }
  }
}

// 新增
const handleCreate = () => {
  // 点击新增editId赋值0
  editId.value = 0
  // 调用重置表单，赋值空
  resetForm({
    title: "",
    content: ""
  })
  formDrawerRef.value.open()
}

// 编辑
const handleEdit = (row) => {
  // 赋值editId为当前修改id
  editId.value = row.id
  // 调用重置表单传入当前数据
  resetForm(row)
  formDrawerRef.value.open()
}

</script>