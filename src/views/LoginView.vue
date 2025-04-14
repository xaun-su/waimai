<template>
  <div class="login-view">
    <div class="login-container">
      <h2 class="login-title">系统登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">
            <el-icon><User /></el-icon>
            请输入账号
          </label>
          <input type="text" id="username" v-model="username" placeholder="请输入账号" required />
        </div>
        <div class="input-group">
          <label for="password">
            <el-icon><Lock /></el-icon>
            请输入密码
          </label>
          <input type="password" id="password" v-model="password" placeholder="请输入密码" required />
        </div>
        <button type="submit" class="login-btn" :disabled="isLoading">
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/use.js'; // 导入 userStore
import { ElMessage } from 'element-plus'; // 导入 ElMessage
import request from '../utils/request.js'; // 导入封装的 request
import { User, Lock } from '@element-plus/icons-vue'; // 导入图标

const router = useRouter();
const userStore = useUserStore(); // 获取 userStore 实例

const username = ref('')
const password = ref('')
const isLoading = ref(false); // 添加 loading 状态
const errorMessage = ref(''); // 添加错误消息

const handleLogin = async () => {
  errorMessage.value = ''; // 清空错误消息
  if (!username.value || !password.value) {
    errorMessage.value = '请输入账号和密码';
    return;
  }

  isLoading.value = true; // 设置 loading 状态为 true
  try {
    // 调用登录 API
    const response = await request.post('api/users/checkLogin', {
      account: username.value,
      password: password.value
    });

    if (response.data.code === 0) {
      console.log('登录成功', response.data);
      
      // 登录成功
      const token = response.data.token; // 从响应中获取 token
      const id = response.data.id; // 从响应中获取 id
      userStore.setToken(token); // 将 token 存储到 userStore 中
      userStore.setId(id);
      ElMessage.success('登录成功'); // 显示成功消息
      router.push('/home'); // 跳转到 home 页面
    } else {
      // 登录失败
      errorMessage.value = response.data.msg || '登录失败';
    }
  } catch (error) {
    // 处理错误
    console.error('登录失败', error);
    errorMessage.value = error.message || '服务器异常，请稍后重试';
  } finally {
    isLoading.value = false; // 无论成功与否，都将 loading 状态设置为 false
  }
}
</script>

<style lang="less" scoped>
/* 让根容器铺满整个屏幕 */
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使用视口高度，确保屏幕满屏 */
  background-color: #2c3e50; /* 深蓝色背景 */
  margin: 0; /* 确保没有外边距影响 */
}

/* 内层容器居中显示 */
.login-container {
  width: 100%;
  max-width: 400px; /* 最大宽度 400px */
  padding: 20px;
  background-color: transparent; /* 透明背景 */
  border-radius: 8px;
}

.login-title {
  text-align: center;
  font-size: 24px;
  color: #fff; /* 白色标题 */
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #fff; /* 白色文字 */
  margin-bottom: 5px;
}

.input-group label .el-icon {
  margin-right: 5px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: transparent; /* 透明背景 */
  color: #fff; /* 白色文字 */
}

.input-group input:focus {
  border-color: #3b8bfd;
  outline: none;
}

.login-btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: #fff;
  background-color: #3b8bfd; /* 蓝色按钮 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
}

.login-btn:hover {
  background-color: #2f73cc;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>
