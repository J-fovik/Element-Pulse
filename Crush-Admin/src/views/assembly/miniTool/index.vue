<template>
	<div>
		<el-card shadow="hover" header="Container 容器" class="mb20">
			<Container />
		</el-card>
		<el-card shadow="hover" header="Dot 热点" class="mb20">
			<el-row :gutter="24">
				<el-col :span="12">
					<el-divider content-position="center">基础用法</el-divider>
					<div class="flx-center">
						<Dot class="mr20" />
						<Dot type="success" class="mr20" />
						<Dot type="warning" class="mr20" />
						<Dot type="danger" class="mr20" />
						<Dot type="info" class="mr20" />
					</div>
				</el-col>
				<el-col :span="12">
					<el-divider content-position="center">关闭动画</el-divider>
					<div class="flx-center">
						<Dot :animation="false" class="mr20" />
						<Dot type="success" :animation="false" class="mr20" />
						<Dot type="warning" :animation="false" class="mr20" />
						<Dot type="danger" :animation="false" class="mr20" />
						<Dot type="info" :animation="false" class="mr20" />
					</div>
				</el-col>
			</el-row>
			<el-descriptions :column="1" border class="mt20">
				<el-descriptions-item label="animation">动画，默认'true'</el-descriptions-item>
				<el-descriptions-item label="type">
					类型('primary' | 'success' | 'warning' | 'danger' | 'info')，默认'primary'
				</el-descriptions-item>
			</el-descriptions>
		</el-card>
		<el-card shadow="hover" header="FlopTime 时钟" class="mb20">
			<FlopTime />
		</el-card>
		<el-card shadow="hover" header="Loading 加载动画" class="mb20">
			<Loading />
		</el-card>
		<el-card shadow="hover" header="SearchItem 表单响应式布局" class="mb20">
			<el-row :gutter="24">
				<SearchItem label="名称:" class="mb5"> 111 </SearchItem>
				<SearchItem label="名称:" class="mb5"> 222 </SearchItem>
				<SearchItem label="名称:" class="mb5"> 333 </SearchItem>
				<SearchItem label="名称:" class="mb5"> 444 </SearchItem>
				<SearchItem label="名称:" class="mb5"> 555 </SearchItem>
				<SearchItem label="名称:" class="mb5"> 666 </SearchItem>
				<SearchItem label="名称:" class="mb5"> 777 </SearchItem>
				<SearchItem label="名称:" class="mb5"> 888 </SearchItem>
			</el-row>
			<el-descriptions :column="1" border class="mt20">
				<el-descriptions-item label="label">标签文本</el-descriptions-item>
			</el-descriptions>
		</el-card>
		<el-card shadow="hover" header="SwitchDark 切换主题" class="mb20">
			<div class="flx-center">
				<SwitchDark />
			</div>
		</el-card>
		<el-card shadow="hover" header="TagInput 可输入标签" class="mb20">
			<el-alert
				title="TagInput 是el-tag动态编辑标签进行的二次封装，官方文档请查看 ：https://element-plus.org/zh-CN/component/tag.html"
				type="warning"
				:closable="false"
			/>
			<div class="flx-center flex-col">
				<div class="mt20">
					<TagInput v-model="tagValue" />
				</div>
				<div class="my20">绑定值：{{ tagValue }}</div>
			</div>
			<el-descriptions title="配置项 📚" :column="1" border>
				<el-descriptions-item label="modelValue">
					双向绑定的 value 值，使用示例： v-model="content">
				</el-descriptions-item>
			</el-descriptions>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="miniTool">
const tagValue = ref('aaa,bbb,ccc');
</script>
