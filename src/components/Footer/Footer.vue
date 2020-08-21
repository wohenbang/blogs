<template>
  <div id="footer" class="textCenter">
    <el-row class="footer-top">
      <el-col :md="5" class="QR_code">
        <img src="~assets/img/QR_code.jpg" alt="">
      </el-col>
      <el-col :md="5">
        <dl class="t-list">
          <dt>联系方式</dt>
          <dd>QQ: 1123324677</dd>
          <dd>emil: 1123324677@qq.com</dd>
        </dl>
      </el-col>
      <el-col :md="5">
        <dl class="t-list">
          <dt>最新博客</dt>
          <dd>用户故事 (User Story)</dd>
          <dd>关于刻意练习的清单</dd>
          <dd>失败要趁早</dd>
        </dl>
      </el-col>
      <el-col :md="8">
        <dl class="t-list">
          <dt>人生格言</dt>
          <dd>成功没有快车道，幸福没有高速路。所有的成功，都来自不倦的努力和奔跑；所有幸福，都来自平凡的奋斗和坚持。</dd>
        </dl>
      </el-col>
    </el-row>
    <el-row class="copyright p20">@copyright46456513</el-row>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
  #footer {
    background-color: var(--bgColor);
    color: #ccc;
  }
  .footer-top {
    padding: 50px 0;
    border-bottom: 1px solid #dcdfe6;
  }
  .QR_code img {
    width: 110px;
  }
  .t-list {
    line-height: 20px;
  }
  .t-list dt {
    font-size: 16px;
    color: #fff;
    margin-bottom: 5px;
  }
  .t-list dd {
    font-size: 14px;
    color: #ddd;
  }
</style>