<template>
	<div class="rounded bg-black">
		<div class="grid-box">
			<div class="grid-item" v-for="(item, index) in list" :key="index">
				{{ item }}
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue';
const num = ref('hello');
const list = new Array(38).fill(num.value);
</script>
<style scoped>
.grid-box {
	display: grid;
	width: 100%;
	padding: 20px;
	/* 自动填充，每列宽度 */
	grid-template-columns: repeat(auto-fill, 200px);
	/* 间隙 */
	gap: 20px;
	flex-wrap: wrap;
	justify-content: space-around;
}
.grid-item {
	background-color: rgb(191, 194, 194);
	width: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 200px;
}
.grid-item:hover {
	background-color: aqua;
}
</style>
