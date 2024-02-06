<script lang="ts" setup>
import type { TableRowSelection } from '@arco-design/web-vue/es/table/interface'
import { TitleMap, BasePagination } from '@/config/constants'
import TableToolBar from '@/components/TableToolBar/index.vue'
import { FormInstance } from '@arco-design/web-vue/es/form'
import { Modal, Notification } from '@arco-design/web-vue'
import View from '@/components/View/index.vue'
import request from '@/utils/request'
import { debounce } from 'lodash'
import { set } from '@vueuse/core'
import Edit from './edit.vue'
import qs from 'qs'

interface ModelProps {
  category_id?: number
  status?: boolean | number
}

const { page, limit } = BasePagination
const showSearch = ref(true)
const tableLoading = ref(false)
const editVisible = ref(false)
const dialogStatus = ref('create')
const delDisabled = ref(false)
const modelForm = reactive<ModelProps>({})
const pagination = reactive({ ...BasePagination })
const queryForm = reactive({ title: '', page, limit })
const state = reactive({
  tableData: [],
})
const selectedKeys = ref([])
const formQueryRef = ref<FormInstance>()
const setEditVisible = () => {
  set(editVisible, false)
}

const rowSelection: TableRowSelection = {
  type: 'checkbox',
  showCheckedAll: true,
}

const onSearch = debounce(() => {
  getList()
}, 500)

const onReset = debounce(() => {
  formQueryRef.value?.resetFields()
  getList()
}, 500)

const addNew = () => {
  set(editVisible, true)
  set(dialogStatus, 'create')
}

// 获取列表
const getList = () => {
  set(tableLoading, true)

  request({
    url: '/posts/list',
    params: queryForm,
  }).then((res) => {
    Array.isArray(res.rows) && (state.tableData = res?.rows)
    pagination.page = queryForm.page
    pagination.total = res.total

    setTimeout(() => {
      set(tableLoading, false)
    }, 80)
  })
}

getList()

const handleEdit = (row: any) => {
  set(editVisible, true)
  set(dialogStatus, 'update')

  Object.assign(modelForm, row)
}

// 批量删除
const onRemove = () => {
  if (!selectedKeys.value.length) {
    Notification.error('至少选择一个')
    return
  }

  Modal.confirm({
    draggable: true,
    title: '温馨提示',
    content: '你确定要删除选中项吗?',
    onOk() {
      onDelete(selectedKeys.value.join(','))
    },
  })
}

// 处理删除
const handleDelete = (record: any) => {
  onDelete(record?.id)
}

// 删除
const onDelete = (id: string) => {
  request({
    method: 'post',
    url: `/posts/delete`,
    data: qs.stringify({ id }),
  }).then((res) => {
    set(dialogStatus, 'delete')
    res && handleSuccess()
  })
}

// 新增数据
const createData = (data: any) => {
  request({
    method: 'post',
    url: '/posts/insert',
    data,
  }).then((res) => {
    res && handleSuccess()
  })
}

// 修改数据
const updateData = (data: any) => {
  request({
    method: 'put',
    url: `/posts/update`,
    data,
  }).then((res) => {
    set(dialogStatus, 'update')
    res && handleSuccess()
  })
}
// 处理成功
const handleSuccess = () => {
  refreshData()
}

// 刷新数据
const refreshData = () => {
  getList()
  Notification.info({
    content: `${TitleMap[dialogStatus.value as keyof typeof TitleMap] || '操作'}成功`,
    duration: 3000,
  })
}

// 监听批量删除按钮
watch(
  () => selectedKeys.value.length,
  (value) => {
    delDisabled.value = !value
  },
  { immediate: true }
)
</script>
<template>
  <View class="app-standard-table">
    <transition enter-active-class="animate__animated animate__fadeInUp" leave-active-class="animate__animated animate__fadeOut" :duration="800">
      <div class="app-card-header" v-show="showSearch">
        <a-form :model="queryForm" layout="inline" @submit.prevent>
          <a-form-item label="名称">
            <a-input v-model="queryForm.title" :style="{ width: '320px' }" placeholder="请输入名称" @keyup.enter="onSearch" />
          </a-form-item>
          <a-form-item>
            <a-space :size="10">
              <a-button type="primary" @click="onSearch">
                <template #icon>
                  <icon-search />
                </template>
                <template #default>查询</template>
              </a-button>
              <a-button @click="onReset">
                <template #icon>
                  <icon-refresh />
                </template>
                <template #default>重置</template>
              </a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </div>
    </transition>
    <div class="app-card-body">
      <div class="app-table-action">
        <div class="app-table-btn">
          <a-space :size="10">
            <a-button type="primary" @click="addNew">
              <template #icon>
                <icon-search />
              </template>
              <template #default>新增</template>
            </a-button>
            <a-button type="outline" status="danger" :disabled="delDisabled" @click="onRemove">
              <template #icon>
                <icon-delete />
              </template>
              <template #default>删除</template>
            </a-button>
          </a-space>
        </div>
        <div class="app-table-action-right">
          <table-tool-bar v-model:show-search.sync="showSearch" @query-table="getList" />
        </div>
      </div>
      <!-- /table-action -->
      <div class="app-table-container">
        <a-table :data="state.tableData" :loading="tableLoading" row-key="id" :pagination="pagination" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys">
          <template #columns>
            <a-table-column title="姓名" data-index="name" />
            <a-table-column title="工资" data-index="salary" />
            <a-table-column title="地址" data-index="address" />
            <a-table-column title="邮件" data-index="email" />
            <a-table-column title="操作" :width="100">
              <template #cell="{ record }">
                <a-space :size="15">
                  <a-button type="text" @click="handleEdit(record)">
                    <template #icon>
                      <icon-edit />
                    </template>
                    <template #default>修改</template>
                  </a-button>
                  <a-popconfirm content="确认要删除数据吗?" @ok="handleDelete(record)">
                    <a-button type="text" status="danger">
                      <template #icon>
                        <icon-delete />
                      </template>
                      <template #default>删除</template>
                    </a-button>
                  </a-popconfirm>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </div>
      <!-- /table-container -->
    </div>
    <Edit :model-form="modelForm" v-model:edit-visible="editVisible" :set-edit-visible="setEditVisible" :create-data="createData" :update-data="updateData" :dialog-status="dialogStatus" />
  </View>
</template>
<style lang="scss"></style>
