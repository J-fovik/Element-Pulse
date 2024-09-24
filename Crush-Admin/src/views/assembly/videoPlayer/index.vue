<template>
	<div>
		<el-card shadow="hover" header="Xgplayer 西瓜视频播放器" class="mb20">
			<el-alert
				title="Xgplayer 播放器目前使用 xgplayer 插件完成，官方文档请查看 ：https://www.npmjs.com/package/xgplayer"
				type="warning"
				:closable="false"
				class="mb20"
			/>
			<el-button type="primary" @click="setActiveKey('Xgplayer')">西瓜视频播放器</el-button>
			<Xgplayer v-if="activeKey === 'Xgplayer'" :url="url" @close="setActiveKey(null)" />
		</el-card>
	</div>
</template>

<script setup lang="ts" name="videoPlayer">
import { useBasicsState } from '@/hooks';
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
const url = '//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/xgplayer-demo.mp4';
</script>
