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
              <span>{{ adminDetails.userGroup }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ adminDetails.ctime }}</span>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="8">
          <el-form label-width="100px">
            <el-form-item label="管理员头像">
              <el-upload class="avatar-uploader" :action="uploadUrl" :headers="uploadHeaders" :show-file-list="false"
                :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
                <el-image v-if="adminDetails.imgUrl"
                  style="width: 150px; height: 150px; object-fit: cover; cursor: pointer;" :src="adminDetails.imgUrl"
                  alt="管理员头像" />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElCard, ElRow, ElCol, ElForm, ElFormItem, ElImage, ElUpload, ElMessage, ElIcon } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import request from '../utils/request'
import { useUserStore } from '../stores/use'

const user = useUserStore()

// 获取用户信息
const adminDetails = ref({})
const getAccountCenter = async () => {
  try {
    const response = await request.get(`/users/accountinfo?id=${user.id}`)
    if (response.data.code === 0) {
      console.log(response.data.accountInfo)
      adminDetails.value = response.data.accountInfo

      adminDetails.value.ctime = adminDetails.value.ctime.slice(0, 10)
      //网站部署前
      adminDetails.value.imgUrl=`http://8.137.157.16:9002${adminDetails.value.imgUrl}`
      //网站部署更改
      // adminDetails.value.imgUrl = response.imgUrl; // 更新头像 URL (保持相对路径)

    } else {
      ElMessage.error(response.data.msg || '获取账户信息失败')
    }
  } catch (error) {
    ElMessage.error(`获取账户信息失败: ${error.message || '请稍后重试'}`)
  }
}

(async () => {
  await getAccountCenter();
})();

// 上传图片 URL 和请求头
const uploadUrl = 'http://8.137.157.16:9002/users/avatar_upload'
const uploadHeaders = {
  Authorization: `Bearer ${user.token}`, // 使用 Token 进行身份验证
};

// 上传前的文件校验
const beforeAvatarUpload = (rawFile) => {
  const isJPG = rawFile.type === 'image/jpeg' || rawFile.type === 'image/png';
  const isLt2M = rawFile.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG 或 PNG 格式!');
    return false;
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
    return false;
  }
  return true;
};

// 头像上传成功后的回调
const handleAvatarSuccess = (response, file) => {
  if (response.code === 0) {
    adminDetails.value.imgUrl = `http://8.137.157.16:9002${response.imgUrl}`; // 更新头像 URL
    ElMessage.success('头像上传成功');
    console.log(response.imgUrl);

    // // 调用后端 API 更新头像
    // updateAvatar(response.imgUrl);
  } else {
    ElMessage.error(response.msg || '头像上传失败');
  }
};
// 验证 Token 是否过期
const checkToken = async () => {
  try {
    const response = await request.get('/users/checktoken', {
      params: { token: user.token }
    });

    if (response.data.code !== 0) {
      ElMessage.error(response.data.msg || 'Token 无效');
      return false;
    }
    return true;
  } catch (error) {
    ElMessage.error(`验证 Token 失败: ${error.message || '服务器异常，请稍后重试'}`);
    return false;
  }
};
// 调用验证 Token 并执行相关操作
(async () => {
  const tokenValid = await checkToken();
  if (!tokenValid) return;
  // 在 Token 验证通过后，继续执行获取账户信息或其他操作
})();
// // 更新头像到后端
// const updateAvatar = async (imgUrl) => {
//   console.log(user.id, imgUrl, user.token);

//   try {
//     const fullImgUrl = `http://8.137.157.16:9002${imgUrl}`;
//     const response = await request.post('/users/avataredit', {
//       id: Number(user.id),
//       imgUrl: fullImgUrl,
//     });

//     if (response.data.code === 0) {
//       ElMessage.success('头像更新成功');
//     } else {
//       ElMessage.error(response.data.msg || '头像更新失败');
//     }
//   } catch (error) {
//     ElMessage.error(`更新头像发生异常: ${error.message || '服务器异常，请稍后重试'}`);
//   }
// };




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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c9398;
  width: 150px;
  height: 150px;
  text-align: center;
}

.avatar-uploader-icon::before {
  line-height: 150px;
}

.avatar-uploader .el-image {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
