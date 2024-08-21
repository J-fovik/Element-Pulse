<template>
	<div>
		<el-alert
			title="ECharts 是对echarts的二次封装，官方文档请查看 ：https://echarts.apache.org/zh/index.html"
			type="warning"
			:closable="false"
			class="mb20"
		/>
		<el-card
			shadow="hover"
			header="折线图"
			:body-style="{ padding: '10px' }"
			:header-style="{ padding: '10px' }"
		>
			<el-row :gutter="24">
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 200px">
					<ECharts :options="options1" renderer="svg" />
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 200px">
					<ECharts :options="options2" renderer="svg" />
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 200px">
					<ECharts :options="options3" renderer="svg" />
				</el-col>
			</el-row>
		</el-card>
		<el-card
			shadow="hover"
			header="柱状图"
			:body-style="{ padding: '10px' }"
			:header-style="{ padding: '10px' }"
			class="mt10"
		>
			<el-row :gutter="24">
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 200px">
					<ECharts :options="options4" :theme="isDark" />
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 200px">
					<ECharts :options="options5" :theme="isDark" />
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 200px">
					<ECharts :options="options6" :theme="isDark" />
				</el-col>
			</el-row>
		</el-card>
		<el-card
			shadow="hover"
			header="饼状图"
			class="mt10"
			:content-style="{ padding: '10px' }"
			:header-style="{ padding: '10px' }"
		>
			<el-row :gutter="24">
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 200px">
					<ECharts :options="options7" :width="'300px'" />
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 300px">
					<ECharts :options="options8" :height="'300px'" />
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="height: 200px">
					<ECharts :options="options9" :on-click="echartsClick" />
				</el-col>
			</el-row>
		</el-card>
		<el-card
			shadow="hover"
			header="水型图"
			class="mt10"
			:content-style="{ padding: '10px' }"
			:header-style="{ padding: '10px' }"
		>
			<div style="height: 400px">
				<ECharts :options="options10" />
			</div>
		</el-card>

		<el-card
			shadow="hover"
			class="mt10"
			:content-style="{ padding: '10px' }"
			:header-style="{ padding: '10px' }"
			><template #header>
				<div class="flex items-center justify-between">
					<div>其他ECharts</div>
					<el-button
						type="primary"
						text
						class="cursor-pointer"
						@click="$router.push(`/dataScreen`)"
						>数据大屏</el-button
					>
				</div>
			</template>
		</el-card>
		<OrderTrend class="mt10" />
		<MapEcharts class="mt10" />
		<el-card
			shadow="hover"
			header="配置项 📚"
			class="mt10"
			:content-style="{ padding: '10px' }"
			:header-style="{ padding: '10px' }"
		>
			<el-descriptions :column="1" border>
				<el-descriptions-item label="options"> 图表配置选项</el-descriptions-item>
				<el-descriptions-item label="renderer">
					图表渲染方式('canvas' | 'svg')，默认'canvas'
				</el-descriptions-item>
				<el-descriptions-item label="theme">
					图表主题('dark' | 'light')，默认'light'
				</el-descriptions-item>
				<el-descriptions-item label="width"> 图标宽度，默认'100%' </el-descriptions-item>
				<el-descriptions-item label="height"> 图标高度，默认'100%' </el-descriptions-item>
				<el-descriptions-item label="onClick">
					图表点击事件的处理函数
				</el-descriptions-item>
			</el-descriptions>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="eCharts">
import { useGlobalStore } from '@/stores';
import OrderTrend from './components/OrderTrend.vue';
import {
	options1,
	options2,
	options3,
	options4,
	options5,
	options6,
	options7,
	options8,
	options9,
	options10,
} from './options';
const globalStore = useGlobalStore();
// 主题色
const isDark = computed(() => (globalStore.isDark ? 'dark' : 'light'));
const echartsClick = (e) => {
	console.log('点击', e);
};
</script>
