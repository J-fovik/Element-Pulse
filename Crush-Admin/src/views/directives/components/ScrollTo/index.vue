<template>
	<div>
		<el-alert
			class="mb10"
			title="使用方式：v-scrollTo=''.className' 或 v-scrollTo=''#idName' 要唯一"
			type="success"
			:closable="false"
		/>
		<div class="flex gap-2 flex-wrap">
			<el-tag
				:type="currentIndex === index ? 'primary' : 'success'"
				class="mr5 cursor-pointer"
				v-for="(item, index) in 40"
				:key="index"
				v-scrollTo="'#item-' + index"
				@click="currentIndex = index"
				>{{ item }}</el-tag
			>
		</div>
		<el-divider />
		<el-scrollbar height="200px">
			<div class="mb25" v-for="(item, index) in 40" :key="index">
				<div class="flx-center flex-col" :id="'item-' + index">
					{{ item }}
				</div>
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts" name="ScrollTo">
const currentIndex = ref(0); // 初始化时设置为-1，表示没有点击任何tag
</script>
