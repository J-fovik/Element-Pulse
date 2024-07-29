<template>
	<div class="layout-pd">
		<el-card shadow="hover" header="分类筛选器">
			<SelectFilter :data="filterData" :default-values="filterResult" @change="changeFilter" />
			<div class="text-center">返回值: {{ filterResult }}</div>
			<el-descriptions title="配置项" :column="1" border>
				<el-descriptions-item label="data"> 需要筛选的数据列表 </el-descriptions-item>
				<el-descriptions-item label="defaultValues"> 默认选中的值 </el-descriptions-item>
			</el-descriptions>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="makeSelectFilter">
const filterResult = ref({ state: '1', type: ['3'] });
// 赋值选择值
const changeFilter = (val: typeof filterResult.value) => {
	filterResult.value = val;
};
// 数据
const filterData = [
	{
		title: '物流状态(单)',
		key: 'state',
		options: [
			{
				label: '全部',
				value: '',
			},
			{
				label: '已下单',
				value: '1',
				icon: 'ele-ShoppingCart',
			},
			{
				label: '已发货',
				value: '2',
				icon: 'ele-Van',
			},
			{
				label: '已签收',
				value: '3',
				icon: 'ele-Edit',
			},
			{
				label: '已退回',
				value: '4',
				icon: 'ele-Guide',
			},
			{
				label: '已完成',
				value: '5',
				icon: 'ele-CircleCheck',
			},
		],
	},
	{
		title: '商品类型(多)',
		key: 'type',
		multiple: true,
		options: [
			{
				label: '全部',
				value: '',
			},
			{
				label: '食品类',
				value: '1',
			},
			{
				label: '服装类',
				value: '2',
			},
			{
				label: '家具类',
				value: '3',
			},
			{
				label: '日用品类',
				value: '4',
			},
		],
	},
];
</script>
