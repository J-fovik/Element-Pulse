<template>
	<el-form size="small">
		<el-form-item>
			<el-radio v-model="radioValue" :label="1"> 分钟，允许的通配符[, - * /] </el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="2">
				周期从
				<el-input-number v-model="cycle01" :min="0" :max="60" /> -
				<el-input-number v-model="cycle02" :min="0" :max="60" /> 分钟
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="3">
				从
				<el-input-number v-model="average01" :min="0" :max="60" /> 分钟开始，每
				<el-input-number v-model="average02" :min="0" :max="60" /> 分钟执行一次
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="4">
				指定
				<el-select
					v-model="checkboxList"
					clearable
					placeholder="可多选"
					multiple
					style="width: 200px"
				>
					<el-option v-for="item in 60" :key="item" :value="item - 1">{{
						item - 1
					}}</el-option>
				</el-select>
			</el-radio>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	name: 'CrontabMin',
	props: ['check', 'cron'],
	emits: ['update'], // 👈 新增：Vue3 需要显式声明 emits
	data() {
		return {
			radioValue: 1,
			cycle01: 1,
			cycle02: 2,
			average01: 0,
			average02: 1,
			checkboxList: [],
		};
	},
	computed: {
		cycleTotal: function () {
			this.cycle01 = this.check(this.cycle01, 0, 59);
			this.cycle02 = this.check(this.cycle02, 0, 59);
			return `${this.cycle01}-${this.cycle02}`;
		},
		averageTotal: function () {
			this.average01 = this.check(this.average01, 0, 59);
			this.average02 = this.check(this.average02, 1, 59);
			return `${this.average01}/${this.average02}`;
		},
		checkboxString: function () {
			const str = this.checkboxList.join();
			return str === '' ? '*' : str;
		},
	},
	watch: {
		radioValue: 'radioChange',
		cycleTotal: 'cycleChange',
		averageTotal: 'averageChange',
		checkboxString: 'checkboxChange',
	},
	methods: {
		radioChange() {
			if (this.radioValue !== 1 && this.cron.second === '*') {
				this.$emit('update', 'second', '0', 'min');
			}
			switch (this.radioValue) {
				case 1:
					this.$emit('update', 'min', '*', 'min');
					this.$emit('update', 'hour', '*', 'min');
					break;
				case 2:
					this.$emit('update', 'min', `${this.cycle01}-${this.cycle02}`, 'min');
					break;
				case 3:
					this.$emit('update', 'min', `${this.average01}/${this.average02}`, 'min');
					break;
				case 4:
					this.$emit('update', 'min', this.checkboxString, 'min');
					break;
			}
		},
		cycleChange() {
			if (this.radioValue === 2) {
				// 👈 修改：原先是 '2' 字符串，改为数字 2
				this.$emit('update', 'min', this.cycleTotal, 'min');
			}
		},
		averageChange() {
			if (this.radioValue === 3) {
				// 👈 修改：原先是 '3' 字符串，改为数字 3
				this.$emit('update', 'min', this.averageTotal, 'min');
			}
		},
		checkboxChange() {
			if (this.radioValue === 4) {
				// 👈 修改：原先是 '4' 字符串，改为数字 4
				this.$emit('update', 'min', this.checkboxString, 'min');
			}
		},
	},
};
</script>
