<template>
	<!-- 个人信息 -->
	<el-dialog
		:model-value="true"
		title="个人信息"
		width="500px"
		draggable
		:close-on-click-modal="true"
		@close="emits('close')"
	>
		<el-descriptions :column="1" class="mt10 ml20">
			<!-- 用户名 -->
			<el-descriptions-item>
				<template #label>
					<el-icon><UserFilled /></el-icon>
					用户名称：
				</template>
				{{ userInfo.userName }}
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<el-icon><User /></el-icon>
					真实姓名：
				</template>
				{{ userInfo.nickName }}
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<el-icon><Phone /></el-icon>
					手机号码：
				</template>
				{{ userInfo.phonenumber }}
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<el-icon><Grape /></el-icon>
					部门名称：
				</template>
				{{ userInfo.organizationName }}
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<el-icon><MapLocation /></el-icon>
					角色名称：
				</template>
				{{ userInfo.roles.join('、') }}
			</el-descriptions-item>
		</el-descriptions>
		<template #footer>
			<span class="dialog-footer">
				<!-- <el-button @click="emits('close')">取消</el-button> -->
				<el-button type="primary" @click="emits('close')">关闭</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="InfoDialog">
import { useUserStore } from '@/stores';
const { userInfo } = useUserStore();

/* 父组件方法 */
const emits = defineEmits(['close']);
</script>
