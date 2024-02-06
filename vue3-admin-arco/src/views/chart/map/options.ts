export const getOptions: any = (cityname: string, mapData: any) => {
  const option = {
    legend: [
      {
        selectedMode: 'multiple',
        top: 'top',
        orient: 'horizontal',
        data: [''],
        left: 'center',
        show: false,
      },
    ],
    tooltip: {
      alwaysShowContent: true, // 提示框总是显示（不再是鼠标离开就消失）
      enterable: true, // 允许提示框被点击
      formatter(params: any) {
        const value = params.value
        return params.name + ': ' + value[2]
      },
    },
    geo: {
      map: cityname,
      silent: true,
      itemStyle: {
        color: '#004981',
        borderColor: '#004981',
      },
    },
    series: [
      {
        map: cityname,
        data: mapData,
        name: '',
        symbol: 'circle',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        roam: false,
        symbolSize: 1,
      },
    ],
  }
  return option
}

export const bindOptions = (currentCity: string) => {
  return {
    animation: false,
    tooltip: {
      trigger: 'item',
      formatter: '{b}',
      backgroundColor: 'rgba(0,40,70,0.7)',
      textStyle: {
        color: '#fff',
      },
    },
    grid: {
      right: 0,
      left: 0,
      top: 0,
    },
    geo: [
      {
        map: currentCity,
        zoom: 1.1,
        roam: false,
        silent: true,
      },
    ],
    series: [
      {
        zoom: 1.1,
        type: 'map',
        map: currentCity, // 自定义扩展图表类型
        label: {
          // show: true,
          // color: '#fff',
        },
        geoIndex: 2,
        itemStyle: {
          borderWidth: '1',
          borderColor: '#029fd4',
          areaColor: '#00508b',
        },
        emphasis: {
          label: {
            color: '#fff',
          },
          itemStyle: {
            areaColor: 'rgba(42,92,162,0.8)',
          },
        },
      },
    ],
  }
}
