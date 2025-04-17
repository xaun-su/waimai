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

<script setup lang="ts">
import { ref } from 'vue'
import { ElForm, FormInstance } from 'element-plus' // 导入 FormInstance 类型
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
import {account_add} from '@/api/account'

const form = ref({
  account: '',
  password: '',
  userGroup: '',
})

// 声明 formRef 的类型为 FormInstance
const formRef = ref<FormInstance | null>(null)

const handleSubmit = async () => {
  if (formRef.value) {
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
          const response = await request.post(account_add, form.value)
          console.log(response.data)
          if (response.data.code === 0) {
            ElMessage.success('添加成功！')
            formRef.value?.resetFields()
          } else {
            ElMessage.error('添加失败：' + response.data.message)
          }
        } catch (error) {
          console.error('请求失败:', error)
          ElMessage.error('请求失败！')
        }
      } else {
        console.log('表单验证失败')
      }
    })
  }
}

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