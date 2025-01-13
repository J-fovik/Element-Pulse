<template>
	<div>
		<vue-draggable
			v-model="draggableList"
			drag-class="draggable-drag"
			handle=".draggable-drag"
			:onEnd="onEnd"
		>
			<div v-for="(item, index) in draggableList" :class="itemClass">
				<div class="flex items-center">
					<div class="flex-1">
						<slot name="row" :record="item" :rowIndex="index"></slot>
					</div>
					<div v-if="isDraggable" class="draggable-drag" style="flex-shrink: 0">
						<slot name="drag">
							<!-- 拖动 -->
							<div class="mr20 cursor-pointer">
								<i class="iconfont icon-yuelong" />
							</div>
						</slot>
					</div>
				</div>
				<div v-if="item.children">
					<slot name="children" :record="item" :rowIndex="index"></slot>
				</div>
			</div>
		</vue-draggable>
	</div>
</template>

<script setup lang="ts" name="VueDraggablePlus">
import { VueDraggable } from 'vue-draggable-plus';
// 父组件参数
const props = withDefaults(
	defineProps<{
		defaultList: Array<any>;
		itemClass?: string;
		isDraggable?: boolean;
	}>(),
	{
		defaultList: () => [],
		itemClass: '',
		isDraggable: false,
	}
);
// 拖拽列表
const draggableList = ref([...props.defaultList]);
// 父组件方法
const emits = defineEmits(['draggable']);
// 拖拽完成时触发
const onEnd = (e: any) => {
	emits('draggable', draggableList.value, e);
};
watch(
	() => props.defaultList,
	() => {
		draggableList.value = [...props.defaultList];
	},
	{ deep: true, immediate: true }
);
</script>
