<template>
	<div class="card container">
		<DargSelect v-model="value" multiple placeholder="请选择">
			<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value"
			/>
		</DargSelect>

		<div style="margin-top: 30px">
			<el-tag v-for="item of value" :key="item" style="margin-right: 15px">
				{{ item }}
			</el-tag>
		</div>
	</div>
</template>
<script setup lang="ts" name="dargSelect">
const value = ref(['Apple', 'Banana', 'Orange']);
const options = ref([
	{
		value: 'Apple',
		label: 'Apple',
	},
	{
		value: 'Banana',
		label: 'Banana',
	},
	{
		value: 'Orange',
		label: 'Orange',
	},
	{
		value: 'Pear',
		label: 'Pear',
	},
	{
		value: 'Strawberry',
		label: 'Strawberry',
	},
]);
</script>
