// ECharts 的核心模块
import * as echarts from 'echarts/core';
// ECharts 的多个组件模块，包括标题组件、提示框组件、网格组件等
import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	LegendComponent,
	PolarComponent,
	GeoComponent,
	ToolboxComponent,
	DataZoomComponent,
} from 'echarts/components';
// ECharts 的多个图表类型模块，包括柱状图、折线图、饼图等
import {
	BarChart,
	LineChart,
	LinesChart,
	PieChart,
	ScatterChart,
	RadarChart,
	GaugeChart,
} from 'echarts/charts';
//  ECharts 的多个特性模块，包括标签布局和通用过渡效果
import { LabelLayout, UniversalTransition } from 'echarts/features';
//  ECharts 的 Canvas 渲染器模块
import { CanvasRenderer } from 'echarts/renderers';
// 圆环
import { GraphicComponent } from 'echarts/components';
// ECharts 的一个插件，用于生成液态填充图表
import 'echarts-liquidfill';
// 注册了所有的图表类型、组件和特性
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	LegendComponent,
	PolarComponent,
	GeoComponent,
	ToolboxComponent,
	DataZoomComponent,
	BarChart,
	LineChart,
	LinesChart,
	PieChart,
	ScatterChart,
	RadarChart,
	GaugeChart,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer,
	GraphicComponent,
]);

export default echarts;
