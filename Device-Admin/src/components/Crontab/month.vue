<template>
	<el-form size="small">
		<el-form-item>
			<el-radio v-model="radioValue" :label="1"> 月，允许的通配符[, - * /] </el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="2">
				周期从
				<el-input-number v-model="cycle01" :min="1" :max="12" /> -
				<el-input-number v-model="cycle02" :min="1" :max="12" /> 月
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="3">
				从
				<el-input-number v-model="average01" :min="1" :max="12" /> 月开始， 每
				<el-input-number v-model="average02" :min="1" :max="12" /> 月执行一次
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="4">
				指定
				<el-select
					v-model="checkboxList"
					multiple
					placeholder="可多选"
					style="width: 200px"
				>
					<el-option v-for="item in 12" :key="item" :value="item">
						{{ item }}
					</el-option>
				</el-select>
			</el-radio>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps<{
	check: (val: number, min: number, max: number) => number;
	cron: Record<string, string>;
}>();

const emit = defineEmits(['update']);

const radioValue = ref(1);
const cycle01 = ref(1);
const cycle02 = ref(2);
const average01 = ref(1);
const average02 = ref(1);
const checkboxList = ref<number[]>([]);

const cycleTotal = computed(() => {
	cycle01.value = props.check(cycle01.value, 1, 12);
	cycle02.value = props.check(cycle02.value, 1, 12);
	return `${cycle01.value}-${cycle02.value}`;
});

const averageTotal = computed(() => {
	average01.value = props.check(average01.value, 1, 12);
	average02.value = props.check(average02.value, 1, 12);
	return `${average01.value}/${average02.value}`;
});

const checkboxString = computed(() =>
	checkboxList.value.length ? checkboxList.value.join(',') : '*',
);

watch(radioValue, radioChange);
watch(cycleTotal, cycleChange);
watch(averageTotal, averageChange);
watch(checkboxString, checkboxChange);

function radioChange() {
	switch (radioValue.value) {
		case 1:
			emit('update', 'month', '*');
			break;
		case 2:
			emit('update', 'month', cycleTotal.value);
			break;
		case 3:
			emit('update', 'month', averageTotal.value);
			break;
		case 4:
			emit('update', 'month', checkboxString.value);
			break;
	}
}

function cycleChange() {
	if (radioValue.value === 2) emit('update', 'month', cycleTotal.value);
}

function averageChange() {
	if (radioValue.value === 3) emit('update', 'month', averageTotal.value);
}

function checkboxChange() {
	if (radioValue.value === 4) emit('update', 'month', checkboxString.value);
}
</script>
