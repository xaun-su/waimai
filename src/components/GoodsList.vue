<template>
  <div class="product-list">
    <!-- 商品列表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <div style="margin: 0">
            商品ID: {{ props.row.id }}
            <br />
            商品名称: {{ props.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name" />
      <el-table-column label="商品分类" prop="category" />
      <el-table-column label="商品价格" prop="price" />
      <el-table-column label="商品图片">
        <template #default="scope">
          <el-image style="width: 50px; height: 50px" :src="scope.row.image" :alt="scope.row.name" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="description" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="primary">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElTable, ElTableColumn, ElButton, ElPagination, ElImage } from 'element-plus';

// 假数据
const tableData = ref([
  {
    id: 1,
    name: 'DELL',
    category: 'tcs123',
    price: 6,
    image: 'https://via.placeholder.com/50',
    description: '啊V哦我呢vi我',
  },
  {
    id: 2,
    name: 'DELL',
    category: 'tcs123',
    price: 8,
    image: 'https://via.placeholder.com/50',
    description: '啊V哦我呢vi我',
  },
  {
    id: 3,
    name: 'DELL',
    category: 'tcs123',
    price: 5,
    image: 'https://via.placeholder.com/50',
    description: '啊V哦我呢vi我',
  },
  {
    id: 4,
    name: 'DELL',
    category: 'tcs123',
    price: 3,
    image: 'https://via.placeholder.com/50',
    description: '啊V哦我呢vi我',
  },
  {
    id: 5,
    name: '123',
    category: '哈哈哈',
    price: 2,
    image: 'https://via.placeholder.com/50',
    description: '123',
  },
]);

</script>

<style scoped>
.product-list {
  padding: 20px;
}
</style>
