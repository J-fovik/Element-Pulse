<template>
	<div class="fun-tagsview layout-padding">
		<el-card shadow="hover" header="tagsView 当前页演示" class="layout-padding-auto">
			<div class="flex-warp">
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="primary" size="default" @click="refreshCurrentTagsView">
							<el-icon>
								<ele-RefreshRight />
							</el-icon>
							刷新当前页
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="info" size="default" @click="closeCurrentTagsView">
							<el-icon>
								<ele-Close />
							</el-icon>
							关闭当前页
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="warning" size="default" @click="closeOtherTagsView">
							<el-icon>
								<ele-CircleClose />
							</el-icon>
							关闭其它
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="danger" size="default" @click="closeAllTagsView">
							<el-icon>
								<ele-FolderDelete />
							</el-icon>
							全部关闭
						</el-button>
					</div>
				</div>
				<div class="flex-warp-item">
					<div class="flex-warp-item-box">
						<el-button type="success" size="default" @click="openCurrenFullscreen">
							<el-icon>
								<ele-FullScreen />
							</el-icon>
							当前页全屏
						</el-button>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="funTagsView">
import { useRoute } from 'vue-router';
import mittBus from '/@/utils/mitt';

// 定义变量内容
const route = useRoute();

// 0 刷新当前，1 关闭当前，2 关闭其它，3 关闭全部 4 当前页全屏
// 1、刷新当前 tagsView
const refreshCurrentTagsView = () => {
	mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 0, ...route }));
};
// 2、关闭当前 tagsView
const closeCurrentTagsView = () => {
	mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 1, ...route }));
};
// 3、关闭其它 tagsView
const closeOtherTagsView = () => {
	mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 2, ...route }));
};
// 4、关闭全部 tagsView
const closeAllTagsView = () => {
	mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 3, ...route }));
};
// 5、开启当前页面全屏
const openCurrenFullscreen = () => {
	mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 4, ...route }));
};
</script>

<style scoped lang="scss">
.fun-tagsview {
	.fun-tagsview-from-item {
		:deep(.el-form-item__content) {
			margin-left: 0 !important;
		}
	}
}
</style>
