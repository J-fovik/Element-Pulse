<template>
	<component :is="renderer" ref="barcodeRef" />
</template>
<script setup lang="ts" name="Barcode">
import JsBarcode from 'jsbarcode';
// 接受父组件的参数
const props = defineProps({
	renderer: {
		type: String,
		default: 'canvas', // 渲染方式
	},
	text: {
		type: String,
		default: null, // 展示文本
	},
	// 完整配置 https://github.com/lindell/JsBarcode/wiki/Options
	options: {
		type: Object,
		default() {
			return {};
		},
	},
	// type 相当于 options.format，如果 type 和 options.format 同时存在，type 值优先；
	type: {
		type: String,
		default: 'CODE128',
	},
});

const barcodeRef = ref(null);

onMounted(() => {
	// 赋值配置
	const opt = { ...props.options, format: props.type };
	JsBarcode(barcodeRef.value, props.text, opt);
});
</script>
