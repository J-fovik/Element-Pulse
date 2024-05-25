import type { App } from 'vue';
import { authDirective } from '/@/directive/authDirective';
import {
	wavesDirective,
	fadeUpDirective,
	focusDirective,
	lazyImgDirective,
	ellipsisDirective,
	tooltipDirective,
	visibilityDirective,
	waterMarkerDirective,
} from '/@/directive/customDirective';
import {
	dragDirective,
	draggableDirective,
	throttleDirective,
	debounceDirective,
	doubleClickDirective,
	longpressDirective,
	clickOutsideDirective,
	copyDirective,
	scrollToDirective,
} from '/@/directive/operateDirective';

/**
 * 导出指令方法：v-xxx
 * @methods authDirective 用户权限指令 ，用法：v-auth
 * @methods wavesDirective 波浪按钮指令 ，用法：v-waves
 * @methods fadeUpDirective 平滑上升指令 ，用法：v-fadeUp
 * @methods focusDirective 自动获取焦点指令 ，用法：v-focus
 * @methods lazyImgDirective 图片懒加载指令 ，用法：v-lazy
 * @methods ellipsisDirective 文本省略指令 ，用法：v-ellipsis
 * @methods tooltipDirective 文本提示指令 ，用法：v-tooltip
 * @methods visibilityDirective 可视元素指令 ，用法：v-visibility
 * @methods waterMarkerDirective 添加水印指令 ，用法：v-waterMarker
 * @methods dragDirective 拖动指令 ，用法：v-drag
 * @methods draggableDirective 父元素内拖动指令 ，用法：v-draggable
 * @methods throttleDirective 节流指令 ，用法：v-throttle
 * @methods debounceDirective 防抖指令 ，用法：v-debounce
 * @methods doubleClickDirective 双击触发指令 ，用法：v-doubleClick
 * @methods longpressDirective 长按触发指令 ，用法：v-longpress
 * @methods clickOutsideDirective 点击元素内外部指令 ，用法：v-clickOutside
 * @methods copyDirective 文本复制指令 ，用法：v-copy
 * @methods scrollToDirective 滚动到指定视图 ，用法：v-scrollTo
 */
export function directive(app: App) {
	authDirective(app); // 用户权限指令
	wavesDirective(app); // 波浪按钮指令
	fadeUpDirective(app); // 平滑上升
	focusDirective(app); // 自动获取焦点
	lazyImgDirective(app); // 图片懒加载
	ellipsisDirective(app); // 文本省略
	tooltipDirective(app); // 文本提示
	visibilityDirective(app); // 可视元素指令
	waterMarkerDirective(app); // 添加水印指令
	dragDirective(app); // 拖动指令
	draggableDirective(app); // 父元素内拖动指令
	throttleDirective(app); // 节流指令
	debounceDirective(app); // 防抖指令
	doubleClickDirective(app); // 双击触发指令
	longpressDirective(app); // 长按指令
	clickOutsideDirective(app); // 点击元素内外部指令
	copyDirective(app); // 文本复制指令
	scrollToDirective(app); // 滚动到指定视图
}
