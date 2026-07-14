<template>
	<el-card shadow="hover">
		<template #header>
			<!-- <div class="flex items-center justify-between">
				<div>
					<div v-if="isTitle">{{ route.meta.title as any }}</div>
				</div>
			</div> -->
		</template>
		<!-- 表单模块 -->
		<template v-if="isQueryControl">
			<div class="flex">
				<!-- 表单插槽 -->
				<div :class="collapsed ? 'flex-1' : 'formHeight'">
					<slot name="form"></slot>
				</div>
				<!-- 间隔线 -->
				<div style="width: 1px; margin: 0 20px; background-color: #e5e6eb"></div>
				<!-- 查询重置按钮 -->
				<div class="flex flex-col">
					<el-space :direction="collapsed ? 'horizontal' : 'horizontal'">
						<el-button type="primary" :icon="Search" @click="emits('search')">
							查询
						</el-button>
						<el-button :icon="Delete" @click="emits('resetSearch')"> 重置 </el-button>
						<div v-if="fold" class="flex items-center justify-end">
							<el-button type="primary" link @click="setCollapsed(!collapsed)">
								<el-icon class="mr5"
									><ArrowUpBold v-if="collapsed" /><ArrowDownBold v-else />
								</el-icon>
								{{ collapsed ? '折叠' : '展开' }}
							</el-button>
						</div>
					</el-space>
				</div>
			</div>
			<el-divider />
		</template>
		<!-- 表单模块 -->
		<!-- 操作模块 -->
		<template v-if="isOperateControl">
			<div class="flex items-center justify-between">
				<!-- 操作插槽 -->
				<div class="flex items-center">
					<div
						style="
							width: 4px;
							height: 20px;
							background: #1e5eff;
							display: block;
							border-radius: 2px;
						"
					></div>
					<div v-if="isTitle" class="font20" style="font-weight: bold; margin-left: 8px">
						{{ title ? title : (route.meta.title as any) }}
					</div>
				</div>
				<div><slot name="operateRight"></slot></div>
				<!-- <div v-if="isTool" class="ml20">
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
							<el-icon><Tools /></el-icon>
						</template>
						<template #default>
							<el-scrollbar>
								<div ref="toolSetRef" class="tool-sortable">
									<div
										class="tool-sortable-item"
										v-for="(v, i) in tableColumns"
										:key="v.key"
										:data-key="v.key"
									>
										<el-icon><Menu /></el-icon>
										<el-checkbox
											v-model="v.show"
											class="ml12"
											:label="
												v.title.length > 8
													? v.title.substring(0, 8) + '...'
													: v.title
											"
										/>
									</div>
								</div>
							</el-scrollbar>
						</template>
					</el-popover>
				</div> -->
			</div>
		</template>
		<!-- 操作模块 -->
		<div class="mt10">
			<!-- 表格插槽 -->
			<slot name="table"></slot>
		</div>
		<!-- 分页插槽 -->
		<div class="flex items-center justify-between p15">
			<slot name="pagination"></slot>
		</div>
	</el-card>
</template>

<script lang="ts" setup name="CustomTableMould">
import { Delete, Search } from '@element-plus/icons-vue';
import { useBasicsState } from '@/hooks';
const route = useRoute();
// 父组件参数
const props = withDefaults(
	defineProps<{
		fold?: boolean; // 是否开启折叠控制
		isQueryControl?: boolean; // 是否展示表单模块
		isOperateControl?: boolean; // 是否展示操作模块
		isTool?: boolean; // 是否展示工具
		isTitle?: boolean; // 是否展示标题
		tableColumns?: Array<any>; // 列展示
		title?: string; // 标题
	}>(),
	{
		fold: false,
		isQueryControl: true,
		isOperateControl: true,
		isTool: true,
		isTitle: true,
		tableColumns: () => [],
		title: '',
	},
);
// 展开折叠控制
const isCollapsed = ref(false);
// 控制折叠
const [collapsed, setCollapsed] = useBasicsState<boolean>(isCollapsed.value);
// 父组件方法
const emits = defineEmits(['resetSearch', 'search']);
</script>
<style lang="scss" scoped>
:deep(.el-card__header) {
	border-bottom: none;
	padding: 10px 20px !important;
}
:deep(.el-card__body) {
	padding: 0 20px 0;
}
:deep(.el-card) {
	border: none !important;
	-el-card-border-color: none !important;
}
.formHeight {
	height: 40px;
	overflow: hidden;
	flex: 1;
}
:deep(.el-divider--horizontal) {
	margin: 5px 0;
}
</style>
