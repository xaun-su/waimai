<template>
  <div class="form-container">
    <el-form :model="form" ref="formRef" label-width="100px">
      <el-form-item label="账号" prop="account" :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]">
        <el-input v-model="form.account" placeholder="请输入账号" />
      </el-form-item>

      <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" />
      </el-form-item>

      <el-form-item label="用户组" prop="userGroup" :rules="[{ required: true, message: '请选择用户组', trigger: 'change' }]">
        <el-select v-model="form.userGroup" placeholder="请选择用户组">
          <el-option label="管理员" value="admin" />
          <el-option label="普通用户" value="user" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">立即添加</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElSelect, ElOption } from 'element-plus'
import request from '@/utils/request'

const form = ref({
  account: '',
  password: '',
  userGroup: '',
})

const formRef = ref(null)

const handleSubmit = async () => { // 将 handleSubmit 函数声明为 async
  formRef.value?.validate(async (valid) => { // 将 validate 的回调函数声明为 async
    if (valid) {
      try {
        const response = await request.post('/users/add', form.value); // 添加 await 关键字
        console.log(response.data);
        if (response.data.code === 0) {
          ElMessage.success('添加成功！');
          formRef.value?.resetFields();
          
        }
      } catch (error) {
        console.error('请求失败:', error);
        alert('提交失败！'); 
      }
    } else {
      console.log('表单验证失败');
    }
  });
};


const resetForm = () => {
  formRef.value?.resetFields()
}
</script>

<style scoped>
.form-container {
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  margin-right: 10px;
}
</style>
