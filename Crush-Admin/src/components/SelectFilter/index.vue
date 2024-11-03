<template>
	<div class="w-full">
		<div
			v-for="(item, index) in data"
			:key="item.key"
			class="flex items-center border-bottom"
			:class="{ 'border-none': index === data?.length - 1 }"
		>
			<div v-if="item.isShow && item.options.length" class="flex items-center mt10">
				<div class="mr15">
					{{ item.title }}
				</div>
				<el-scrollbar>
					<ul class="flex flex-1 p0 my13">
						<li
							v-for="option in item.options"
							:key="option.value"
							class="flex items-center py5 px15 mr16 rounded32 cursor-pointer font13"
							:class="{
								active:
									option.value === selected[item.key] ||
									(Array.isArray(selected[item.key]) &&
										selected[item.key].includes(option.value)),
							}"
							@click="select(item, option)"
						>
							<slot :row="option">
								<el-icon v-if="option.icon" class="mr4 font13">
									<component :is="option.icon" />
								</el-icon>
								<span>{{ option.label }}</span>
							</slot>
						</li>
					</ul>
				</el-scrollbar>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="SelectFilter">
interface OptionsProps {
	value: string | number;
	label: string;
	icon?: string;
}

interface SelectDataProps {
	title: string; // 列表标题
	key: string; // 当前筛选项 key 值
	multiple?: boolean; // 是否为多选
	isShow: boolean;
	options: OptionsProps[]; // 筛选数据
}

interface SelectFilterProps {
	data?: SelectDataProps[]; // 选择的列表数据
	defaultValues?: { [key: string]: any }; // 默认值
}
// 接受父组件参数及设置默认值
const props = withDefaults(defineProps<SelectFilterProps>(), {
	data: () => [],
	defaultValues: () => ({}),
});
// 给父组件传参
const emits = defineEmits(['change']);
// 重新接收默认值
const selected = ref<{ [key: string]: any }>({});
watch(
	() => props.defaultValues,
	() => {
		props.data.forEach((item) => {
			if (item.multiple) selected.value[item.key] = props.defaultValues[item.key] ?? [''];
			else selected.value[item.key] = props.defaultValues[item.key] ?? '';
		});
	},
	{ deep: true, immediate: true }
);

/**
 * @description 选择筛选项
 * @param {Object} item 选中的哪项列表
 * @param {Object} option 选中的值
 * @return void
 * */
const select = (item: SelectDataProps, option: OptionsProps) => {
	if (!item.multiple) {
		// * 单选
		if (selected.value[item.key] !== option.value) selected.value[item.key] = option.value;
	} else {
		// * 多选
		// 如果选中的是第一个值，则直接设置
		if (item.options[0].value === option.value) selected.value[item.key] = [option.value];
		// 如果选择的值已经选中了，则删除选中的值
		if (selected.value[item.key].includes(option.value)) {
			let currentIndex = selected.value[item.key].findIndex((s: any) => s === option.value);
			selected.value[item.key].splice(currentIndex, 1);
			// 当全部删光时，把第第一个值选中
			if (selected.value[item.key].length == 0)
				selected.value[item.key] = [item.options[0].value];
		} else {
			// 未选中点击值的时候，追加选中值
			selected.value[item.key].push(option.value);
			// 单选中全部并且点击到了未选中的值，把第一个值删除掉
			if (selected.value[item.key].includes(item.options[0].value))
				selected.value[item.key].splice(0, 1);
		}
	}
	emits('change', selected.value);
};
</script>

<style scoped lang="scss">
li {
	color: var(--el-color-primary);
	background: var(--el-color-primary-light-9);
	border: 1px solid var(--el-color-primary-light-5);
	&:hover {
		color: #ffffff;
		background: var(--el-color-primary);
		border-color: var(--el-color-primary);
		transition: 0.1s;
	}
	&.active {
		font-weight: bold;
		color: #ffffff;
		background: var(--el-color-primary);
		border-color: var(--el-color-primary);
	}
}
.border-bottom {
	border-bottom: 1px dashed var(--el-border-color-light);
}
</style>
