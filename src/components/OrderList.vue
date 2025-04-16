<template>
  <div class="order-list">
    <!-- 搜索表单 -->
    <div class="search-form">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="订单号">
          <el-input v-model="searchForm.orderId" placeholder="请输入订单号" />
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="searchForm.consignee" placeholder="请输入收货人" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <br />
        <el-form-item label="订单状态">
          <el-select v-model="searchForm.status" placeholder="请选择订单状态" style="width: 180px">
            <el-option label="全部" value="" />
            <el-option label="派送中" value="delivering" />
            <el-option label="已完成" value="completed" />
            <el-option label="已受理" value="accepted" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择时间">
          <el-date-picker v-model="searchForm.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 订单列表 -->
    <el-table :data="tableData" style="width: 100%" stripe :row-style="rowStyle">
      <el-table-column label="订单号" prop="orderNo" />
      <el-table-column label="下单时间" prop="orderTime">
        <template #default="scope">
          <span style="word-break: break-all; white-space: normal;">
            {{ formatDate(scope.row.orderTime) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" prop="phone" />
      <el-table-column label="收货人" prop="consignee" />
      <el-table-column label="送货地址" prop="deliverAddress" />
      <el-table-column label="送达时间" prop="deliveryTime">
        <template #default="scope">
          <span style="word-wrap: break-word; white-space: normal;">
            {{ formatDate(scope.row.deliveryTime) }}
          </span>
        </template>
      </el-table-column> <el-table-column label="备注" prop="remarks" />
      <el-table-column label="订单金额" prop="orderAmount" />
      <el-table-column label="订单状态" prop="orderState" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text">查看</el-button>
          <el-button type="text">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination :current-page="currentPage" :page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue';

import request from '@/utils/request';

// 搜索表单数据
const searchForm = ref({
  orderId: '',
  consignee: '',
  phone: '',
  status: '',
  dateRange: [],
});

// 订单数据
const tableData = ref([]);

// 分页数据
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
// 控制行的颜色
const rowStyle = (row, rowIndex) => {
  if (rowIndex % 2 === 0) {
    return { background: 'rgb(135, 206, 235)' }; // 偶数行
  } else {
    return { background: 'rgb(238, 232, 170)' }; // 奇数行
  }
};
// 格式化时间
const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  } catch (error) {
    console.error('日期格式化失败:', error);
    return 'Invalid Date'; // 或者其他默认值
  }
};


// 获取订单列表
const getTableData = async () => {
  try {
    // 构造请求参数
    const params = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      orderNo: searchForm.value.orderId,
      consignee: searchForm.value.consignee,
      phone: searchForm.value.phone,
      orderState: searchForm.value.status,
      date: searchForm.value.dateRange
        ? [formatDate(searchForm.value.dateRange[0]), formatDate(searchForm.value.dateRange[1])]
        : [],
    };

    const response = await request.get('/order/list', { params });

    if (response.data && response.data.data) {
      tableData.value = response.data.data;
      console.log(tableData.value);

      total.value = response.data.total;
    } else {
      ElMessage.error('获取订单列表失败');
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('获取订单列表失败');
  }
};

// 搜索
const handleSearch = () => {
  currentPage.value = 1; // 搜索时重置为第一页
  getTableData();
};

// 每页条数改变
const handleSizeChange = (size) => {
  pageSize.value = size;
  getTableData();
};

// 当前页码改变
const handleCurrentChange = (page) => {
  currentPage.value = page;
  getTableData();
};

onMounted(async () => {
  await getTableData();
});
</script>

<style scoped>
.search-form {
  margin-left: 20px;
  margin-top: 5px;
}

.el-table {
  margin: 0;
  padding: 0;
}

.search-form {
  margin-bottom: 20px;
}
</style>
