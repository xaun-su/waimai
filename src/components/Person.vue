<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      欢迎 {{ username }} 登录
      <el-icon><ArrowDown /></el-icon>
      <el-avatar :src="avatarUrl" :size="40" style="margin-left: 10px; vertical-align: middle;" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="goToProfile">个人中心</el-dropdown-item>
        <el-dropdown-item @click="logout">注销登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import request from '@/utils/request'; // 引入你的 axios 封装
import { useUserStore } from '@/stores/use';
import {account_info} from '@/api/account'
import { baseURL } from '@/api/config';

const router = useRouter();
const userStore = useUserStore();
// 用户名和头像 URL
const username = ref('');
const avatarUrl = ref('');

// 获取用户 ID (从 localStorage 或 Vuex/Pinia 中获取)
const userId = userStore.id

// 获取账户信息
const getAccountCenter = async () => {
  try {
    const response = await request.get(`${account_info}?id=${userId}`);
    if (response.data.code === 0) {
      console.log(response.data.accountInfo);
      username.value = response.data.accountInfo.account;
      avatarUrl.value = baseURL+ response.data.accountInfo.imgUrl;
    } else {
      ElMessage.error(response.data.msg || '获取账户信息失败');
    }
  } catch (error:any) {
    console.error('获取账户信息失败:', error);
    ElMessage.error(`获取账户信息失败: ${error.message || '请稍后重试'}`);
  }
};

// 组件挂载后获取账户信息
onMounted(() => {
    getAccountCenter();
});

// 跳转到个人中心
const goToProfile = () => {
  router.push('/accountCenter'); // 替换为你的个人中心路由
};

// 注销登录
const logout = () => {
  // 在这里执行注销登录的逻辑
  userStore.token=''
  userStore.id=''
  ElMessage.success('注销成功');
  router.push('/login'); // 替换为你的登录页路由
};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
