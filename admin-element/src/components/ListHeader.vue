<template>
    <div class="flex items-center justify-between mb-4">
        <div>
            <!-- 新增 -->
            <el-button v-if="btns.includes('create')" type="primary" size="small" @click="$emit('create')">新增</el-button>
            <!-- 批量删除 -->
            <el-popconfirm v-if="btns.includes('delete')" title="是否要删除选中记录？" confirmButtonText="确认" cancelButtonText="取消"
                @confirm="$emit('delete')">
                <template #reference>
                    <el-button type="danger" size="small">批量删除</el-button>
                </template>
            </el-popconfirm>
            <!-- 其他按钮 -->
            <slot />

        </div>
        <!-- 刷新 -->
        <el-tooltip v-if="btns.includes('refresh')" effect="dark" content="刷新数据" placement="top">
            <el-button text @click="$emit('refresh')">
                <el-icon :size="20">
                    <Refresh />
                </el-icon>
            </el-button>
        </el-tooltip>
        <!-- 导出数据 -->
        <el-tooltip v-if="btns.includes('download')" effect="dark" content="导出数据" placement="top">
            <el-button size="small" text @click="$emit('download')">
                <el-icon :size="15">
                    <Download />
                </el-icon>
            </el-button>
        </el-tooltip>
    </div>
</template>
<script setup>
import { computed } from 'vue';
// 接受父组件传来的参数,默认新增和刷新
const props = defineProps({
    layout: {
        type: String,
        default: "create,refresh"
    }
})
// 计算btns,用逗号分隔
const btns = computed(() => props.layout.split(","))
// 定义子传夫事件
defineEmits(["create", "refresh", "delete","download"])
</script>