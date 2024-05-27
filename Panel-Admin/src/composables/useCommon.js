import { ref, reactive, computed } from "vue"
import { toast } from "@/composables/util"
// 列表，分页，搜索，删除，修改状态
export function useInitTable(opt = {}) {
    let searchForm = null
    let resetSearchForm = null
    // 如果有传入的表单数据时
    if (opt.searchForm) {
        // 解构定义初始数据
        searchForm = reactive({ ...opt.searchForm })
        // 重置表单
        resetSearchForm = () => {
            // 遍历传入的搜索表单赋值给searchForm
            for (const key in opt.searchForm) {
                searchForm[key] = opt.searchForm[key]
            }
            // 调用列表
            getData()
        }
    }
    // 定义表格数据
    const tableData = ref([])
    const loading = ref(false)

    // 分页
    const currentPage = ref(1)
    const total = ref(0)
    const limit = ref(10)

    // 获取数据
    function getData(p = null) {
        if (typeof p == "number") {
            // 赋值当前分页
            currentPage.value = p
        }
        loading.value = true
        // 调用传入的获取列表接口
        opt.getList(currentPage.value, searchForm)
            .then(res => {
                // 判断是否传入回调处理数据
                if (opt.onGetListSuccess && typeof opt.onGetListSuccess == "function") {
                    opt.onGetListSuccess(res)
                    //  否则默认处理
                } else {
                    tableData.value = res.list
                    total.value = res.totalCount
                }
            })
            .finally(() => {
                loading.value = false
            })
    }
    // 初始执行
    getData()

    // 删除
    const handleDelete = (id) => {
        loading.value = true
        // 调用传入的删除接口
        opt.delete(id).then(res => {
            toast("删除成功")
            getData()
        }).finally(() => {
            loading.value = false
        })
    }


    // 修改状态
    const handleStatusChange = (status, row) => {
        // 让点击的当前数据的statusLoading设为true,小优化,loading效果
        row.statusLoading = true
        // 调用传入的修改状态接口
        opt.updateStatus(row.id, status)
            .then(res => {
                toast("修改状态成功")
                row.status = status
            })
            .finally(() => {
                row.statusLoading = false
            })
    }

     // 多选选中ID
     const multiSelectionIds = ref([])
     const handleSelectionChange = (e) => {
         multiSelectionIds.value = e.map(o => o.id)
     }
     // 批量删除
     const multipleTableRef = ref(null)
     const handleMultiDelete = () => {
         loading.value = true
         opt.delete(multiSelectionIds.value)
             .then(res => {
                 toast("删除成功")
                 // 清空选中
                 if (multipleTableRef.value) {
                     multipleTableRef.value.clearSelection()
                 }
                 getData()
             })
             .finally(() => {
                 loading.value = false
             })
     }
 
     // 批量修改状态
     const handleMultiStatusChange = (status) => {
         loading.value = true
         opt.updateStatus(multiSelectionIds.value,status)
             .then(res => {
                 toast("修改状态成功")
                 // 清空选中
                 if (multipleTableRef.value) {
                     multipleTableRef.value.clearSelection()
                 }
                 getData()
             })
             .finally(() => {
                 loading.value = false
             })
     }
    // return出数据和方法
    return {
        searchForm,
        resetSearchForm,
        tableData,
        loading,
        currentPage,
        total,
        limit,
        getData,
        handleDelete,
        handleStatusChange,
        handleSelectionChange,
        multipleTableRef,
        handleMultiDelete,
        handleMultiStatusChange,
        multiSelectionIds
    }
}

// 新增，修改
export function useInitForm(opt = {}) {
    // 表单部分
    // 抽屉组件实例
    const formDrawerRef = ref(null)
    // 表单实例
    const formRef = ref(null)
    // 默认空值表单
    const defaultForm = opt.form
    // 表单
    const form = reactive({})
    // 有传入的规则校验则赋值没有则是空对象
    const rules = opt.rules || {}
    const editId = ref(0)
    // 根据是否传入editId判断是新增还是修改
    const drawerTitle = computed(() => editId.value ? "修改" : "新增")
    // 提交事件
    const handleSubmit = () => {
        // 非空校验
        formRef.value.validate((valid) => {
            if (!valid) return
            formDrawerRef.value.showLoading()
            // 根据是否传入editId调用修改还是新增接口
            const fun = editId.value ? opt.update(editId.value, form) : opt.create(form)

            fun.then(res => {
                // 成功后提示
                toast(drawerTitle.value + "成功")
                // 修改刷新当前页，新增刷新第一页
                opt.getData(editId.value ? false : 1)
                // 关闭抽屉
                formDrawerRef.value.close()
            }).finally(() => {
                formDrawerRef.value.hideLoading()
            })

        })
    }

    // 重置表单
    function resetForm(row = false) {
        // 清空表单数据
        if (formRef.value) formRef.value.clearValidate()
        // 遍历传入的表单
        for (const key in defaultForm) {
            // form赋值点击获取的row
            form[key] = row[key]
        }
    }

    // 新增
    const handleCreate = () => {
        // 点击新增editId为0
        editId.value = 0
        // 调用重置表单事件传入默认空值
        resetForm(defaultForm)
        formDrawerRef.value.open()
    }

    // 编辑
    const handleEdit = (row) => {
        // 赋值点击的id
        editId.value = row.id
        // 调用重置表单事件传入当前数据
        resetForm(row)
        formDrawerRef.value.open()
    }

    return {
        formDrawerRef,
        formRef,
        form,
        rules,
        editId,
        drawerTitle,
        handleSubmit,
        resetForm,
        handleCreate,
        handleEdit
    }
}