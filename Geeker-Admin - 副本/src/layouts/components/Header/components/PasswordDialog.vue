<template>
	<!-- 修改密码 -->
	<el-dialog
		:model-value="true"
		title="修改密码"
		width="500px"
		draggable
		:close-on-click-modal="false"
		@close="emits('close')"
	>
		<span>This is Password</span>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="emits('close')">取消</el-button>
				<el-button type="primary" @click="emits('close')">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="PasswordDialog">
/* 父组件方法 */
const emits = defineEmits(['close']);
</script>
