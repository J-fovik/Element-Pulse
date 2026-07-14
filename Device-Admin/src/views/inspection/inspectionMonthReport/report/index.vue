<template>
	<div>
		<CustomTableMould
			:table-columns="columnsData"
			:title="reportTitle"
			@reset-search="resetForm"
			@search="resetData"
		>
			<template #form>
				<el-form :model="form" label-position="left" label-width="auto">
					<el-row :gutter="24">
						<el-col :span="4">
							<el-form-item label="月份">
								<el-date-picker
									v-model="form.date"
									type="month"
									:clearable="false"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="状态">
								<el-select v-model="form.mode" filterable clearable>
									<el-option
										v-for="dict in dictionaryStore.getDictionaryInfo(
											'INSPECTION_REPORT_STATUS',
										)"
										:key="dict.value"
										:label="dict.label"
										:value="dict.value"
									/>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</template>
			<template #operateRight>
				<el-space>
					<el-dropdown trigger="click">
						<el-button type="primary" :icon="ArrowDown"> 批量操作 </el-button>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item>
									<el-button
										type="primary"
										link
										:icon="Upload"
										@click="getExportData"
									>
										导出
									</el-button>
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</el-space>
			</template>
			<template #table>
				<div class="stats-bar">
					<span class="stat-item">
						📋点检记录数
						<strong>{{ tableData.checkNo }}</strong>
					</span>
					<span class="stat-item">
						✅完成率
						<strong>{{ tableData.finishRate }}%</strong>
					</span>
					<span class="stat-item">
						✅正常完成
						<strong>{{ tableData.finishNo }}</strong>
					</span>
					<span class="stat-item">
						<span class="color-boxs">!</span>异常完成
						<strong>{{ tableData.errNo }}</strong>
					</span>
					<span class="stat-item">
						❌漏检数
						<strong>{{ tableData.omissionNo }}</strong>
					</span>
				</div>
				<!-- <el-card>
					<div class="stats-row">
						<div class="stat-card highlight">
							<span class="stat-label">📋 总点检项</span>
							<div class="stat-value">
								{{ tableData.checkNo }} <span class="sub">项次</span>
							</div>
						</div>
						<div class="stat-card success">
							<span class="stat-label">✅ 完成率</span>
							<div class="stat-value">{{ tableData.finishRate }}%</div>
						</div>
						<div class="stat-card success">
							<span class="stat-label">✅ 正常完成</span>
							<div class="stat-value">
								{{ tableData.finishNo }} <span class="sub">项次</span>
							</div>
						</div>
						<div class="stat-card danger">
							<span class="stat-label">⚠️ 异常完成</span>
							<div class="stat-value">
								{{ tableData.errNo }} <span class="sub">项次</span>
							</div>
						</div>
						<div class="stat-card info">
							<span class="stat-label">❌ 漏检数</span>
							<div class="stat-value">
								{{ tableData.omissionNo }} <span class="sub">项次</span>
							</div>
						</div>
					</div>
				</el-card> -->
				<el-table
					border
					:data="tableData.items"
					v-loading="loading"
					:span-method="arrayMethod"
					height="70vh"
					stripe
					style="width: 100%"
				>
					<template v-for="(item, index) in tableData.header" :key="index">
						<el-table-column
							:label="item.value"
							align="center"
							:prop="item.key"
							:tooltip="true"
							:width="[1, 2].includes(index as any) ? 200 : undefined"
						>
							<template
								v-if="![0, 1, 2].includes(index as any)"
								#default="{ row, $index }"
							>
								<span
									v-if="row['day' + (Number(index) - 2)] == 1"
									class="dot-status completed"
									title="点击查看详情"
									@click="
										setSelectRow(row.items[Number(index) - 3], () =>
											setActiveKey('AddEditor'),
										)
									"
									>✓</span
								>
								<span
									v-else-if="row['day' + (Number(index) - 2)] == 2"
									class="dot-status abnormal"
									title="点击查看详情"
									@click="
										setSelectRow(row.items[Number(index) - 3], () =>
											setActiveKey('AddEditor'),
										)
									"
									>!
								</span>
								<span
									v-else-if="row['day' + (Number(index) - 2)] == 3"
									class="dot-status completed-late"
									title="点击查看详情"
									@click="
										setSelectRow(row.items[Number(index) - 3], () =>
											setActiveKey('AddEditor'),
										)
									"
									>⏰</span
								>
								<span
									v-else-if="row['day' + (Number(index) - 2)] == 4"
									class="dot-status pending"
								></span>
								<span
									v-else-if="row['day' + (Number(index) - 2)] == 5"
									class="dot-status"
									>❌
									<!-- missed -->
								</span>
								<span v-else class="dot-status pending"></span>
							</template>
						</el-table-column>
					</template>
				</el-table>
				<!-- <div class="legend-bar">
					<span style="font-weight: 500; color: #1d2129">📌 图例：</span>
					<span class="legend-item"
						><span class="color-box completed"></span> 正常完成</span
					>
					<span class="legend-item"
						><span class="color-box abnormal"></span> 异常完成（⚠️ 计入完成率）</span
					>
					<span class="legend-item"
						><span class="color-box completed-late"></span> 补录/超时</span
					>
					<span class="legend-item"
						><span class="color-box missed"></span> 漏检（❌ 不计入完成率）</span
					>
					<span class="legend-item"><span class="color-box pending"></span> 待检</span>
					<span
						style="margin-left: auto; color: #ff4d4f; font-size: 12px; font-weight: 500"
					>
						⚠️ 异常完成已计入完成率，请重点关注设备状态
					</span>
				</div> -->

				<!-- ===== 底部统计 ===== -->
				<!-- <div class="table-footer">
					<span
						>共 <strong>{{ tableData.deviceNo }}</strong> 台设备 ·
						<strong>{{ tableData.itemNo }}</strong> 个点检项 ·
						<strong>{{ tableData.checkNo }}</strong> 项点检记录</span
					>
					<span class="completion-legend">
						<span class="label">完成数口径：</span>
						<span class="dot-example green"></span> 正常完成
						<span style="color: #86909c">+</span>
						<span class="dot-example red"></span> 异常完成
						<span style="color: #86909c">=</span>
						<span style="font-weight: 600; color: #1d2129">完成数</span>
					</span>
				</div> -->
			</template>
		</CustomTableMould>
		<!-- 新增编辑详情 -->
		<AddEditor
			v-if="activeKey === 'AddEditor'"
			:data="selectRow"
			@success="initData"
			@close="setSelectRow({}, () => setActiveKey(null))"
		></AddEditor>
	</div>
