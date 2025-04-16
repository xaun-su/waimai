<template>
  <div>
    <Title>
      <span class="title-text">商品分类</span>
      <template #title-btn>
        <el-button type="primary" @click="openDialog">添加分类</el-button>
      </template>
    </Title>
    <GoodsType :goodsType="goodsType" @delete="handleDeleteCategory" @edit="openEditDialog"/>
    <Pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    />

    <!-- 弹出框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑分类' : '添加分类'"
      width="30%"
      @close="closeDialog"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="form.cateName" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.state" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import Title from '@/components/Title.vue';
import Pagination from '@/components/Pagination.vue';
import GoodsType from '@/views/goods/GoodsTypeView/GoodsType.vue';
import { ref } from 'vue';
import request from '@/utils/request';
import { ElMessage } from 'element-plus';
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElSwitch } from 'element-plus'; // 引入 Element Plus 组件

const goodsType = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);

// 弹出框相关
const dialogVisible = ref(false);
const isEdit = ref(false); // 标识是编辑还是添加
const form = ref({
  cateName: '',
  state: 1,
});
const currentEditId = ref(null); // 存储当前编辑的分类ID

const getTypeList = async () => {
  try {
    const res = await request.get(
      `/goods/catelist?currentPage=${currentPage.value}&pageSize=${pageSize.value}`
    );
    goodsType.value = res.data.data;
    total.value = res.data.total;
  } catch (error) {
    console.error('获取商品分类列表失败', error);
    ElMessage.error('获取商品分类列表失败');
  }
};

const handlePageChange = (page :number) => {
  currentPage.value = page;
  getTypeList();
};

const handleSizeChange = (size :number) => {
  pageSize.value = size;
  currentPage.value = 1;
  getTypeList();
};

const handleDeleteCategory = async (id :number) => {
  try {
    const res = await request.delete(`/goods/delcate?id=${id}`);
    console.log(res.data.msg);
    ElMessage.success('删除成功');
    getTypeList();
  } catch (error) {
    console.error('删除商品分类失败', error);
    ElMessage.error('删除商品分类失败');
  }
};

// 打开添加分类对话框
const openDialog = () => {
  isEdit.value = false;
  form.value = { cateName: '', state: 1 }; // 重置表单
  dialogVisible.value = true;
};

// 打开编辑分类对话框
const openEditDialog = (row :any) => {
  isEdit.value = true;
  form.value = { ...row }; // 使用当前行的数据填充表单
  currentEditId.value = row.id; // 保存当前编辑的分类ID
  dialogVisible.value = true;
};

// 关闭对话框
const closeDialog = () => {
  dialogVisible.value = false;
  currentEditId.value = null;
};

// 确认提交
const handleConfirm = async () => {
  try {
    let res;
    if (isEdit.value) {
      // 编辑
      res = await request.put(`/goods/updatecate?id=${currentEditId.value}`, form.value);
    } else {
      // 添加
      res = await request.post('/goods/addcate', form.value);
    }

    ElMessage.success(res.data.msg || '操作成功');
    getTypeList(); // 刷新列表
    closeDialog();
  } catch (error) {
    ElMessage.error('提交失败');
  }
};

(async () => {
  await getTypeList();
})();
</script>
