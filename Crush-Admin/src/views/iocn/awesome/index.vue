<template>
	<div class="awesome-container layout-pd">
		<el-card shadow="hover" :header="`fontawesome 字体图标(自动载入)：${state.sheetsIconList.length - 24}个`">
			<el-row class="iconfont-row">
				<el-col class="icon-parent" :xs="12" :sm="8" :md="6" :lg="4" :xl="2" v-for="(v, k) in state.sheetsIconList" :key="k">
					<div class="icon-wrapper">
						<div class="iconfont-warp-value">
							<i :class="v" class="fa"></i>
						</div>
						<div class="mt10 text-center" v-ellipsis:single="[110, 1]">{{ v }}</div>
						<div class="copy" @click="copyText(v)">复制</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="iocnAwesome">
import initIconfont from '/@/utils/getStyleSheets';
import commonFunction from '/@/utils/commonFunction';
const { copyText } = commonFunction();
// 定义变量内容
const state = reactive({
	sheetsIconList: [],
});
// 初始化获取 css 样式，这里使用fontawesome的图标(记得加上前缀 `fa`)，其它第三方请自行做判断
const initGetStyleSheets = () => {
	initIconfont.awe().then((res: any) => (state.sheetsIconList = res));
};
// 页面加载时
onMounted(() => {
	initGetStyleSheets();
});
</script>

<style scoped lang="scss">
.fa {
	font-size: 25px;
}
.icon-parent {
	border-top: 1px solid #f7f7f7;
	border-left: 1px solid #f7f7f7;

	.icon-wrapper {
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
}
</style>
