<template>
    <template v-if="isSupported">
        <el-button :disabled="!isSupported" @click="() => open()">
            取色器
        </el-button>
    </template>
</template>
<script lang="ts" setup name="colorExtractor">
import { useEyeDropper } from '@vueuse/core'
const { isSupported, open, sRGBHex } = useEyeDropper()
const emit = defineEmits(['color']);

watch(
    () => sRGBHex.value,
    () => {
        emit('color', sRGBHex.value); 
    }
);
</script>