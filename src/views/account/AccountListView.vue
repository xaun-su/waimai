<template>
  <div>
    <Title><span class="title-text">账号列表</span></Title>
    <div v-if="loading">加载中...</div>
    <div v-else>
      <!-- 传递数据和分页信息给 AccountList 组件 -->
      <AccountList :accounts="accounts" @delete-account="handleAccountDeleted" @account-updated="handleAccountUpdated"/>
    </div>
    <!-- 传递分页信息给 Pagination 组件 -->
    <Pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @page-change="handlePageChange"
      @size-change="handleSizeChange" 
    />
  </div>
</template>

<script setup lang="ts">
import AccountList from '@/views/account/AccountListView/AccountList.vue';
import Title from '@/components/Title.vue';
import Pagination from '@/components/Pagination.vue';
import { ref, Ref } from 'vue';
import request from '@/utils/request';
import { ElMessage } from 'element-plus';

// 定义 Account 类型
interface Account {
  id: number;
  account: string;
  userGroup: string;
  ctime: string;
  // 其他属性
}

const loading = ref(true);
const accounts: Ref<Account[]> = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(373); // 初始化 total 为 373
// 获取账户列表信息
const getAccountList = async () => {
  loading.value = true;
  try {
    const res = await request.get(`/users/list?currentPage=${currentPage.value}&pageSize=${pageSize.value}`);
    console.log(res);
    if (res.data && res.data.code === 0) {
      accounts.value = res.data.data;
      total.value = res.data.total; // 获取总条数
    } else {
      console.error('获取账户列表失败:', res.data);
      ElMessage.error(`获取账户列表失败: ${res.data?.msg || '未知错误'}`);
    }
  } catch (error) {
    console.error('获取账户列表发生异常:', error);
    ElMessage.error(`获取账户列表发生异常: ${error.message || '服务器异常，请稍后重试'}`);
  } finally {
    loading.value = false;
  }
};

// 处理分页变化
const handlePageChange = (page: number) => {
  currentPage.value = page;
  getAccountList();
};
// 处理每页条数变化
const handleSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
  getAccountList();
};

// 处理账户删除事件
const handleAccountDeleted = async (deletedAccountId: number) => {
  accounts.value = accounts.value.filter(account => account.id !== deletedAccountId);
  total.value--;

  if (accounts.value.length === 0 && currentPage.value > 1) {
    currentPage.value--;
  }

  await getAccountList();
};

// 处理账户更新事件
const handleAccountUpdated = async (updatedAccount: Account) => {
  const index = accounts.value.findIndex(account => account.id === updatedAccount.id);
  if (index !== -1) {
    accounts.value[index] = { ...updatedAccount };
  }

  try {
    const res = await request.post(`/users/edit?id=${updatedAccount.id}`, updatedAccount);
    if (res.data && res.data.code === 0) {
      ElMessage.success('更新成功');
    } else {
      console.error('更新账户失败:', res.data);
      ElMessage.error(`更新账户失败: ${res.data?.msg || '未知错误'}`);
    }
  } catch (error) {
    console.error('更新账户发生异常:', error);
    ElMessage.error(`更新账户发生异常: ${error.message || '服务器异常，请稍后重试'}`);
  }
};

// 立即执行的异步函数
(async () => {
  await getAccountList();
})();
</script>

<style lang="less" scoped>
/* 可以添加样式 */
</style>
