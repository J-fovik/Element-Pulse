<template>
	<div>
		<el-card header="EmbedPdf 嵌入式PEF" shadow="hover">
			<el-alert
				title="EmbedPdf 预览文件目前使用 vue-pdf-embed 插件完成，官方文档请查看 ：https://www.npmjs.com/package/vue-pdf-embed"
				type="warning"
				:closable="false"
				class="mb20"
			/>
			<el-button type="primary" @click="setActiveKey('EmbedPdf')">查看</el-button>
		</el-card>

		<el-card header="PreviewOffice 文件预览(docx、excel、pdf)" class="mt20" shadow="hover">
			<el-alert
				title="PreviewOffice 预览文件目前使用 vue-office/docx 插件完成，官方文档请查看 ：https://www.npmjs.com/package/@js-preview/pdf"
				type="warning"
				:closable="false"
				class="mb20"
			/>
			<el-space>
				<el-button type="primary" @click="setActiveKey('PreviewDocx')">预览docx</el-button>
				<el-button type="primary" @click="setActiveKey('PreviewExcel')">
					预览excel
				</el-button>
				<el-button type="primary" @click="setActiveKey('PreviewPdf')">预览pdf</el-button>
			</el-space>
		</el-card>

		<div class="mt20">
			<EmbedPdf v-if="activeKey === 'EmbedPdf'" :source="pdf" />
			<PreviewOffice
				v-if="activeKey === 'PreviewDocx'"
				:source="docx"
				@close="setActiveKey(null)"
			/>
			<PreviewOffice
				v-if="activeKey === 'PreviewExcel'"
				:source="excel"
				@close="setActiveKey(null)"
			/>
			<PreviewOffice
				v-if="activeKey === 'PreviewPdf'"
				:source="pdf"
				@close="setActiveKey(null)"
			/>
		</div>
	</div>
</template>
<script setup lang="ts" name="previewFile">
import { useBasicsState } from '@/hooks';
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 文档地址
const pdf =
	'https://xiaoxian521.github.io/hyperlink/pdf/Cookie%E5%92%8CSession%E5%8C%BA%E5%88%AB%E7%94%A8%E6%B3%95.pdf';
const docx = 'http://static.shanhuxueyuan.com/test6.docx';
const excel = 'http://static.shanhuxueyuan.com/demo/excel.xlsx';
</script>
