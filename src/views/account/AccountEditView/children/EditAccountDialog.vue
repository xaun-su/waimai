<template>
  <el-dialog v-model="dialogVisible" title="修改账号信息" width="30%" @close="handleClose">
    <el-form :model="form" label-width="120px">
      <el-form-item label="账号名">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item label="用户组">
        <el-select v-model="form.userGroup" placeholder="请选择用户组">
          <el-option label="超级管理员" value="超级管理员" />
          <el-option label="普通管理员" value="普通管理员" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import { Account } from '@/types/account'; 
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  account: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close', 'account-updated']);

const dialogVisible = ref(props.dialogVisible);

// Pick 类型可以从一个已有的接口中选择指定的属性，创建一个新的类型。


type FormAccount = Pick<Account, 'account' | 'userGroup'>;

const form = ref<FormAccount>({
  account: '',
  userGroup: '',
});

watch(
  () => props.dialogVisible,
  (newValue) => {
    dialogVisible.value = newValue;
  }
);

watch(
  () => props.account,
  (newValue) => {
    if (newValue) {
      form.value = { ...newValue as FormAccount };
    }
  },
  { immediate: true }
);

const handleClose = () => {
  emit('close');
};

const handleSubmit = () => {
  // 在这里可以添加表单验证逻辑

  // 触发 account-updated 事件，将更新后的账号信息传递给父组件
  emit('account-updated', form.value);
};
</script>
