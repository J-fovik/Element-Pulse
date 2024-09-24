<template>
	<div ref="printRef">
		<el-alert
			title="感谢优秀的 `print-js`，本 Demo 是基于：https://www.jianshu.com/p/bc079fbb20c7"
			type="warning"
			:closable="false"
		/>
		<div class="flex-col mt20 flx-center">
			<el-button @click="onPrintJs" class="mt20" type="primary"> 点击打印演示 </el-button>
		</div>
	</div>
</template>

<script setup lang="ts" name="PrintJs">
import printJs from 'print-js';

// 定义变量内容
const printRef = ref();

// 打印点击
const onPrintJs = () => {
	printJs({
		printable: printRef.value,
		type: 'html',
		css: [
			'//at.alicdn.com/t/c/font_2298093_rnp72ifj3ba.css',
			'//unpkg.com/element-plus/dist/index.css',
		],
		scanStyles: false,
		style: `@media print{.mb15{margin-bottom:15px;}.el-button--small i.iconfont{font-size: 12px !important;margin-right: 5px;}}`,
	});
};
</script>
