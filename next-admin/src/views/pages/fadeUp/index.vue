<template>
    <div class="layout-padding">
        <el-card shadow="hover" class="h100" style="overflow: auto;">
            <div class="flex items-center justify-center flex-col">
                <div v-fadeUp v-for="n in 15" :key="n" class="item">
                    {{ n }}
                </div>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts" setup >



</script>

<style scoped lang="scss">
.item {
    height: 200px;
    width: 500px;
    border: 1px solid #000000;
    margin-bottom: 20px;
    border-radius: 12px;
    line-height: 200px;
    text-align: center;
}

.item:first-child {
    background-color: aqua;
}

.item:nth-child(2) {
    background-color: blue;
}

.item:nth-child(3) {
    background-color: #d81e06;
}

.item:nth-child(4) {
    background-color: #f4ea2a;
}

.item:nth-child(5) {
    background-color: #1afa29;
}

.item:nth-child(6) {
    background-color: #1296db;
}

.item:nth-child(7) {
    background-color: #7C92FF;
}

.item:nth-child(8) {
    background-color: #13227a;
}

.item:nth-child(9) {
    background-color: #d4237a;
}

.item:nth-child(10) {
    background-color: #707070;
}

.item:nth-child(11) {
    background-color: aqua;
}

.item:nth-child(12) {
    background-color: blue;
}

.item:nth-child(13) {
    background-color: #d81e06;
}

.item:nth-child(14) {
    background-color: #f4ea2a;
}

.item:nth-child(15) {
    background-color: #1afa29;
}</style>
