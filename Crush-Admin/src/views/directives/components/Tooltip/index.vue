<template>
	<div>
		<el-alert
			class="mb10"
			title="使用方式：v-tooltip='{ text: 'tooltip', position: 'top | right | bottom | left ' }"
			type="success"
			:closable="false"
		/>
		<el-button v-tooltip="{ text: 'top', position: 'top' }"> Hover me </el-button>
		<el-button v-tooltip="{ text: 'right', position: 'right' }"> Hover me </el-button>
		<el-button v-tooltip="{ text: 'bottom', position: 'bottom' }"> Hover me </el-button>
		<el-button v-tooltip="{ text: 'left', position: 'left' }"> Hover me </el-button>
	</div>
</template>

<script setup lang="ts" name="Tooltip"></script>
