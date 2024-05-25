<template>
    <el-card shadow="never">
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">订单统计</span>
                <div>
                    <el-check-tag v-for="(item, index) in options" :key="index" :checked="current == item.value"
                        style="margin-right: 8px" @click="handleChoose(item.value)">{{ item.text }}</el-check-tag>
                </div>
            </div>
        </template>
        <div ref="el" id="chart" style="width: 100%;height: 300px;"></div>
    </el-card>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
// 让echarts根据屏幕响应
import { useResizeObserver } from '@vueuse/core'

import {
    getStatistics3
} from "@/api/index.js"

const current = ref("week")
const options = [{
    text: "近1个月",
    value: "month"
}, {
    text: "近1周",
    value: "week"
}, {
    text: "近24小时",
    value: "hour"
}]
// 切换options数据获取新数据
const handleChoose = (type) => {
    current.value = type
    getData()
}

var myChart = null
onMounted(() => {
    // 获取实例
    var chartDom = document.getElementById('chart');
    if (chartDom) {
        // 初始化获取实例
        myChart = echarts.init(chartDom);
        getData()
    }
})
// 离开页面之前卸载实例
onBeforeUnmount(() => {
    if (myChart) echarts.dispose(myChart)
})

function getData() {
    let option = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };
    // 开启loading
    myChart.showLoading()
    getStatistics3(current.value).then(res => {
        // 赋值X轴数据
        option.xAxis.data = res.x
        // 赋值Y轴数据
        option.series[0].data = res.y
        // 使用新选项更新图表，更新 ECharts 图表实例的配置选项
        myChart.setOption(option)
    }).finally(() => {
        // 关闭loading
        myChart.hideLoading()
    })



}
const el = ref(null)
// 响应页面
useResizeObserver(el, (entries) => myChart.resize())

</script>
