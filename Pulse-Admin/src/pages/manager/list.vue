<template>
  <el-card shadow="never" class="border-0" >
    <!-- 搜索表单 -->
    <el-form :model="searchForm" label-width="80px" class="mb-3" size="small">
      <el-row :gutter="20">
        <el-col :span="8" :offset="0">
          <el-form-item label="关键词">
            <el-input v-model="searchForm.keyword" placeholder="管理员昵称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
          <div class="flex items-center justify-end">
            <el-button type="primary" @click="getData">搜索</el-button>
            <el-button @click="resetSearchForm">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <!-- 新增|刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData" />

    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column label="管理员" width="200">
        <template #default="{ row }">
          <div class="flex items-center">
            <el-avatar :size="40" :src="row.avatar">
              <!-- 异常时显示默认图片 -->
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
            </el-avatar>
            <div class="ml-3">
              <h6>{{ row.username }}</h6>
              <small>ID:{{ row.id }}</small>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="所属角色" align="center">
        <template #default="{ row }">
          {{ row.role?.name || "-" }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <!-- 绑定row.status 开启状态传1，关闭状态传2 -->
          <!-- :loading="row.statusLoading"此statusLoading时返回数据时map的 -->
          <!-- 根据 row.super == 1也就是超级管理员的时候禁用-->
          <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0" :loading="row.statusLoading"
            :disabled="row.super == 1" @change="handleStatusChange($event, row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <!-- scope.row.super == 1时显示暂无操作 -->
          <small v-if="scope.row.super == 1" class="text-sm text-gray-500">暂无操作</small>
          <div v-else>
            <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
            <el-popconfirm title="是否要删除该管理员？" confirmButtonText="确认" cancelButtonText="取消"
              @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button text type="primary" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
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
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <input v-model="form.avatar" />
        </el-form-item>
        <el-form-item label="所属角色" prop="role_id">
          <el-select v-model="form.role_id" placeholder="选择所属角色">
            <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="content">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>
    </FormDrawer>

  </el-card>
</template>
<script setup>
import { ref } from "vue"
import ListHeader from "@/components/ListHeader.vue";
import FormDrawer from "@/components/FormDrawer.vue";
import {
  getManagerList,// 获取列表
  updateManagerStatus, // 修改状态
  createManager, // 新增
  updateManager,  // 修改
  deleteManager  // 删除
} from "@/api/manager"
// 引入封装的表格和表单方法
import { useInitTable, useInitForm } from '@/composables/useCommon.js'
// 定义规则
const roles = ref([])
// 引入表格
const {
  searchForm, // 搜索表单
  resetSearchForm, // 重置表单
  tableData,  // 表格数据
  loading, // loading
  currentPage, // 当前页码
  total, // 总条数
  limit, // 每页多少条
  getData, // 获取列表返回方法
  handleDelete, // 删除方法
  handleStatusChange // 改变状态方法
} = useInitTable({
  // 传入搜索表单
  searchForm: {
    keyword: ""
  },
  // 传入获取列表接口
  getList: getManagerList,
  // 传入回调处理数据
  onGetListSuccess: (res) => {
    // map对象加入statusLoading
    tableData.value = res.list.map(o => {
      o.statusLoading = false
      return o
    })
    total.value = res.totalCount
    roles.value = res.roles
  },
  // 传入删除接口
  delete: deleteManager,
  // 传入更新状态接口
  updateStatus: updateManagerStatus
})
// 引入表单数据
const {
  formDrawerRef, // 抽屉组件实例
  formRef, // 表单实例
  form, // 新增和修改表单
  rules, // 规则
  drawerTitle, // 抽屉标题
  handleSubmit, // 提交事件
  handleCreate, // 新增事件
  handleEdit // 修改事件
} = useInitForm({
  // 传入新增和修改表单数据
  form: {
    username: "",
    password: "",
    role_id: null,
    status: 1,
    avatar: "",
    icon:''
  },
  // 传入获取列表接口,此方法是useInitTable引入方法,传入useInitForm中,更新列表
  getData,
  // 传入修改列表接口
  update: updateManager,
  // 传入新增列表接口
  create: createManager
})


</script>