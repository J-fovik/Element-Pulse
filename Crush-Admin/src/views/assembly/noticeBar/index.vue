<template>
	<div>
		<el-card shadow="hover" header="滚动通知栏：默认">
			<NoticeBar
				text="🎉🎉🔥一款基于 Vue3.4、TypeScript、Vite5、Pinia、Element-Plus 开源的后台管理框架，使用目前最新技术栈开发。在一定程度上提高您的开发效率。另外本项目还封装了一些常用组件、Hooks、utils、指令、动态路由、按钮级别权限控制等功能"
			/>
		</el-card>
		<el-card shadow="hover" header="滚动通知栏：设置样式" class="mt15">
			<NoticeBar
				text="🎉🎉🔥🎉🎉🔥一款基于 Vue3.4、TypeScript、Vite5、Pinia、Element-Plus 开源的后台管理框架，使用目前最新技术栈开发。在一定程度上提高您的开发效率。另外本项目还封装了一些常用组件、Hooks、utils、指令、动态路由、按钮级别权限控制等功能"
				leftIcon="iconfont icon-yuyin"
				rightIcon="InfoFilled"
				:background="primary"
				color="#FFFFFF"
			/>
		</el-card>
		<el-card
			shadow="hover"
			header="滚动通知栏：搭配 NoticeBar 和 Carousel 走马灯 组件可以实现垂直滚动的效果"
			class="mt15"
		>
			<NoticeBar :scrollable="true">
				<el-carousel
					height="40px"
					direction="vertical"
					:autoplay="true"
					indicator-position="none"
					:interval="3000"
				>
					<el-carousel-item v-for="v in state.noticeList" :key="v"
						>{{ v }}
					</el-carousel-item>
				</el-carousel>
			</NoticeBar>
		</el-card>

		<el-card shadow="hover" header="滚动通知栏：属性" class="mt15">
			<el-table :data="state.tableData">
				<el-table-column prop="a1" label="属性名"> </el-table-column>
				<el-table-column prop="a2" label="说明"> </el-table-column>
				<el-table-column prop="a3" label="类型"> </el-table-column>
				<el-table-column prop="a4" label="默认值"> </el-table-column>
			</el-table>
		</el-card>

		<el-card shadow="hover" header="滚动通知栏：事件" class="mt15">
			<el-table :data="state.tableData1">
				<el-table-column prop="a1" label="事件名"> </el-table-column>
				<el-table-column prop="a2" label="说明"> </el-table-column>
				<el-table-column prop="a3" label="类型"> </el-table-column>
				<el-table-column prop="a4" label="回调参数"> </el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="noticeBar">
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores';
const globalStore = useGlobalStore();
const { primary } = storeToRefs(globalStore);
// 定义变量内容
const state = reactive({
	noticeList: [
		'🎉🎉🔥🎉🎉🔥一款基于 Vue3.4、TypeScript、Vite5、Pinia、Element-Plus 开源的后台管理框架，使用目前最新技术栈开发。在一定程度上提高您的开发效率。另外本项目还封装了一些常用组件、Hooks、utils、指令、动态路由、按钮级别权限控制等功能',
		'Crush Admin',
	],
	tableData: [
		{
			a1: 'mode',
			a2: '通知栏模式，用于右侧 icon 图标点击 ',
			a3: '枚举：closeable | link',
			a4: '',
		},
		{
			a1: 'text',
			a2: '通知文本内容，scrollable 为 false 时生效',
			a3: 'string',
			a4: '',
		},
		{
			a1: 'color',
			a2: '通知文本颜色',
			a3: 'string',
			a4: '#e6a23c',
		},
		{
			a1: 'background',
			a2: '通知背景色',
			a3: 'string',
			a4: '#fdf6ec',
		},
		{
			a1: 'size',
			a2: '字体大小，单位px',
			a3: 'number / string',
			a4: '14',
		},
		{
			a1: 'height',
			a2: '通知栏高度，单位px',
			a3: 'number / string',
			a4: '40',
		},
		{
			a1: 'delay',
			a2: '动画延迟时间 (s)',
			a3: 'number / string',
			a4: '1',
		},
		{
			a1: 'speed',
			a2: '滚动速率 (px/s)',
			a3: 'number / string',
			a4: '100',
		},
		{
			a1: 'scrollable',
			a2: '是否开启垂直滚动',
			a3: 'boolean',
			a4: 'false',
		},
		{
			a1: 'leftIcon',
			a2: '自定义左侧图标',
			a3: 'string',
			a4: '',
		},
		{
			a1: 'rightIcon',
			a2: '自定义右侧图标',
			a3: 'string',
			a4: '',
		},
	],
	tableData1: [
		{
			a1: 'close',
			a2: '通知栏模式（mode）closeable 时回调事件',
			a3: 'function',
			a4: '',
		},
		{
			a1: 'link',
			a2: '通知栏模式（mode）link 时回调事件',
			a3: 'function',
			a4: '',
		},
	],
});
</script>
