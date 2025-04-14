<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index">
        <router-link v-if="item.path && index !== breadcrumbItems.length - 1" :to="item.path">
          {{ item.label }}
        </router-link>
        <span v-else>{{ item.label }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <Person/>
  </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
import { useRoute } from 'vue-router'
import Person from './Person.vue'
const route = useRoute()
const breadcrumbItems = ref([{ label: '首页', path: '/home' }])

// 从父组件注入面包屑数据
const breadcrumb = inject('breadcrumb', ref([]))

// 监听面包屑数据变化
watch(
  () => breadcrumb.value,
  (newValue) => {
    if (Array.isArray(newValue)) {
      breadcrumbItems.value = [{ label: '首页', path: '/home' }, ...newValue]
    }
  },
  { immediate: true }
)

// 监听路由变化
watch(
  () => route.path,
  () => {
    // 如果路由有 meta.breadcrumb，则使用路由的配置
    if (route.meta?.breadcrumb) {
      breadcrumbItems.value = [{ label: '首页', path: '/home' }, ...route.meta.breadcrumb]
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped>
.breadcrumb{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 