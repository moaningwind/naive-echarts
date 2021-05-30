# Examples

## Display empty state

::: demo By the way, The empty state can be completely customized by you.

```vue
<template>
  <NChart class="h-75" :is-empty="true" />
</template>
```

:::

## Non-reactivity

::: demo The reason for using a function that returns option is to bypass vue's reactivity.

```vue
<template>
  <NChart class="h-75" :define-option="defineBarOption" />
</template>

<script>
const barOption = {
  tooltip: {
    trigger: 'axis',
    formatter: '{a}:{c}',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
  legend: {
    show: true,
    selectedMode: 'single',
    textStyle: {
      color: '#666',
      fontSize: 12,
    },
    itemGap: 20,
    data: ['设备一', '设备二', '设备三'],
    inactiveColor: '#ccc',
  },
  xAxis: [
    {
      type: 'category',
      data: [
        '济南',
        '青岛',
        '烟台',
        '威海',
        '潍坊',
        '东营',
        '日照',
        '滨州',
        '莱芜',
        '淄博',
        '德州',
        '聊城',
        '临沂',
        '泰安',
        '菏泽',
        '济宁',
        '枣庄',
      ],

      axisPointer: {
        type: 'shadow',
      },

      axisTick: {
        show: true,
        interval: 0,
      },
    },
  ],

  yAxis: [
    {
      type: 'value',
      name: '数量',
      interval: 100,
    },
    {
      type: 'value',
      name: '概率',
      min: 0,
      max: 100,
      interval: 10,
      axisLabel: {
        formatter: '{value} %',
      },
    },
  ],

  series: [
    {
      name: '设备一',
      type: 'bar',
      data: [900, 800, 700, 680, 650, 640, 600, 570, 680, 650, 640, 600, 570, 450, 400, 380, 300],
      barWidth: '50%',
    },
    {
      name: '设备一',
      type: 'line',
      yAxisIndex: 1,
      data: [36, 42, 50, 65, 56, 42, 78, 69, 70, 75, 80, 75, 65, 85, 66, 45, 55],
      symbolSize: 10,
      itemStyle: {
        color: '#DDA0DD',
      },
    },
    {
      name: '设备二',
      type: 'bar',
      data: [700, 680, 650, 640, 600, 570, 680, 650, 640, 600, 570, 450, 400, 380, 300, 900, 800],
      barWidth: '50%',
    },
    {
      name: '设备二',
      type: 'line',
      yAxisIndex: 1,
      data: [75, 56, 36, 42, 50, 65, 75, 80, 42, 78, 69, 70, 65, 85, 66, 45, 55],
      symbolSize: 10,
      itemStyle: {
        color: '#87CEFA',
      },
    },
    {
      name: '设备三',
      type: 'bar',
      data: [600, 570, 680, 650, 640, 600, 570, 450, 400, 380, 300, 900, 800, 700, 680, 650, 640],
      barWidth: '50%',
    },
    {
      name: '设备三',
      type: 'line',
      yAxisIndex: 1,
      data: [75, 65, 85, 66, 45, 55, 56, 42, 78, 69, 70, 36, 42, 50, 65, 75, 80],
      symbolSize: 10,
      itemStyle: {
        color: '#CD5C5C',
      },
    },
  ],
}
export default {
  methods: {
    defineBarOption() {
      return barOption
    },
  },
}
</script>
```

:::

## Reactivity

::: demo As you might expect, changing the option refreshes the chart.

```vue
<template>
  <NChart class="h-75" :option="pieOption" />
</template>

<script>
const pieOption = {
  color: ['rgb(250, 200, 88)', 'rgb(145, 204, 117)'],
  title: {
    text: '本年工单执行情况',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: 20,
    left: 'left',
    orient: 'vertical',
  },
  series: [
    {
      name: '执行情况',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        formatter: '任务总数: 1783',
      },
      data: [
        { value: 1048, name: '待执行' },
        { value: 735, name: '已完成' },
      ],
    },
  ],
}
export default {
  data() {
    return {
      pieOption,
    }
  },
}
</script>
```

