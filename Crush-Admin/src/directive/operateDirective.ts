import type { App, DirectiveBinding } from 'vue';
import { ElMessage } from 'element-plus';
interface ElType extends HTMLElement {
	__handleClick__: any;
}
/**
 * 自定义拖动指令
 * @directive  使用方式：v-drag="[dragDom,dragHeader]"，如 `<div v-drag="['.drag-container .el-dialog', '.drag-container .el-dialog__header']"></div>`
 * @description dragDom 要拖动的元素，dragHeader 要拖动的 Header 位置
 * @link 注意：https://github.com/element-plus/element-plus/issues/522
 * @lick 参考：https://blog.csdn.net/weixin_46391323/article/details/105228020?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-10&spm=1001.2101.3001.4242
 */
export function dragDirective(app: App) {
	app.directive('drag', {
		mounted(_el, binding) {
			if (!binding.value) return false;

			const dragDom = document.querySelector(binding.value[0]) as HTMLElement;
			const dragHeader = document.querySelector(binding.value[1]) as HTMLElement;

			dragHeader.onmouseover = () => (dragHeader.style.cursor = `move`);

			function down(e: any, type: string) {
				// 鼠标按下，计算当前元素距离可视区的距离
				const disX = type === 'pc' ? e.clientX - dragHeader.offsetLeft : e.touches[0].clientX - dragHeader.offsetLeft;
				const disY = type === 'pc' ? e.clientY - dragHeader.offsetTop : e.touches[0].clientY - dragHeader.offsetTop;

				// body当前宽度
				const screenWidth = document.body.clientWidth;
				// 可见区域高度(应为body高度，可某些环境下无法获取)
				const screenHeight = document.documentElement.clientHeight;

				// 对话框宽度
				const dragDomWidth = dragDom.offsetWidth;
				// 对话框高度
				const dragDomheight = dragDom.offsetHeight;

				const minDragDomLeft = dragDom.offsetLeft;
				const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

				const minDragDomTop = dragDom.offsetTop;
				const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;

				// 获取到的值带px 正则匹配替换
				let styL: any = getComputedStyle(dragDom).left;
				let styT: any = getComputedStyle(dragDom).top;

				// 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
				if (styL.includes('%')) {
					styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
					styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
				} else {
					styL = +styL.replace(/\px/g, '');
					styT = +styT.replace(/\px/g, '');
				}

				return {
					disX,
					disY,
					minDragDomLeft,
					maxDragDomLeft,
					minDragDomTop,
					maxDragDomTop,
					styL,
					styT,
				};
			}

			function move(e: any, type: string, obj: any) {
				let { disX, disY, minDragDomLeft, maxDragDomLeft, minDragDomTop, maxDragDomTop, styL, styT } = obj;

				// 通过事件委托，计算移动的距离
				let left = type === 'pc' ? e.clientX - disX : e.touches[0].clientX - disX;
				let top = type === 'pc' ? e.clientY - disY : e.touches[0].clientY - disY;

				// 边界处理
				if (-left > minDragDomLeft) {
					left = -minDragDomLeft;
				} else if (left > maxDragDomLeft) {
					left = maxDragDomLeft;
				}

				if (-top > minDragDomTop) {
					top = -minDragDomTop;
				} else if (top > maxDragDomTop) {
					top = maxDragDomTop;
				}

				// 移动当前元素
				dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
			}

			/**
			 * pc端
			 * onmousedown 鼠标按下触发事件
			 * onmousemove 鼠标按下时持续触发事件
			 * onmouseup 鼠标抬起触发事件
			 */
			dragHeader.onmousedown = (e) => {
				const obj = down(e, 'pc');
				document.onmousemove = (e) => {
					move(e, 'pc', obj);
				};
				document.onmouseup = () => {
					document.onmousemove = null;
					document.onmouseup = null;
				};
			};

			/**
			 * 移动端
			 * ontouchstart 当按下手指时，触发ontouchstart
			 * ontouchmove 当移动手指时，触发ontouchmove
			 * ontouchend 当移走手指时，触发ontouchend
			 */
			dragHeader.ontouchstart = (e) => {
				const obj = down(e, 'app');
				document.ontouchmove = (e) => {
					move(e, 'app', obj);
				};
				document.ontouchend = () => {
					document.ontouchmove = null;
					document.ontouchend = null;
				};
			};
		},
	});
}

