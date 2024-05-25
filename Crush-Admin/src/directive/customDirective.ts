import type { App, DirectiveBinding, CSSProperties, ObjectDirective } from 'vue';
import { ElMessage } from 'element-plus';
import { verifyNumberIntegerAndFloat } from '/@/utils/toolsValidate';
interface ElType extends HTMLElement {
	__handleClick__: any;
}
interface IValue {
	width?: number;
	line?: number;
}
interface IOptions {
	[key: string]: CSSProperties;
}

/**
 * 按钮波浪指令
 * @directive 默认方式：v-waves，如 `<div v-waves></div>`
 * @directive 参数方式：v-waves=" |light|red|orange|purple|green|teal"，如 `<div v-waves="'light'"></div>`
 */
export function wavesDirective(app: App) {
	app.directive('waves', {
		mounted(el, binding) {
			el.classList.add('waves-effect');
			binding.value && el.classList.add(`waves-${binding.value}`);
			function setConvertStyle(obj: { [key: string]: unknown }) {
				let style: string = '';
				for (let i in obj) {
					if (obj.hasOwnProperty(i)) style += `${i}:${obj[i]};`;
				}
				return style;
			}
			function onCurrentClick(e: { [key: string]: unknown }) {
				let elDiv = document.createElement('div');
				elDiv.classList.add('waves-ripple');
				el.appendChild(elDiv);
				let styles = {
					left: `${e.layerX}px`,
					top: `${e.layerY}px`,
					opacity: 1,
					transform: `scale(${(el.clientWidth / 100) * 10})`,
					'transition-duration': `750ms`,
					'transition-timing-function': `cubic-bezier(0.250, 0.460, 0.450, 0.940)`,
				};
				elDiv.setAttribute('style', setConvertStyle(styles));
				setTimeout(() => {
					elDiv.setAttribute(
						'style',
						setConvertStyle({
							opacity: 0,
							transform: styles.transform,
							left: styles.left,
							top: styles.top,
						})
					);
					setTimeout(() => {
						elDiv && el.removeChild(elDiv);
					}, 750);
				}, 450);
			}
			el.addEventListener('mousedown', onCurrentClick, false);
		},
		unmounted(el) {
			el.addEventListener('mousedown', () => {});
		},
	});
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
 * 元素平滑上移
 * @directive  使用方式：v-fadeUp，如 `<div v-fadeUp></div>`
 */
export function fadeUpDirective(app: App) {
	const DISTANCE = 150; // 偏移量
	const DURTION = 500; // 动画时间
	// 关联动画用
	const map = new WeakMap();
	// 创建个观察器
	const ob = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				// 该元素和视口相交
				// 播放该元素的动画
				const animation = map.get(entry.target);
				if (animation) {
					animation.play();
					// 防止往上滑动也执行，取消观察
					ob.unobserve(entry.target);
				}
			}
		}
	});
	function isBelowViewport(el: any) {
		const rect = el.getBoundingClientRect();
		return rect.top - DISTANCE > window.innerHeight;
	}
	app.directive('fadeUp', {
		mounted(el, _binding) {
			// 辅助函数判断视口位置
			if (!isBelowViewport(el)) {
				return;
			}
			// 定一个动画(动画样式，事件)
			const animation = el.animate(
				[
					// 初始值
					{
						transform: `translateY(${DISTANCE}px)`,
						opacity: 0.5,
					},
					// 最终值
					{
						transform: `translateY(0)`,
						opacity: 1,
					},
				],
				{
					duration: DURTION, // 动画时间
					easing: 'ease-in-out', // 时间函数
					fill: 'forwards', // 动画过后行为
				}
			);
			animation.pause(); // 动画暂停
			ob.observe(el); // 开始观察
			// 传入动画
			map.set(el, animation);
		},
		// 元素卸载
		unmounted(el) {
			ob.unobserve(el); //取消观察
		},
	});
}

/**
 * 自动获取焦点
 * @directive  使用方式：v-focus，如 `<input v-focus></input>`
 */
export function focusDirective(app: App) {
	// 注册一个全局自定义指令 `v-focus`
	app.directive('focus', {
		// 当被绑定的元素插入到 DOM 中时……
		mounted(el) {
			// 聚焦元素
			el.focus(); // 页面加载完成之后自动让输入框获取到焦点的小功能
		},
	});
}

/**
 * 防止重复点击
 * @directive  使用方式：v-throttle，如 `<button v-throttle>click me</button>` `<button v-throttle="2000">click me</button>`
 * @description  可接受延时时间（毫秒），默认为2000
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
 * 双击触发
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
 * 图片懒加载
 * @directive  使用方式：v-lazy 如：<img v-lazy="imageSrc"/>
 * @description  接收参数：String 类型 ,接受图片路径 用于图片懒加载
 */
export function lazyImgDirective(app: App) {
	app.directive('lazy', (el, binding) => {
		// 观察者实例
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					// 当图片出现在视窗中，替换图片的src
					el.src = binding.value;
					// 停止监听
					observer.unobserve(el);
				}
			},
			{ threshold: 0.01 }
		); // 配置观察者: 阈值是0.01
		// 开始监听el元素
		observer.observe(el);
	});
	// app.directive('lazy', {
	// 	mounted(el, binding) {
	// 		// 观察者实例
	// 		const observer = new IntersectionObserver((entries, observer) => {
	// 			entries.forEach((entry) => {
	// 				if (entry.isIntersecting) {
	// 					const img = new Image();
	// 					// 当图片出现在视窗中，替换图片的src
	// 					img.src = binding.value;
	// 					img.onload = () => {
	// 						el.src = binding.value;
	// 					};
	// 					// 停止监听
	// 					observer.unobserve(el);
	// 				}
	// 			});
	// 		});
	// 		// 开始监听el元素
	// 		observer.observe(el);
	// 	},
	// });
}

