<template>
  <div class="add-good">
    <el-form :model="form" label-width="auto">
      <!-- 商品名称 -->
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入商品名称" />
      </el-form-item>

      <!-- 商品分类 -->
      <el-form-item label="商品分类" prop="region" class="region">
        <el-select v-model="form.region" placeholder="请选择商品分类">
          <el-option
            v-for="item in goodsType"
            :key="item.id"
            :label="item.cateName"
            :value="item.cateName"
            class="custom-select"
          />
        </el-select>
      </el-form-item>
      <!-- 商品价格 -->
      <el-form-item label="商品价格" prop="price">
        <el-input-number
          v-model="form.price"
          :min="0"
          label="商品价格"
          :step="1"
          :precision="2"
          size="small"
          placeholder="请输入商品价格"
        />
      </el-form-item>

      <!-- 商品图片 -->
      <el-form-item label="商品图片" prop="image">
        <el-upload
          class="upload-demo"
          action="http://8.137.157.16:9002/goods/goods_img_upload"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          list-type="picture-card"
          :headers="headers"
          :show-file-list="false"

        >
          <el-icon v-if="!form.image"><Plus /></el-icon>
          <img v-else :src="form.image" class="avatar" />
        </el-upload>
      </el-form-item>
      <!-- 商品描述 -->
      <el-form-item label="商品描述" prop="desc" class="textarea">
        <el-input v-model="form.desc" type="textarea" placeholder="请输入商品描述" />
      </el-form-item>

      <!-- 提交和重置按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加商品</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import request from '../utils/request.js';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

const goodsType = ref([]);
const form = reactive({
  name: '',
  region: '',
  price: 0,
  desc: '',
  image: '', // 修改为 ''
});
// 获取商品分类信息
const getGoodsType = async () => {
  const response = await request.get('/goods/categories');
  console.log(response.data.categories);
  goodsType.value = response.data.categories;
};
(async () => {
  await getGoodsType();
})();
// 提交表单
const onSubmit = () => {
  console.log('提交表单:', form);
};

// 重置表单
const resetForm = () => {
  form.name = '';
  form.region = '';
  form.price = 0;
  form.desc = '';
  form.image = '';
};

// 上传前的校验
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    ElMessage.error('只能上传图片文件!');
    return false; // 阻止上传
  }
  return true; // 允许上传
};

// 上传成功后的处理
const handleSuccess = (response) => {
  if (response.code === 0) {
    // 上传成功
    console.log(response.imgUrl);

    form.image ='http://8.137.157.16:9002'+response.imgUrl; // 使用接口返回的 imgUrl
    console.log(form.image);
    
    ElMessage.success('上传成功!');
  } else {
    // 上传失败
    ElMessage.error(response.msg || '上传失败!');
  }
};
</script>

<style scoped>
.add-good {
  margin: 20px;
}
.upload-demo {
  display: inline-block;
  width: 120px;
  height: 120px;
  border: 1px dashed #dcdfe6;
  text-align: center;
  line-height: 120px;
  font-size: 30px;
  color: #409eff;
  cursor: pointer;
}

.upload-demo i {
  cursor: pointer;
}

.upload-demo .avatar {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-form-item label {
  font-weight: bold;
  font-size: 14px;
  color: #333;
}
.textarea {
  margin-top: 50px;
}
.el-button {
  margin-right: 10px;
}
.region {
  width: 300px;
}
</style>
