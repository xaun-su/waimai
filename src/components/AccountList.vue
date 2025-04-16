<template>
  <div>
    <!-- 表格展示账户数据 -->
    <el-table :data="processedAccounts" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column label="账号" prop="account" />
      <el-table-column label="用户组" prop="userGroup" />
      <el-table-column label="创建时间" prop="ctime" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="confirmEdit(row)" type="primary" size="small">编辑</el-button>
          <el-button @click="confirmDelete(row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑对话框 -->
    <EditAccountDialog
      :dialogVisible="editDialogVisible"
      :account="selectedAccount"
      @close="closeEditDialog"
      @account-updated="handleAccountUpdated"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue';
import request from '@/utils/request';
import { ElMessage, ElMessageBox } from 'element-plus';
import EditAccountDialog from './EditAccountDialog.vue'; // 导入编辑对话框组件

const props = defineProps({
  accounts: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(['delete-account', 'edit-account', 'account-updated']);

const processedAccounts = computed(() => {
  return props.accounts.map(account => {
    return {
      ...account,
      ctime: account.ctime ? account.ctime.slice(0, 10) : '', // 创建新对象，并添加修改后的 ctime 属性
    };
  });
});

// 编辑对话框相关
const editDialogVisible = ref(false);
const selectedAccount = ref(null);

const confirmEdit = (row) => {
  selectedAccount.value = row;
  editDialogVisible.value = true;
};

const closeEditDialog = () => {
  editDialogVisible.value = false;
  selectedAccount.value = null;
};

const handleAccountUpdated = (updatedAccount) => {
  emit('account-updated', updatedAccount);
  closeEditDialog();
};
const confirmDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除账号 ${row.account} 吗?`,
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
      deleteAccount(row);
    })
    .catch(() => {
      // 用户点击取消，取消删除操作
      ElMessage({
        type: 'info',
        message: '已取消删除',
      });
    });
};

const deleteAccount = async (row) => {
  console.log('删除', row);
  try {
    const res = await request.get(`/users/del?id=${row.id}`);

    if (res.data && res.data.code === 0) {
      ElMessage.success('删除成功');
      // 触发 delete-account 事件，通知父组件
      emit('delete-account', row.id);
    } else {
      ElMessage.error(`删除失败: ${res.data?.msg || '未知错误'}`);
    }
  } catch (error) {
    console.error('删除账户发生异常:', error);
    ElMessage.error(`删除账户发生异常: ${error.message || '服务器异常，请稍后重试'}`);
  }
};
</script>

<style scoped>
.el-table {
  margin-bottom: 20px;
}
</style>
