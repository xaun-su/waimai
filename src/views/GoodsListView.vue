<template>
  <div>
    <Title><span class="title-text">商品列表</span></Title>
    <GoodsList />
    <Pagination/>
  </div>
</template>

<script setup>
import Title from '@/components/Title.vue'
import Pagination from '@/components/Pagination.vue';
import GoodsList from '@/components/GoodsList.vue';
</script>

<style lang="less" scoped>

</style>