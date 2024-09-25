<template>
	<div>
		<el-card shadow="hover" header="vue-json-pretty 编辑器">
			<el-alert
				title="感谢优秀的 `vue-json-pretty`，本 Demo 是基于：https://www.npmjs.com/package/vue-json-pretty"
				type="warning"
				:closable="false"
				class="mb20"
			/>
			<VueJsonPretty
				v-model:data="state.data"
				:deep="state.deep"
				:show-double-quotes="state.showDoubleQuotes"
				:show-line="state.showLine"
				:show-length="state.showLength"
				:show-icon="state.showIcon"
				:show-line-number="state.showLineNumber"
				:editable="state.editable"
				:editable-trigger="state.editableTrigger"
			/>
		</el-card>

		<el-card shadow="hover" header="vue-json-viewer 编辑器" class="mt20">
			<el-alert
				title="感谢优秀的 `vue-json-viewer`，本 Demo 是基于：https://www.npmjs.com/package/vue-json-viewer"
				type="warning"
				:closable="false"
				class="mb20"
			/>
			<VueJsonViewer
				:value="defaultData"
				:expand-depth="5"
				boxed
				sort
				:copyable="{ copyText: '复制', copiedText: '复制成功' }"
			/>
		</el-card>
	</div>
</template>
<script setup lang="ts" name="jsonEditor">
// 引入vue-json-pretty组件以及样式
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
// 引入vue-json-viewer组件
import VueJsonViewer from 'vue-json-viewer';
const defaultData = {
	status: 200,
	text: '',
	error: null,
	config: undefined,
	data: [
		{
			news_id: 51184,
			title: 'iPhone X Review: Innovative future with real black technology',
			source: 'Netease phone',
		},
		{
			news_id: 51183,
			title: 'Traffic paradise: How to design streets for people and unmanned vehicles in the future?',
			source: 'Netease smart',
			link: 'http://netease.smart/traffic-paradise/1235',
		},
		{
			news_id: 51182,
			title: "Teslamask's American Business Relations: The government does not pay billions to build factories",
			source: 'AI Finance',
			members: ['Daniel', 'Mike', 'John'],
		},
	],
};
const state = reactive({
	data: defaultData,
	showLine: true,
	showLineNumber: true,
	showDoubleQuotes: true,
	showLength: true,
	editable: true,
	showIcon: true,
	editableTrigger: 'click' as any,
	deep: 3,
});
</script>
