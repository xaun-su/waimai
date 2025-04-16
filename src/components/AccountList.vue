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
      :account="selectedAccount ?? {}" 
      @close="closeEditDialog"
      @account-updated="handleAccountUpdated"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref, PropType } from 'vue';
import request from '@/utils/request';
import { ElMessage, ElMessageBox } from 'element-plus';
import EditAccountDialog from '@/components/EditAccountDialog.vue';
import { Account } from '@/types/account';

const props = defineProps({
  accounts: {
    type: Array as PropType<Account[]>,
    required: true,
  },
});

const emit = defineEmits(['delete-account', 'edit-account', 'account-updated']);

const processedAccounts = computed(() => {
  return props.accounts.map(account => ({
    ...account,
    ctime: account.ctime ? account.ctime.slice(0, 10) : '',
  }));
});

const editDialogVisible = ref(false);
const selectedAccount = ref<Account | null>(null);

const confirmEdit = (row: Account) => {
  selectedAccount.value = row;
  editDialogVisible.value = true;
};

const closeEditDialog = () => {
  editDialogVisible.value = false;
  selectedAccount.value = null;
};

const handleAccountUpdated = (updatedAccount: Account) => {
  emit('account-updated', updatedAccount);
  closeEditDialog();
};

const confirmDelete = (row: Account) => {
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
      deleteAccount(row);
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      });
    });
};

const deleteAccount = async (row: Account) => {
  try {
    const res = await request.get(`/users/del?id=${row.id}`);

    if (res.data && res.data.code === 0) {
      ElMessage.success('删除成功');
      emit('delete-account', row.id);
    } else {
      ElMessage.error(`删除失败: ${res.data?.msg || '未知错误'}`);
    }
  } catch (error: unknown) { // 明确声明 error 类型为 unknown
    if (error instanceof Error) { // 检查 error 是否为 Error 类型
      console.error('删除账户发生异常:', error.message);
      ElMessage.error(`删除账户发生异常: ${error.message}`);
    } else {
      console.error('删除账户发生未知异常:', error);
      ElMessage.error('删除账户发生异常: 服务器异常，请稍后重试');
    }
  }
};
</script>

<style scoped>
.el-table {
  margin-bottom: 20px;
}
</style>