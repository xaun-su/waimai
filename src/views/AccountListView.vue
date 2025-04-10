<template>
  <div>
    <Title><span class="title-text">账号列表</span></Title>
    <!-- 传递数据给 AccountList 组件 -->
    <AccountList />
    <Pagination/>
  </div>
</template>

<script setup>
import AccountList from '@/components/AccountList.vue';
import Title from '@/components/Title.vue';
import Pagination from '@/components/Pagination.vue';
</script>

<style lang="less" scoped>
/* 可以添加样式 */
</style>
