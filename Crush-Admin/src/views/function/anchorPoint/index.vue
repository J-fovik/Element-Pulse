<template>
	<div class="card container">
		<div style="height: 50px">
			<el-scrollbar>
				<div class="flex gap-2 h-full">
					<el-tag
						class="mr5 cursor-pointer scrollbar-item"
						v-for="(item, index) in navigationList"
						:type="currentNavigationId === '#' + item.id ? 'primary' : 'success'"
						:key="index"
						@click="clickScrollTo(item.id)"
						>{{ item.title }}</el-tag
					>
				</div>
			</el-scrollbar>
		</div>
		<el-scrollbar @scroll="setScrollTop">
			<div v-for="item in navigationList" :key="item.id" :id="item.id" class="anchor-point">
				<el-divider content-position="center">{{ item.title }}</el-divider>
				<!-- 这里可以放置对应锚点的详细内容 -->
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts" name="anchorPoint">
const currentNavigationId = ref('#C_G_A_L');
// 导航数组
const navigationList = [
	{
		title: '成功案例',
		id: 'C_G_A_L',
	},
	{
		title: '评价价格',
		id: 'P_J_J_G',
	},
	{
		title: '评价流程',
		id: 'P_J_L_C',
	},
	{
		title: '评价报告作用',
		id: 'P_J_B_G_Z_Y',
	},
	{
		title: '评价领域',
		id: 'P_J_L_Y',
	},
	{
		title: '我们的优势',
		id: 'W_M_D_Y_S',
	},
];
// 点击滚动到指定锚点的方法
const clickScrollTo = (id: string) => {
	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' });
	}
	currentNavigationId.value = '#' + id;
};

// 监听滚动事件
const setScrollTop = ({ scrollTop }) => {
	// 这里需要根据实际的锚点位置来设置条件
	if (scrollTop > 0 && scrollTop <= 600) {
		currentNavigationId.value = '#C_G_A_L';
	} else if (scrollTop > 600 && scrollTop <= 1650) {
		currentNavigationId.value = '#P_J_J_G';
	} else if (scrollTop > 1650 && scrollTop <= 2700) {
		currentNavigationId.value = '#P_J_L_C';
	} else if (scrollTop > 2700 && scrollTop <= 3750) {
		currentNavigationId.value = '#P_J_B_G_Z_Y';
	} else if (scrollTop > 3750 && scrollTop <= 4800) {
		currentNavigationId.value = '#P_J_L_Y';
	} else if (scrollTop > 4800) {
		currentNavigationId.value = '#W_M_D_Y_S';
	}
};
</script>

<style lang="scss" scoped>
.scrollbar-item {
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10px;
}

.anchor-point {
	height: 1000px; // 示例高度，根据实际情况调整
}
</style>
