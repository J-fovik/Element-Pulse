<template>
	<div>
		<el-card shadow="hover" header="VueDraggablePlus 拖拽组件" class="mb20">
			<el-alert
				title="感谢优秀的 `vue-draggable-plus`，本 Demo 是基于：https://gitcode.com/gh_mirrors/vu/vue-draggable-plus?utm_source=highlight_word_gitcode&word=vue-draggable-plus"
				type="warning"
				:closable="false"
			/>
			<div class="mt20">
				<VueDraggablePlus
					:default-list="appMenus"
					:is-draggable="true"
					item-class="bg-white px20 py5"
				>
					<template #row="{ record }">
						<div style="color: #333">{{ record.title }}</div>
					</template>
					<template #children="{ record }">
						<VueDraggablePlus
							:default-list="record.children"
							:is-draggable="true"
							item-class="bg-white ml30"
						>
							<template #row="{ record }">
								<div style="color: #333">{{ record.title }}</div>
							</template>
						</VueDraggablePlus>
					</template>
				</VueDraggablePlus>
			</div>
			<el-descriptions :column="1" border class="mt20">
				<el-descriptions-item label="default-list">拖拽数组</el-descriptions-item>
				<el-descriptions-item label="is-draggable">是否可以推拽</el-descriptions-item>
				<el-descriptions-item label="item-class">每列的颜色</el-descriptions-item>
				<el-descriptions-item label="@draggable">拖拽完成时触发</el-descriptions-item>
			</el-descriptions>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="drag">
import { appMenus } from '@/routers/base';
</script>
