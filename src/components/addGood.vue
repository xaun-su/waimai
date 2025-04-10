<template>
  <el-form :model="form" label-width="auto" >
    <!-- 商品名称 -->
    <el-form-item label="商品名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入商品名称" />
    </el-form-item>

    <!-- 商品分类 -->
    <el-form-item label="商品分类" prop="region">
      <el-select v-model="form.region" placeholder="请选择商品分类">
        <el-option label="零食" value="snacks" />
        <el-option label="饮料" value="drinks" />
        <el-option label="水果" value="fruits" />
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
        action="#"
        list-type="picture-card"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
      >
        <i class="el-icon-plus"></i>
        <div v-if="form.image" class="image-preview">
          <img :src="form.image" alt="商品图片" />
        </div>
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
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const form = reactive({
  name: '',
  region: '',
  price: 0,
  desc: '',
  image: null,
});

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
  form.image = null;
};

// 图片上传处理
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  // if (!isImage) {
  //   this.$message.error('只能上传图片文件!');
  // }
  return isImage;
};

const handleSuccess = (response, file, fileList) => {
  // 上传成功后，获取文件的 URL 并设置到 form.image 中
  const reader = new FileReader();
  reader.onload = (e: any) => {
    form.image = e.target.result;
  };
  reader.readAsDataURL(file.raw);
};
</script>

<style scoped>
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

.image-preview img {
  width: 100%;
  height: 100%;
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
.textarea{
  margin-top: 50px;
}
.el-button {
  margin-right: 10px;
}
</style>
