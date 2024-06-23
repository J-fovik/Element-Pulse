<template>
    <!-- 表格二次封装 -->
    <el-table v-bind="$attrs" :data="tableData" @selection-change="handleSelectionChange" v-loading="loading">
        <el-table-column type="selection" align="center" width="55" v-if="selection" :selectable="selectable" />
        <el-table-column
            v-for="item in visibleColumnsData"
            :key="item.key"
            :show-overflow-tooltip="item.tooltip"
            :prop="item.key"
            :width="item.width"
            :label="item.title"
            :align="item.align"
            :header-align="item.headerAlign"
            :show-header="item.show"
            :formatter="item.formatter"
            :fixed="item.fixed"
            :render-header="item.renderHeader"
        >
            <template #default="scope" v-if="$slots[item.key]">
                <slot :name="item.key" v-bind="scope"></slot>
            </template>
        </el-table-column>
        <template #empty>
            <el-empty description="暂无数据" />
        </template>
    </el-table>
</template>
<script setup lang="ts" name="tablePlus">
// 接受父组件参数
const props = withDefaults(
    defineProps<{
        loading?: boolean; // loading
        selection?: boolean; // 是否多选
        tableData?: Array<any>; //表格数据
        visibleColumnsData: Array<any>; // 可视表头
        selectable?: ((row: any) => boolean) | undefined; // 选择函数,判断当前列是否可选
    }>(),
    {
        loading: false,
        selection: false,
        tableData: () => [],
        visibleColumnsData: () => [],
        selectable: () => true,
    }
);
// 给父组件传参
const emits = defineEmits(["selectKeys"]);
// 多选
const handleSelectionChange = (e: any) => {
    emits("selectKeys", e);
};
</script>
