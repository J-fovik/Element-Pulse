<template>
	<div class="layout-pd">
		<el-card shadow="hover" class="h100" header="html2canvas 截屏">
			<el-alert
				title="感谢优秀的 `html2canvas`，项目地址：https://html2canvas.cn/html2canvas-about.html"
				type="success"
				:closable="false"
				class="mb15"
			></el-alert>
			<el-row :gutter="24">
				<el-col :span="3">
					<el-card header="截图">
						<div @click="screenShot" class="buttonStyle">点击截图</div>
						<div class="mt10" v-show="open">
							<el-button type="primary" @click="Dele">点击删除</el-button>
						</div>
					</el-card>
				</el-col>
				<el-col :span="21">
					<div ref="picture"></div>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script setup lang="ts" name="funScreenshot">
import html2canvas from 'html2canvas';
const picture = ref();
const open = ref(false);
function screenShot() {
	if (open.value) {
		return;
	}
	html2canvas(document.body, {
		backgroundColor: '#ffffff',
		allowTaint: true, //开启跨域
		useCORS: true,
		scrollY: 0,
		scrollX: 0,
	}).then(function (canvas: any) {
		canvas.style.width = '100%';
		canvas.style.height = '100%';
		picture.value.appendChild(canvas);
		open.value = true;
	});
}
function Dele() {
	picture.value.innerHTML = '';
	open.value = false;
}
</script>
<style>
.buttonStyle {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: aqua;
	color: #000;
	border: 1px solid #999;
	width: 100px;
	height: 40px;
	border-radius: 12px;
}
</style>
