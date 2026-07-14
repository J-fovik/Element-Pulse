<template>
	<!-- 组件大小 -->
	<el-dropdown trigger="click" @command="setAssemblySize">
		<i :class="'iconfont icon-contentright'" class="toolBar-icon"></i>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item
					v-for="item in assemblySizeList"
					:key="item.value"
					:command="item.value"
					:disabled="assemblySize === item.value"
				>
					{{ item.label }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts" name="AssemblySize">
import { useGlobalStore } from '@/stores';
import { AssemblySizeType } from '@/stores/interface';

const globalStore = useGlobalStore();
const assemblySize = computed(() => globalStore.assemblySize);
// 组件大小配置
const assemblySizeList = [
	{ label: '默认', value: 'default' },
	{ label: '大型', value: 'large' },
	{ label: '小型', value: 'small' },
];
// 设置组件大小
const setAssemblySize = (item: AssemblySizeType) => {
	if (assemblySize.value === item) return;
	globalStore.setGlobalState('assemblySize', item);
};
</script>
