// 通用函数
import useClipboard from 'vue-clipboard3';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
// 默认导出
export default function () {
	const { t } = useI18n();
	const { toClipboard } = useClipboard();

	// 百分比格式化(应用于展示数据)
	const percentFormat = (cellValue: string) => {
		return cellValue ? `${cellValue}%` : '-';
	};
	// 金额格式化(应用于展示数据)
	const moneyFormat = (value: any, empty = '0') => {
		if (value) {
			const values = value.split('.');
			values[0] = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			return values.join('.');
		}
		return empty;
	};
	// 文本格式化
	const textFormat = (value: any, empty = '-') => {
		if (value === null || value === undefined || value === '') {
			return empty;
		} else {
			return value;
		}
	};
	/**
	 * 小数格式化(应用于展示数据)
	 * @params value 传入的值
	 * @params scale 保留的位数
	 * @params empty 默认无值状态
	 */
	const scaleFormat = (value: string | number | undefined, scale: number = 2, empty = '-') => {
		if (value) {
			return Number.parseFloat(value as string).toFixed(scale);
		}
		return empty;
	};
	/**
	 * 时间格式化
	 * @params value 传入的值
	 * @params format 需要的格式
	 * @params empty 默认无值状态
	 */
	const dayjsFormat = (value: string, format: string, empty = '-') => {
		if (value) {
			return dayjs(value).format(format);
		}
		return empty;
	};
	// 等待指定时间
	const sleep = (millisecond: number): Promise<any> => new Promise((resolve) => setTimeout(resolve, millisecond));
	/**
	 * 找到匹配的元素
	 * @param options 要判断的数组
	 * @param value 要判断的值
	 * @returns 找出第一个符合条件的成员
	 */
	const findOption = (options: Array<any>, value: string) => {
		return options.find((item) => item.value === value);
	};
	// 点击复制文本
	const copyText = (text: string) => {
		return new Promise((resolve, reject) => {
			try {
				//复制
				toClipboard(text);
				//下面可以设置复制成功的提示框等操作
				ElMessage.success(t('message.layout.copyTextSuccess'));
				resolve(text);
			} catch (e) {
				//复制失败
				ElMessage.error(t('message.layout.copyTextError'));
				reject(e);
			}
		});
	};
	// 点击复制文本
	const clipboard = (text: any) => {
		navigator.clipboard.writeText(text);
		ElMessage.success('复制成功，内容为：' + text);
	};
	// 随机数
	const randomString = (length: number) => {
		const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let result = '';
		for (let i = length; i > 0; --i) {
			result += str[Math.floor(Math.random() * str.length)];
		}
		return result;
	};
	return {
		percentFormat,
		moneyFormat,
		textFormat,
		scaleFormat,
		dayjsFormat,
		sleep,
		findOption,
		copyText,
		clipboard,
		randomString,
	};
}
