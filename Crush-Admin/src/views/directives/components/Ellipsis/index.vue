<template>
	<div>
		<el-alert
			class="mb10"
			title="使用方式：v-ellipsis:single | multiple='[110, 1]'"
			type="success"
			:closable="false"
		/>
		<div class="mt10" v-ellipsis:single="[110, 1]">{{ content }}</div>
		<div class="mt10" v-ellipsis:multiple="[190, 2]">{{ content }}</div>
	</div>
</template>
<script setup lang="ts" name="Ellipsis">
const content = ref('每一个伟大的成就，都源于一个勇敢的开始。勇敢踏出第一步，你的潜力无可限量。');
</script>
