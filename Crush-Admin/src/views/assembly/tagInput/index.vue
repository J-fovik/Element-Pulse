<template>
	<Container>
		<el-alert
			title="TagInput 是el-tag动态编辑标签进行的二次封装，官方文档请查看 ：https://element-plus.org/zh-CN/component/tag.html"
			type="warning"
			:closable="false"
		/>
		<div class="mt20">
			<TagInput v-model="tagValue" />
		</div>
		<div class="my20">绑定值：{{ tagValue }}</div>
		<el-descriptions title="配置项 📚" :column="1" border>
			<el-descriptions-item label="modelValue">
				双向绑定的 value 值，使用示例： v-model="content">
			</el-descriptions-item>
		</el-descriptions>
	</Container>
</template>

<script setup lang="ts" name="tagInput">
const tagValue = ref('aaa,bbb,ccc');
</script>

<style scoped lang="scss"></style>
