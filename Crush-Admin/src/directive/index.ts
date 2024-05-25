import type { App } from 'vue';
import { authDirective } from '/@/directive/authDirective';
import {
	wavesDirective,
	dragDirective,
	fadeUpDirective,
	focusDirective,
	throttleDirective,
	doubleClickDirective,
	lazyImgDirective,
	longpressDirective,
	clickOutsideDirective,
	ellipsisDirective,
	tooltipDirective,
	copyDirective,
	scrollToDirective,
	visibilityDirective,
} from '/@/directive/customDirective';

/**
 * 导出指令方法：v-xxx
 * @methods authDirective 用户权限指令，用法：v-auth
 * @methods wavesDirective 按钮波浪指令，用法：v-waves
 * @methods dragDirective 拖动指令 ，用法：v-drag
 * @methods fadeUpDirective 平滑上升指令 ，用法：v-fadeUp
 * @methods focusDirective 自动获取焦点指令 ，用法：v-focus
 * @methods throttleDirective 防止重复提交指令 ，用法：v-throttle
 * @methods doubleClickDirective 双击触发指令 ，用法：v-doubleClick
 * @methods lazyImgDirective 图片懒加载指令 ，用法：v-lazy
 * @methods longpressDirective 长按触发指令 ，用法：v-longpress
 * @methods clickOutsideDirective 判断点击位置指令 ，用法：v-clickOutside
 * @methods ellipsisDirective 文本省略指令 ，用法：v-ellipsis
 * @methods tooltipDirective 文本提示指令 ，用法：v-tooltip
 * @methods copyDirective 文本复制指令 ，用法：v-copy
 * @methods scrollToDirective 滚动到指定视图 ，用法：v-scrollTo
 * @methods visibilityDirective 元素可见性指令 ，用法：v-visibility
 */
export function directive(app: App) {
	// 用户权限指令
	authDirective(app);
	// 按钮波浪指令
	wavesDirective(app);
	// 拖动指令
	dragDirective(app);
	// 平滑上升
	fadeUpDirective(app);
	// 自动获取焦点
	focusDirective(app);
	// 防止重复提交
	throttleDirective(app);
	// 双击触发指令
	doubleClickDirective(app);
	// 图片懒加载
	lazyImgDirective(app);
	// 长按指令
	longpressDirective(app);
	// 点击元素外部指令
	clickOutsideDirective(app);
	// 文本省略
	ellipsisDirective(app);
	// 文本提示
	tooltipDirective(app);
	// 文本复制指令
	copyDirective(app);
	// 滚动到指定视图
	scrollToDirective(app);
	// 元素可见性指令
	visibilityDirective(app);
}
