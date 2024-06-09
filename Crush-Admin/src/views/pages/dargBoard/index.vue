<template>
	<div class="layout-flexBox">
		<el-card shadow="hover" class="layout-flexBox-auto" header="可拖动看板">
			<div class="flex justify-around">
				<DargBoard :key="1" :list="list1" :group="group" class="kanban todo" title="Todo" />
				<DargBoard :key="2" :list="list2" :group="group" class="kanban working" title="Working" />
				<DargBoard :key="3" :list="list3" :group="group" class="kanban done" title="Done" />
			</div>
		</el-card>
	</div>
</template>
<script setup lang="ts" name="pagesDargBoard">
// 可拖拽到其他看板
const group = ref('mission');
const list1 = ref([
	{ name: 'aaa', id: 1 },
	{ name: 'bbb', id: 2 },
	{ name: 'ccc', id: 3 },
	{ name: 'ddd', id: 4 },
]);
const list2 = ref([
	{ name: 'eee', id: 5 },
	{ name: 'fff', id: 6 },
	{ name: 'ggg', id: 7 },
]);
const list3 = ref([
	{ name: 'hhh', id: 8 },
	{ name: 'iii', id: 9 },
	{ name: 'jjj', id: 10 },
]);
</script>
<style lang="scss">
.kanban {
	&.todo {
		.board-column-header {
			background: #4a9ff9;
		}
	}
	&.working {
		.board-column-header {
			background: #f9944a;
		}
	}
	&.done {
		.board-column-header {
			background: #2ac06d;
		}
	}
}
</style>
