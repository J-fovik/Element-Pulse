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
	</div>
</template>

<script setup lang="ts" name="miniPlugin">
import DriverJs from './components/DriverJs.vue';
import MintFilter from './components/MintFilter.vue';
import Pinyin from './components/Pinyin.vue';
import PrintJs from './components/PrintJs.vue';
import PuzzleVCode from './components/PuzzleVCode.vue';
import TypedJs from './components/TypedJs.vue';
</script>
<style scoped lang="scss"></style>