</template>
<script setup lang="ts" name="report">
import dayjs from 'dayjs';
import {
	CirclePlus,
	Edit,
	Delete,
	Search,
	ArrowDown,
	MoreFilled,
	Upload,
} from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { createTableColumns } from './table'; // 表头配置
import {
	useForm,
	useTable,
	useBasicsState,
	curryingRequest,
	useAsyncNoInitData,
	curryingRequestUrl,
	URL,
	useAsyncData,
} from '@/hooks';
import { export_json_to_excel } from '@/utils';
import { dateFormat } from '@/utils/commonFunction';
import { useDictionaryStore } from '@/stores';
import AddEditor from './components/AddEditor.vue';

const dictionaryStore = useDictionaryStore();
const route = useRoute();
const reportTitle = ref(route.query.title || '点检结果月度报表') as unknown as string;
console.log(route.path.split('/').pop());
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 表单hooks
const { form, resetForm } = useForm(
	() => ({
		date: dayjs().format('YYYY-MM'),
		mode: '',
	}),
	() => resetData(),
);
// 表格hooks
const {
	tableRef, // 表格实例
	selectRow, // 当前选中的值
	columnsData, // 表头设置
	visibleColumnsData, //表格的列描述信息
	tableBaseOptions, //基础表格设置
	onPageSizeChange, // 改变每页数量
	onCurrentChange, // 改变当前页码
	resetData, // 重置分页筛选
	setSelectRow, // 设置当前数据
	extendTableList, // 处理表格数据
	handleSelectionChange, // 多选
} = useTable(createTableColumns(), () => initData());
/**
 * 将 items 数组转换为 day1, day2... 格式的对象
 * @param {Array} items - 包含 {day, status} 的数组
 * @returns {Object} - 转换后的对象，键为 day1, day2...，值为 status
 */
