<template>
  <div class="category-list">
    <!-- 分类列表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" prop="id" width="100" />
      <el-table-column label="分类名" prop="name" />
      <el-table-column label="是否启用">
        <template #default="scope">
          <el-switch v-model="scope.row.enabled" @change="handleSwitchChange(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" type="primary">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器
    <div class="pagination">
      <span>共 4650 条</span>
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        :total="4650"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElTable, ElTableColumn, ElButton, ElPagination, ElSwitch } from 'element-plus';

// 假数据
const tableData = ref([
  {
    id: 4981,
    name: 'tcs123',
    enabled: false,
  },
  {
    id: 4325,
    name: 'tcs123',
    enabled: true,
  },
  {
    id: 4324,
    name: 'tcs123',
    enabled: true,
  },
  {
    id: 2958,
    name: '哈哈哈哈哈哈哈额',
    enabled: false,
  },
  {
    id: 4299,
    name: 'hhhhhh',
    enabled: true,
  },
]);

// // 分页
// const currentPage = ref(1);
// const pageSize = ref(5);

// const handleSizeChange = (size) => {
//   pageSize.value = size;
//   console.log(`每页 ${size} 条`);
// };

// const handleCurrentChange = (page) => {
//   currentPage.value = page;
//   console.log(`当前页: ${page}`);
// };

// 切换启用状态
const handleSwitchChange = (row) => {
  console.log(`分类 ${row.name} 的启用状态已更改为 ${row.enabled}`);
};
</script>

<style scoped>
.category-list {
  padding: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
