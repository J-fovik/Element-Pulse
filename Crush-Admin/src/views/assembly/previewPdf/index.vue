<template>
	<div>
		<el-alert
			title="感谢优秀的 `vue-pdf-embed`，本 Demo 是基于：https://www.npmjs.com/package/vue-pdf-embed"
			type="warning"
			:closable="false"
			class="mb15"
		/>
		<PreviewPdf :source="source" />
	</div>
</template>
<script setup lang="ts" name="previewPdf">
// 文档地址
const source =
	'https://xiaoxian521.github.io/hyperlink/pdf/Cookie%E5%92%8CSession%E5%8C%BA%E5%88%AB%E7%94%A8%E6%B3%95.pdf';
</script>
