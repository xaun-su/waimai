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
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import MenuView from '@/components/MenuView.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
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
