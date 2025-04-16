<template>
  <div class="homeBox" ref="chartDom"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import request from '@/utils/request';

// 定义接口类型
interface GoodsStatisticsItem {
  name: string;
  type: string;
  stack: string;
  [key: string]: any; // 允许其他动态字段
}

interface GoodsStatisticsResponse {
  data: {
    date: string[];
    source: GoodsStatisticsItem[];
  };
}

// 表格
const getGoodsStatisticsApi = async (): Promise<GoodsStatisticsResponse> => {
  const response = await request.get('/stats/goods');
  return response as GoodsStatisticsResponse;
};

const chartDom = ref();
onMounted(async () => {
  // 获取数据
  const res = await getGoodsStatisticsApi();

  // 遍历数据并修改字段
  res.data.source.forEach((item: GoodsStatisticsItem) => {
    item.name = item.type || '未知类型'; // 防止 type 为空
    item.type = 'line';
    item.stack = 'Total';
  });

  // 初始化图表
  const myChart = echarts.init(chartDom.value);
  const option = {
    title: {
      text: '数据统计',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['热销榜', '新品专享', '炒饭系列', '千万销量', '营养适配', '满减专区', '冒菜', '海鲜自助', '小吃'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: res.data.date,
    },
    yAxis: {
      type: 'value',
    },
    series: res.data.source,
  };

  option && myChart.setOption(option);
});
</script>

<style scoped lang="less">
.homeBox {
  width: 100%;
  height: 500px;
}
</style>