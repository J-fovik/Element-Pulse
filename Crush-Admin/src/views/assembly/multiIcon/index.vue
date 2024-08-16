<template>
	<Container>
		<el-alert
			title="MultiIcon 是对element图标、iocnfont图标、awesome图标、img标签的封装"
			type="warning"
			:closable="false"
		/>
		<div class="my20">MultiIcon：演示（支持本地svg）</div>
		<div class="flx-align-center">
			<MultiIcon name="iconfont icon-PDF1" color="red" :size="30" class="mr20" />
			<MultiIcon name="fa fa-meetup" color="#09f" :size="30" class="mr20" />
			<MultiIcon :name="avatar" :size="30" class="mr20" />
			<MultiIcon name="ele-Trophy" color="var(--el-color-primary)" :size="30" />
		</div>
		<el-descriptions title="配置项 📚" :column="1" border class="mt20">
			<el-descriptions-item label="name">
				svg 图标组件名字 / svg 路径 url
			</el-descriptions-item>
			<el-descriptions-item label="size"> svg 大小，默认 '14' </el-descriptions-item>
			<el-descriptions-item label="color"> svg 颜色 </el-descriptions-item>
		</el-descriptions>
		<el-alert title="可查看 图标管理 菜单" type="warning" :closable="false" class="my20" />
	</Container>
</template>

<script setup lang="ts" name="multiIcon">
import avatar from '@/assets/images/avatar.png';
</script>
