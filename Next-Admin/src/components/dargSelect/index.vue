<template>
	<el-select ref="dragSelect" v-model="selectVal" v-bind="$attrs" class="drag-select" multiple>
		<slot />
	</el-select>
</template>

<script setup name="dargSelect">
import Sortable from 'sortablejs';
// 接受父组件参数
const props = defineProps({
	modelValue: {
		type: Array,
		required: true,
	},
});
// 传递给父组件
const emit = defineEmits(['update:modelValue']);
// 计算选中值
const selectVal = computed({
	get: () => [...props.modelValue],
	set: (val) => emit('update:modelValue', [...val]),
});
// 排序下拉框实例
const dragSelect = ref(null);

// 排序
const setSort = () => {
	const el = dragSelect.value.$el.querySelectorAll('.el-select__tags > span')[0];
	Sortable.create(el, {
		ghostClass: 'sortable-ghost',
		setData: function (dataTransfer) {
			dataTransfer.setData('Text', '');
		},
		onEnd: (evt) => {
			const targetRow = props.modelValue.splice(evt.oldIndex, 1)[0];
			props.modelValue.splice(evt.newIndex, 0, targetRow);
			emit('update:modelValue', props.modelValue);
		},
	});
};
onMounted(() => {
	setSort();
});
</script>

<style lang="scss" scoped>
.drag-select {
	::v-deep {
		.sortable-ghost {
			opacity: 0.8;
			color: #fff !important;
			background: #42b983 !important;
		}

		.el-tag {
			cursor: pointer;
		}
	}
}
</style>
