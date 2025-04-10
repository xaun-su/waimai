<template>
  <div>
    <!-- 表格展示账户数据 -->
    <el-table :data="accounts" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column label="账号" prop="account" />
      <el-table-column label="用户组" prop="userGroup" />
      <el-table-column label="创建时间" prop="ctime" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="edit(row)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteAccount(row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  accounts: {
    type: Array,
    required: true,
  },
});

const edit = (row) => {
  console.log('编辑', row);
};

const deleteAccount = (row) => {
  console.log('删除', row);
};
</script>

<style scoped>
.el-table {
  margin-bottom: 20px;
}
</style>