function transformItemsToDayObject(items) {
	return items.reduce((acc, item) => {
		// 创建键名，如 day1, day2
		const key = `day${item.day}`;
		// 将 status 赋值给对应的键
		acc[key] = item.status;
		return acc;
	}, {}); // 初始值为空对象
}
// 获取列表
const {
	data: tableData,
	loading,
	initData,
} = useAsyncNoInitData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.INSPECTION.QUERY_REPORT,
		params: {
			...form.value,
			nodeId: route.query.id,
			date: dateFormat(form.value.date, 'YYYY-MM', ''),
		},
		method: 'get',
	});
	if (err) return;
	return {
		...res?.content,
		header: res?.content.header.map((item, index) => {
			return {
				...item,
				key:
					index == 0
						? 'no'
						: index == 1
							? 'deviceName'
							: index == 2
								? 'checkItemName'
								: 'day' + (index - 3 + 1),
			};
		}),
		items: res?.content.items.map((item) => {
			// 提取 day 数据并转换为对象
			const dayData = transformItemsToDayObject(item.items);
			// 返回新对象，包含原始属性和提取的 day 数据
			return {
				...item,
				...dayData,
			};
		}),
		mergeColumnNames: [
			{
				title: '设备',
				key: 'deviceName',
			},
			{
				title: '序号',
				key: 'no',
			},
		],
	};
});
// 获取数据列表
const getExportData = async (columns) => {
	var header: any[] = [];
	console.log(tableData.value.items);
	tableData.value.header.map((item) => {
		header.push({ key: item.key, title: item.value });
	});
	var itemData: any[] = [];
	tableData.value.items.map((item) => {
		var tempItem = JSON.parse(JSON.stringify(item));
		for (var i = 1; i <= 31; i++) {
			var fieldName = 'day' + i;
			const oldValue = tempItem[fieldName];
			console.log(fieldName);
			var newValue = '';
			switch (oldValue) {
				case 1:
					newValue = '正常完成';
					break;
				case 2:
					newValue = '异常完成';
					break;
				case 3:
					newValue = '超时补录';
					break;
				case 4:
					newValue = '待检';
					break;
				case 5:
					newValue = '漏检';
					break;
				default:
					newValue = '待检';
					break;
			}
			tempItem[fieldName] = newValue;
		}
		itemData.push(tempItem);
	});
	return exportData(itemData, header, `点检结果月报_${new Date().getTime()}`);
};

/**
 * 导出Excel处理函数
 * @param {Array} data - 表格数据源
 * @param {Array} columns - 表头配置
 * @param {String} fileName - 文件名
 */