:::

## Use simultaneously

::: demo naive-echarts will merge defineOption and option using lodash's [merge](https://www.lodashjs.com/docs/lodash.merge#_mergeobject-sources) method.

```vue
<template>
  <NChart class="h-75" :define-option="defineHeatOption" :option="heatOption" />
</template>

<script>
const option = {
  tooltip: {
    position: 'top',
  },
  animation: false,
  grid: {
    height: '76%',
    top: 0,
  },
  xAxis: {
    type: 'category',
    data: [],
    splitArea: {
      show: true,
    },
  },
  yAxis: {
    type: 'category',
    data: [],
    splitArea: {
      show: true,
    },
  },
  visualMap: {
    min: 0,
    max: 20,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '0',
  },
  series: {
    name: 'Punch Card',
    type: 'heatmap',
    data: [],
    label: {
      show: true,
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
  },
}

export default {
  data() {
    return {
      heatOption: {},
    }
  },
  mounted() {
    this.getHeatOption()
  },
  methods: {
    defineHeatOption() {
      return option
    },
    getHeatOption() {
      // 模拟数据
      const hours = [
        '1a',
        '2a',
        '3a',
        '4a',
        '5a',
        '6a',
        '7a',
        '8a',
        '9a',
      ]
      // 模拟数据
      const days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday']

      // 模拟数据
      const data = [
        [0, 0, 5],
        [1, 1, 4],
        [2, 2, 3],
        [3, 3, 2],
        [4, 4, 1],
        [5, 5, 1],
        [4, 6, 3],
        [3, 7, 4],
        [2, 8, 5],
        [1, 9, 10],
      ]

      const mapData = data.map(item => item[2])

      const seriesData = data.map((item) => {
        return [item[1], item[0], item[2] || '-']
      })

      this.heatOption = {
        visualMap: {
          min: Math.min(...mapData),
          max: Math.max(...mapData),
        },
        xAxis: {
          data: hours,
        },
        yAxis: {
          data: days,
        },
        series: {
          data: seriesData,
        },
      }
    },
  },
}
</script>
```

:::

## Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| is-empty | Whether to display an empty state. | boolean | false |
| image | An empty image address. | string | - |
| image-size | Image size (width). | number | - |
| description | Text description of an empty state. | string | - |
| define-option | A function that returns a non-reactive configuration. | function | noop |
| option | Reactive configuration. | object | {} |
| theme | Theme to be applied. See `echarts.init`'s [`theme`](https://echarts.apache.org/zh/api.html#echarts.init) | [object, string] | {} |
| group | Group name to be used in chart [connection](https://echarts.apache.org/zh/api.html#echarts.connect). See [`echartsInstance.group`](https://echarts.apache.org/zh/api.html#echartsInstance.group) | object | {} |
| init-options | Optional chart init configurations. See `echarts.init`'s [`opts`](https://echarts.apache.org/zh/api.html#echarts.init) | object | {} |
| update-options | Options for updating chart option. See `echartsInstance.setOption`'s [`opts`](https://echarts.apache.org/zh/api.html#echartsInstance.setOption) | object | {} |
| onChartReady | The callback function after initializing the chart. | function(instance) | undefined |
| auto-resize | Whether the chart should be resized automatically whenever its root is resized. | boolean | false |
| loading | Whether the chart is in loading state. | boolean | false |
| loading-options | Configuration item of loading animation. See `echartsInstance.showLoading`'s [`opts`](https://echarts.apache.org/zh/api.html#echartsInstance.showLoading) | object | {} |

## Slots

| Slot  | Description      |
| ------- | -------------- |
| default | Empty state bottom content.   |
| image   | Empty state picture.      |

## Methods

| Method             | Description       |
| ------------------ | ----------------- |
| getEchartsInstance | Gets an instance of echarts. |
