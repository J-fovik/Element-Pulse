<script lang="ts" setup>
export interface ToolBarProps {
  classes?: string
  title: string
  label?: string
  value: number
}

const props = withDefaults(defineProps<ToolBarProps>(), {
  classes: '',
  title: '',
  label: '[]',
  value: 0,
})

const step: any = computed(() => {
  const v = (props.value / 100) * 100
  return `${v}%`
})
</script>
<template>
  <div class="app-progress-bar">
    <a-tooltip :content="title" v-if="title">
      <div class="progress" :class="classes" :style="`width: ${step}`"></div>
    </a-tooltip>
    <template v-else>
      <div class="progress" :class="classes" :style="`width: ${step}`"></div>
    </template>
    <div class="name">{{ label }}</div>
  </div>
</template>
<style lang="scss">
.app-progress-bar {
  display: flex;
  align-items: center;
  padding-right: 12px;
  .progress {
    width: 80px;
    height: 9px;
    line-height: 30px;
    border-radius: 10px;
    background-color: #3395f4;
    &.success {
      background-color: rgb(var(--success-5));
    }
    &.warning {
      background-color: rgb(var(--warning-6));
    }
    &.danger {
      background-color: rgb(var(--danger-5));
    }
  }
  .name {
    color: #97afca;
    margin-left: 8px;
    white-space: nowrap;
  }
}
</style>
