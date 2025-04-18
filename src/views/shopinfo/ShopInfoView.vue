<template>
  <Title><span class="title-text">店铺信息</span></Title>
  <div class="shop-edit">
    <el-form label-width="120px">
      <el-form-item label="店铺名称">
        <el-input v-model="shopInfo.name" />
      </el-form-item>
  
      <el-form-item label="店铺公告">
        <el-input v-model="shopInfo.bulletin" type="textarea" rows="3" />
      </el-form-item>
  
      <el-form-item label="店铺头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="shopInfo.avatar" :src="shopInfo.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
  
      <el-form-item label="店铺图片">
        <div class="image-list">
          <div
            v-for="(pic, index) in shopInfo.pics"
            :key="index"
            class="image-item"
            @mouseenter="showRemoveIcon(index)"
            @mouseleave="hideRemoveIcon(index)"
          >
            <el-upload
              class="image-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="(response) => handleImageSuccess(response, index)"
              :before-upload="beforeImageUpload"
            >
              <img v-if="pic" :src="pic" class="image" />
              <el-icon v-else class="image-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
            <el-icon v-if="removeIconVisible[index]" class="remove-icon" @click="removeImage(index)">X</el-icon>
          </div>
          <div class="add-image-item">
            <el-upload
              class="image-uploader add-image-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleImageAddSuccess"
              :before-upload="beforeImageUpload"
            >
              <el-icon class="image-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </div>
        </div>
      </el-form-item>
  
      <el-form-item label="起送价格">
        <el-input v-model="shopInfo.deliveryPrice" type="number" />
      </el-form-item>
  
      <el-form-item label="送达时间">
        <el-input v-model="shopInfo.deliveryTime" type="number" />
      </el-form-item>
  
      <el-form-item label="配送描述">
        <el-input v-model="shopInfo.description" />
      </el-form-item>
  
      <el-form-item label="店铺好评率">
        <el-input v-model="shopInfo.score" type="number" />
      </el-form-item>
  
      <el-form-item label="店铺销量">
        <el-input v-model="shopInfo.sellCount" type="number" />
      </el-form-item>
  
      <el-form-item label="活动支持">
        <el-checkbox-group v-model="shopInfo.supports">
          <el-checkbox label="单人精彩套餐" name="supports" />
          <el-checkbox label="VC无限橙汁全场8折" name="supports" />
          <el-checkbox label="在线支付满28减5" name="supports" />
          <el-checkbox label="特价饮品八折抢购" name="supports" />
          <el-checkbox label="中秋特惠" name="supports" />
          <el-checkbox label="国庆特价" name="supports" />
          <el-checkbox label="春节1折折扣" name="supports" />
        </el-checkbox-group>
      </el-form-item>
  
      <el-form-item label="营业时间">
        <el-time-picker v-model="shopInfo.date[0]" placeholder="开始时间" />
        <el-time-picker v-model="shopInfo.date[1]" placeholder="结束时间" />
      </el-form-item>
  
      <el-form-item>
        <el-button type="primary" @click="handleEdit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { ElMessage } from 'element-plus';
  import { Plus } from '@element-plus/icons-vue';
  import request from '@/utils/request';
  import { shop_editUrl, shop_upload, shop_info } from '@/api/shopinfo';
  import { baseURL } from '@/api/config';
  
  // 定义接口地址
  const uploadUrl = `${baseURL}${shop_upload}`;
  
  // 店铺信息
  const shopInfo = ref({
  id: 1,
  name: '',
  bulletin: '',
  avatar: '',
  deliveryPrice: null,
  deliveryTime: null,
  description: '',
  score: null,
  sellCount: null,
  supports: [],
  pics: [],
  date: ['', ''],
  minPrice: null,
  });
  
  // 移除图标的可见性
  const removeIconVisible = ref([]);
  
  // 获取店铺信息
  const getShopInfo = async () => {
  try {
    const response = await request.get(shop_info);
    if (response.data && response.data.data) {
      shopInfo.value = {
        id: response.data.data.id || 1,
        name: response.data.data.name || '',
        bulletin: response.data.data.bulletin || '',
        avatar: baseURL + response.data.data.avatar || '',
        deliveryPrice: response.data.data.deliveryPrice || null,
        deliveryTime: response.data.data.deliveryTime || null,
        description: response.data.data.description || '',
        score: response.data.data.score || null,
        sellCount: response.data.data.sellCount || null,
        supports: response.data.data.supports || [],
        pics: (response.data.data.pics || []).map(pic => baseURL + pic),
        date: response.data.data.date || ['', ''],
        minPrice: response.data.data.minPrice || null,
      };
      removeIconVisible.value = new Array(shopInfo.value.pics.length).fill(false);
    } else {
      ElMessage.error('获取店铺信息失败');
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('获取店铺信息失败');
  }
  };
  
  // 上传头像成功回调
  const handleAvatarSuccess = (response) => {
  if (response.code === 0) {
    shopInfo.value.avatar = baseURL + response.imgUrl;
    ElMessage.success('头像上传成功');
  } else {
    ElMessage.error('头像上传失败: ' + response.msg);
  }
  };
  
  // 上传图片成功回调
  const handleImageSuccess = (response, index) => {
  if (response.code === 0) {
    shopInfo.value.pics[index] = baseURL + response.imgUrl;
    ElMessage.success(`图片 ${index + 1} 上传成功`);
  } else {
    ElMessage.error('图片上传失败: ' + response.msg);
  }
  };
  
  // 添加图片成功回调
  const handleImageAddSuccess = (response) => {
  if (response.code === 0) {
    shopInfo.value.pics.push(baseURL + response.imgUrl);
    removeIconVisible.value.push(false); // 添加新的移除图标可见性
    ElMessage.success('图片添加成功');
  } else {
    ElMessage.error('图片添加失败: ' + response.msg);
  }
  };
  
  // 上传头像前的校验
  const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;
  
  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG 或 PNG 格式!');
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
  }
  return isJPG && isLt2M;
  };
  
  // 保存店铺信息
  const handleEdit = async () => {
  try {
    const requestBody = {
      id: shopInfo.value.id,
      name: shopInfo.value.name,
      bulletin: shopInfo.value.bulletin,
      avatar: shopInfo.value.avatar.split('/').pop(),
      deliveryPrice: shopInfo.value.deliveryPrice,
      deliveryTime: shopInfo.value.deliveryTime,
      description: shopInfo.value.description,
      score: shopInfo.value.score,
      sellCount: shopInfo.value.sellCount,
      supports: JSON.stringify(shopInfo.value.supports),
      date: JSON.stringify(shopInfo.value.date),
      pics: JSON.stringify(shopInfo.value.pics.map(pic => pic.split('/').pop())),
      minPrice: shopInfo.value.minPrice,
    };
  
    const response = await request.post(shop_editUrl, requestBody);
  
    if (response.data.code === 0) {
      ElMessage.success('修改店铺信息成功');
    } else {
      ElMessage.error('修改店铺信息失败: ' + response.data.msg);
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('修改店铺信息失败');
  }
  };
  
  // 添加图片
  const addImage = () => {
  // shopInfo.value.pics.push('');
  };
  
  // 删除图片
  const removeImage = (index) => {
  shopInfo.value.pics.splice(index, 1);
  removeIconVisible.value.splice(index, 1); // 同时移除移除图标的可见性
  ElMessage.success('图片已删除');
  };
  
  // 显示移除图标
  const showRemoveIcon = (index) => {
  removeIconVisible.value[index] = true;
  };
  
  // 隐藏移除图标
  const hideRemoveIcon = (index) => {
  removeIconVisible.value[index] = false;
  };
  
  onMounted(async () => {
  await getShopInfo();
  });
  </script>
  
  <style scoped>
  .shop-edit {
  padding: 20px;
  }
  
  .avatar-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  }
  
  .avatar-uploader:hover {
  border-color: #409eff;
  }
  
  .avatar-uploader-icon {
  font-size: 28px;
  color: #8c9398;
  width: 178px;
  height: 178px;
  display: flex;
  justify-content: center;
  align-items: center;
  }
  
  .avatar {
  width: 178px;
  height: 178px;
  display: block;
  }
  
  .image-list {
  display: flex;
  flex-wrap: wrap;
  }
  
  .image-item {
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
  }
  
  .image-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  }
  
  .image-uploader:hover {
  border-color: #409eff;
  }
  
  .image-uploader-icon {
  font-size: 28px;
  color: #8c9398;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  }
  
  .image {
  width: 100px;
  height: 100px;
  display: block;
  }
  
  .remove-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  color: red;
  display: none; /* 初始状态隐藏 */
  }
  
  .image-item:hover .remove-icon {
  display: block; /* 鼠标移入时显示 */
  }
  
  .add-image-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
  }
  
  .add-image-uploader {
  width: 100%;
  height: 100%;
  }
  </style>
  