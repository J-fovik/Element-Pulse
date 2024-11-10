<template>
	<el-card shadow="hover">
		<el-alert
			title="Proportion 是自定义封装的比例条以及进度条的组件"
			type="warning"
			:closable="false"
		/>
		<el-card shadow="hover" header="比例条" class="mt20">
			<div
				v-for="(item, index) in list"
				:key="index"
				:class="index == list?.length - 1 ? '' : 'mb30'"
			>
				<div>{{ item.title }}</div>
				<div class="flex items-center justify-between mt10">
					<Proportion :width="item.width" class="flex-1" />
					<div class="ml20">{{ item.width + '%' }}</div>
				</div>
			</div>
		</el-card>
		<el-card shadow="hover" header="进度条" class="mt20">
			<Proportion
				:width="
					(current / (list.length - 1)) * 100 > 0
						? (current / (list.length - 1)) * 100
						: 100 / list.length
				"
				background="#7C92FF"
				:isAnimate="false"
				:key="current"
			/>
			<div class="mt20">
				<div>当前：{{ current + 1 }}</div>
				<div class="mt5">最大：{{ list.length }}</div>
			</div>
			<div class="mt20">
				<el-button :disabled="current < 1" @click="current--"> -</el-button>
				<el-button :disabled="current >= list.length - 1" @click="current++"> + </el-button>
			</div>
		</el-card>
		<el-descriptions title="配置项 📚" :column="1" border class="my20">
			<el-descriptions-item label="background"> 进度条背景 </el-descriptions-item>
			<el-descriptions-item label="width"> 进度条宽度 </el-descriptions-item>
			<el-descriptions-item label="isAnimate"> 是否有动画 </el-descriptions-item>
		</el-descriptions>
	</el-card>
</template>
<script setup lang="ts" name="proportion">
import { setHightLightStr } from '@/utils/other';
const list = ref([
	{ title: '名称1', content: '80%', width: '80' },
	{ title: '名称2', content: '70%', width: '70' },
	{ title: '名称3', content: '60%', width: '60' },
	{ title: '名称4', content: '50%', width: '50' },
	{ title: '名称5', content: '40%', width: '40' },
] as any);
const current = ref(0);
</script>
