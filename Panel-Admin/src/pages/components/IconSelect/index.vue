<template>
    <div class="rounded bg-white flex justify-center items-center">
        <IconSelect v-model="form.icon" />
    </div>
</template>
<script setup>
import IconSelect from "@/components/IconSelect.vue"
import { reactive, watch } from "vue";
const form = reactive({})
watch(() => form.icon, (newValue, oldValue) => {
    console.log(newValue);
});
</script>
<style></style>