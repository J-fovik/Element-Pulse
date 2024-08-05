<template>
	<div>
		<el-card shadow="hover" header="波浪效果指令" class="mb10">
			<Waves />
		</el-card>
		<el-card shadow="hover" header="平滑上升指令" class="mb10">
			<FadeUp />
		</el-card>
		<el-card shadow="hover" header="图片懒加载指令" class="mb10">
			<Lazy />
		</el-card>
		<el-card shadow="hover" header="文本省略指令" class="mb10">
			<Ellipsis />
		</el-card>
		<el-card shadow="hover" header="文本提示指令" class="mb10">
			<Tooltip />
		</el-card>
		<el-card shadow="hover" header="可视元素指令" class="mb10">
			<Visibility />
		</el-card>
		<el-card shadow="hover" header="添加水印指令" class="mb10">
			<WaterMarker />
		</el-card>
		<el-card shadow="hover" header="父元素内拖拽指令" class="mb10">
			<Drag />
		</el-card>
		<el-card shadow="hover" header="节流指令" class="mb10">
			<Throttle />
		</el-card>
		<el-card shadow="hover" header="防抖指令" class="mb10">
			<Debounce />
		</el-card>
		<el-card shadow="hover" header="双击指令" class="mb10">
			<DoubleClick />
		</el-card>
		<el-card shadow="hover" header="长按指令" class="mb10">
			<Longpress />
		</el-card>
		<el-card shadow="hover" header="点击元素内外部指令" class="mb10">
			<ClickOutside />
		</el-card>
		<el-card shadow="hover" header="文本复制指令" class="mb10">
			<Copy />
		</el-card>
		<el-card shadow="hover" header="滚动到指定视图指令" class="mb10">
			<ScrollTo />
		</el-card>
	</div>
</template>

<script lang="ts" setup name="directives">
import Waves from './components/Waves/index.vue';
import FadeUp from './components/FadeUp/index.vue';
import Lazy from './components/Lazy/index.vue';
import Ellipsis from './components/Ellipsis/index.vue';
import Tooltip from './components/Tooltip/index.vue';
import Visibility from './components/Visibility/index.vue';
import WaterMarker from './components/WaterMarker/index.vue';
import Drag from './components/Drag/index.vue';
import Throttle from './components/Throttle/index.vue';
import Debounce from './components/Debounce/index.vue';
import DoubleClick from './components/DoubleClick/index.vue';
import Longpress from './components/Longpress/index.vue';
import ClickOutside from './components/ClickOutside/index.vue';
import Copy from './components/Copy/index.vue';
import ScrollTo from './components/ScrollTo/index.vue';
</script>
<style scoped lang="scss"></style>
