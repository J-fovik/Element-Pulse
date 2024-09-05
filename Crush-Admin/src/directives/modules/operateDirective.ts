/**
 * @name 操作性指令
 */
import type { App, DirectiveBinding } from 'vue';
import { ElMessage } from 'element-plus';
interface ElType extends HTMLElement {
	__handleClick__: any;
}

/**
 * @name 父元素区域任意拖拽。
 * @description  父元素需设置position: relative;
 * @description 思路：
			1、设置需要拖拽的元素为absolute，其父元素为relative。
			2、鼠标按下(onmousedown)时记录目标元素当前的 left 和 top 值。
			3、鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 left 和 top 值
			4、鼠标松开(onmouseup)时完成一次拖拽
 * @example
 * v-drag ，如 `<div v-drag></div>`
 */
export function dragDirective(app: App) {
	app.directive('drag', {
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
 * @name 防止重复点击(节流)
 * @description  可接受延时时间（毫秒），默认为2000
 * @description  需求：防止按钮在短时间内被多次点击，使用节流函数限制规定时间内只能点击一次。
 * @description  用于表单提交以及按钮点击事件
 * @example
 * v-throttle，如 `<button v-throttle>click me</button>` `<button v-throttle="2000">click me</button>`
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
 * @name 防止重复点击(防抖)
 * @description 可接受延时时间（毫秒），默认为500， 接收参数：function类型
 * @description 在延迟后被调用。如果在延时时间内再次点击按钮，之前的计时将被清除，并重新开始计时
 * @example
 * v-debounce，如 `<div v-debounce="fn">click me</div>`，`<div v-debounce：2000="fn">click me</div>`
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
 * @name 双击触发指令
 * @description  双击触发函数
 * @example
 * v-doubleClick，如 `<button v-doubleClick="fn">双击</button>`
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
 * @name 长按触发指令
 * @description  接收参数：function 类型 ，长按指令，长按时触发事件
 * @example
 * v-longpress 如：·<div v-longpress="fn">longpress me</div>·
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
			el.addEventListener('touchstart', start, { passive: true });
			// 取消计时器
			el.addEventListener('click', cancel);
			el.addEventListener('mouseout', cancel);
			el.addEventListener('touchend', cancel);
			el.addEventListener('touchcancel', cancel);
		},
	});
}

/**
 * @name 点击元素内外部
 * @description  接收参数：function类型，点击外面时返回true, 点击内部时返回false
 * @description  函数接受个Boolean，如：function fn(type){// 可执行需要逻辑}
 * @example
 * v-clickOutside 如：`<div v-clickOutside="fn">click me</div>`
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
 * @name 点击文本复制指令
 * @description  点击复制文本。
 * @example
 * v-copy 如：`<div  v-copy="textValue">click me</div>`
 */
export function copyDirective(app: App) {
	app.directive('copy', {
		mounted(el, binding) {
			el.copyText = binding.value;
			// 添加点击事件
			el.addEventListener('click', () => {
				// 没有文本
				if (!el.copyText) {
					console.warn('No text to copy');
					return;
				}
				const textarea = document.createElement('textarea');
				textarea.value = el.copyText;
				textarea.style.position = 'fixed'; // Prevents scrolling to the bottom of the page
				document.body.appendChild(textarea);
				textarea.select();
				try {
					document.execCommand('copy');
					ElMessage.success('复制成功，内容为：' + textarea.value);
				} catch (err) {
					console.error('Failed to copy text', err);
				}
				// 移除文本
				document.body.removeChild(textarea);
			});
		},
		// 更新
		updated(el, binding) {
			el.copyText = binding.value;
		},
		// 卸载
		unmounted(el) {
			el.removeEventListener('click');
		},
	});
}

/**
 * @name 点击滚动到指定视图（锚点）
 * @description  参数为class名称或者id名称等，要保证唯一
 * @description  点击滚动到指定视图,类似于锚点
 * @example
 * v-scrollTo 如：`<div v-scrollTo=".className">click me</div>`,`<div v-scrollTo="#idName">click me</div>`
 */
export function scrollToDirective(app: App) {
	app.directive('scrollTo', {
		mounted(el, binding) {
			// 确保绑定值是一个字符串
			if (typeof binding.value !== 'string') {
				console.warn('v-scrollTo directive requires a string argument');
				return;
			}
			// 添加点击事件
			el.addEventListener('click', () => {
				const target = document.querySelector(binding.value);
				if (target) {
					target.scrollIntoView({ behavior: 'smooth' });
				} else {
					console.warn(`v-scrollTo target "${binding.value}" not found.`);
				}
			});
		},
	});
}
