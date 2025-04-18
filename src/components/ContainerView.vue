<template>
  <div class="common-layout">
    <el-container separator-class="iconfont ">
      <el-aside width=" 00px">
        <MenuView></MenuView>
      </el-aside>
      <el-container>
        <el-header>
          <Breadcrumb />
        </el-header>
        <el-main>
            <router-view v-slot="{ Component }">
              <keep-alive :include="cachedComponents">
              <component :is="Component" />
            </keep-alive>
            </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MenuView from '@/components/MenuView.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { computed, ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 全局缓存列表
const cachedComponentNames = ref(new Set<string>());

// 计算属性，用于返回需要缓存的组件名数组
const cachedComponents = computed(() => {
  console.log('当前缓存列表:', Array.from(cachedComponentNames.value));
  return Array.from(cachedComponentNames.value);
});

// 监听路由变化，更新缓存列表
watch(
  () => route.name,
  (newRouteName) => {
    console.log('路由变化:', newRouteName);
    route.matched.forEach((record) => {
      if (record.components?.default?.name && record.meta.keepAlive) {
        cachedComponentNames.value.add(record.components.default.name);
        console.log(`添加 ${record.components.default.name} 到缓存列表`);
      }
    });
  },
  { immediate: true }
);

// 调试：在组件挂载后打印当前路由信息
onMounted(() => {
  console.log('组件挂载，当前路由信息:', route);
  console.log('组件挂载，当前路由匹配:', route.matched);
});

// 调试：监听路由器的 `beforeEach` 导航守卫，打印路由变化信息
router.beforeEach((to, from) => {
  console.log('导航守卫：从', from.path, '到', to.path);
});
</script>

<style lang="less" scoped>
/* 移除 el-container 的默认 margin/padding */
.common-layout {
  margin: 0;
  padding: 0;
  height: 100vh; /* 设置高度为 100vh */
  background-color: rgb(240, 242, 245);

  .el-container {
    margin: 0;
    padding: 0;
    height: 100%; /* 继承父元素的高度 */
  }

  .el-header {
    width: 100%;
    height: 50px;
    background-color: #fff;
    text-align: left; /* Header 文字左对齐 */
    line-height: 60px;
    padding: 0 20px; /* 增加左右内边距 */
    box-sizing: border-box; /* 确保 padding 不会增加元素宽度 */
    display: flex; /* 使用 Flexbox 布局 */
    align-items: center; /* 垂直居中 */
  }

  .el-aside {
    height: 100%;
    width: 200px;
    background-color: rgb(48, 65, 86);
    color: #fff; /* 修改文字颜色为白色 */
    text-align: left; /* 菜单文字左对齐 */
  }

  .el-main {
    padding: 0;
    background-color: #fff;
    text-align: left; /* 内容文字左对齐 */
    margin: 20px;
    box-sizing: border-box; /* 确保 padding 不会增加元素尺寸 */
    overflow: auto; /* 内容超出时显示滚动条 */
  }
}
</style>