const exportData = (data, columns, fileName) => {
	if (!data || data.length === 0) {
		ElMessage.warning('暂无数据可导出');
		return;
	}
	// 1. 过滤掉不需要导出的列
	const exportColumns = columns.filter(
		(col) => col.key !== 'operate' && col.key !== 'sortTableNo',
	);
	// 2. 构造表头
	const header = exportColumns.map((col) => col.title);
	// 3. 构造数据体
	const exportRows = data.map((row) => {
		return exportColumns.map((col) => {
			const value = row[col.key]; // 获取原始值
			if (col.key === 'warnLevel') {
				const cur = dictionaryStore.getDictionaryItem('warning_level', row[col.key]);
				return cur.label;
			}
			return value;
		});
	});
	// 5. 调用导出
	export_json_to_excel({
		header,
		data: exportRows,
		filename: fileName,
	});
};
//  为每个合并列独立生成合并映射
const spanMapMap = computed(() => {
	const list = tableData.value?.items || [];
	const mergeKeys = tableData.value?.mergeColumnNames?.map((item) => item.key) || [];
	if (!list.length || !mergeKeys.length) return {};

	const result = {};
	for (const key of mergeKeys) {
		const map = {};
		let i = 0;
		while (i < list.length) {
			let j = i + 1;
			const currentVal = list[i][key];
			// 向后查找连续相同的值（使用严格相等，注意 null/undefined 处理）
			while (j < list.length && list[j][key] === currentVal) {
				j++;
			}
			map[i] = j - i;
			i = j;
		}
		result[key] = map;
	}
	return result;
});
//  合并单元格方法
const arrayMethod = ({ row, column, rowIndex, columnIndex }) => {
	const mergeKeys = tableData.value?.mergeColumnNames?.map((item) => item.key) || [];
	// 获取当前列绑定的字段名（使用 column.property 更可靠）
	const colKey = column.property || column.rawColumnKey;
	if (mergeKeys.includes(colKey)) {
		const map = spanMapMap.value[colKey];
		if (map && map[rowIndex] !== undefined) {
			return { rowspan: map[rowIndex], colspan: 1 };
		} else {
			return { rowspan: 0, colspan: 0 }; // 被合并的行隐藏该列单元格
		}
	} else {
		// 非合并列正常显示
		return { rowspan: 1, colspan: 1 };
	}
};
onActivated(() => {
	initData();
	setTimeout(() => {
		console.log(tableData.value);
	}, 1000);
});
</script>
<style scoped lang="scss">
/* ===== 统计条 ===== */
.stats-bar {
	display: flex;
	gap: 28px;
	background: #f7faff;
	padding: 12px 24px;
	border-radius: 60px;
	margin-bottom: 5px;
	border: 1px solid #e9eff8;
	flex-wrap: wrap;
}
.stats-bar .stat-item {
	font-size: 14px;
	color: #1d2c48;
	display: flex;
	align-items: center;
	gap: 4px;
}
.stats-bar .stat-item i {
	color: #2a6df4;
	width: 18px;
	text-align: center;
}
.stats-bar .stat-item strong {
	font-weight: 600;
	color: #0b1a33;
}
.custom-tabs-label {
	display: flex;
	align-items: center;
}
/* ===== 状态点 ===== */
.dot-status {
	display: inline-block;
	width: 26px;
	height: 26px;
	border-radius: 4px;
	font-size: 12px;
	line-height: 26px;
	text-align: center;
	font-weight: 700;
	cursor: default;
}

.dot-status.completed {
	background: #52c41a;
	color: #fff;
	cursor: pointer;
}
.color-boxs {
	width: 15px;
	height: 15px;
	border-radius: 4px;
	line-height: 15px;
	text-align: center;
	background: #ff4d4f;
	color: #fff;
	/* 初始状态保持一个基础阴影，移除多重 box-shadow */
	// box-shadow:
	// 	0 0 0 2px #ff4d4f,
	// 	0 0 0 4px #ffccc7;
	// transition: transform 0.3s ease;
	// animation: pulse-abnormal 1.5s ease-in-out infinite;
	cursor: pointer;
}
.dot-status.abnormal {
	background: #ff4d4f;
	color: #fff;
	/* 初始状态保持一个基础阴影，移除多重 box-shadow */
	box-shadow:
		0 0 0 2px #ff4d4f,
		0 0 0 4px #ffccc7;
	/* 添加 transition 让动画更平滑（可选） */
	transition: transform 0.3s ease;
	animation: pulse-abnormal 1.5s ease-in-out infinite;
	cursor: pointer;
}
@keyframes pulse-abnormal {
	0%,
	100% {
		/* 缩小到原始大小 */
		transform: scale(0.7);
		/* 可以保留原有的阴影，或者让它跟随缩小 */
		box-shadow:
			0 0 0 2px #ff4d4f,
			0 0 0 4px #ffccc7;
	}
	50% {
		/* 放大到 1.2 倍 */
		transform: scale(0.9);
		/* 如果希望阴影也跟着变化，可以在这里修改，否则可以删除让阴影保持固定 */
		box-shadow:
			0 0 0 2px #ff4d4f,
			0 0 0 4px #ffa39e;
	}
}

// .dot-status.abnormal {
// 	background: #ff4d4f;
// 	color: #fff;
// 	box-shadow:
// 		0 0 0 2px #ff4d4f,
// 		0 0 0 4px #ffccc7;
// 	animation: pulse-abnormal 1.5s ease-in-out infinite;
// }

