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

<script setup>
import { ref } from 'vue'
import { ElCard, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { useUserStore } from '../stores/use'
import request from '../utils/request'

const user = useUserStore()
console.log(user.id);

const form = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const formRef = ref(null)

const rules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { validator: (rule, value, callback) => {
      if (value !== form.value.newPassword) {
        callback(new Error('确认新密码与新密码不一致'));
      } else {
        callback();
      }
    }, trigger: 'blur' }
  ]
}

const handleSubmit = async() => {
  formRef.value?.validate(async(valid) => {
    if (valid) {
      // const response = await request.get(`/users/checkoldpwd?oldPwd=${String(form.value.oldPassword)}&id=${user.id}`)
      // if (response.data.code === 0) {
      // console.log(form.value.oldPassword,form.value.newPassword,form.value.confirmPassword,user.id);
      
        const response = await request.post(`/users/editpwd`,{
          oldPwd: form.value.oldPassword,
          newPwd: form.value.newPassword,
          newPwd1: form.value.confirmPassword,
          id: user.id,
        })
        if (response.data.code === 0) {
          ElMessage.success('修改成功！');
          formRef.value?.resetFields();
          // push('/login')
        }
      } else {
        ElMessage.error('原密码错误！');
      }
//     } else {
//       console.log('表单验证失败');
//     }
  })
}
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
