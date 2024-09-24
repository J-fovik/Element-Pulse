<template>
	<div>
		<el-alert
			title="感谢优秀的 `pinyin-pro`，本 Demo 是基于：https://www.npmjs.com/package/pinyin-pro"
			type="warning"
			:closable="false"
			class="mb20"
		/>
		<div class="flex-col mt20 flx-center">
			<p class="font30" v-html="html('带 音 调')" />
			<p class="mt2 font30" v-html="html('不 带 音 调', { toneType: 'none' })" />
			<p class="mt2 font30 custom" v-html="html('自 定 义 样 式')" />
		</div>
	</div>
</template>

<script setup lang="ts" name="Pinyin">
import { html } from 'pinyin-pro';
</script>
<style lang="scss" scoped>
.custom {
	/* 汉字的样式 */
	:deep(.py-chinese-item) {
		color: #409eff;
	}
	/* 拼音的样式 */
	:deep(.py-pinyin-item) {
		color: #f56c6c;
	}
}
</style>
