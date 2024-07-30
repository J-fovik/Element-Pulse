<template>
	<div class="board-column">
		<div class="board-column-header">
			{{ title }}
		</div>
		<draggable :list="list" v-bind="$attrs" item-key="id" class="board-column-content">
			<template #item="{ element }">
				<div class="board-item">{{ element.name }} {{ element.id }}</div>
			</template>
		</draggable>
	</div>
</template>

<script setup name="dargBoard">
import draggable from 'vuedraggable';
// 接受父组件参数
const props = defineProps({
	title: {
		type: String,
		required: true,
		default: 'title',
	},
	list: {
		type: Array,
		required: true,
		default: [],
	},
	options: {
		type: Object,
		required: false,
		default: {},
	},
});
</script>
<style lang="scss" scoped>
.board-column {
	min-width: 300px;
	min-height: 100px;
	height: auto;
	overflow: hidden;
	background: #f0f0f0;
	border-radius: 3px;

	.board-column-header {
		height: 50px;
		line-height: 50px;
		overflow: hidden;
		padding: 0 20px;
		text-align: center;
		background: #333;
		color: #fff;
		border-radius: 3px 3px 0 0;
	}

	.board-column-content {
		height: auto;
		overflow: hidden;
		border: 10px solid transparent;
		min-height: 60px;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		align-items: center;

		.board-item {
			cursor: pointer;
			width: 100%;
			height: 64px;
			margin: 5px 0;
			background-color: #fff;
			text-align: center;
			line-height: 54px;
			padding: 5px 10px;
			box-sizing: border-box;
			box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
		}
	}
}
</style>
