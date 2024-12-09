<template>
	<Container></Container>
</template>

<script setup lang="ts" name="menu1">
import { partitionObject, groupByAndMergeChildArrays } from '@/utils/arrayOperation';
const items = [
	{ yxmc: 'A', zySeq: 1 },
	{ yxmc: 'B', zySeq: 2 },
	{ yxmc: 'A', zySeq: 3 },
];

const groupedItems = groupByAndMergeChildArrays(items, 'yxmc', 'children', 'zySeq');
console.log(groupedItems);
</script>
<style scoped lang="scss"></style>
