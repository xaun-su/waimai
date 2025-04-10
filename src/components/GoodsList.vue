<template>
  <div class="product-list">
    <!-- 商品列表 -->
    <el-table :data="goods" style="width: 100%">
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
          <el-image style="width: 50px; height: 50px" :src="'http://8.137.157.16:9002'+scope.row.imgUrl" :alt="scope.row.name" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="description" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="primary">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { ElTable, ElTableColumn, ElButton, ElImage } from 'element-plus';
import request from '@/utils/request';
// 定义 props
const props = defineProps({
  goods: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['delete-goods']);

const handleDelete = (row) => {  
  emit('delete-goods', row.id);
};
</script>

<style scoped>
.product-list {
  padding: 20px;
}
</style>
