<template>
	<div>
		<el-card shadow="hover" class="mb20" header="Animation 数字滚动">
			<el-alert
				title="Animation 是基于`animation`方法"
				type="warning"
				:closable="false"
				class="my15"
			></el-alert>
			<el-row :gutter="15">
				<el-col :sm="6" v-for="(v, k) in recommendList" :key="k">
					<div class="data" :style="{ 'background-color': v.bg }">
						<el-icon class="element">
							<component :is="v.icon" :color="v.iconColor" />
						</el-icon>
						<div class="data-auto">
							<div>{{ v.title }}</div>
							<div class="my5 font10">{{ v.msg }}</div>
							<div class="font20">
								<Animation :value="v.num" />
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-descriptions :column="1" border class="mt20">
				<el-descriptions-item label="value">滚动数字值</el-descriptions-item>
			</el-descriptions>
		</el-card>

		<el-card shadow="hover" class="mb20" header="CountUp 数字滚动">
			<el-alert
				title="CountUp 是基于`gsap`插件，官方文档请查看 ：https://www.npmjs.com/package/gsap"
				type="warning"
				:closable="false"
				class="my15"
			></el-alert>
			<el-row :gutter="15">
				<el-col :sm="6" v-for="(v, k) in recommendList" :key="k">
					<div class="data" :style="{ 'background-color': v.bg }">
						<el-icon class="element">
							<component :is="v.icon" :color="v.iconColor" />
						</el-icon>
						<div class="data-auto">
							<div>{{ v.title }}</div>
							<div class="my5 font10">{{ v.msg }}</div>
							<div class="font20">
								<CountUp :value="v.num" />
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-descriptions :column="1" border class="mt20">
				<el-descriptions-item label="value">滚动数字值</el-descriptions-item>
			</el-descriptions>
		</el-card>

		<el-card shadow="hover" class="mb20" header="Statistic 数字滚动">
			<el-alert
				title="Statistic 是基于`vueuse`的`useTransition`，官方文档请查看 ：https://vueuse.org/core/useTransition/"
				type="warning"
				:closable="false"
				class="my15"
			></el-alert>
			<el-row :gutter="15">
				<el-col :sm="6" v-for="(v, k) in recommendList" :key="k">
					<div class="data" :style="{ 'background-color': v.bg }">
						<el-icon class="element">
							<component :is="v.icon" :color="v.iconColor" />
						</el-icon>
						<div class="data-auto">
							<div>{{ v.title }}</div>
							<div class="my5 font10">{{ v.msg }}</div>
							<div class="font20">
								<Statistic :value="v.num" />
							</div>
						</div>
					</div>
				</el-col>
			</el-row>

			<el-descriptions :column="1" border class="mt20">
				<el-descriptions-item label="value">滚动数字值</el-descriptions-item>
			</el-descriptions>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="rollNumber">
// 获取数据
const recommendList = [
	{
		title: '优惠券',
		msg: '现金券、折扣券、营销必备',
		num: 22,
		icon: 'Food',
		bg: '#48D18D',
		iconColor: '#64d89d',
	},
	{
		title: '多人拼团',
		msg: '社交电商、开辟流量',
		num: 5532,
		icon: 'ShoppingCart',
		bg: '#F95959',
		iconColor: '#F86C6B',
	},
	{
		title: '分销中心',
		msg: '轻松招募分销员，成功推广奖励',
		num: 5233,
		icon: 'School',
		bg: '#8595F4',
		iconColor: '#92A1F4',
	},
	{
		title: '秒杀',
		msg: '超低价抢购引导更多销量',
		num: 100,
		icon: 'AlarmClock',
		bg: '#FEBB50',
		iconColor: '#FDC566',
	},
];
</script>
<style scoped lang="scss">
.data {
	position: relative;
	height: 120px;
	border-radius: 3px;
	overflow: hidden;
	cursor: pointer;
	&:hover {
		.element {
			right: 0px !important;
			bottom: 0px !important;
			transition: all ease 0.3s;
		}
	}
	.element {
		position: absolute;
		right: -10px;
		bottom: -10px;
		font-size: 70px;
		transform: rotate(-30deg);
		transition: all ease 0.3s;
	}
	.data-auto {
		padding: 15px;
		position: absolute;
		left: 0;
		top: 5%;
	}
}
</style>
