<template>
	<draggable
		v-model="gridList"
		class="card grid-container"
		item-key="id"
		animation="300"
		chosen-class="chosen"
		force-fallback="true"
	>
		<template #item="{ element }">
			<div :class="'item' + ' ' + 'item-' + element.num">
				<!-- 例：class="item item-1" -->
				{{ element.num }}
			</div>
		</template>
	</draggable>
</template>

<script setup lang="ts" name="draggable">
import draggable from 'vuedraggable';

const gridList = ref([
	{ id: 1, num: 1 },
	{ id: 2, num: 2 },
	{ id: 3, num: 3 },
	{ id: 4, num: 4 },
	{ id: 5, num: 5 },
	{ id: 6, num: 6 },
	{ id: 7, num: 7 },
	{ id: 8, num: 8 },
	{ id: 9, num: 9 },
]);
</script>

<style scoped lang="scss">
.grid-container {
	display: grid;
	grid-template-rows: 33.3% 33.3% 33.3%;
	grid-template-columns: 33.3% 33.3% 33.3%;
	height: 100%;
	.item {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 25px;
		color: #ffffff;
		cursor: move;
		border: 1px solid #e5e4e9;
	}
}
.item-1 {
	background-color: #87bba2;
}
.item-2 {
	background-color: #ff9b54;
}
.item-3 {
	background-color: #73628a;
}
.item-4 {
	background-color: #76c893;
}
.item-5 {
	background-color: #619b8a;
}
.item-6 {
	background-color: #55828b;
}
.item-7 {
	background-color: #427aa1;
}
.item-8 {
	background-color: #38a3a5;
}
.item-9 {
	background-color: #fcca46;
}
.chosen {
	border: 2px solid #89cffd !important;
}
</style>
