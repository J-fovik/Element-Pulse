<template>
	<Container>
		<el-alert
			:title="`element plus 字体图标(自动载入)：${sheetsIconList.length}个`"
			type="warning"
			:closable="false"
		/>
		<el-row class="mt20">
			<el-col
				class="icon-border"
				:xs="12"
				:sm="8"
				:md="6"
				:lg="4"
				:xl="2"
				v-for="(v, k) in sheetsIconList"
				:key="k"
			>
				<div class="icon-box">
					<div>
						<el-icon class="element">
							<component :is="v"></component>
						</el-icon>
					</div>
					<div class="mt10 text-center" v-ellipsis:single="[110, 1]">{{ v }}</div>
					<div class="copy">复制</div>
				</div>
			</el-col>
		</el-row>
	</Container>
</template>

<script setup lang="ts" name="element">
import initIconfont from '@/utils/getStyleSheets';
const sheetsIconList = ref([] as any);

// 初始化获取 css 样式，获取 element plus 自带 svg 图标
const initGetStyleSheets = () => {
	initIconfont.ele().then((res: any) => (sheetsIconList.value = res));
};
// 页面加载时
onMounted(() => {
	initGetStyleSheets();
});
</script>

<style scoped lang="scss">
.element {
	font-size: 25px;
}
.icon-border {
	border-top: 1px solid #f7f7f7;
	border-left: 1px solid #f7f7f7;
}
.icon-box {
	position: relative;
	height: 100px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-right: 1px solid #f7f7f7;
	border-bottom: 1px solid #f7f7f7;
	overflow: hidden;
	padding-bottom: 0;
	transition: padding-bottom 0.2s ease-in-out;

	&:hover {
		color: #1890ff;
		box-shadow: 0 0 10px #f0f0f0;
		padding-bottom: 22px;
		transition: padding-bottom 0.2s ease-in-out;

		.copy {
			cursor: pointer;
			background-color: #1890ff;
			transform: translateY(0);
			transition: transform 0.2s ease-in-out;
		}
	}

	.copy {
		position: absolute;
		background-color: #1890ff;
		padding: 5px 0;
		color: #fff;
		font-size: 12px;
		bottom: 0;
		left: 0;
		right: 0;
		transform: translateY(100%);
		transition: transform 0.2s ease-in-out;
		text-align: center;
	}
}
</style>