/**
 * 长按指令
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
 * 点击元素外部事件
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
 * 文本省略
 *  @directive  使用方式：v-ellipsis 如：<div v-ellipsis:multiple="[200, 2]">{{ longText }}</div>
 *  @description  single |multiple (单行 | 多行) ,[200, 2] (元素的宽度，行数)
 *  @description  接受数组参数，数组中包含两个值：一个是元素的宽度，另一个是行数。指令还接受一个修饰符arg，用于指定是单行省略（single）还是多行省略（multiple）
 *  @description  用于实现文本省略效果。
 */
export function ellipsisDirective(app: App) {
	const cssProperties: IOptions = {
		single: {
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
		},
		multiple: {
			display: '-webkit-box',
			overflow: 'hidden',
			wordBreak: 'break-all',
		},
	};
	app.directive('ellipsis', {
		mounted(el: HTMLElement, binding: DirectiveBinding<Array<IValue>>) {
			// 接受数组中包含两个值：一个是元素的宽度，另一个是行数, 还接受一个修饰符arg，用于指定是单行省略（single）还是多行省略（multiple）
			const { value = [100, 1], arg = 'single' } = binding;
			const [width, line] = value;
			Object.entries(cssProperties[arg]).forEach(([key, value]) => {
				// 使用类型断言
				(el.style as any)[key as keyof CSSStyleDeclaration] = value;
			});
			el.style.width = `${width}px`;
			if (arg === 'multiple') {
				el.style.webkitLineClamp = `${line}`;
				el.style.webkitBoxOrient = 'vertical';
			}
		},
	});
}
/**
 * 文本提示
 *  @directive  使用方式：v-tooltip 如：<div  v-tooltip="{ text: 'This is a tooltip', position: 'left' }">Hover me</div>
 *  @description  接受个对象，里面两个参数, text 为提示内容, position 为提示方向
 *  @description  用于悬停文本提示（仅可在top|bottom|left|right四方向，若需更多个方向需要借助组件库）。
 */
export function tooltipDirective(app: App) {
	app.directive('tooltip', {
		mounted(el, binding) {
			// 赋值文本
			const tooltipText = binding.value.text;
			const position = binding.value.position || 'top'; // 默认位置为 'top'

			el.setAttribute('data-tooltip', tooltipText);
			// 显示提示
			const showTooltip = () => {
				// 添加tooltip样式，请查看 /@/theme/tooltipDirective.scss
				const tooltip = document.createElement('div');
				tooltip.classList.add('tooltip');
				tooltip.textContent = tooltipText;
				// 添加tooltip-arrow样式，请查看 /@/theme/tooltipDirective.scss
				const arrow = document.createElement('div');
				arrow.classList.add('tooltip-arrow');
				tooltip.appendChild(arrow);

				document.body.appendChild(tooltip);

				const rect = el.getBoundingClientRect();
				tooltip.style.position = 'absolute';
				// 显示位置
				switch (position) {
					case 'top':
						tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
						tooltip.style.left = rect.left + (el.offsetWidth - tooltip.offsetWidth) / 2 + 'px';
						arrow.classList.add('tooltip-arrow-bottom');
						break;
					case 'bottom':
						tooltip.style.top = rect.bottom + 10 + 'px';
						tooltip.style.left = rect.left + (el.offsetWidth - tooltip.offsetWidth) / 2 + 'px';
						arrow.classList.add('tooltip-arrow-top');
						break;
					case 'left':
						tooltip.style.top = rect.top + (el.offsetHeight - tooltip.offsetHeight) / 2 + 'px';
						tooltip.style.left = rect.left - tooltip.offsetWidth - 10 + 'px';
						arrow.classList.add('tooltip-arrow-right');
						break;
					case 'right':
						tooltip.style.top = rect.top + (el.offsetHeight - tooltip.offsetHeight) / 2 + 'px';
						tooltip.style.left = rect.right + 10 + 'px';
						arrow.classList.add('tooltip-arrow-left');
						break;
					default:
						break;
				}

				// 防止工具提示离开屏幕
				const tooltipRect = tooltip.getBoundingClientRect();
				if (tooltipRect.left < 0) {
					tooltip.style.left = '5px';
				} else if (tooltipRect.right > window.innerWidth) {
					tooltip.style.left = window.innerWidth - tooltipRect.width - 5 + 'px';
				}

				el._tooltip = tooltip;
			};
			// 离开，隐藏提示
			const hideTooltip = () => {
				if (el._tooltip) {
					document.body.removeChild(el._tooltip);
					delete el._tooltip;
				}
			};
			el.addEventListener('mouseenter', showTooltip);
			el.addEventListener('mouseleave', hideTooltip);
		},
	});
}

/**
 * 文本复制
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
 * 滚动到指定视图（锚点）
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

/**
 * 元素可见性指令
 *  @directive  使用方式：v-visibility 如：`<div v-visibility="fn">观察我</div>`
 *  @description  fn可接受个参数，该参数是个boolean，可判断该元素是否进入视口
 *  @description  当元素进入视口时为true，未进入视口为false
 */
export function visibilityDirective(app: App) {
	app.directive('visibility', {
		mounted(el, binding) {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					// 直接将 entry.isIntersecting 传递给绑定的值（函数）
					binding.value(entry.isIntersecting);
				});
			});
			observer.observe(el);
		},
	});
}
