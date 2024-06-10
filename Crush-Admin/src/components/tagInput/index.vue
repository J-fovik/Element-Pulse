<template>
	<el-tag v-for="tag in dynamicTags" :key="tag" class="mx1 tagClass" closable :disable-transitions="false" @close="handleClose(tag)">
		{{ tag }}
	</el-tag>
	<el-input
		v-if="inputVisible"
		ref="InputRef"
		v-model="inputValue"
		class="ml1 inputWidth"
		size="small"
		@keyup.enter="handleInputConfirm"
		@blur="handleInputConfirm"
	/>
	<el-button v-else class="ml1" size="small" @click="showInput"> + 添加值 </el-button>
</template>
<script setup name="tagInput">
/* <TagInput v-model="defaultValue" /> */
const props = defineProps({
	modelValue: String,
});
const emit = defineEmits(['update:modelValue']);
const inputValue = ref('');
const dynamicTags = ref(props.modelValue ? props.modelValue.split(',') : []);
const inputVisible = ref(false);
const InputRef = ref();
// tag删除事件
const handleClose = (tag) => {
	dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
	emit('update:modelValue', dynamicTags.value.join(','));
};
// 点击按钮添加值
const showInput = () => {
	inputVisible.value = true;
	nextTick(() => {
		InputRef.value.input.focus();
	});
};
// 输入框键盘回车事件
const handleInputConfirm = () => {
	if (inputValue.value) {
		dynamicTags.value.push(inputValue.value);
		emit('update:modelValue', dynamicTags.value.join(','));
	}
	inputVisible.value = false;
	inputValue.value = '';
};
</script>
<style scoped>
.inputWidth {
	width: 70px;
}
.tagClass {
	height: 24px !important;
}
</style>
