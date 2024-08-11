/**
 * @name 非操作性指令
 */
import type { App, DirectiveBinding, CSSProperties } from 'vue';
interface IValue {
	width?: number;
	line?: number;
}
interface IOptions {
	[key: string]: CSSProperties;
}
/**
 * @name 按钮波浪指令
 * @directive 默认方式：v-waves，如 `<div v-waves></div>`
 * @directive 参数方式：v-waves=" |light|red|orange|purple|green|teal"，如 `<div v-waves="'light'"></div>`
 * @directive 根据@/assets/styles/directives/wavesDirective.scss样式进行控制
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
 * @name 元素平滑上移
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
 * @name 图片懒加载
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
}

/**
 * @name 文本省略
 * @directive  使用方式：v-ellipsis 如：<div v-ellipsis:multiple="[200, 2]">{{ longText }}</div>
 * @description  single |multiple (单行 | 多行) ,[200, 2] (元素的宽度，行数)
 * @description  接受数组参数，数组中包含两个值：一个是元素的宽度，另一个是行数。指令还接受一个修饰符arg，用于指定是单行省略（single）还是多行省略（multiple）
 * @description  用于实现文本省略效果。
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
 * @name 文本提示
 * @directive  使用方式：v-tooltip 如：<div  v-tooltip="{ text: 'tooltip', position: 'left' }">Hover me</div>
 * @description  接受个对象，里面两个参数, text 为提示内容, position 为提示方向
 * @description  用于悬停文本提示（仅可在top|bottom|left|right四方向，若需更多个方向需要借助组件库）。
 * @directive 根据@/assets/styles/directives/tooltipDirective.scss样式进行控制
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
						tooltip.style.left =
							rect.left + (el.offsetWidth - tooltip.offsetWidth) / 2 + 'px';
						arrow.classList.add('tooltip-arrow-bottom');
						break;
					case 'bottom':
						tooltip.style.top = rect.bottom + 10 + 'px';
						tooltip.style.left =
							rect.left + (el.offsetWidth - tooltip.offsetWidth) / 2 + 'px';
						arrow.classList.add('tooltip-arrow-top');
						break;
					case 'left':
						tooltip.style.top =
							rect.top + (el.offsetHeight - tooltip.offsetHeight) / 2 + 'px';
						tooltip.style.left = rect.left - tooltip.offsetWidth - 10 + 'px';
						arrow.classList.add('tooltip-arrow-right');
						break;
					case 'right':
						tooltip.style.top =
							rect.top + (el.offsetHeight - tooltip.offsetHeight) / 2 + 'px';
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
 * @name 元素可见性指令
 * @directive  使用方式：v-visibility 如：`<div v-visibility="fn">观察我</div>`
 * @description  fn可接受个参数，该参数是个boolean，可判断该元素是否进入视口
 * @description  当元素进入视口时为true，未进入视口为false
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

/**
 * @name 添加背景水印
 * @directive  使用方式：v-waterMarker 如：`<div v-waterMarker="{text:'text',textColor:'rgba(180, 180, 180, 0.4)'}"></div>`
 * @description  可接受文本，字体以及颜色
 * @description  使用：设置水印文案，字体大小,颜色即可
 * @description  思路：
    				1、使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。
    				2、将其设置为背景图片，从而实现页面或组件水印效果
 */
export function waterMarkerDirective(app: App) {
	// 添加水印
	function addWaterMarker(str: string, parentNode: HTMLElement, font: string, textColor: string) {
		// 水印文字，父元素，字体，文字颜色
		let can: HTMLCanvasElement = document.createElement('canvas');
		parentNode.appendChild(can);
		can.width = 205;
		can.height = 140;
		can.style.display = 'none';
		let cans = can.getContext('2d') as CanvasRenderingContext2D;
		cans.rotate((-20 * Math.PI) / 180);
		cans.font = font || '16px Microsoft JhengHei';
		cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)';
		cans.textAlign = 'left';
		cans.textBaseline = 'middle';
		cans.fillText(str, can.width / 10, can.height / 2);
		parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')';
	}
	app.directive('waterMarker', {
		mounted(el: HTMLElement, binding: DirectiveBinding) {
			const { text, font, textColor } = binding.value;
			addWaterMarker(text, el, font, textColor);
		},
	});
}
