import * as echarts from 'echarts'

export const getOptions: any = () => {
  // const sourceData = [400, 600, 700, 700, 1000, 400, 400, 600, 700]
  // const myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC']

  const option = {
    backgroundColor: '#0e2147',
    grid: {
      left: '11%',
      top: '12%',
      right: '8%',
      bottom: '8%',
      containLabel: true,
    },
    xAxis: {
      max: 100,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#293b6f',
          width: 1, // 这里是为了突出显示加上的
        },
      },
      axisLabel: {
        show: true,
        interval: 'auto',
        formatter: '{value}%',
      },
      axisLine: {
        lineStyle: {
          color: '#8098c3',
          width: 1, // 这里是为了突出显示加上的
        },
      },
      // data: this.XDataList
    },
    yAxis: [
      {
        axisTick: 'none',
        axisLine: 'none',
        offset: '27',
        axisLabel: {
          textStyle: {
            color: '#ffffff',
            fontSize: '16',
          },
        },
        data: ['南昌转运中心', '广州转运中心', '杭州转运中心', '宁夏转运中心', '兰州转运中心', '南宁转运中心', '长沙转运中心', '武汉转运中心', '合肥转运中心', '贵州转运中心'],
      },
      {
        axisTick: 'none',
        axisLine: 'none',
        axisLabel: {
          textStyle: {
            color: '#ffffff',
            fontSize: '16',
          },
        },
        data: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'],
      },
      {
        name: '分拨延误TOP 10',
        nameGap: '50',
        nameTextStyle: {
          color: '#ffffff',
          fontSize: '16',
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(0,0,0,0)',
          },
        },
        data: [],
      },
    ],
    series: [
      {
        name: '条',
        type: 'bar',
        yAxisIndex: 0,
        data: [4, 13, 25, 29, 38, 44, 50, 52, 60, 72],
        label: {
          normal: {
            show: true,
            position: 'right',
            textStyle: {
              color: '#ffffff',
              fontSize: '16',
            },
          },
        },
        barWidth: 18,
        itemStyle: {
          emphasis: {
            barBorderRadius: 10,
          },
          normal: {
            barBorderRadius: [0, 10, 10, 0],
            label: {
              show: true, // 是否展示
              position: 'right',
              valueAnimation: true,
              formatter(p: any) {
                return `${p.data || 0}%`
              },
              color: '#92acdb',
            },
            // color: function (params: any) {
            //   const num = myColor.length
            //   return myColor[params.dataIndex % num]
            // },
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#3977E6' },
              { offset: 1, color: '#37BBF8' },
            ]),
          },
        },
        z: 2,
      },
    ],
  }

  return option
}
