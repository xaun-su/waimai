<template>
  <div>
    <Title><span class="title-text">商品分类</span></Title>
    <GoodsType :goodsType="goodsType" />
    <Pagination 
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
/>
 </div>
</template>

<script setup>
import Title from '@/components/Title.vue'
import Pagination from '@/components/Pagination.vue';
import GoodsType from '@/components/GoodsType.vue';
import {ref} from 'vue';
import request from '@/utils/request';

const goodsType = ref([])
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(10); // 初始化为 0

const getTypeList = async () => {
  const res = await request.get(`/goods/catelist?currentPage=${currentPage.value}&pageSize=${pageSize.value}`);  
  goodsType.value = res.data.data;
  console.log(goodsType.value);
  total.value = res.data.total;
};
// 处理分页变化
const handlePageChange = (page) => {
  currentPage.value = page;
  getTypeList();
};
// 处理每页条数变化
const handleSizeChange = (size) => {
  // 添加 handleSizeChange 函数
  pageSize.value = size;
  currentPage.value = 1; // 重置为第一页
  getTypeList();
};
(async () => {
  await getTypeList();
}
)()
</script>

<style lang="less" scoped>

</style>