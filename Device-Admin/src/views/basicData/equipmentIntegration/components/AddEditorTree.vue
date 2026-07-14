<template>
  <el-dialog
    :model-value="true"
    :title="form.dialogTitle"
    width="60vw"
    draggable
    :close-on-click-modal="true"
    @close="emits('close')"
  >
    <el-form
      ref="formRef"
      :model="form"
      label-align="left"
      :rules="rules"
      label-width="auto"
      :disabled="!!form.isReadOnly"
    >
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="上级节点名称" prop="ParentName">
            <el-input
              v-model.trim="form.ParentName"
              disabled
              placeholder="请输入上级节点名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否节点" prop="IS_DIR">
            <el-select
              v-model="form.IS_DIR"
              filterable
              @change="changeDir"
            >
              <el-option
                v-for="dict in dictionaryStore.getDictionaryInfo('IS_DIR')"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 是节点 -->
        <template v-if="form.IS_DIR == '1'">
          <el-col :span="12">
            <el-form-item label="节点类型" prop="categorycode">
              <el-select v-model="form.categorycode" filterable clearable>
                <el-option
                  v-for="dict in dictionaryStore.getDictionaryInfo(
                    'FACTORY_DEVICE',
                  )"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="节点名称" prop="equipment_name">
              <el-input
                v-model.trim="form.equipment_name"
                placeholder="请输入节点名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="节点编码" prop="equipment_code">
              <el-input
                v-model.trim="form.equipment_code"
                placeholder="请输入节点编码"
              />
            </el-form-item>
          </el-col>
        </template>
        <!-- 非节点 -->
        <template v-if="form.IS_DIR == '0'">
          <el-col :span="12">
            <el-form-item label="设备类别" prop="categorycode">
              <el-tree-select
                v-model="form.categorycode"
                placeholder="请选择设备类别"
                :data="equipmentCategoryList"
                filterable
                check-strictly
                :render-after-expand="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备名称" prop="equipment_name">
              <el-input
                v-model.trim="form.equipment_name"
                placeholder="请输入设备名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备编码" prop="equipment_code">
              <el-input
                v-model.trim="form.equipment_code"
                placeholder="请输入设备编码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备别名" prop="alias_name">
              <el-input
                v-model.trim="form.alias_name"
                placeholder="请输入设备别名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备精度" prop="accuracy">
              <el-select v-model="form.accuracy" filterable clearable>
                <el-option
                  v-for="dict in dictionaryStore.getDictionaryInfo(
                    'equipment_accuracy',
                  )"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="specification" label="规格型号">
              <el-input
                v-model.trim="form.specification"
                placeholder="请输入规格型号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="manufacturer" label="生产厂家">
              <el-input
                v-model.trim="form.manufacturer"
                placeholder="请输入生产厂家"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备标准" prop="standard">
              <el-select v-model="form.standard" filterable clearable>
                <el-option
                  v-for="dict in dictionaryStore.getDictionaryInfo(
                    'EqStandard',
                  )"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出厂日期" prop="manufacture_date">
              <el-date-picker
                v-model="form.manufacture_date"
                type="date"
                range-separator="-"
                size="small"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="serial_number" label="出厂编号">
              <el-input
                v-model.trim="form.serial_number"
                placeholder="请输入出厂编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="rated_power" label="额定功率(KW)">
              <el-input-number
                v-model.trim="form.rated_power"
                :min="0"
                :max="999999999"
                :step="1"
                class="flex-1"
                controls-position="right"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="rated_voltage" label="额定电压(V)">
              <el-input-number
                v-model.trim="form.rated_voltage"
                :min="0"
                :max="999999999"
                :step="1"
                class="flex-1"
                controls-position="right"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="采购日期" prop="purchase_date">
              <el-date-picker
                v-model="form.purchase_date"
                type="date"
                range-separator="-"
                size="small"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="purchase_price" label="采购价格">
              <el-input-number
                v-model.trim="form.purchase_price"
                :min="0"
                :max="999999999"
                :step="1"
                class="flex-1"
                controls-position="right"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="asset_number" label="资产编号">
              <el-input
                v-model.trim="form.asset_number"
                placeholder="请输入资产编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用部门" prop="usingDeptId">
              <el-tree-select
                v-model="form.usingDeptId"
                placeholder="请选择使用部门"
                :data="deptOptions"
                filterable
                check-strictly
                :render-after-expand="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="责任人" prop="responsible_user_id">
              <el-select
                v-model="form.responsible_user_id"
                filterable
                clearable
              >
                <el-option
                  v-for="dict in userList"
                  :key="dict.userId"
                  :label="dict.nickName"
                  :value="dict.userId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否特种" prop="isspecial">
              <el-select v-model="form.isspecial" filterable clearable>
                <el-option
                  v-for="dict in dictionaryStore.getDictionaryInfo(
                    'Is_Special',
                  )"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="form.remark"
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="12">
          <el-form-item label="是否启用" prop="iS_ACTIVE">
            <el-select v-model="form.iS_ACTIVE" filterable clearable>
              <el-option
                v-for="dict in dictionaryStore.getDictionaryInfo('Is_Active')"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="emits('close')">取消</el-button>
        <el-button
          v-if="!form.isReadOnly"
          v-loading.fullscreen.lock="activeKey == 'okLoading'"
          type="primary"
          element-loading-text="请稍后..."
          @click="validateData(formRef)"
        >
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="AddEditorTree">
import {
  useForm,
  useBasicsState,
  useAsyncData,
  curryingRequestUrl,
  URL,
} from "@/hooks";
import { useDictionaryStore, useUserStore } from "@/stores";
import dayjs from "dayjs";

