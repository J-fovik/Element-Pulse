<template>
	<div style="border: 1px solid #ccc; z-index: 1001">
		<w-toolbar
			v-if="hideToolbar"
			:default-config="{
				excludeKeys,
			}"
			:editor="editorRef"
			style="border-bottom: 1px solid #ccc"
		/>
		<w-editor
			:model-value="modelValue"
			:style="{ height: `${height}px` }"
			:default-config="editorConfig"
			@on-created="initEditor"
			@on-change="changeContent"
		/>
	</div>
</template>

<script setup lang="ts" name="WangEditor">
import type { IEditorConfig } from '@wangeditor/editor';
// 富文本
import '@wangeditor/editor/dist/css/style.css';
import { Editor as WEditor, Toolbar as WToolbar } from '@wangeditor/editor-for-vue';
// 父组件参数
const props = withDefaults(
	defineProps<{
		modelValue: string;
		excludeKeys?: Array<string>;
		height?: number;
		disabled?: boolean;
		hideToolbar?: boolean;
		uploadImg?: (file: File) => Promise<string>;
	}>(),
	{
		modelValue: '',
		excludeKeys: () => ['|', 'group-video'],
		height: 300,
		disabled: false,
		hideToolbar: true,
		uploadImg: (file: File) => Promise.reject(''),
	}
);
// 父组件方法
const emits = defineEmits(['update:modelValue']);
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef<any | null>(null);
// 编辑器config
const editorConfig: Partial<IEditorConfig> = {
	placeholder: '请输入内容...',
	MENU_CONF: {
		uploadImage: {
			async customUpload(file: File, insertFn: any) {
				// 实现上传，并得到图片
				const url = await props.uploadImg(file);
				// 最后插入图片
				insertFn(url, '', '');
			},
		},
	},
};
// editor 初始化记录实例
const initEditor = (editor: any) => {
	editorRef.value = editor;
	if (props.disabled) {
		editorRef.value.disable();
	}
};
onBeforeUnmount(() => {
	const editor = editorRef.value;
	if (editor == null) return;
	editor.destroy();
});
// 富文本改变
const changeContent = (editor: any) => {
	emits('update:modelValue', editor.getHtml());
};
</script>
