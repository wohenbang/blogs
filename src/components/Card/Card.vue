<template>
  <el-card class="box-card mb50">
    <div slot="header" class="clearfix">
      <span class="fz24"><slot name="left">博客</slot></span>
      <div style="float: right; padding: 3px 0" type="text"><slot name="right">共<span class="fz24 textOrange"></span>篇</slot></div>
    </div>
    <div><slot name="content"></slot></div>
  </el-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    data: {
      type: Array
    }
  }
}
</script>

<style>

</style>