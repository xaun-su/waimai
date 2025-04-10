<template>
  <div class="admin-details">
    <el-card>
      <h3>管理员信息</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form label-width="100px" :model="adminDetails">
            <el-form-item label="管理员ID">
              <span>{{ adminDetails.id }}</span>
            </el-form-item>
            <el-form-item label="账号">
              <span>{{ adminDetails.account }}</span>
            </el-form-item>
            <el-form-item label="用户组">
              <span>{{ adminDetails.role }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ adminDetails.createTime }}</span>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="8">
          <el-form label-width="100px">
            <el-form-item label="管理员头像">
              <el-image
                style="width: 150px; height: 150px; object-fit: cover;"
                :src="adminDetails.avatar"
                alt="管理员头像"
              />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElCard, ElRow, ElCol, ElForm, ElFormItem, ElImage } from 'element-plus'

const adminDetails = ref({
  id: 991,
  account: 'admin',
  role: '超级管理员',
  createTime: '2025-04-09',
  avatar: 'https://via.placeholder.com/150' // 这里使用占位图，替换成真实的头像地址
})
</script>

<style scoped>
.admin-details {
  padding: 20px;
}

.el-card {
  padding: 20px;
}

.el-form-item span {
  display: block;
  line-height: 32px;
}
</style>
