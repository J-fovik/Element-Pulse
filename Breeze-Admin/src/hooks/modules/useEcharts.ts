import * as echarts from 'echarts';
// echarts图标创建实例
export default function useEcharts(dom: HTMLElement, theme?: string) {
	// 创建实例
	let instance = echarts.getInstanceByDom(dom);
	if (!instance) {
		// 挂载数据
		instance = echarts.init(dom, theme, { renderer: 'svg' });
	}
	// 返回实例
	return instance;
}
