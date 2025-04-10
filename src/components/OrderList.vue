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
        <br>
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
    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column label="订单号" prop="orderId" />
      <el-table-column label="下单时间" prop="orderTime" />
      <el-table-column label="联系电话" prop="phone" />
      <el-table-column label="收货人" prop="consignee" />
      <el-table-column label="送货地址" prop="address" />
      <el-table-column label="送达时间" prop="deliveryTime" />
      <el-table-column label="备注" prop="remark" />
      <el-table-column label="订单金额" prop="amount" />
      <el-table-column label="订单状态" prop="status" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text">查看</el-button>
          <el-button  type="text">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElDatePicker, ElButton, ElTable, ElTableColumn } from 'element-plus';

// 搜索表单数据
const searchForm = ref({
  orderId: '',
  consignee: '',
  phone: '',
  status: '',
  dateRange: [],
});

// 表格数据
const tableData = ref([
  {
    orderId: '16013',
    orderTime: '2026-06-19T17:35:19.000Z',
    phone: '18181358998',
    consignee: '汪小哥',
    address: '天府新谷',
    deliveryTime: '2020-04-16T02:44:58.000Z',
    remark: '不要辣',
    amount: 29.7,
    status: '派送中',
  },
  {
    orderId: '16012',
    orderTime: '2020-06-04T09:35:13.000Z',
    phone: '18181358998',
    consignee: '江女士',
    address: '天府新谷',
    deliveryTime: '2020-04-16T02:44:58.000Z',
    remark: '不要辣',
    amount: 60,
    status: '已完成',
  },
  {
    orderId: '16011',
    orderTime: '2020-06-04T09:35:03.000Z',
    phone: '18181358998',
    consignee: '李俊聪',
    address: '天府新谷',
    deliveryTime: '2020-04-16T02:44:58.000Z',
    remark: '微辣',
    amount: 99.88,
    status: '已受理',
  },
  {
    orderId: '15014',
    orderTime: '2020-06-04T09:34:43.000Z',
    phone: '18181358998',
    consignee: '李大陆',
    address: '天府新谷',
    deliveryTime: '2020-04-16T02:44:58.000Z',
    remark: '不要辣',
    amount: 99.88,
    status: '已受理',
  },
  {
    orderId: '15013',
    orderTime: '2020-06-04T09:34:33.000Z',
    phone: '18181358998',
    consignee: '王女士',
    address: '天府新谷',
    deliveryTime: '2020-04-16T02:44:58.000Z',
    remark: '微辣',
    amount: 19.88,
    status: '已完成',
  },
]);

// 搜索
const handleSearch = () => {
  console.log('搜索条件:', searchForm.value);
};
</script>

<style scoped>
.search-form{
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
