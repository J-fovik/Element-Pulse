<template>
	<Container>
		<el-alert
			title="感谢优秀的 `splitpanes`，项目地址：https://antoniandre.github.io/splitpanes"
			type="warning"
			:closable="false"
			class="mb15"
		/>
		<splitpanes
			class="default-theme"
			@resize="paneSize = $event[0].size"
			style="height: 1000px"
		>
			<pane :size="32"> 1 </pane>
			<pane :size="36">
				<splitpanes class="default-theme" :horizontal="true">
					<pane :size="100"> 2 </pane>
					<pane :size="100"> 3 </pane>
				</splitpanes>
			</pane>
			<pane :size="32"> 4 </pane>
		</splitpanes>
	</Container>
</template>

<script setup lang="ts" name="splitpanes">
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

// 定义变量内容
const paneSize = ref(50);
</script>

<style scoped lang="scss">
.splitpanes__pane {
	justify-content: center;
	align-items: center;
	display: flex;
	position: relative;
	font-size: 70px;
	color: var(--el-color-primary-light-5);
	border: 1px solid var(--el-border-color-lighter);
	background-color: var(--el-color-primary) !important;
}
</style>
