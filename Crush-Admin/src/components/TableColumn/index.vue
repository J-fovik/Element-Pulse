<template>
	<el-table-column v-bind="column">
		<template v-if="column.children && column.children.length" #default>
			<TableColumn v-for="(child, index) in column.children" :key="index" :column="child" />
		</template>
	</el-table-column>
</template>

<script lang="ts" setup name="TableColumn">
import type { VNode } from 'vue';
// 显式定义组件名称（用于递归自引用）
defineOptions({ name: 'TableColumn' });
class Option {
	value: any;
}
interface ITableColumn {
	label?: string;
	prop?: string;
	width?: string | number;
	children?: ITableColumn[];
	render?: (h: any, params: any) => VNode;
	showOverflowTooltip?: boolean;
	align?: 'left' | 'center' | 'right';
	fixed?: boolean | string;
	type?: 'selection' | 'index' | 'expand';
	sortable?: boolean | 'custom';
	className?: string;
	'min-width'?: string | number;
	slot?: string;
	editable?: boolean;
	editor?: 'input' | 'date' | 'number' | 'switch' | 'list' | 'color';
	options?: Option[];
	min?: any;
	max?: any;
	precision?: number;
	filters?: any[];
	filterMethod?: any;
	columnKey?: string;
	switchActive?: boolean | number | string;
	switchInactive?: boolean | number | string;
	formatter?: (row: any, column: any, cellValue: any, index: number) => string | VNode;
}

type Props = {
	column: ITableColumn;
};

const props = withDefaults(defineProps<Props>(), {
	column: () => [] as ITableColumn,
});
export type { ITableColumn };
</script>
