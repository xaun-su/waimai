<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="rgb(48, 65, 86)"
    text-color="#fff"
    active-text-color="rgb(64, 158, 255)"
    unique-opened="true"
  >
    <el-menu-item index="0" disabled>
      <img src="../assets/vue.svg" alt="" />
      <span>外卖管理系统</span>
    </el-menu-item>
    <el-menu-item index="1" @click="handleMenuItemClick('1')">
      <el-icon>
        <setting />
      </el-icon>
      <span>首页</span>
    </el-menu-item>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><location /></el-icon>
        <span>账号管理</span>
      </template>
      <el-menu-item index="2-1" @click="handleMenuItemClick('2-1')">账户列表</el-menu-item>
      <el-menu-item index="2-2" @click="handleMenuItemClick('2-2')">添加账户</el-menu-item>
      <el-menu-item index="2-3" @click="handleMenuItemClick('2-3')">个人中心</el-menu-item>
      <el-menu-item index="2-4" @click="handleMenuItemClick('2-4')">修改密码</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>商品管理</span>
      </template>
      <el-menu-item index="3-1" @click="handleMenuItemClick('3-1')">商品列表</el-menu-item>
      <el-menu-item index="3-2" @click="handleMenuItemClick('3-2')">商品添加</el-menu-item>
      <el-menu-item index="3-3" @click="handleMenuItemClick('3-3')">商品分类</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="4" @click="handleMenuItemClick('4')">
      <el-icon>
        <document />
      </el-icon>
      <span>订单管理</span>
    </el-menu-item>
    <el-menu-item index="5" @click="handleMenuItemClick('5')">
      <el-icon>
        <setting />
      </el-icon>
      <span>店铺管理</span>
    </el-menu-item>

    <el-sub-menu index="6">
      <template #title>
        <el-icon><location /></el-icon>
        <span>统计数据</span>
      </template>
      <el-menu-item index="6-1" @click="handleMenuItemClick('6-1')">商品统计</el-menu-item>
      <el-menu-item index="6-2" @click="handleMenuItemClick('6-2')">订单统计</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="7">
      <template #title>
        <el-icon><location /></el-icon>
        <span>权限管理</span>
      </template>
      <el-menu-item index="7-1" @click="handleMenuItemClick('7-1')">权限管理</el-menu-item>
      <el-menu-item index="7-2" @click="handleMenuItemClick('7-2')">角色管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleOpen = (key, keyPath) => {
  console.log('open', key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log('close', key, keyPath);
};

const handleMenuItemClick = (index) => {
  console.log('clicked', index);

  switch (index) {
    case '1':
      router.push('/home');
      break;
    case '2-1':
      router.push('/accountList');
      break;
    case '2-2':
      router.push('/accountAdd');
      break;
    case '2-3':
      router.push('/accountCenter');
      break;
    case '2-4':
      router.push('/accountEdit');
      break;
    case '3-1':
      router.push('/goodsList');
      break;
    case '3-2':
      router.push('/goodsAdd');
      break;
    case '3-3':
      router.push('/goodsType');
      break;
    case '4':
      router.push('/orderList');
      break;
    case '5':
      router.push('/shopInfo');
      break;
    case '6-1':
      router.push('/goodsStatistics');
      break;
    case '6-2':
      router.push('/orderStatistics');
      break;
    case '7-1':
      router.push('/permissionInfo');
      break;
    case '7-2':
      router.push('/RolePermission');
      break;
    default:
      break;
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}

.el-menu {
  overflow: scroll;
  border-right: none;
  height: 100%;
}
.el-menu::-webkit-scrollbar {
  display: none;
}
.el-menu-item,
.el-sub-menu__title {
  text-align: left;
  img {
    width: 50px;
    margin-right: 10px;
    height: 50px;
    border-radius: 50%;
  }
}
.el-menu-item.is-disabled {
  opacity: 1 !important;
  color: inherit !important;
  cursor: not-allowed;
}

.el-menu-item.is-disabled:hover {
  background-color: transparent !important;
}
</style>
