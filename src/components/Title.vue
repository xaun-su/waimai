<template>
  <div>
    <div class="title-content">
      <slot><span class="title-text"></span></slot>
    </div>
  </div>
</template>

<script setup>
// 使用插槽，不需要额外的逻辑
</script>

<style lang="less" scoped>
/deep/.title-text {
  margin-left: 20px;
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgb(240, 242, 245);
}
</style> 