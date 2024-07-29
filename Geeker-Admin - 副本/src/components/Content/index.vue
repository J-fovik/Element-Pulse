<template>
    <el-card shadow="hover">
        <template #header>
            <div class="flex items-center justify-between">
                <div>{{ route.meta.title as any }}</div>
            </div>
        </template>
        <slot></slot>
    </el-card>
</template>

<script lang="ts" setup name="Content">
const route = useRoute();
</script>
<style lang="scss" scoped>
:deep(.el-card__header) {
    border-bottom: none;
}
:deep(.el-card__body) {
    padding: 0 20px 20px;
}
</style>
