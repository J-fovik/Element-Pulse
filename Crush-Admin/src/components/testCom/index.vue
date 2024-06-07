<template>
	<div style="width: 100%">
		<div v-for="item in data" :key="item.key" class="select-filter-item">
			<div class="select-filter-item-title">
				<span>{{ item.title }} ：</span>
			</div>
			<ul class="select-filter-list">
				<li
					v-for="option in item.children"
					:key="option"
					:class="{
						active: option == value,
					}"
					@click="selectChange(option)"
				>
					{{ option }}
				</li>
			</ul>
		</div>
	</div>
</template>
<script setup lang="ts" name="selectFilter">
const props = withDefaults(
	defineProps<{
		value: any; //默认值
		data: Array<any>; // 数据
	}>(),
	{
		value: false,
		data: () => [],
	}
);
// 重新接收默认值
const emits = defineEmits(['change']);
const selectChange = (e: any) => {
	emits('change', e);
};
</script>
<style scoped lang="scss">
li {
	display: flex;
	align-items: center;
	padding: 5px 15px;
	margin-right: 16px;
	font-size: 13px;
	list-style: none;
	cursor: pointer;
	border-radius: 32px;
	&:hover {
		color: #ffffff;
		background: var(--el-color-primary);
		border-color: var(--el-color-primary);
		transition: 0.1s;
	}
	&.active {
		font-weight: bold;
		color: #ffffff;
		background: var(--el-color-primary);
		border-color: var(--el-color-primary);
	}
}
</style>
