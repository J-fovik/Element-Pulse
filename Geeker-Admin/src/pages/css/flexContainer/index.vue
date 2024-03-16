<template>
    <div class="rounded bg-black">
        <div class="box">
            <div class="box-item rounded" v-for="(_, index) in list" :key="index">{{ _ }}</div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
const num = ref('hello')
const list = new Array(1000).fill(num.value);

</script>
<style scoped>
.box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
}


.box-item {
    width: 200px;
    height: 200px;
    background-color: #FFF;
    margin: 15px;
    text-align: center;
    line-height: 200px;
    color: #000;
}
.box-item:hover{
    background-color:aqua;
}
</style>
