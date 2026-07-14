<template>
	<el-form size="small">
		<el-form-item>
			<el-radio v-model="radioValue" :label="1"> 周，允许的通配符[, - * / L #] </el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="2"> 不指定 </el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="3">
				周期从星期
				<el-input-number v-model="cycle01" :min="1" :max="7" /> -
				<el-input-number v-model="cycle02" :min="1" :max="7" />
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="4">
				第
				<el-input-number v-model="average01" :min="1" :max="4" /> 周的星期
				<el-input-number v-model="average02" :min="1" :max="7" />
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="5">
				本月最后一个星期
				<el-input-number v-model="weekday" :min="1" :max="7" />
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="6">
				指定
				<el-select
					v-model="checkboxList"
					clearable
					placeholder="可多选"
					multiple
					style="width: 200px"
				>
					<el-option v-for="(item, index) of weekList" :key="index" :value="index + 1">{{
						item
					}}</el-option>
				</el-select>
			</el-radio>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	name: 'CrontabWeek',
	props: ['check', 'cron'],
	emits: ['update'], // 👈 新增
	data() {
		return {
			radioValue: 2,
			weekday: 1,
			cycle01: 1,
			cycle02: 2,
			average01: 1,
			average02: 1,
			checkboxList: [],
			weekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			// checkNum: this.$options.propsData.check, // ❌ 删除
		};
	},
	computed: {
		cycleTotal: function () {
			// ✅ 直接使用 this.check
			this.cycle01 = this.check(this.cycle01, 1, 7);
			this.cycle02 = this.check(this.cycle02, 1, 7);
			return `${this.cycle01}-${this.cycle02}`;
		},
		averageTotal: function () {
			// ✅ 直接使用 this.check
			this.average01 = this.check(this.average01, 1, 4);
			this.average02 = this.check(this.average02, 1, 7);
			return `${this.average01}#${this.average02}`;
		},
		weekdayCheck: function () {
			// ✅ 直接使用 this.check
			this.weekday = this.check(this.weekday, 1, 7);
			return this.weekday;
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
		weekdayCheck: 'weekdayChange',
		checkboxString: 'checkboxChange',
	},
	methods: {
		radioChange() {
			// ✅ 修复：处理 radioValue === 1 的情况
			if (this.radioValue === 1) {
				this.$emit('update', 'week', '*');
				this.$emit('update', 'year', '*');
			} else {
				// ✅ 增加安全判断，避免 this.cron 不存在时报错
				if (this.cron && this.cron.month === '*') {
					this.$emit('update', 'month', '?', 'week'); // 改为 '?' 更合理
				}
				if (this.cron && this.cron.day === '*') {
					this.$emit('update', 'day', '?', 'week'); // 改为 '?' 更合理
				}
				if (this.cron && this.cron.hour === '*') {
					this.$emit('update', 'hour', '0', 'week');
				}
				if (this.cron && this.cron.min === '*') {
					this.$emit('update', 'min', '0', 'week');
				}
				if (this.cron && this.cron.second === '*') {
					this.$emit('update', 'second', '0', 'week');
				}
			}

			// 根据当前 radioValue 更新
			switch (this.radioValue) {
				case 2:
					this.$emit('update', 'week', '?');
					break;
				case 3:
					this.$emit('update', 'week', `${this.cycle01}-${this.cycle02}`);
					break;
				case 4:
					this.$emit('update', 'week', `${this.average01}#${this.average02}`);
					break;
				case 5:
					this.$emit('update', 'week', `${this.weekday}L`);
					break;
				case 6:
					this.$emit('update', 'week', this.checkboxString);
					break;
			}
		},
		cycleChange() {
			// ✅ 改为数字比较
			if (this.radioValue === 3) {
				this.$emit('update', 'week', this.cycleTotal);
			}
		},
		averageChange() {
			// ✅ 改为数字比较
			if (this.radioValue === 4) {
				this.$emit('update', 'week', this.averageTotal);
			}
		},
		weekdayChange() {
			// ✅ 改为数字比较
			if (this.radioValue === 5) {
				this.$emit('update', 'week', `${this.weekday}L`);
			}
		},
		checkboxChange() {
			// ✅ 改为数字比较
			if (this.radioValue === 6) {
				this.$emit('update', 'week', this.checkboxString);
			}
		},
	},
};
</script>
