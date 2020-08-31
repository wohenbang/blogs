<template>
  <el-row class="blog-item" @click.native="toblog()">
    <el-col class="blog-item-left" :md="16">
      <h3 class="blog-title">{{blogInfo.title}}</h3>
      <p class="blog-text">{{blogInfo.explainx}}</p>
      <div class="bottom-bar clearfix">
        <div class="author-img fl"><img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/></div>
        <div class="info fl">
          <span class="author">{{blogInfo.uid}}</span>
          <span class="date">{{blogInfo.create_date | formatData}}</span>
          <i class="el-icon-view"></i>
          <span class="num">222</span>
        </div>
      </div>
    </el-col>
    <el-col class="textCenter" :md="8">
      <img width="300" height="160" :src="blogInfo.img_path" alt="">
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'BlogItem',
  props: {
    blogInfo: {
      type: Object
    }
  },
  methods: {
    toblog() {
      // console.log(this.blogInfo.id);
      this.$router.push({
        path: '/blog',
        query: {id: this.blogInfo.id}
      })
    }
  },
  filters: {
    formatData: function(value) {
      value = value *1000
      var date = new Date(value);
      var YY = date.getFullYear() + '-';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return YY + MM + DD +" "+hh + mm + ss;
    }
  },
}
</script>

<style>
  /* blog-item */
  .blog-item {
    padding-bottom: 10px;
    margin-bottom: 50px;
    border-bottom: var(--borderStyle);
    cursor: pointer;
  }
  .blog-item-left {
    position: relative;
  }
  .blog-item .blog-title {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .blog-item .blog-text{
    line-height: 18px;
    height: 86px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    margin-bottom: 60px;
  }
  /* 作者信息 阅读量 */
  .bottom-bar {
    line-height: 40px;
    position: absolute;
    bottom: 10px;
  }
  .bottom-bar .author-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }
  .bottom-bar .author-img > img {
    width: 40px;
    height: 40px;
  }
  .bottom-bar .info {
    line-height: 40px;
  }
  .bottom-bar .info span {
    margin-right: 15px;
  }

</style>