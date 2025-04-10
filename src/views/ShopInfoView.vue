<template>
  <Title><span class="title-text">店铺信息</span></Title>
  <div class="shop-edit">
    <el-form label-width="120px">
      <el-form-item label="店铺名称">
        <el-input v-model="shopInfo.name" />
      </el-form-item>

      <el-form-item label="店铺公告">
        <el-input v-model="shopInfo.notice" type="textarea" rows="3" />
      </el-form-item>

      <el-form-item label="店铺头像">
        <el-upload class="avatar-uploader" action="#" :show-file-list="false" :auto-upload="false">
          <img v-if="shopInfo.avatar" :src="shopInfo.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="店铺图片">
        <el-upload class="image-uploader" action="#" :show-file-list="false" :auto-upload="false">
          <el-icon class="image-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
        <el-upload class="image-uploader" action="#" :show-file-list="false" :auto-upload="false">
          <el-icon class="image-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
        <el-upload class="image-uploader" action="#" :show-file-list="false" :auto-upload="false">
          <el-icon class="image-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
        <el-upload class="image-uploader" action="#" :show-file-list="false" :auto-upload="false">
          <el-icon class="image-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="起送价格">
        <el-input v-model="shopInfo.minPrice" type="number" />
      </el-form-item>

      <el-form-item label="送达时间">
        <el-input v-model="shopInfo.deliveryTime" type="number" />
      </el-form-item>

      <el-form-item label="配送描述">
        <el-input v-model="shopInfo.deliveryDesc" />
      </el-form-item>

      <el-form-item label="店铺好评率">
        <el-input v-model="shopInfo.rating" type="number" />
      </el-form-item>

      <el-form-item label="店铺销量">
        <el-input v-model="shopInfo.sales" type="number" />
      </el-form-item>

      <el-form-item label="活动支持">
        <el-checkbox-group v-model="shopInfo.activities">
          <el-checkbox label="单人精彩套餐" name="activities" />
          <el-checkbox label="VC无限橙汁全场8折" name="activities" />
          <el-checkbox label="在线支付满28减5" name="activities" />
          <el-checkbox label="特价饮品八折抢购" name="activities" />
          <el-checkbox label="中秋特惠" name="activities" />
          <el-checkbox label="国庆特价" name="activities" />
          <el-checkbox label="春节1折折扣" name="activities" />
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="营业时间">
        <el-time-picker v-model="shopInfo.startTime" placeholder="开始时间" />
        <el-time-picker v-model="shopInfo.endTime" placeholder="结束时间" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElUpload, ElIcon, ElCheckbox, ElCheckboxGroup, ElTimePicker } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

// 店铺信息
const shopInfo = ref({
  name: '乡村基(高新金融店)',
  notice: '尊敬的顾客，六一攻略：\n①6月1日当天在评价区分享童年趣事赠6元无门槛红包',
  avatar: '',
  minPrice: 5,
  deliveryTime: 38,
  deliveryDesc: '蜂鸟专送',
  rating: 4.5,
  sales: 100,
  activities: [],
  startTime: '',
  endTime: '',
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
</style>
