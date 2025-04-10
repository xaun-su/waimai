<template>
  <div v-if="loading">加载中...</div>
  <div v-else>
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
import { ref } from 'vue';

const loading = ref(false);
const accounts = ref([
  { account: '123456', userGroup: '普通管理员', ctime: '2025-04-09' },
  { account: '123456', userGroup: '普通管理员', ctime: '2025-04-09' },
  { account: 'autotest', userGroup: '超级管理员', ctime: '2025-04-09' },
  { account: 'admin', userGroup: '超级管理员', ctime: '2025-04-09' },
  { account: 'user', userGroup: '超级管理员', ctime: '2025-04-09' },
  // 添加更多数据
]);
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
