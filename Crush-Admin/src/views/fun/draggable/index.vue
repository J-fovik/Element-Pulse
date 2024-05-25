<template>
	<div class="layout-pd">
		<el-card header="拖动更换图标位置">
			<el-button size="small" type="primary" style="margin-bottom: 10px" @click="initGetStyleSheets">重置元素位置</el-button>
			<draggable :list="iconList" animation="500" @start="drag = true" @end="drag = false" item-key="id" tag="ul">
				<template #item="{ element }">
					<li class="card-item">
						<SvgIcon class="SvgIcon" :name="element.id" :size="25" :style="{ color: element.color }" />
						<div class="label">{{ element.label }}</div>
					</li>
				</template>
			</draggable>
		</el-card>
	</div>
</template>

<script lang="ts" setup name="funDraggable">
import draggable from 'vuedraggable';
import initIconfont from '/@/utils/getStyleSheets';
const drag = ref(false);
const colors = ['#e54d42', '#f37b1d', '#fbbd08', '#8dc63f', '#39b54a', '#1cbbb4', '#0081ff', '#6739b6', '#9c26b0', '#e03997', '#a5673f', '#8799a3'];
// 存数组
const iconList = ref([] as any);
const initGetStyleSheets = () => {
	initIconfont.ele().then((res: any) => {
		iconList.value = res.map((o: any, i: number) => {
			return {
				label: `第 ${i + 1} 个元素`,
				id: o,
				color: colors[i % colors.length],
			};
		});
	});
};
onMounted(() => {
	initGetStyleSheets();
});
</script>

<style lang="scss" scoped>
ul {
	list-style: none;
	padding: 0;
	border: 1px solid #999;
	overflow: hidden;
}

.card-item {
	height: 100px;
	padding: 10px;
	width: 12.5%;
	text-align: center;
	cursor: move;
	float: left;
	border: 1px solid #999;
	box-sizing: border-box;

	.label {
		margin-top: 8px;
		font-size: 14px;
	}
}

.card-item:hover {
	.SvgIcon {
		transform: scale(1.5);
		transition: transform 0.1s ease-in-out;
	}
}
</style>
