<template>
	<el-form size="small">
		<el-form-item>
			<el-radio v-model="radioValue" :label="1"> 不填，允许的通配符[, - * /] </el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="2"> 每年 </el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="3">
				周期从
				<el-input-number v-model="cycle01" :min="fullYear" /> -
				<el-input-number v-model="cycle02" :min="fullYear" />
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="4">
				从
				<el-input-number v-model="average01" :min="fullYear" /> 年开始，每
				<el-input-number v-model="average02" :min="1" /> 年执行一次
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model="radioValue" :label="5">
				指定
				<el-select v-model="checkboxList" clearable placeholder="可多选" multiple>
					<el-option
						v-for="item in 9"
						:key="item"
						:value="item - 1 + fullYear"
						:label="item - 1 + fullYear"
					/>
				</el-select>
			</el-radio>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	name: 'CrontabYear',
	props: ['check', 'month', 'cron'],
	emits: ['update'], // 👈 新增
	data() {
		return {
			fullYear: 0,
			radioValue: 1,
			cycle01: 0,
			cycle02: 0,
			average01: 0,
			average02: 1,
			checkboxList: [],
			// checkNum: this.$options.propsData.check, // ❌ 删除
		};
	},
	computed: {
		cycleTotal: function () {
			// ✅ 直接使用 this.check
			this.cycle01 = this.check(this.cycle01, this.fullYear, this.fullYear + 100);
			this.cycle02 = this.check(this.cycle02, this.fullYear + 1, this.fullYear + 101);
			return `${this.cycle01}-${this.cycle02}`;
		},
		averageTotal: function () {
			// ✅ 直接使用 this.check
			this.average01 = this.check(this.average01, this.fullYear, this.fullYear + 100);
			this.average02 = this.check(this.average02, 1, 10);
			return `${this.average01}/${this.average02}`;
		},
		checkboxString: function () {
			const str = this.checkboxList.join();
			// ✅ 空值时返回 '*' 更合理
			return str || '*';
		},
	},
	watch: {
		radioValue: 'radioChange',
		cycleTotal: 'cycleChange',
		averageTotal: 'averageChange',
		checkboxString: 'checkboxChange',
	},
	mounted: function () {
		// 仅获取当前年份
		this.fullYear = Number(new Date().getFullYear());

		// ✅ 建议：初始化时根据 cron 值设置 radioValue（如果需要的话）
		// 如果需要反解析，可以在这里调用
		// this.initFromCron();
	},
	methods: {
		radioChange() {
			// ✅ 增加安全判断
			if (this.cron && this.cron.month === '*') {
				this.$emit('update', 'month', '0', 'year');
			}
			if (this.cron && this.cron.day === '*') {
				this.$emit('update', 'day', '0', 'year');
			}
			if (this.cron && this.cron.hour === '*') {
				this.$emit('update', 'hour', '0', 'year');
			}
			if (this.cron && this.cron.min === '*') {
				this.$emit('update', 'min', '0', 'year');
			}
			if (this.cron && this.cron.second === '*') {
				this.$emit('update', 'second', '0', 'year');
			}

			switch (this.radioValue) {
				case 1:
					this.$emit('update', 'year', '');
					break;
				case 2:
					this.$emit('update', 'year', '*');
					break;
				case 3:
					this.$emit('update', 'year', `${this.cycle01}-${this.cycle02}`);
					break;
				case 4:
					this.$emit('update', 'year', `${this.average01}/${this.average02}`);
					break;
				case 5:
					this.$emit('update', 'year', this.checkboxString);
					break;
			}
		},
		cycleChange() {
			// ✅ 改为数字比较
			if (this.radioValue === 3) {
				this.$emit('update', 'year', this.cycleTotal);
			}
		},
		averageChange() {
			// ✅ 改为数字比较
			if (this.radioValue === 4) {
				this.$emit('update', 'year', this.averageTotal);
			}
		},
		checkboxChange() {
			// ✅ 改为数字比较
			if (this.radioValue === 5) {
				this.$emit('update', 'year', this.checkboxString);
			}
		},
	},
};
</script>
