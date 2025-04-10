<template>
  <div>
    <Title><span class="title-text">商品列表</span></Title>
    <GoodsList />
    <Pagination />
  </div>

</template>

<script setup>
import Title from '@/components/Title.vue'
import GoodsList from '@/components/GoodsList.vue';
import Pagination from '@/components/Pagination.vue';

const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0); // 初始化为 0
</script>

<style lang="less" scoped>

</style>