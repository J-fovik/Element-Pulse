/**
 * @name 权限指令
 */
import { useUserStore } from '@/stores/modules/user';
import type { DirectiveBinding } from 'vue';
import type { App } from 'vue';

/**
 * @name 用户权限指令
 * @directive 按钮权限指令 v-auth*
 */
export function authDirective(app: App) {
	// 按钮权限指令（v-auth="xxx" 或 v-auth="['xxx', 'xxx']"）
	app.directive('auth', {
		mounted(el: HTMLElement, binding: DirectiveBinding) {
			const { value } = binding;
			const { authButtonList, routeName } = useUserStore();
			// 当前页按钮权限
			const currentPageRoles = authButtonList[routeName] ?? [];
			// 数组形式（有一项不符则不展示）
			if (value instanceof Array && value.length) {
				const hasPermission = value.every((item) => currentPageRoles.includes(item));
				if (!hasPermission) el.remove();
				// 字符串形式
			} else {
				if (!currentPageRoles.includes(value)) el.remove();
			}
		},
	});
	// 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
	app.directive('auths', {
		mounted(el, binding) {
			let flag = false;
			const { authButtonList, routeName } = useUserStore();
			// 当前页按钮权限
			const currentPageRoles = authButtonList[routeName] ?? [];
			currentPageRoles.map((val: string) => {
				binding.value.map((v: string) => {
					if (val === v) flag = true;
				});
			});
			if (!flag) el.parentNode.removeChild(el);
		},
	});
	// 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
	app.directive('auth-all', {
		mounted(el, binding) {
			const { value } = binding;
			const { authButtonList, routeName } = useUserStore();
			// 当前页按钮权限
			const currentPageRoles = authButtonList[routeName] ?? [];
			// 数组形式（有一项不符则不展示）
			const hasPermission = value.every((item) => currentPageRoles.includes(item));
			if (!hasPermission) el.remove();
		},
	});
}
