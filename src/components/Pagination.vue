<template>
  <el-pagination
    :current-page="currentPage"
    :page-size="pageSize"
    :page-sizes="[5, 10, 15, 20]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['page-change'],['size-change']);

const handleSizeChange = (val) => {
  console.log(`${val} items per page`);
  emit('size-change', val);  // 修改：只 emit size
};

const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
  emit('page-change', val);  // 修改：只 emit page
};
</script>

<style scoped>
/* 可以添加样式 */
</style>
