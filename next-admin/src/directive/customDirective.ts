import type { App } from 'vue';

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
			el.addEventListener('mousedown', () => { });
		},
	});
}

/**
 * 自定义拖动指令
 * @description  使用方式：v-drag="[dragDom,dragHeader]"，如 `<div v-drag="['.drag-container .el-dialog', '.drag-container .el-dialog__header']"></div>`
 * @description dragDom 要拖动的元素，dragHeader 要拖动的 Header 位置
 * @link 注意：https://github.com/element-plus/element-plus/issues/522
 * @lick 参考：https://blog.csdn.net/weixin_46391323/article/details/105228020?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-10&spm=1001.2101.3001.4242
 */
export function dragDirective(app: App) {
	app.directive('drag', {
		mounted(el, binding) {
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
 * @description  使用方式：v-fadeUp，如 `<div v-fadeUp></div>`
 */
export function fadeUpDirective(app: App) {
	const DISTANCE = 150// 偏移量
	const DURTION = 500// 动画时间
	// 关联动画用
	const map = new WeakMap()
	// 创建个观察器
	const ob = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				// 该元素和视口相交
				// 播放该元素的动画
				const animation = map.get(entry.target)
				if (animation) {
					animation.play()
					// 防止往上滑动也执行，取消观察
					ob.unobserve(entry.target)
				}
			}
		}
	})
	function isBelowViewport(el: any) {
		const rect = el.getBoundingClientRect()
		return rect.top - DISTANCE > window.innerHeight
	}
	app.directive('fadeUp', {
		mounted(el, binding) {
			// 辅助函数判断视口位置
			if (!isBelowViewport(el)) {
				return
			}
			// 定一个动画(动画样式，事件)
			const animation = el.animate([
				// 初始值
				{
					transform: `translateY(${DISTANCE}px)`,
					opacity: 0.5
				},
				// 最终值
				{
					transform: `translateY(0)`,
					opacity: 1
				}
			], {
				duration: DURTION,// 动画时间
				easing: 'ease-in-out',// 时间函数
				fill: 'forwards',// 动画过后行为
			})
			animation.pause()// 动画暂停
			ob.observe(el)// 开始观察
			// 传入动画
			map.set(el, animation)
		},
		// 元素卸载
		unmounted(el) {
			ob.unobserve(el)//取消观察
		}
	});

}


/**
 * 自动获取焦点
 * @description  使用方式：v-focus，如 `<input v-focus></input>`
 */
export function focusDirective(app: App) {
	// 注册一个全局自定义指令 `v-focus`
	app.directive('focus', {
		// 当被绑定的元素插入到 DOM 中时……
		mounted(el) {
			// 聚焦元素
			el.focus()  // 页面加载完成之后自动让输入框获取到焦点的小功能
		}
	})
}

/**
 * 防止重复点击
 * @description  使用方式：v-throttle，如 `<button v-throttle></button>` `<button v-throttle="2000"></button>`
 * @description  用于表单提交以及按钮点击事件
 */
export function throttleDirective(app: App) {
	app.directive('throttle', {
		mounted(el, binding) {
			let throttleTime = binding.value; // 节流时间
			if (!throttleTime) { // 用户若不设置节流时间，则默认2s
				throttleTime = 2000;
			}
			let cbFun: any;
			el.addEventListener('click', (event: any) => {
				if (!cbFun) { // 第一次执行
					cbFun = setTimeout(() => {
						cbFun = null;
					}, throttleTime);
				} else {
					event && event.stopImmediatePropagation();
				}
			}, { capture: true });
		},
	});
}