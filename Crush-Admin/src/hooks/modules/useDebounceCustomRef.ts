/**
 * @name 输入框防抖
 */

// CustomRef输入框防抖
const useDebounceCustomRef = (value: any, duration = 1000) => {
	let timer: any;
	return customRef((track, trigger) => {
		return {
			get() {
				track();
				return value;
			},
			set(val) {
				clearTimeout(timer);
				timer = setTimeout(() => {
					trigger();
					value = val;
				}, duration);
			},
		};
	});
};
export default useDebounceCustomRef;
