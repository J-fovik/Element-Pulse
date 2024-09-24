<template>
	<el-card>
		<template #header>
			<div class="flex justify-between items-center">
				<div v-if="showAllPages">共{{ total }}页</div>
				<div v-else>
					<el-pagination
						v-model:current-page="currentPage"
						background
						layout="prev, slot, next"
						:page-size="1"
						:total="total"
					>
						{{ currentPage }} / {{ total }}
					</el-pagination>
				</div>
				<el-space>
					<el-checkbox v-model="showAllPages" @change="showAllPagesChange">
						显示所有页面
					</el-checkbox>
					<el-tooltip
						:content="`翻转（当前角度${rotations[currentRotation]}度）`"
						placement="top-start"
					>
						<el-icon
							@click="
								currentRotation === 3
									? (currentRotation = 0)
									: (currentRotation += 1)
							"
							><RefreshRight
						/></el-icon>
					</el-tooltip>
					<el-tooltip content="打印" placement="top-start">
						<el-icon @click="onPrint"><Printer /></el-icon>
					</el-tooltip>
				</el-space>
			</div>
		</template>
		<div v-loading="loading" element-loading-text="加载中">
			<el-scrollbar>
				<vue-pdf-embed
					ref="pdfRef"
					class="h-full"
					:rotation="rotations[currentRotation]"
					:page="currentPage"
					:source="props.source"
					@rendered="handleDocumentRender"
				/>
			</el-scrollbar>
		</div>
	</el-card>
</template>
<script setup lang="ts" name="EmbedPdf">
import VuePdfEmbed from 'vue-pdf-embed';

// 定义父组件传过来的值
const props = defineProps({
	// PDF地址
	source: {
		type: String,
	},
});
const pdfRef = ref<any>(); // pdf实例
const total = ref(1); // 总页码
const currentPage = ref<any>(1); // 当前页
const currentRotation = ref(0); // 当前旋转度数下标
const showAllPages = ref(false); // 是否展示所有页
const rotations = [0, 90, 180, 270]; // 旋转度数
const loading = ref(true); // Loading
// 读取pdf文档
const handleDocumentRender = () => {
	loading.value = false;
	total.value = pdfRef.value.doc.numPages;
};
// 是否显示所有页数
const showAllPagesChange = () => {
	// 展示所有页时 赋值当前页为null 否则 赋值当前页为1
	currentPage.value = showAllPages.value ? null : 1;
};
// 打印
const onPrint = () => {
	// 如果在打印时，打印页面是本身的两倍，在打印配置 页面 设置 仅限页码为奇数的页面 即可
	pdfRef.value.print();
};
</script>
