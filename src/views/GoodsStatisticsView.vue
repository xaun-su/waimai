<template>
  <div style="width: 100%; height: 600px" ref="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import request from '../utils/request'; // 引入请求工具

// 定义响应式数据，用于存储从API获取的商品统计数据
const goodsStatistics = ref({
  date: [],   // 日期数组
  source: [], // 数据源数组，包含每个系列的数据
});

// 定义图表容器的引用
const chartContainer = ref(null);
let chartInstance = null; // 图表实例

// 获取商品统计数据的异步函数
const getGoodsStatistics = async () => {
  try {
    const response = await request('/stats/goods'); // 调用请求工具获取数据
    console.log(response.data.data); // 打印数据到控制台，方便调试
    goodsStatistics.value = response.data.data; // 将获取的数据赋值给响应式数据
  } catch (error) {
    console.error("Error fetching goods statistics:", error); // 捕获错误并打印到控制台
    // 可选：在这里显示错误消息给用户
  }
};

// 组件挂载后的生命周期钩子
onMounted(async () => {
  await getGoodsStatistics(); // 确保在初始化图表之前获取数据
  initChart(); // 初始化图表

  // 监听窗口大小改变事件，并调整图表大小
  window.addEventListener('resize', () => {
    chartInstance.resize();
  });
});

// 初始化图表的函数
const initChart = () => {


  chartInstance = echarts.init(chartContainer.value); // 初始化图表实例

  const option = {
    xAxis: {
      type: 'category', // 设置x轴类型为category（类目轴）
      data: goodsStatistics.value.date, // 设置x轴数据
    },
    yAxis: {
      type: 'value', // 设置y轴类型为value（数值轴）
      min: 0,       // 设置y轴最小值
      max: 7000,    // 设置y轴最大值
    },
    tooltip: {
      trigger: 'axis', // 设置tooltip触发类型为axis（轴触发）
      formatter: (params) => {
        let tooltipHtml = `<div>${params[0].axisValue}</div>`; // 创建tooltip的HTML内容
        params.forEach((item) => {
          tooltipHtml += `<div><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${item.color};"></span>${item.seriesName}: ${item.value}</div>`; // 添加每个系列的数据到tooltip
        });
        return tooltipHtml; // 返回tooltip的HTML内容
      },
    },
    legend: {
      data: goodsStatistics.value.source.map(item => item.type), // 从数据源中提取类型作为图例数据
    },
    series: goodsStatistics.value.source.map(item => ({
      name: item.type, // 设置系列名称
      type: 'line', // 设置系列类型为line（折线图）
      data: item.data, // 设置系列数据
      symbol: 'circle', // 设置数据点标记为圆形
    })),
  };

  chartInstance.setOption(option); // 设置图表配置项
};
</script>
