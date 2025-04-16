<template>
  <div>
    <h3>首页数据</h3>
    <Echarts :option="homeChartOption" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Echarts from '@/components/Echarts.vue'
import request from '@/utils/request' // 引入你的 request 库
import { ElMessage } from 'element-plus';
// 首页数据
const homeChartOption = ref({
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
})

// 获取首页报表数据
const getTotalData = async () => {
  try {
    const response = await request.get('/order/totaldata')
    console.log(response.data);
    
    if (response.data) {
      // 根据接口返回的数据更新 homeChartOption
      homeChartOption.value = {
        title: {
          text: '数据统计',
          left: 'left',
          top: '20px',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['订单', '销售额'],
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
          data: response.data.xData,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '订单',
            type: 'line',
            data: response.data.orderData,
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
            data: response.data.amountData,
            color: '#67C23A',
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              width: 3,
            },
          },
        ],
      };
    } else {
      ElMessage.error('获取首页报表数据失败')
    }
  } catch (error) {
    console.error(error)
    ElMessage.error('获取首页报表数据失败')
  }
}

onMounted(() => {
  getTotalData();
});
</script>

<style lang="less" scoped>

</style>
