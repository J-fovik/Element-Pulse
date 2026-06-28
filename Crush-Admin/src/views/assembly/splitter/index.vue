<template>
	<div
		class="card-tree container flex justify-center items-center"
		style="box-shadow: var(--el-border-color-light) 0px 0px 10px"
	>
		<Splitter>
			<template #left>
				<TreeSelector
					:data="addressJson.address"
					id="code"
					icon="Grape"
					width="100%"
					:default-value="singleSelected"
					title=""
					:default-props="defaultProps"
					@change="changeTreeFilterSingle"
				/>
			</template>
			<template #right>
				<div class="flex justify-center items-center h-full w-full">
					<div style="width: 800px; height: 800px; background-color: aqua">
						<Splitter />
					</div>
				</div>
			</template>
		</Splitter>
	</div>
</template>

<script setup lang="ts" name="splitter">
import addressJson from '@/assets/json/address.json';
// 默认配置
const defaultProps = {
	children: 'children',
	label: 'name',
};
const singleSelected = ref();
// 单选选中
const changeTreeFilterSingle = (e: any) => {
	singleSelected.value = e;
};
</script>
<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	overflow-y: auto;
	.descriptions-box {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow-y: auto !important;
	}
}
</style>
