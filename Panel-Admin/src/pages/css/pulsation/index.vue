<template>
    <div class="rounded bg-white flex items-center justify-center">
        <div class="start"></div>
    </div>
</template>
<script setup>
</script>
<style scoped>
.start {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    box-shadow: 0 0 20px #fff,
        -20px 0 80px #f0f, 20px 0 80px #0ff,
        inset 0 0 50px #fff, inset 50px 0 80px #f0f,
        inset -50px 0 80px #0ff, inset 50px 0 200px #f0f,
        inset -50px 0 200px #0ff;
    animation: pulsate 6s linear infinite;
}

@keyframes pulsate {
    50% {
        box-shadow: 0 0 20px #fff,
            20px 0 80px #f0f, -20px 0 80px #0ff,
            inset 0 0 50px #fff, inset -50px 0 80px #f0f,
            inset 50px 0 80px #0ff, inset -50px 0 200px #f0f,
            inset 50px 0 200px #0ff;
    }
}
</style>