/* 接受父组件参数 */
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
  deptOptions: {
    type: Array<any>,
    default: () => [],
  },
  equipmentCategoryList: {
    type: Array<any>,
    default: () => [],
  },
  userList: {
    type: Array<any>,
    default: () => [],
  },
});
const dictionaryStore = useDictionaryStore();
const userStore = useUserStore();

/* 父组件方法 */
const emits = defineEmits(["close", "success"]);

/* 弹窗状态控制 */
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
/* 表单 */
const { form, formRef } = useForm<any>(() => ({
  iS_ACTIVE: "true", // 默认启用
  responsible_user_id: userStore.userInfo.id, // 当前用户
  purchase_date: dayjs().format("YYYY-MM-DD"), // 采购日期
  manufacture_date: dayjs().format("YYYY-MM-DD"), // 出厂日期
  install_date: dayjs().format("YYYY-MM-DD"),
  commissioning_date: dayjs().format("YYYY-MM-DD"),
  IS_DIR: "1", // 默认节点
  ...props.data,
}));
/* 表单验证 */
const rules = {
  IS_DIR: [{ required: true, message: "是否节点不能为空", trigger: "blur" }],
  equipment_name: [
    { required: true, message: "名称不能为空", trigger: "blur" },
  ],
  equipment_code: [
    { required: true, message: "编码不能为空", trigger: "blur" },
  ],
  categorycode: [
    { required: true, message: "类型不能为空", trigger: "change" },
  ],
  iS_ACTIVE: [{ required: true, message: "是否启用不能为空", trigger: "blur" }],
  manufacture_date: [
    { required: true, message: "出厂日期不能为空", trigger: "blur" },
  ],
  purchase_date: [
    { required: true, message: "采购日期不能为空", trigger: "blur" },
  ],
};
// 切换是否节点
const changeDir = (val: any) => {
  form.value.categorycode = ""; // 重置类别
  form.value.dialogTitle =
    val == "true" || val === true ? "添加子节点" : "添加设备"; // 重置上级节点名称
};
/* 验证数据 */
const validateData = (formEl: any) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      /* 可加其他特殊校验 */
      submitData();
    } else return false;
  });
};
/* 提交数据 */
const submitData = async () => {
  const { res, err } = await curryingRequestUrl(
    {
      url: URL.BASIC_DATA.HANDLE_EQUIPMENT,
      data: form.value,
      method: "post",
    },
    {
      before: () => setActiveKey("okLoading"), // 设置loading
      after: () => setActiveKey(null), // 关闭loading
      successMsg: "操作成功",
    },
  );
  // 处理错误
  if (err) return;
  // 触发成功
  emits("success");
  // 触发关闭
  emits("close");
};
</script>
<style scoped lang="scss">
.addTable {
  .el-form-item {
    margin-bottom: 0px !important;
  }
}
</style>