/**
 * 父元素区域任意拖拽。
 * @directive  使用方式：v-draggable，如 `<div v-draggable></div>`
 * @directive  父元素需设置position: relative;
 * @directive 思路：
			1、设置需要拖拽的元素为absolute，其父元素为relative。
			2、鼠标按下(onmousedown)时记录目标元素当前的 left 和 top 值。
			3、鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 left 和 top 值
			4、鼠标松开(onmouseup)时完成一次拖拽
 */
export function draggableDirective(app: App) {
	app.directive('draggable', {
		mounted: function (el) {
			el.style.cursor = 'move';
			el.style.position = 'absolute';
			el.onmousedown = function (e: any) {
				let disX = e.pageX - el.offsetLeft;
				let disY = e.pageY - el.offsetTop;
				document.onmousemove = function (e) {
					let x = e.pageX - disX;
					let y = e.pageY - disY;
					let maxX = el.parentNode.offsetWidth - el.offsetWidth;
					let maxY = el.parentNode.offsetHeight - el.offsetHeight;
					if (x < 0) {
						x = 0;
					} else if (x > maxX) {
						x = maxX;
					}

					if (y < 0) {
						y = 0;
					} else if (y > maxY) {
						y = maxY;
					}
					el.style.left = x + 'px';
					el.style.top = y + 'px';
				};
				document.onmouseup = function () {
					document.onmousemove = document.onmouseup = null;
				};
			};
		},
	});
}

/**
 * 防止重复点击(节流)
 * @directive  使用方式：v-throttle，如 `<button v-throttle>click me</button>` `<button v-throttle="2000">click me</button>`
 * @description  可接受延时时间（毫秒），默认为2000
 * @directive  需求：防止按钮在短时间内被多次点击，使用节流函数限制规定时间内只能点击一次。
 * @description  用于表单提交以及按钮点击事件
 */
export function throttleDirective(app: App) {
	app.directive('throttle', {
		mounted(el, binding) {
			let throttleTime = binding.value; // 节流时间
			if (!throttleTime) {
				// 用户若不设置节流时间，则默认2s
				throttleTime = 2000;
			}
			let cbFun: any;
			el.addEventListener(
				'click',
				(event: any) => {
					if (!cbFun) {
						// 第一次执行
						cbFun = setTimeout(() => {
							cbFun = null;
						}, throttleTime);
					} else {
						event && event.stopImmediatePropagation();
					}
				},
				{ capture: true }
			);
		},
	});
}

/**
 * 防止重复点击(防抖)
 * @directive  使用方式：v-debounce，如 `<div v-debounce="fn">click me</div>`，`<div v-debounce：2000="fn">click me</div>`
 * @directive 可接受延时时间（毫秒），默认为500， 接收参数：function类型
 * @directive 在延迟后被调用。如果在延时时间内再次点击按钮，之前的计时将被清除，并重新开始计时
 */
export function debounceDirective(app: App) {
	app.directive('debounce', {
		// 指令挂载时的钩子函数
		mounted(el: ElType, binding: DirectiveBinding) {
			// 确保传递给指令的值是一个函数
			if (typeof binding.value !== 'function') {
				throw 'callback must be a function';
			}
			// 从指令参数中获取延迟时间，如果没有提供则使用默认值500毫秒
			const delay = parseInt(binding.arg || '500', 10);
			let timer: NodeJS.Timeout | null = null;
			// 定义一个事件处理函数
			el.__handleClick__ = function () {
				// 如果已经设置了计时器，则清除它
				if (timer) {
					clearTimeout(timer);
				}
				// 设置一个新的计时器，延迟执行传递给指令的函数
				timer = setTimeout(() => {
					binding.value();
				}, delay);
			};
			// 给元素添加点击事件监听器
			el.addEventListener('click', el.__handleClick__);
		},
		// 指令卸载前的钩子函数
		beforeUnmount(el: ElType) {
			// 移除元素上的点击事件监听器
			el.removeEventListener('click', el.__handleClick__);
		},
	});
}
/**
 * 双击触发指令
 * @directive  使用方式：v-doubleClick，如 `<button v-doubleClick="fn">双击</button>`
 * @description  双击触发函数
 */
