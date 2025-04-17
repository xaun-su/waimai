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
          <!-- 网站部署前 -->
          <el-image style="width: 50px; height: 50px" :src="baseURL + scope.row.imgUrl" :alt="scope.row.name" fit="cover" />
           <!-- 网站部署 -->
           <!-- <el-image style="width: 50px; height: 50px" :src="scope.row.imgUrl" :alt="scope.row.name" fit="cover" /> -->
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="description" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { ElTable, ElTableColumn, ElButton, ElImage } from 'element-plus';
import {baseURL} from '@/api/config';
// 定义 props
const props = defineProps({
  goods: {
    type: Array,
    required: true,
  },
});

// 修复：将事件名称合并为一个数组
const emit = defineEmits(['delete-goods', 'edit-goods']);
const handleDelete = (row:any) => {  
  emit('delete-goods', row.id);
  console.log(row);
  
};

const handleEdit = (row:any) => {
  emit('edit-goods', row.id); // 触发 edit-goods 事件，并传递商品 id
};
</script>

<style scoped>
.product-list {
  padding: 20px;
}
</style>