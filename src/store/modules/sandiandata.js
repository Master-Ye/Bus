let    options111={
    tooltip: {
  trigger: 'item', // 触发类型为数据项
  formatter: '({c})' // 格式化数据项的显示文本，这里显示坐标值
},
    grid: {
  show: false
},
    xAxis: {},
yAxis: {},
series: [
  {
    type: 'scatter',
    itemStyle: {
      color: '#ff7f0e' // 第一种颜色
    },
    symbolSize: 20, // 点的大小
    data: [[59.70028144 ,-220.75745044]] // 第一种颜色对应的坐标
  },
  {
    type: 'scatter',
    itemStyle: {
      color: '#2ca02c' // 第二种颜色
    },
    symbolSize: 20,
    data: [[121.46126868 , -64.98256452]] // 第二种颜色对应的坐标
  },
  {
    type: 'scatter',
    itemStyle: {
      color: '#d62728' // 第三种颜色
    },
    symbolSize: 20,
    data: [[-181.16155013 , 285.74001495]] // 第三种颜色对应的坐标
  }
]
  }
export {options111}