export function doubleClickDirective(app: App) {
	app.directive('doubleClick', {
		mounted(el, binding) {
			el.addEventListener('dblclick', () => {
				binding.value();
			});
		},
	});
}

/**
 * 长按触发指令
 * @directive  使用方式：v-longpress 如：<div v-longpress="fn">longpress me</div>
 * @description  接收参数：function 类型 ，长按指令，长按时触发事件
 */
export function longpressDirective(app: App) {
	app.directive('longpress', {
		mounted(el: HTMLElement, binding: DirectiveBinding) {
			if (typeof binding.value !== 'function') {
				throw 'callback must be a function';
			}
			// 定义变量
			let pressTimer: any = null;
			// 定义函数处理长按
			let start = (e: any | TouchEvent) => {
				if (e.type === 'click' && e.button !== 0) {
					return;
				}
				if (pressTimer === null) {
					pressTimer = setTimeout(() => {
						// 执行长按后要调用的方法
						handler(e);
					}, 1000); // 长按时间超过1000毫秒后执行
				}
			};
			let cancel = (e: any) => {
				if (pressTimer !== null) {
					clearTimeout(pressTimer);
					pressTimer = null;
				}
			};
			// 运行函数
			const handler = (e: MouseEvent | TouchEvent) => {
				binding.value(e);
			};
			// 添加事件监听器
			el.addEventListener('mousedown', start);
			el.addEventListener('touchstart', start);
			// 取消计时器
			el.addEventListener('click', cancel);
			el.addEventListener('mouseout', cancel);
			el.addEventListener('touchend', cancel);
			el.addEventListener('touchcancel', cancel);
		},
	});
}
/**
 * 点击元素内外部
 *  @directive  使用方式：v-clickOutside 如：<div v-clickOutside="fn">click me</div>
 *  @description  接收参数：function类型，点击外面时返回true, 点击内部时返回false
 *  @description  函数接受个Boolean，如：function fn(type){// 可执行需要逻辑}
 */
export function clickOutsideDirective(app: App) {
	app.directive('clickOutside', {
		mounted(el: ElType, binding: DirectiveBinding) {
			if (typeof binding.value !== 'function') {
				throw 'callback must be a function';
			}
			el.__handleClick__ = function (e: any) {
				if (el.contains(e.target)) {
					binding.value(false);
				} else {
					binding.value(true);
				}
			};
			document.addEventListener('click', el.__handleClick__);
		},
		beforeUnmount(el: ElType) {
			document.removeEventListener('click', el.__handleClick__);
		},
	});
}

/**
 * 点击文本复制指令
 *  @directive  使用方式：v-copy 如：<div  v-copy="textValue">click me</div>
 *  @description  点击复制文本。
 */
export function copyDirective(app: App) {
	app.directive('copy', {
		mounted(el, binding) {
			el.addEventListener('click', () => {
				const textarea = document.createElement('textarea');
				textarea.value = binding.value;
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand('copy');
				ElMessage.success('复制成功，内容为：' + textarea.value);
				document.body.removeChild(textarea);
			});
		},
	});
}

/**
 * 点击滚动到指定视图（锚点）
 *  @directive  使用方式：v-scrollTo 如：`<div v-scrollTo=".className">click me</div>`,`<div v-scrollTo="#idName">click me</div>`
 *  @description  参数为class名称或者id名称等，要保证唯一
 *  @description  点击滚动到指定视图,类似于锚点
 */
export function scrollToDirective(app: App) {
	app.directive('scrollTo', {
		mounted(el, binding) {
			el.addEventListener('click', () => {
				const target = document.querySelector(binding.value);
				if (target) {
					target.scrollIntoView({ behavior: 'smooth' });
				}
			});
		},
	});
}
