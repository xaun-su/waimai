<template>
  <div>
    <div class="title-content">
      <slot></slot>  <!-- 默认插槽 -->
      <slot name="title-btn"></slot> <!-- 具名插槽 -->
    </div>
  </div>
</template>

<script setup>
// 使用插槽，不需要额外的逻辑
</script>

<style lang="less" scoped>
.title-content {
  display: flex;
  justify-content: space-between; /* 将内容和按钮放在两端 */
  align-items: center; /* 垂直居中 */
  padding: 0 20px; /* 左右内边距 */
}

/deep/.title-text {
  display: block;
  width: 100%; /* 占据剩余空间 */
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgb(240, 242, 245);
}
</style>
