<template>
  <div class="category">
    <Nav :activeIndex=activeIndex />
    <!-- 分类 -->
    <el-row class="blogMain">
      <el-col :span="18" :push="3" style="background: #ddd;padding: 100px 20px">
        <div class="w800">
          <div class="textCenter imgbox">
            <img :src="blog.img_path" alt="">
          </div>
          <h1 class="title">{{blog.title}}</h1>
          <div class="author-bar clearfix">
            <div class="author-img fl"><img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/></div>
            <div class="info fl">
              <span class="author">{{blog.uid}}</span>
              <span class="date">{{blog.create_date | formatData}}</span>
              <i class="el-icon-view"></i>
              <span class="num">222</span>
              <span>所属类型：{{blog.cid}}</span>
            </div>
          </div>
          <div class="content" v-html="blog.content"></div>
        </div>
      </el-col>
    </el-row>
    <Footer/>
  </div>
</template>

<script>
import Nav from 'components/Nav/Nav'
import Footer from 'components/Footer/Footer'
import Card from 'components/Card/Card'
import axios from 'network/index'
export default {
  name: 'Blog',
  data() {
    return {
      activeIndex: '1',
      blog: {}
    }
  },
  components: {
    Nav,
    Footer,
    Card
  },
  created() {
    let id = this.$route.query.id
    axios({url: '/blog-find.php', params: {id}}).then(res => {
      this.blog = res.data
    })
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
  }
}
</script>

<style scoped>
.blogMain .w800 {
  width: 800px;
  margin: 0 auto;
}
.blogMain .w800 .imgbox{
  padding: 0 0 50px 0;
}
.blogMain .w800 .title {
  font-size: 36px;
}
/* 作者信息 阅读量 */
  .author-bar {
    line-height: 40px;
    padding: 15px 0 25px;
  }
  .author-bar .author-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }
  .author-bar .author-img > img {
    width: 40px;
    height: 40px;
  }
  .author-bar .info {
    line-height: 40px;
  }
  .author-bar .info span {
    margin-right: 15px;
  }
</style>