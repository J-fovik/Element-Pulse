/**
 * @name 菜单表格(表格,表单)
 */

import type { FormInstance } from 'element-plus';
import type { UnwrapRef } from 'vue';

// 定义类型
export interface TableCustomColumnData {
	show?: boolean;
	title: string;
	key: string;
	width?: number;
	tooltip?: boolean;
	align?: string;
	headerAlign?: string;
	slotName?: string;
	fixed?: string;
	formatter?: (record: any) => any;
	renderHeader?: (record: any) => any;
}

// 表格封装
export const useTable = (columns: TableCustomColumnData[], callBack: () => void) => {
	// 表头设置
	const columnsData = ref<TableCustomColumnData[]>(columns);
	// 表格实例
	const tableRef = ref(null);
	//  当前选中的值
	const selectRow = shallowRef<any>({});
	// 基础表格设置
	const tableBaseOptions = reactive({
		bordered: false, // 带边框
		stripe: false, // 带斑马纹
		selectedKeys: [], // 存储多选数组
		pagination: {
			total: 1, // 总页数
			current: 1, // 当前页
			pageSize: 5, // 每页数量
			sizeList: [5, 10, 20, 30], // 可选择页码数量
			pagerCount: 5, // 最大页码按钮的数量（超过时折叠）
		},
	});
	// 改变当前页
	const onCurrentChange = (current: number) => {
		tableBaseOptions.pagination.current = current;
		// 回调获取数据
		callBack();
	};
	// 改变页码数量
	const onPageSizeChange = (size: number) => {
		tableBaseOptions.pagination.current = 1;
		tableBaseOptions.pagination.pageSize = size;
		// 回调获取数据
		callBack();
	};
	// 多选
	const handleSelectionChange = (e: any) => {
		tableBaseOptions.selectedKeys = e;
	};
	// 可见的表格头
	const visibleColumnsData = computed(() => columnsData.value.filter((item) => !!item.show));
	// 重置分页筛选
	const resetData = () => {
		//  重置分页信息
		tableBaseOptions.pagination.current = 1;
		// 回调获取数据
		callBack();
	};
	// 设置当前数据
	const setSelectRow = (row: any, callBack?: () => void) => {
		selectRow.value = row; // 赋值当前数据
		if (callBack) callBack();
	};
	// 处理表格数据
	const extendTableList = (list: Array<any>) => {
		return list.map((item, index) => {
			return {
				...item,
				sortTableNo: createRowNo(index),
			};
		});
	};
	// 生成序号
	const createRowNo = (index: number) => {
		return (
			index +
			1 +
			(tableBaseOptions.pagination.current - 1) * tableBaseOptions.pagination.pageSize
		);
	};
	// 暴露API
	return {
		tableRef, // 表格实例
		columnsData, // 表头数据
		visibleColumnsData, // 可见的表格头
		selectRow, //  当前选中的值
		tableBaseOptions, // 基础表格设置
		onCurrentChange, // 改变当前页
		onPageSizeChange, // 改变页码数量
		extendTableList, // 处理表格数据
		createRowNo, // 生成序号
		setSelectRow, // 设置当前数据
		resetData, // 重置分页筛选
		handleSelectionChange, // 多选
	};
};

// 封装表单
export const useForm = <T = any>(
	originalForm: () => T,
	callback?: () => void
): {
	form: Ref<UnwrapRef<T>>; // 表单
	formRef: Ref<any>; // 表单实例
	resetForm: () => void; // 重置表单
	formPlaceholder: (value: string, queryName?: string) => string; // 表单占位提示
	restoreValidationForm: () => void; // 清除验证
} => {
	// 查看路由信息
	const route = useRoute();
	// 响应式的form
	const form = ref(originalForm());
	// formRef
	const formRef = ref<FormInstance>();
	// 重置form
	const resetForm = () => {
		form.value = originalForm() as UnwrapRef<T>;
		if (callback) callback();
	};
	// 表单占位符控制(用于禁用时不展示占位符)
	const formPlaceholder = (value: string, queryName?: string) => {
		// 默认query参数为 isReadOnly
		queryName = queryName || 'isReadOnly';
		return !!route.query[queryName] ? '' : value;
	};
	// 清除验证
	const restoreValidationForm = () => {
		formRef?.value?.clearValidate();
	};
	// 暴露api
	return {
		form,
		formRef,
		resetForm,
		formPlaceholder,
		restoreValidationForm,
	};
};
