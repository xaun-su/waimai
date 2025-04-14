<template>
  <div class="add-good">
    <el-form :model="form" label-width="auto" :rules="formRules" ref="formRef">
      <!-- 商品名称 -->
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入商品名称" />
      </el-form-item>

      <!-- 商品分类 -->
      <el-form-item label="商品分类" prop="category" class="region">
        <el-select v-model="form.category" placeholder="请选择商品分类">
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
      <el-form-item label="商品图片" prop="imgUrl">
        <el-upload
          class="upload-demo"
          action="http://8.137.157.16:9002/goods/goods_img_upload"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :on-error="handleError"
          list-type="picture-card"
          :headers="headers"
          :show-file-list="false"
        >
          <el-icon v-if="!form.imgUrl"><Plus /></el-icon>
          <img v-else :src="'http://8.137.157.16:9002' + form.imgUrl" class="avatar" />
        </el-upload>
      </el-form-item>

      <!-- 商品描述 -->
      <el-form-item label="商品描述" prop="goodsDesc" class="textarea">
        <el-input v-model="form.goodsDesc" type="textarea" placeholder="请输入商品描述" />
      </el-form-item>

      <!-- 提交和重置按钮 -->
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit">添加商品</el-button>
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
const formRef = ref(null);
const loading = ref(false);

const form = reactive({
  name: '',
  category: '',
  price: 0,
  goodsDesc: '',
  imgUrl: '',
});

// 表单验证规则
const formRules = {
  name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  category: [{ required: true, message: '请选择商品分类', trigger: 'blur' }],
  price: [
    { required: true, message: '请输入商品价格', trigger: 'blur' },
    { type: 'number', message: '价格必须是数字', trigger: 'blur' },
  ],
  imgUrl: [{ required: true, message: '请上传商品图片', trigger: 'change' }],
  goodsDesc: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
};

const getGoodsType = async () => {
  try {
    const response = await request.get('/goods/categories');
    goodsType.value = response.data.categories;
  } catch (error) {
    ElMessage.error('获取商品分类失败');
  }
};

(async () => {
  await getGoodsType();
})();

// 提交表单
const onSubmit = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      console.log(form);
      form.imgUrl=form.imgUrl.replace('/upload/imgs/goods_img/','');
      console.log(form.imgUrl);
      
      try {
        const response = await request.post('/goods/add', form);
        console.log(response);

        if (response.data.code === 0) {
          ElMessage.success('商品添加成功');
          resetForm();
        } else {
          ElMessage.error(response.msg || '添加失败');
        }
      } catch (error) {
        ElMessage.error('提交失败');
      } finally {
        loading.value = false;
      }
    } else {
      ElMessage.error('请填写完整信息');
    }
  });
};

const resetForm = () => {
  form.name = '';
  form.category = '';
  form.price = 0;
  form.goodsDesc = '';
  form.imgUrl = '';
};

// 上传前的校验
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    ElMessage.error('只能上传图片文件!');
    return false;
  }
  return true;
};

// 上传成功后的处理
const handleSuccess = (response) => {
  if (response.code === 0) {
    form.imgUrl = response.imgUrl; // 直接使用服务器返回的相对路径
    ElMessage.success('上传成功!');
  } else {
    ElMessage.error(response.msg || '上传失败!');
  }
};

// 上传失败后的处理
const handleError = (error) => {
  ElMessage.error('上传失败!');
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
