<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'

// 使用 ref 获取 DOM 元素
const chartRef = ref(null)
let chart = null

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    const option = {
      title: {
        text: '数据统计',
        left: 'left',
        top: '20px',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['订单', '销售额', '注册人数', '管理员人数'],
        top: '20px',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: [9000, 8500, 8700, 9200, 9500, 10500, 12000],
          color: '#409EFF',
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            width: 3,
          },
        },
        {
          name: '销售额',
          type: 'line',
          data: [6000, 5900, 6100, 6300, 6600, 6700, 6900],
          color: '#67C23A',
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            width: 3,
          },
        },
        {
          name: '注册人数',
          type: 'line',
          data: [3000, 3200, 3400, 3500, 3700, 3800, 4000],
          color: '#E6A23C',
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            width: 3,
          },
        },
        {
          name: '管理员人数',
          type: 'line',
          data: [2000, 2200, 2500, 2700, 2900, 3200, 3300],
          color: '#F56C6C',
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            width: 3,
          },
        },
      ],
    }
    chart.setOption(option)
  }
}

// 处理窗口大小变化
const handleResize = () => {
  if (chart) {
    chart.resize()
  }
}

onMounted(() => {
  nextTick(() => {
    initChart()
    window.addEventListener('resize', handleResize)
  })
})

onUnmounted(() => {
  if (chart) {
    chart.dispose()
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
</style>
