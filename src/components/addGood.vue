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
          :action="good_img"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :on-error="handleError"
          list-type="picture-card"
          :headers="headers"
          :show-file-list="false"
        >
          <el-icon v-if="!form.imgUrl"><Plus /></el-icon>
          <!-- //netlify代理前 -->
          <img v-else :src="baseURL + form.imgUrl" class="avatar" />
        </el-upload>
      </el-form-item>

      <!-- 商品描述 -->
      <el-form-item label="商品描述" prop="goodsDesc" class="textarea">
        <el-input v-model="form.goodsDesc" type="textarea" placeholder="请输入商品描述" />
      </el-form-item>

      <!-- 提交和重置按钮 -->
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit">
          {{ isEdit ? '修改商品' : '添加商品' }}
        </el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue';
import request from '@/utils/request';
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router'; // 引入 useRoute 和 useRouter
import {good_info ,good_add,good_edit,good_img,good_category,baseURL} from '@/api/config';
const route = useRoute(); // 获取 route 实例
const router = useRouter(); // 获取 router 实例

interface GoodsType {
  id: number;
  cateName: string;
}

const goodsType = ref<GoodsType[]>([]);
const formRef = ref<FormInstance | null>(null);
const loading = ref(false);

// 判断当前是添加还是修改
const isEdit = computed(() => route.query.id !== undefined);

const form = reactive({
  id: '',
  name: '',
  category: '',
  price: 0,
  goodsDesc: '',
  imgUrl: '',
});

// 表单验证规则
const formRules: FormRules = {
  name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  category: [{ required: true, message: '请选择商品分类', trigger: 'blur' }],
  price: [
    { required: true, message: '请输入商品价格', trigger: 'blur' },
    { type: 'number', message: '价格必须是数字', trigger: 'blur' },
  ],
  imgUrl: [{ required: true, message: '请上传商品图片', trigger: 'change' }],
  goodsDesc: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
};

const headers = {
  Authorization: 'Bearer ' + localStorage.getItem('token'), // 确保属性名是字符串类型
};

// 获取商品分类信息
const getGoodsType = async () => {
  try {
    const response = await request.get(good_category);
    goodsType.value = response.data.categories;
  } catch (error) {
    ElMessage.error('获取商品分类失败');
  }
};

// 获取商品信息（修改时）
const getGoodsInfo = async (id: string | undefined) => {
  try {
    const response = await request.get(`${good_info}?id=${id}`);
    if (response.data && response.data.code === 0) {
      // 将获取到的商品信息填充到表单中
      Object.assign(form, response.data.data);
    } else {
      ElMessage.error(response.data?.msg || '获取商品信息失败');
    }
  } catch (error) {
    ElMessage.error('获取商品信息失败');
  }
};

// 提交表单
const onSubmit = async () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        let response;
        form.imgUrl=form.imgUrl.replace('/upload/imgs/goods_img/', '');
        if (isEdit.value) {
          // 修改商品
          response = await request.post(good_edit, form);
        } else {
          // 添加商品
          response = await request.post(good_add, form);
        }

        if (response.data.code === 0) {
          ElMessage.success(isEdit.value ? '商品修改成功' : '商品添加成功');
          resetForm();
          router.push({ name: 'goodsList' }); // 跳转到商品列表页面
        } else {
          ElMessage.error(response.data.msg || '操作失败');
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

// 重置表单
const resetForm = () => {
  form.name = '';
  form.category = '';
  form.price = 0;
  form.goodsDesc = '';
  form.imgUrl = '';
  formRef.value?.resetFields(); // 重置表单验证
};

// 上传前的校验
const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    ElMessage.error('只能上传图片文件!');
    return false;
  }
  return true;
};

// 上传成功后的处理
const handleSuccess = (response:any) => {
  if (response.code === 0) {
    form.imgUrl = response.imgUrl;
    ElMessage.success('上传成功!');
  } else {
    ElMessage.error(response.msg || '上传失败!');
  }
};

// 上传失败后的处理
const handleError = () => {
  ElMessage.error('上传失败!');
};

onMounted(async () => {
  await getGoodsType();
  if (isEdit.value) {
    // 如果是修改商品，则获取商品信息
    await getGoodsInfo(route.query.id as string | undefined);
  }
});
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
