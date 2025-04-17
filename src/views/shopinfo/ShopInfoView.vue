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
        <el-upload
          class="image-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleImageSuccess"
          :before-upload="beforeImageUpload"
        >
          <img v-if="shopInfo.pics[0]" :src="shopInfo.pics[0]" class="image" />
          <el-icon v-else class="image-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
        <el-upload
          class="image-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleImageSuccess"
          :before-upload="beforeImageUpload"
        >
          <img v-if="shopInfo.pics[1]" :src="shopInfo.pics[1]" class="image" />
          <el-icon v-else class="image-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
        <el-upload
          class="image-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleImageSuccess"
          :before-upload="beforeImageUpload"
        >
          <img v-if="shopInfo.pics[2]" :src="shopInfo.pics[2]" class="image" />
          <el-icon v-else class="image-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
        <el-upload
          class="image-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleImageSuccess"
          :before-upload="beforeImageUpload"
        >
          <img v-if="shopInfo.pics[3]" :src="shopInfo.pics[3]" class="image" />
          <el-icon v-else class="image-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
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

<script  setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { ElForm, ElFormItem, ElInput, ElUpload, ElIcon, ElCheckbox, ElCheckboxGroup, ElTimePicker, ElButton } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import request from '@/utils/request'; // 引入你的 request 库


// 定义接口地址
const uploadUrl ='http://8.137.157.16:9002/shop/upload';
console.log(uploadUrl)
const shopEditUrl ='/shop/edit';
const baseURL='http://8.137.157.16:9002'
// 店铺信息
const shopInfo = ref({
  id: 1, // 默认为 0
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

// 获取店铺信息
const getShopInfo = async () => {
  try {
    const response = await request.get('/shop/info');

    console.log('商铺数据',response.data.data);
    
    if (response.data && response.data.data) {
      shopInfo.value = {
        id: response.data.data.id || 1, // 确保 id 不为 null
        name: response.data.data.name || '',
        bulletin: response.data.data.bulletin || '',
        avatar: baseURL+response.data.data.avatar || '', // 拼接完整的图片URL
        deliveryPrice: response.data.data.deliveryPrice || null,
        deliveryTime: response.data.data.deliveryTime || null,
        description: response.data.data.description || '',
        score: response.data.data.score || null,
        sellCount: response.data.data.sellCount || null,
        supports: response.data.data.supports || [],
        pics: (response.data.data.pics || []).map(pic => baseURL+ pic), // 拼接完整的图片URL
        date: response.data.data.date || ['', ''],
        minPrice: response.data.data.minPrice || null,
      };
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
  console.log(response);
  
  if (response.code === 0) {
    shopInfo.value.avatar = baseURL+ response.imgUrl; // 拼接完整的图片URL
    ElMessage.success('头像上传成功');
  } else {
    ElMessage.error('头像上传失败: ' + response.msg);
  }
};

// 上传图片成功回调
const handleImageSuccess = (response, file, fileList) => {
  if (response.code === 0) {
    // 找到当前上传的图片对应的索引
    const index = fileList.length - 1; // 假设上传顺序与显示顺序一致
    shopInfo.value.pics[index] = baseURL + response.imgUrl; // 拼接完整的图片URL
    ElMessage.success(`图片 ${index + 1} 上传成功`);
  } else {
    ElMessage.error('图片上传失败: ' + response.msg);
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
    // 构造请求体
    const requestBody = {
      id: shopInfo.value.id,
      name: shopInfo.value.name,
      bulletin: shopInfo.value.bulletin,
      avatar: shopInfo.value.avatar.split('/').pop(), // 只发送图片名
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

    console.log('请求体', requestBody); // 打印请求体

    const response = await request.post(shopEditUrl, requestBody);

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

.image-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 10px;
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
</style>
