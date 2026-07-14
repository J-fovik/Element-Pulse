<template>
	<el-form size="small">
		<el-form-item>
			<el-radio v-model="radioValue" :label="1"> 秒，允许的通配符[, - * /] </el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="2">
				周期从
				<el-input-number v-model="cycle01" :min="0" :max="60" /> -
				<el-input-number v-model="cycle02" :min="0" :max="60" /> 秒
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="3">
				从
				<el-input-number v-model="average01" :min="0" :max="60" /> 秒开始，每
				<el-input-number v-model="average02" :min="0" :max="60" /> 秒执行一次
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
	name: 'CrontabSecond',
	props: ['check', 'radioParent', 'cron'], // 👈 新增 cron prop
	emits: ['update'], // 👈 Vue3 需要声明
	data() {
		return {
			radioValue: 1,
			cycle01: 1,
			cycle02: 2,
			average01: 0,
			average02: 1,
			checkboxList: [],
			// checkNum: this.$options.propsData.check, // ❌ 删除这行
		};
	},
	computed: {
		cycleTotal: function () {
			// ✅ 直接使用 this.check
			this.cycle01 = this.check(this.cycle01, 0, 59);
			this.cycle02 = this.check(this.cycle02, 0, 59);
			return `${this.cycle01}-${this.cycle02}`;
		},
		averageTotal: function () {
			// ✅ 直接使用 this.check
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
		// ✅ 修改 radioParent 的监听方式
		radioParent: {
			handler(val) {
				if (val !== undefined && this.radioValue !== val) {
					this.radioValue = val;
				}
			},
			immediate: true, // 如果需要初始化
		},
	},
	methods: {
		radioChange() {
			switch (this.radioValue) {
				case 1:
					this.$emit('update', 'second', '*', 'second');
					this.$emit('update', 'min', '*', 'second');
					break;
				case 2:
					this.$emit('update', 'second', `${this.cycle01}-${this.cycle02}`);
					break;
				case 3:
					this.$emit('update', 'second', `${this.average01}/${this.average02}`);
					break;
				case 4:
					this.$emit('update', 'second', this.checkboxString);
					break;
			}
		},
		cycleChange() {
			// ✅ 改为数字比较
			if (this.radioValue === 2) {
				this.$emit('update', 'second', this.cycleTotal);
			}
		},
		averageChange() {
			// ✅ 改为数字比较
			if (this.radioValue === 3) {
				this.$emit('update', 'second', this.averageTotal);
			}
		},
		checkboxChange() {
			// ✅ 改为数字比较
			if (this.radioValue === 4) {
				this.$emit('update', 'second', this.checkboxString);
			}
		},
		othChange() {
			// ✅ 修复反解析逻辑（具体实现需要根据实际情况调整）
			// 假设 cron 是对象，有 second 属性
			const ins = this.cron?.second || this.cron;
			if (!ins) return;

			if (ins === '*') {
				this.radioValue = 1;
			} else if (ins.indexOf('-') > -1) {
				this.radioValue = 2;
			} else if (ins.indexOf('/') > -1) {
				this.radioValue = 3;
			} else {
				this.radioValue = 4;
				this.checkboxList = ins.split(',');
			}
		},
	},
};
</script>
