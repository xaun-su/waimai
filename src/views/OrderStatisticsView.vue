<template>
  <div>
    <Echarts :option="orderChartOption" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Echarts from '@/components/Echarts.vue'

// 订单数据
const orderChartOption = ref({
  title: {
    text: '订单统计',
    left: 'left',
    top: '20px',
  },
  tooltip: {
    trigger: 'axis',
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
      data: [1000, 1500, 1200, 1800, 2000, 2500, 3000],
      color: '#409EFF',
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        width: 3,
      },
    },
  ],
})
</script>

<style lang="less" scoped>

</style>
