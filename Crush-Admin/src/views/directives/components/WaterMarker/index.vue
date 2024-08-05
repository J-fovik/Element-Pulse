<template>
	<div>
		<el-alert
			class="mb10"
			title="使用方式：v-waterMarker='{text:'text',textColor:'rgba(180, 180, 180, 0.4)'}'"
			type="success"
			:closable="false"
		/>
		<div
			style="height: 200px"
			v-waterMarker="{ text: 'waterMarker', textColor: 'rgba(180, 180, 180, 0.4)' }"
		></div>
	</div>
</template>

<script setup lang="ts" name="WaterMarker"></script>
