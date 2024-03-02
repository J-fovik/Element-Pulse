<template>
    <div class="flex items-center" style="width: 200px;">
        <el-icon :size="20" v-if="modelValue" class="mr-2">
            <component :is="modelValue"/>
        </el-icon>
        <el-select filterable :modelValue="modelValue" class="m-2" placeholder="请选择图标" @change="handleChange">
            <el-option
            v-for="item in icons"
            :key="item"
            :label="item"
            :value="item"
            >
                <div class="flex items-center justify-between">
                    <el-icon>
                        <component :is="item"/>
                    </el-icon>
                    <span class="text-gray-500">{{ item }}</span>
                </div>
            </el-option>
        </el-select>
    </div>
</template>
<script setup>
import { ref } from "vue"
// 引入全部图标
import * as iconList from '@element-plus/icons-vue'
// 接受参数
defineProps({
    modelValue:String
})
// 定义初始值
const icons = ref(Object.keys(iconList))
// 子传父，配合defineProps  组件可以实现v-model
const emit = defineEmits(["update:modelValue"])
// 选择事件
const handleChange = (icon)=>{
    emit("update:modelValue",icon)
}
</script>