// ECharts 的核心模块
import * as echarts from 'echarts/core';
// ECharts 的多个组件模块，包括标题组件、提示框组件、网格组件等
import {
	TitleComponent, // 标题组件
	TooltipComponent, // 提示框组件
	GridComponent, // 网格组件
	DatasetComponent, // 数据集组件
	TransformComponent, // 数据转换组件
	LegendComponent, // 图例组件
	PolarComponent, // 极坐标组件
	GeoComponent, // 地理坐标系组件
	ToolboxComponent, // 工具栏组件
	DataZoomComponent, // 数据区域缩放组件
	VisualMapComponent, // 视觉映射组件
} from 'echarts/components';
// ECharts 的多个图表类型模块，包括柱状图、折线图、饼图等
import {
	BarChart, // 柱状图
	LineChart, // 折线图
	LinesChart, // 线图
	PieChart, //	饼图
	ScatterChart, // 散点图
	RadarChart, // 雷达图
	GaugeChart, // 仪表盘
	MapChart, // 地图
} from 'echarts/charts';
//  ECharts 的多个特性模块，包括标签布局和通用过渡效果
import { LabelLayout, UniversalTransition } from 'echarts/features';
//  ECharts 的 Canvas 渲染器模块
import { CanvasRenderer } from 'echarts/renderers';
// 圆环
import { GraphicComponent } from 'echarts/components';
// 用于生成液态填充图表
import 'echarts-liquidfill';
// 用于生成词云图表
import 'echarts-wordcloud';
import chinaMap from '@/utils/china';
// 注册了所有的图表类型、组件和特性
echarts.use([
	TitleComponent, // 标题组件
	TooltipComponent, // 提示框组件
	GridComponent, // 网格组件
	DatasetComponent, // 数据集组件
	TransformComponent, // 数据转换组件
	LegendComponent, // 图例组件
	PolarComponent, // 极坐标组件
	GeoComponent, //	地理坐标系组件
	ToolboxComponent, // 工具栏组件
	DataZoomComponent, // 数据区域缩放组件
	BarChart, // 柱状图
	LineChart, // 折线图
	LinesChart, // 线图
	PieChart, // 饼图
	ScatterChart, // 散点图
	RadarChart, // 雷达图
	GaugeChart, // 仪表盘
	LabelLayout, // 标签布局
	UniversalTransition, // 通用过渡效果
	CanvasRenderer, // Canvas 渲染器
	GraphicComponent, // 圆环
	VisualMapComponent, // 视觉地图
	MapChart, // 地图
]);
echarts.registerMap('china', chinaMap);
export default echarts;
