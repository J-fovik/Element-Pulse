<script lang="ts" setup>
import useLoading from '@/hooks/loading'
import { TitleMap } from '@/config/constants'

interface EditProps {
  modelForm: any
  editVisible: boolean
  createData: any
  updateData: any
  setEditVisible: any
  title?: string
  dialogStatus: string
}

const props = withDefaults(defineProps<EditProps>(), {
  editVisible: false,
  modelForm: {
    ord: 0,
    title: '',
    description: '',
  },
  title: '',
  dialogStatus: 'create',
  createData: () => {},
  updateData: () => {},
  setEditVisible: () => {},
})

const { modelForm } = toRefs(props)
const { loading, setLoading } = useLoading()
const formRef = ref<any>(null)
const visible = ref(false)

watch(
  () => props.editVisible,
  (show) => {
    visible.value = show
  }
)

const handleClose = () => {
  props.setEditVisible()
  formRef.value!.resetFields()
}

const handleSubmit = () => {
  formRef.value
    .validate((valid: any) => {
      if (valid) return

      const data = unref(modelForm)
      props.dialogStatus === 'create' ? props.createData(data) : props.updateData(data)
      handleClose()
    })
    .catch((error: any) => {
      console.log('error', error)
    })
    .finally(() => {
      setLoading(false)
    })
}
</script>
<template>
  <a-modal v-model:visible="visible" @ok="handleSubmit" @cancel="handleClose" draggable :loading="loading">
    <template #title>{{ TitleMap[dialogStatus] }}</template>
    <a-form ref="formRef" :model="modelForm" label-width="50px">
      <input type="hidden" name="model_id" :value="modelForm.model_id" />
      <input type="hidden" name="model_name" :value="modelForm.model_name" />
      <a-form-item label="名称" field="name" :rules="[{ required: true, message: '请输入名称' }]" :validate-trigger="['blur']">
        <a-input v-model="modelForm.name" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item label="地址" field="address" :rules="[{ required: true, message: '请输入排序' }]" :validate-trigger="['blur']">
        <a-input v-model="modelForm.address" placeholder="请输入地址" />
      </a-form-item>
      <a-form-item label="邮箱" field="email" :rules="[{ required: true, message: '请输入邮箱' }]" :validate-trigger="['blur']">
        <a-textarea v-model="modelForm.email" :rows="4" placeholder="请输入邮箱" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<style lang="scss"></style>
