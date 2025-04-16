<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, defineProps } from 'vue'
import * as echarts from 'echarts'

// 定义 props，用于接收配置项
const props = defineProps({
  option: {
    type: Object,
    required: true,
  },
})

// 使用 ref 获取 DOM 元素
const chartRef = ref(null)
let chart:echarts.ECharts | null = null

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    chart.setOption(props.option) // 使用 props 中的配置项
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
