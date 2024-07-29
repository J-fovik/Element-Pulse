/**
 * v-auth
 * 按钮权限指令
 */
import { useAuthStore } from '@/stores/modules/auth';
import type { Directive, DirectiveBinding } from 'vue';

const auth: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		const { value } = binding;
		const authStore = useAuthStore();
		// 当前页按钮权限
		const currentPageRoles = authStore.authButtonListGet[authStore.routeName] ?? [];
		// 数组形式（有一项不符则不展示）
		if (value instanceof Array && value.length) {
			const hasPermission = value.every((item) => currentPageRoles.includes(item));
			if (!hasPermission) el.remove();
			// 字符串形式
		} else {
			if (!currentPageRoles.includes(value)) el.remove();
		}
	},
};

export default auth;
