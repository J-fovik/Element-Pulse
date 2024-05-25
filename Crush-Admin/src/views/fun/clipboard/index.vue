<template>
	<div class="layout-pd">
		<el-card shadow="hover" header="复制剪切演示">
			<el-alert
				title="方式一：感谢优秀的 `vue-clipboard3`，项目地址：https://github.com/JamieCurnow/vue-clipboard3`"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<el-input placeholder="请输入内容" v-model="clipboardOne.copyVal">
				<template #append>
					<el-button @click="copyText(clipboardOne.copyVal)">复制链接</el-button>
				</template>
			</el-input>
			<el-input placeholder="先点击上方 `复制链接` 按钮，然后 `Ctrl + V` 进行粘贴！ " v-model="clipboardOne.shearVal" class="mt15"> </el-input>

			<el-alert title="方式二：浏览器自带复制方式，navigator.clipboard.writeText()" type="success" :closable="false" class="my15"></el-alert>
			<el-input placeholder="请输入内容" v-model="clipboardTwo.copyVal">
				<template #append>
					<el-button @click="clipboard(clipboardTwo.copyVal)">复制链接</el-button>
				</template>
			</el-input>
			<el-input
				placeholder="先点击上方 `复制链接` 按钮，然后 `Ctrl + V` 进行粘贴！ "
				v-model="clipboardTwo.shearVal"
				class="mt15"
				@input="inputRemoveTag"
			>
			</el-input>

			<el-alert
				title="方式三：感谢优秀的 `useclipboard`，项目地址：https://vueuse.org/core/useClipboard/#useclipboard`"
				type="success"
				:closable="false"
				class="my15"
			></el-alert>
			<el-input placeholder="请输入内容" v-model="clipboardThree.copyVal">
				<template #append>
					<el-button @click="onCopy(clipboardThree.copyVal)">复制链接</el-button>
				</template>
			</el-input>
			<el-input placeholder="先点击上方 `复制链接` 按钮，然后 `Ctrl + V` 进行粘贴！ " v-model="clipboardThree.shearVal" class="mt15"> </el-input>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="funClipboard">
import commonFunction from '/@/utils/commonFunction';
import { useClipboard } from '@vueuse/core';
import { ElMessage } from 'element-plus';

// 定义变量内容
const { copyText, clipboard, removeFragmentTag } = commonFunction();
const clipboardOne = reactive({
	copyVal: '111111',
	shearVal: '',
});
const clipboardTwo = reactive({
	copyVal: '<div>222222</div>',
	shearVal: '',
});
const clipboardThree = reactive({
	copyVal: '333',
	shearVal: '',
});
// 输入框去掉标签
const inputRemoveTag = (e: any) => {
	// 处理赋值
	clipboardTwo.shearVal = removeFragmentTag(e);
};
// copy为方法 ，isSupported为支不支持，text为返回粘贴内容，source为复制内容
const { copy, isSupported, text } = useClipboard({ source: clipboardThree.copyVal });
const onCopy = (txt: any) => {
	if (!txt) {
		return;
	}
	copy(clipboardThree.copyVal).then(() => {
		ElMessage.success('复制成功，内容为：' + text.value);
		// clipboardThree.shearVal = text.value
	});
};
if (!isSupported) {
	//   '当前浏览器不支持此功能'
}
</script>
