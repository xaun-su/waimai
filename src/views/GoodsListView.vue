<template>
  <div>
    <Title><span class="title-text">商品列表</span></Title>
    <GoodsList :goods="goods" @delete-goods="confirmDelete" />
    <Pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script setup>
import Title from '@/components/Title.vue';
import GoodsList from '@/components/GoodsList.vue';
import Pagination from '@/components/Pagination.vue';

import { ref, onMounted } from 'vue';
import request from '../utils/request';
import { ElMessage, ElMessageBox } from 'element-plus';

const goods = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0); // 初始化为 0

// 获取账户列表信息
const getGoodsList = async () => {
  loading.value = true;
  try {
    const res = await request.get(
      `/goods/list?currentPage=${currentPage.value}&pageSize=${pageSize.value}`
    );
    console.log(res);
    if (res.data && res.data.code === 0) {
      goods.value = res.data.data;
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
const handlePageChange = (page) => {
  currentPage.value = page;
  getGoodsList();
};
// 处理每页条数变化
const handleSizeChange = (size) => {
  // 添加 handleSizeChange 函数
  pageSize.value = size;
  currentPage.value = 1; // 重置为第一页
  getGoodsList();
};

// 处理账户删除事件
const handleGoodsDeleted = async (deletedGoodsId) => {
  console.log(deletedGoodsId);
  // 过滤掉已删除的账户
  const res= await request.get(`/goods/del?id=${deletedGoodsId}`);
  goods.value = goods.value.filter((goods) => goods.id !== deletedGoodsId);
  total.value--; // 更新总条数

  // 判断当前页是否还有数据
  if (goods.value.length === 0 && currentPage.value > 1) {
    // 如果当前页没有数据了，且不是第一页，则跳转到上一页
    currentPage.value--;
  }

  // 重新获取账户列表
  await getGoodsList();
};

const confirmDelete = (goodsId) => {
  ElMessageBox.confirm(
    `确定要删除商品 ${goodsId} 吗?`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
    }
  )
    .then(() => {
      // 用户点击确定，执行删除操作
      handleGoodsDeleted(goodsId);
    })
    .catch(() => {
      // 用户点击取消，取消删除操作
      ElMessage({
        type: 'info',
        message: '已取消删除',
      });
    });
};

// 立即执行的异步函数
onMounted(async () => {
  await getGoodsList();
});
</script>

<style lang="less" scoped>
</style>
