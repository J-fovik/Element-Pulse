<template>
	<div class="personal layout-pd">
		<el-row>
			<!-- 励志语录 -->
			<el-col :xs="24" :sm="8" class="pl15 personal-info">
				<el-card shadow="hover">
					<template #header>
						<span>励志语录</span>
						<span class="personal-info-more">更多</span>
					</template>
					<div class="personal-info-box">
						<ul class="personal-info-ul">
							<li v-for="(v, k) in state.newsInfoList" :key="k" class="personal-info-li">
								<!-- :href="v.link" -->
								<a target="_block" class="personal-info-li-title">
									{{ v.title }}
								</a>
							</li>
						</ul>
					</div>
				</el-card>
			</el-col>
			<!-- 营销推荐 -->
			<el-col :span="24">
				<el-card shadow="hover" class="mt15" header="营销推荐">
					<el-row :gutter="15" class="personal-recommend-row">
						<el-col :sm="6" v-for="(v, k) in state.recommendList" :key="k" class="personal-recommend-col">
							<div class="personal-recommend" :style="{ 'background-color': v.bg }">
								<SvgIcon :name="v.icon" :size="70" :style="{ color: v.iconColor }" />
								<div class="personal-recommend-auto">
									<div>{{ v.title }}</div>
									<div class="personal-recommend-msg">{{ v.msg }}</div>
								</div>
							</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="personal">
import { formatAxis } from '/@/utils/formatTime';
import { newsInfoList, recommendList } from './mock';

// 定义变量内容
const state = reactive<PersonalState>({
	newsInfoList,
	recommendList,
	personalForm: {
		name: '',
		email: '',
		autograph: '',
		occupation: '',
		phone: '',
		sex: '',
	},
});

// 当前时间提示语
const currentTime = computed(() => {
	return formatAxis(new Date());
});
</script>

<style scoped lang="scss">
@import '../../theme/mixins/index.scss';
.personal {
	.personal-info {
		.personal-info-more {
			float: right;
			color: var(--el-text-color-secondary);
			font-size: 13px;
			&:hover {
				color: var(--el-color-primary);
				cursor: pointer;
			}
		}
		.personal-info-box {
			height: 130px;
			overflow: hidden;
			.personal-info-ul {
				list-style: none;
				.personal-info-li {
					font-size: 13px;
					padding-bottom: 10px;
					.personal-info-li-title {
						display: inline-block;
						@include text-ellipsis(1);
						color: var(--el-text-color-secondary);
						text-decoration: none;
					}
					& a:hover {
						color: var(--el-color-primary);
						cursor: pointer;
					}
				}
			}
		}
	}
	.personal-recommend-row {
		.personal-recommend-col {
			.personal-recommend {
				position: relative;
				height: 100px;
				border-radius: 3px;
				overflow: hidden;
				cursor: pointer;
				&:hover {
					i {
						right: 0px !important;
						bottom: 0px !important;
						transition: all ease 0.3s;
					}
				}
				i {
					position: absolute;
					right: -10px;
					bottom: -10px;
					font-size: 70px;
					transform: rotate(-30deg);
					transition: all ease 0.3s;
				}
				.personal-recommend-auto {
					padding: 15px;
					position: absolute;
					left: 0;
					top: 5%;
					color: var(--next-color-white);
					.personal-recommend-msg {
						font-size: 12px;
						margin-top: 10px;
					}
				}
			}
		}
	}
}
</style>
