<template>
  <div>
    <Title><span class="title-text">添加账号</span></Title>
    <!-- 这里添加账号表单内容 -->
    <AddAccount/>
  </div>
</template>

<script setup lang="ts">
import Title from '@/components/Title.vue'
import AddAccount from './AccountAddView/AddAccount.vue';

defineOptions({
  name: 'AccountAdd',
});
</script>

<style lang="less" scoped>
</style>