// @keyframes pulse-abnormal {
// 	0%,
// 	100% {
// 		box-shadow:
// 			0 0 0 2px #ff4d4f,
// 			0 0 0 4px #ffccc7;
// 	}
// 	50% {
// 		box-shadow:
// 			0 0 0 2px #ff4d4f,
// 			0 0 0 8px #ffa39e;
// 	}
// }

.dot-status.completed-late {
	background: #faad14;
	color: #fff;
	cursor: pointer;
}

.dot-status.missed {
	background: #1890ff;
	color: #fff;
}

.dot-status.pending {
	background: #ccc;
	color: #8c8c8c;
}
.stats-row {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 16px;
	margin-bottom: 10px;
	margin-top: 10px;
}

.stat-card {
	background: #fff;
	border-radius: 12px;
	padding: 16px 20px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
	display: flex;
	flex-direction: column;
}
.stat-card .stat-label {
	font-size: 13px;
	color: #86909c;
	font-weight: 450;
}
.stat-card .stat-value {
	font-size: 28px;
	font-weight: 700;
	color: #1d2129;
	margin-top: 4px;
	display: flex;
	align-items: baseline;
	gap: 8px;
}
.stat-card .stat-value .sub {
	font-size: 14px;
	font-weight: 400;
	color: #86909c;
}
.stat-card .stat-value .trend {
	font-size: 13px;
	font-weight: 500;
	padding: 0 10px;
	border-radius: 30px;
	background: #e8f5e9;
	color: #2e7d32;
}

.stat-card.highlight {
	border: 2px solid #e5e6eb;
	border-left: 4px solid #165dff;
}
.stat-card.success {
	border: 2px solid #e5e6eb;
	border-left: 4px solid #00b42a;
}
.stat-card.warning {
	border: 2px solid #e5e6eb;
	border-left: 4px solid #ff7d00;
}
.stat-card.danger {
	border: 2px solid #e5e6eb;
	border-left: 4px solid #f53f3f;
}
.stat-card.info {
	border: 2px solid #e5e6eb;
	border-left: 4px solid #86909c;
}
/* ===== 图例 ===== */
.legend-bar {
	display: flex;
	align-items: center;
	gap: 20px;
	padding: 12px 24px;
	background: #fafbfc;
	border-top: 1px solid #f0f0f0;
	font-size: 13px;
	color: #4e5a6b;
	flex-wrap: wrap;
}

.legend-item {
	display: flex;
	align-items: center;
	gap: 6px;
}

.legend-item .color-box {
	width: 20px;
	height: 20px;
	border-radius: 4px;
}

.legend-item .color-box.completed {
	background: #52c41a;
}
.legend-item .color-box.abnormal {
	background: #ff4d4f;
	box-shadow:
		0 0 0 1px #ff4d4f,
		0 0 0 2px #ffccc7;
}
.legend-item .color-box.completed-late {
	background: #faad14;
}
.legend-item .color-box.missed {
	background: #1890ff;
}
.legend-item .color-box.pending {
	background: #d9d9d9;
}

/* ===== 当前点检表信息 ===== */
.current-sheet-info {
	font-size: 14px;
	color: #4e5a6b;
	background: #f7f8fa;
	padding: 8px 16px;
	border-radius: 6px;
	display: inline-flex;
	align-items: center;
	gap: 8px;
}

.current-sheet-info strong {
	color: #1d2129;
}

/* ===== 底部统计 ===== */
.table-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 24px;
	background: #fafbfc;
	border-top: 1px solid #f0f0f0;
	font-size: 13px;
	color: #86909c;
}

.completion-legend {
	display: flex;
	align-items: center;
	gap: 16px;
	font-size: 13px;
	color: #1d2129;
}

.completion-legend .label {
	color: #86909c;
}

.completion-legend .dot-example {
	display: inline-block;
	width: 14px;
	height: 14px;
	border-radius: 3px;
	margin-right: 4px;
}

.completion-legend .dot-example.green {
	background: #52c41a;
}
.completion-legend .dot-example.red {
	background: #ff4d4f;
}
</style>
