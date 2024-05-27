<template>
    <div class="w-full">
        <div class="box">
            <div class="text-center text-white" style="margin: auto;line-height: 500px;">滤镜filter</div>
            <div class="model"></div>
        </div>
    </div>
</template>
<script setup>
</script>
<style scoped lang="scss">
.box {
    height: 500px;
    width: 100%;
    background: url(/src/assets/star.jpg) no-repeat center/cover;
    position: relative;

}

.model {
    position: absolute;
    width: 100%;
    right: 0;
    height: 100%;
    top: 0;
    transition: 2s;
    border-left: 5px solid #333;
    /* 滤镜灰度 元素后面区域*/
    backdrop-filter: grayscale(1);
    /* 元素内区域 */
    filter: blur(2px);
}

.box:hover .model {
    width: 0;
}
</style>