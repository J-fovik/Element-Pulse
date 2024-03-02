<template>
    <div class="rounded bg-white flex justify-center items-center">
        <ul class="flex items-center justify-center flex-wrap w-full">
            <li style="cursor: text;">text</li>
            <li style="cursor: copy;">copy</li>
            <li style="cursor: crosshair;">crosshair</li>
            <li style="cursor: pointer;">pointer</li>
            <li style="cursor: grabbing;">grabbing</li>
            <li style="cursor: help;">help</li>
            <li style="cursor: move;">move</li>
            <li style="cursor: progress;">progress</li>
            <li style="cursor: not-allowed;">not-allowed</li>
            <li style="cursor: none;">none</li>
            <li style="cursor: s-resize;">s-resize</li>
            <li style="cursor: sw-resize;">sw-resize</li>
            <li style="cursor: col-resize;">col-resize</li>
            <li style="cursor: row-resize;">row-resize</li>
        </ul>
       
    </div>
</template>
<script setup>

</script>
<style scoped>
li {
    width: 100px;
    height: 100px;
    margin: 20px;
    background-color: aqua;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
}

</style>