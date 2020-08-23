<template>
  <div class="home">
    <Nav :activeIndex=activeIndex />
    <el-row class="main">
      <!-- 左边博客列表 -->
      <el-col class="left-blogs" :md="18">
        <Card>
          <template slot="content">
            <blog-item/>
            <blog-item/>
            <blog-item/>
            <blog-item/>
            <blog-item/>
          </template>
        </Card>
      </el-col>
      <!-- 右边 -->
      <el-col class="right" :md="6">
        <!-- 分类 -->
        <el-card class="box-card mb50 mycard">
          <div slot="header" class="clearfix">
            <span style="font-size: 18px">分类</span>
            <el-button style="float: right; padding: 3px 0" type="text">more</el-button>
          </div>
          <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
            <div v-for="o in 4" :key="o" class="text item cateList">
              {{'列表内容 ' + o }}
              <div class="fr cateNum">22</div>
            </div>
          </el-card>
        </el-card>
        <!-- 标签 -->
          <el-card class="box-card mb50 mycard">
            <div slot="header" class="clearfix">
              <span style="font-size: 18px">标签</span>
              <el-button style="float: right; padding: 3px 0" type="text">more</el-button>
            </div>
            <div v-for="o in 30" :key="o" class="text item tagItem">
              {{'标签' + o }}
            </div>
          </el-card>
        <!-- 推荐 -->
        <el-card class="box-card mb50 mycard">
          <div slot="header" class="clearfix">
            <span style="font-size: 18px">推荐</span>
            <el-button style="float: right; padding: 3px 0" type="text">more</el-button>
          </div>
          <el-card class="box-card" shadow="never" :body-style="{ padding: '0px' }">
            <div v-for="o in 4" :key="o" class="text item cateList">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </el-card>
        <!-- 二维码 -->
        <el-divider content-position="center">关注我</el-divider>
        <div class="QR_code textCenter">
          <img src="~assets/img/QR_code.jpg" alt="">
        </div>
      </el-col>
    </el-row>
    <Footer/>
  </div>
</template>

<script>
import Nav from 'components/Nav/Nav'
import Footer from 'components/Footer/Footer'
import BlogItem from 'components/BlogItem/BlogItem'
import Card from 'components/Card/Card'
export default {
  name: 'Home',
  data() {
    return {
      activeIndex: '1'
    }
  },
  components: {
    Nav,
    Footer,
    BlogItem,
    Card
  }
}
</script>

<style scoped>
  .main {
    padding-top: 50px;
  }
  .left-blogs {
    padding: 0 2%;
  }
  .right {
    padding: 0 2%;
  }
  /* 分类 */
  .cateList {
    padding: 10px 20px;
    border-bottom: 1px solid #EBEEF5;
  }
  .cateList .cateNum {
    color: var(--textColor)
  }
  /* 标签 */
  .tagItem {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid var(--textColor);
    border-radius: 5px;
    color: var(--textColor);
    margin: 0 10px 15px 0;
  }
  /* 二维码 */
  .QR_code img {
    width: 150px;
  }
</style>