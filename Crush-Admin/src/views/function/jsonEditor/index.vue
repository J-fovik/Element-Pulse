<template>
	<Container>
		<el-alert
			title="感谢优秀的 `vue-json-pretty`，本 Demo 是基于：https://www.npmjs.com/package/vue-json-pretty"
			type="warning"
			:closable="false"
		/>
		<el-card class="mt20">
			<vue-json-pretty
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
	</Container>
</template>
<script setup lang="ts" name="jsonEditor">
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

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
//  state.val 可以不用
const state = reactive({
	val: JSON.stringify(defaultData),
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

watch(
	() => state.val,
	(newVal) => {
		try {
			state.data = JSON.parse(newVal);
		} catch (err) {
			// console.log('JSON ERROR');
		}
	}
);

watch(
	() => state.data,
	(newVal) => {
		try {
			state.val = JSON.stringify(newVal);
		} catch (err) {
			// console.log('JSON ERROR');
		}
	}
);
</script>
