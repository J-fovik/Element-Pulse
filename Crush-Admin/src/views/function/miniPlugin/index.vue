<template>
	<div>
		<el-card shadow="hover" header="引导页" class="mb20">
			<DriverJs />
		</el-card>
		<el-card shadow="hover" header="敏感词过滤" class="mb20">
			<MintFilter />
		</el-card>
		<el-card shadow="hover" header="汉语拼音" class="mb20">
			<Pinyin />
		</el-card>
		<el-card shadow="hover" header="打印" class="mb20">
			<PrintJs />
		</el-card>
		<el-card shadow="hover" header="图形验证码" class="mb20">
			<PuzzleVCode />
		</el-card>
		<el-card shadow="hover" header="打字效果" class="mb20">
			<TypedJs />
		</el-card>
		<el-card shadow="hover" header="浏览器全屏" class="mb20">
			<div class="flex flex-wrap items-center">
				<el-button :disabled="isFullscreen" type="primary" @click="enter">
					进入全屏
				</el-button>
				<el-button @click="toggle"> 切换全屏</el-button>
				<el-button :disabled="!isFullscreen" danger @click="exit"> 退出全屏 </el-button>
				<span class="ml10"> 当前状态: {{ isFullscreen }} </span>
			</div>
		</el-card>
		<el-card class="mt-5" header="局部全屏">
			<div class="flex items-center justify-center flex-col">
				<div>
					<el-button type="primary" @click="toggleDom"> 切换全屏</el-button>
				</div>
				<div
					ref="domRef"
					class="mt10 flex items-center justify-center"
					style="background-color: aqua; width: 200px"
				>
					<el-button type="primary" @click="toggleDom">
						{{ isDomFullscreen ? '退出全屏' : '进入全屏' }}
					</el-button>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="miniPlugin">
import { useFullscreen } from '@vueuse/core';
import DriverJs from './components/DriverJs.vue';
import MintFilter from './components/MintFilter.vue';
import Pinyin from './components/Pinyin.vue';
import PrintJs from './components/PrintJs.vue';
import PuzzleVCode from './components/PuzzleVCode.vue';
import TypedJs from './components/TypedJs.vue';
const domRef = ref<HTMLElement>();
const { enter, exit, isFullscreen, toggle } = useFullscreen();
const { isFullscreen: isDomFullscreen, toggle: toggleDom } = useFullscreen(domRef);
</script>
<style scoped lang="scss"></style>
