<template>
  <div class="change-password">
    <el-form :model="form" ref="formRef" label-width="100px" :rules="rules">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input type="password" v-model="form.oldPassword" placeholder="请输入原密码" />
      </el-form-item>

      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="form.newPassword" placeholder="请输入新密码" />
      </el-form-item>

      <el-form-item label="确认新密码" prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword" placeholder="请确认新密码" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">立即修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, FormRules, FormInstance, ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/use';
import request from '@/utils/request';
import { useRouter } from 'vue-router';
const { push } = useRouter();

// 定义表单数据类型
interface FormState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const user = useUserStore();
console.log(user.id);

// 使用 reactive 创建响应式表单数据
const form = reactive<FormState>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// 定义 formRef 的类型
const formRef = ref<FormInstance | null>(null);

// 定义校验规则类型
const rules: FormRules<FormState> = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.newPassword) {
          callback(new Error('确认新密码与新密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

const handleSubmit = async () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        const response = await request.post(`/users/editpwd`, {
          oldPwd: form.oldPassword,
          newPwd: form.newPassword,
          newPwd1: form.confirmPassword,
          id: user.id,
        });

        if (response.data.code === 0) {
          ElMessage.success('修改成功！');
          formRef.value?.resetFields();
          push('/login')
        } else {
          ElMessage.error(response.data.msg || '修改失败');
        }
      } catch (error: any) {
        ElMessage.error(error.message || '服务器异常');
      }
    } else {
      console.log('表单验证失败');
    }
  });
};
</script>

<style scoped>
.change-password {
  padding: 20px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  margin-top: 10px;
}
</style>
