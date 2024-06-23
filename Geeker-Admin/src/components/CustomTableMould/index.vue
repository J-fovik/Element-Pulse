<template>
    <el-card shadow="hover">
        <template #header>
            <div class="flex items-center justify-between">
                <div>{{ route.meta.title as any }}</div>
                <!-- 折叠按钮 -->
                <template v-if="fold">
                    <el-button type="primary" link size="small" @click="setCollapsed(!collapsed)">
                        <el-icon class="mr5"><ArrowUpBold v-if="collapsed" /><ArrowDownBold v-else /> </el-icon>
                        {{ collapsed ? "折叠" : "展开" }}
                    </el-button>
                </template>
            </div>
        </template>
        <!-- 表单模块 -->
        <template v-if="isQueryControl">
            <div class="flex">
                <!-- 表单插槽 -->
                <div :class="collapsed ? 'flex-1' : 'formHeight'">
                    <slot name="form"></slot>
                </div>
                <!-- 间隔线 -->
                <div style="width: 1px; margin: 0 20px; background-color: #e5e6eb"></div>
                <div class="flex items-center flex-col">
                    <div class="flex items-center justify-center" :class="collapsed ? 'flex-col marginStyle' : ''">
                        <el-button type="primary"  :icon="Search" @click="emits('search')"> 查询 </el-button>
                        <el-button
                            :class="collapsed ? 'marginStyle' : ''"
                            :icon="Delete"
                            @click="emits('resetSearch')"
                        >
                            重置
                        </el-button>
                    </div>
                </div>
            </div>
            <el-divider />
        </template>
        <!-- 表单模块 -->
        <!-- 操作模块 -->
        <template v-if="isOperateControl">
            <div class="flex items-center justify-between">
                <!-- 操作插槽 -->
                <slot name="operate"></slot>
                <div>
                    <el-popover
                        placement="top-end"
                        title="列展示"
                        trigger="click"
                        transition="el-zoom-in-top"
                        popper-class="table-tool-popper"
                        :width="200"
                        :persistent="false"
                    >
                        <template #reference>
                            <el-icon><Tools /></el-icon>
                        </template>
                        <template #default>
                            <el-scrollbar>
                                <div ref="toolSetRef" class="tool-sortable">
                                    <div class="tool-sortable-item" v-for="(v, i) in tableColumns" :key="v.key" :data-key="v.key">
                                        <el-icon><Menu /></el-icon>
                                        <el-checkbox
                                            v-model="v.show"
                                            size="default"
                                            class="ml12"
                                            :label="v.title.length > 8 ? v.title.substring(0, 8) + '...' : v.title"
                                        />
                                    </div>
                                </div>
                            </el-scrollbar>
                        </template>
                    </el-popover>
                </div>
            </div>
        </template>
        <!-- 操作模块 -->
        <div class="mt20">
            <!-- 表格插槽 -->
            <slot name="table"></slot>
        </div>
        <!-- 分页插槽 -->
        <div class="flex items-center justify-between p15">
            <slot name="pagination"></slot>
        </div>
    </el-card>
</template>

<script lang="ts" setup name="customTableMould">
import { Delete, Search } from "@element-plus/icons-vue";
import { useBasicsState } from "@/hooks";
const route = useRoute();
// 父组件参数
const props = withDefaults(
    defineProps<{
        fold?: boolean; // 是否开启折叠控制
        isQueryControl?: boolean; // 是否展示表单模块
        isOperateControl?: boolean; // 是否展示操作模块
        tableColumns?: Array<any>; // 列展示
    }>(),
    {
        fold: false,
        isQueryControl: true,
        isOperateControl: true,
        tableColumns: () => [],
    }
);
// 展开折叠控制
const isCollapsed = ref(false);
// 控制折叠
const [collapsed, setCollapsed] = useBasicsState<boolean>(isCollapsed.value);
// 父组件方法
const emits = defineEmits(["resetSearch", "search"]);
</script>
<style lang="scss" scoped>
:deep(.el-card__header) {
    border-bottom: none;
}
:deep(.el-card__body) {
    padding: 0 20px 0;
}
.formHeight {
    height: 40px;
    overflow: hidden;
    flex: 1;
}
.marginStyle {
    margin-top: 10px;
    margin-left: 0px !important;
}
</style>
