<template>
  <div class="error-page">
    <h1>404</h1>
    <p>抱歉，您访问的页面不存在。</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>

<style scoped>
.error-page {
  text-align: center;
  margin-top: 150px;
}

h1 {
  font-size: 100px;
  color: #333;
}

p {
  font-size: 24px;
  color: #666;
}

a {
  color: #007bff;
  text-decoration: none;
  font-size: 18px;
}

a:hover {
  text-decoration: underline;
}
</style>