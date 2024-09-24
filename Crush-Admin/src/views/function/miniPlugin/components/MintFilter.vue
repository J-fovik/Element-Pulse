<template>
	<div>
		<el-alert
			title="感谢优秀的 `mint-filter`，本 Demo 是基于：https://www.npmjs.com/package/mint-filter"
			type="warning"
			:closable="false"
			class="mb20"
		/>
		<div class="flex-col mt20 flx-center">
			<div class="flex flex-wrap my10">
				<span class="mr5 font20">自定义敏感词: </span>
				<el-tag
					v-for="(word, index) in words"
					:key="index"
					type="warning"
					class="mx1 font20"
					effect="dark"
					round
				>
					{{ word }}
				</el-tag>
			</div>
			<el-input v-model.trim="modelValue" @input="onInput" />
			<p class="mt-2">{{ modelValue }}</p>
		</div>
	</div>
</template>

<script setup lang="ts" name="MintFilter">
import Mint from 'mint-filter';
// 自定义敏感词字典
const words = ['脑残', '废物', '白痴', '三八', '智障'];
const mint = new Mint(words);
// 绑定值
const modelValue = ref();
// 输入方法
const onInput = () => {
	modelValue.value = mint.filter(modelValue.value).text;
};
</script>
