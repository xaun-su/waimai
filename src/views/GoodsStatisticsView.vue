<template>
  <div class="homeBox" ref="chartDom"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import request from '@/utils/request';
// 表格
const getGoodsStatisticsApi=async () => {
  const response = await request.get('/stats/goods')
  return response
}
const chartDom = ref()
onMounted(async () => {

  // 获取数据
  const res = await getGoodsStatisticsApi()
  console.log(res)
  res.data.data.source.forEach(item => {
    item.name = item.type
    item.type = 'line'
    item.stack = 'Total'
  })
  let myChart = echarts.init(chartDom.value);
  let option;

  option = {
    title: {
      text: '数据统计'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['热销榜', '新品专享', '炒饭系列', '千万销量', '营养适配', '满减专区', '冒菜', '海鲜自助', '小吃']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: res.data.data.date
    },
    yAxis: {
      type: 'value'
    },
    series: res.data.data.source
  };

  option && myChart.setOption(option);
})

// 获取数据

</script>

<style scoped lang="less">
.homeBox {
  width: 100%;
  height: 500px;
}
</style>