<template>
	<div class="flex flex-col layout-main bg-table">
		<div class="flex px15 pt15">
			<div :class="collapsed ? 'flex-1' : 'formHeight'">
				<slot name="form"></slot>
			</div>
			<!-- 间隔线 -->
			<div style="width: 1px; margin: 0 20px; background-color: #e5e6eb"></div>
			<div class="flex items-center flex-col">
				<!-- 折叠/展开 -->
				<template v-if="fold">
					<el-button type="primary" link size="small" @click="setCollapsed(!collapsed)">
						<el-icon><ele-ArrowUpBold v-if="collapsed" /> <ele-ArrowDownBold v-else /></el-icon>
						{{ collapsed ? '折叠' : '展开' }}
					</el-button>
				</template>
				<div class="flex items-center justify-center" :class="collapsed ? 'flex-col marginStyle' : ''">
					<el-button type="primary" size="default" @click="emits('search')">
						<el-icon>
							<ele-Search />
						</el-icon>
						查询
					</el-button>
					<el-button type="primary" :class="collapsed ? 'marginStyle' : ''" size="default" @click="emits('resetSearch')">
						<el-icon>
							<ele-Refresh />
						</el-icon>
						重置
					</el-button>
				</div>
			</div>
		</div>
		<el-divider />
		<div style="margin: 0 0 20px" class="flex items-center px15">
			<slot name="operate"></slot>
		</div>
		<div class="table-container mt10">
			<slot name="table"></slot>
		</div>
		<div class="flex items-center justify-between p15">
			<slot name="pagination"></slot>
			<div>
				<el-popover
					placement="top-end"
					title="列展示"
					trigger="click"
					transition="el-zoom-in-top"
					popper-class="table-tool-popper"
					:width="200"
					:persistent="false"
				>
					<template #reference>
						<SvgIcon name="iconfont icon-quanjushezhi_o" :size="22" title="设置" />
					</template>
					<template #default>
						<el-scrollbar>
							<div ref="toolSetRef" class="tool-sortable">
								<div class="tool-sortable-item" v-for="(v, i) in tableColumns" :key="v.key" :data-key="v.key">
									<SvgIcon name="iconfont icon-8_round_solid" :size="16" title="列展示" />
									<el-checkbox
										v-model="v.show"
										size="default"
										class="ml12"
										:label="v.title.length > 8 ? v.title.substring(0, 8) + '...' : v.title"
									/>
								</div>
							</div>
						</el-scrollbar>
					</template>
				</el-popover>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup name="customTable">
import { useBasicsState } from '/@/hooks';
// 父组件参数
const props = withDefaults(
	defineProps<{
		fold?: boolean; // 是否开启折叠控制
		isCollapsed?: boolean; // 是否开启折叠控制
		tableColumns?: Array<any>; // 列展示
	}>(),
	{
		fold: false,
		isCollapsed: false,
		tableColumns: () => [],
	}
);
// 控制折叠
const [collapsed, setCollapsed] = useBasicsState<boolean>(props.isCollapsed);
// 父组件方法
const emits = defineEmits(['resetSearch', 'search']);
</script>
<style lang="scss">
.bg-table{
	background-color: var(--next-bg-table-color) !important
}
.formHeight {
	height: 40px;
	overflow: hidden;
	flex: 1;
}
.marginStyle {
	margin-top: 10px;
	margin-left: 0px !important;
}
/* 表格自适应 */
.table-container {
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: auto; // 确保表格区域可以滚动
}
</style>
