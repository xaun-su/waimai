<template>
  <div class="category-list">
    <!-- 分类列表 -->
    <el-table :data="goodsType" style="width: 100%">
      <el-table-column label="序号" prop="id" width="100" />
      <el-table-column label="分类名">
        <template #default="scope">
          <span v-if="editing !== scope.row.id">{{ scope.row.cateName }}</span>
          <el-input
            v-else
            v-model="scope.row.cateName"
          />
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <el-switch
            v-model="scope.row.state"
            :active-value="1"
            :inactive-value="0"
            :disabled="editing !== scope.row.id"
            @change="handleSwitchChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button
            v-if="editing !== scope.row.id"
            size="small"
            type="primary"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            v-else
            size="small"
            type="success"
            @click="handleSave(scope.row)"
          >完成</el-button>
          <el-button @click="handleDelete(scope.row)" size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue';
import { ElTable, ElTableColumn, ElButton, ElPagination, ElSwitch, ElMessageBox, ElMessage, ElInput } from 'element-plus';

// 定义 props
const props = defineProps({
  goodsType: {
    type: Array,
    required: true,
  },
});

// 定义 emits
const emit = defineEmits(['delete', 'update']);

// 定义 editing 状态
const editing = ref(null);
const originalData = ref({});

// 编辑
const handleEdit = (row) => {
  editing.value = row.id;
  originalData.value[row.id] = { ...row };
};

// 保存
const handleSave = (row) => {
  editing.value = null;
  if (originalData.value[row.id].state !== row.state || originalData.value[row.id].cateName !== row.cateName) {    
    console.log(row);
    emit('update', row);
  }
  delete originalData.value[row.id];
};

// 切换启用状态
const handleSwitchChange = (row) => {
  console.log(`分类 ${row.cateName} 的状态已更改为 ${row.state}`);
};

// 删除商品类型
const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除分类 ${row.cateName} 吗?`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
    }
  )
    .then(() => {
      // 用户点击确定，触发 delete 事件
      console.log(row.id);

      
      emit('delete', row.id);
      ElMessage.success('删除成功');
    })
    .catch(() => {
      // 用户点击取消
      ElMessage.info('已取消删除');
    });
};
</script>

<style scoped>
.category-list {
  padding: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
