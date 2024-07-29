// 页面灰度效果
export default function useGray(isGray: boolean = false) {
	const html = document.querySelector('html') as HTMLHtmlElement;
	const style = html.style;
	style.filter = `grayscale(${isGray ? 1 : 0})`;
}
