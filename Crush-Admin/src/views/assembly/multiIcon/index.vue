<template>
	<div>
		<el-card shadow="hover" header="IconCase" class="mb20">
			<el-alert
				title="IconCase 是对element图标、iocnfont图标、awesome图标、img标签的封装"
				type="warning"
				:closable="false"
			/>
			<div class="my20">IconCase：演示（支持本地svg）</div>
			<div class="flx-align-center">
				<IconCase name="iconfont icon-PDF1" color="red" :size="30" class="mr20" />
				<IconCase name="fa fa-meetup" color="#09f" :size="30" class="mr20" />
				<IconCase :name="avatar" :size="30" class="mr20" />
				<IconCase name="ele-Trophy" color="var(--el-color-primary)" :size="30" />
			</div>
			<el-descriptions title="配置项 📚" :column="1" border class="mt20">
				<el-descriptions-item label="name">
					svg 图标组件名字 / 路径 url
				</el-descriptions-item>
				<el-descriptions-item label="size">svg 大小，默认 '14'</el-descriptions-item>
				<el-descriptions-item label="color">svg 颜色</el-descriptions-item>
			</el-descriptions>
			<el-alert title="可查看 图标管理 菜单" type="warning" :closable="false" class="my20" />
		</el-card>

		<el-card shadow="hover" header="SvgIcon" class="mb20">
			<el-alert
				title="SVG 图标目前使用 vite-plugin-svg-icons 插件完成，官方文档请查看 ：https://github.com/vbenjs/vite-plugin-svg-icons"
				type="warning"
				:closable="false"
			/>
			<div class="icon-list">
				<SvgIcon name="xianxingdaoyu" />
				<SvgIcon name="xianxingdiqiu" />
				<SvgIcon name="xianxingditu" />
				<SvgIcon name="xianxingfanchuan" />
				<SvgIcon name="xianxingfeiji" />
				<SvgIcon name="xianxinglvhangriji" />
				<SvgIcon name="xianxingtianqiyubao" />
				<SvgIcon name="xianxingxiangjipaizhao" />
				<SvgIcon name="xianxingxiarilengyin" />
				<SvgIcon name="xianxingyoulun" />
				<SvgIcon name="xianxingxiarilengyin" />
				<SvgIcon name="allosaurus" />
			</div>
			<el-descriptions title="配置项 📚" :column="1" border>
				<el-descriptions-item label="name">
					图标的名称，svg 图标必须存储在 src/assets/icons 目录下
				</el-descriptions-item>
				<el-descriptions-item label="prefix">
					图标的前缀，默认为 "icon"
				</el-descriptions-item>
				<el-descriptions-item label="iconStyle">
					图标的样式，默认样式为 { width: "100px", height: "100px" }
				</el-descriptions-item>
			</el-descriptions>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="multiIcon">
import avatar from '@/assets/images/avatar.png';
</script>
<style scoped lang="scss">
.icon-list {
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
	padding: 40px 50px 0;
}
</style>
