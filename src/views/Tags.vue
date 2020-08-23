<template>
  <div class="category">
    <Nav :activeIndex=activeIndex />
    <!-- 标签 -->
    <el-row class="cate-header">
      <el-col :span="18" :push="3">
        <Card>
          <template slot="left">标签</template>
          <template slot="right">共<span class="fz24 textOrange">12</span>个</template>
          <template slot="content">
            <div v-for="o in 30" :key="o" class="text item tagItem">
              <div class="type">{{'标签' + o }}</div>
              <div class="num">22</div>
            </div>
          </template>
        </Card>
      </el-col>
    </el-row>
    <!-- 博客 -->
    <el-row>
      <el-col :span="18" :push="3">
        <Card>
          <template slot="left">类型</template>
          <template slot="right">共<span class="fz24 textOrange">12</span>个</template>
          <template slot="content">
            <blog-item></blog-item>
            <blog-item></blog-item>
            <blog-item></blog-item>
            <blog-item></blog-item>
            <blog-item></blog-item>
          </template>
        </Card>
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
  name: 'Category',
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
  .cate-header {
    margin-top: 50px;
  }
  .tagItem {
    display: inline-block;
    border: 1px solid var(--textColor);
    margin: 0 20px 10px 0;
    border-radius: 5px;
    cursor: pointer;
    color: var(--textColor);
  }
  .tagItem:hover {
    background: var(--textColor);
    color: #fff;
  }
  .tagItem .type {
    display: inline-block;
    padding: 5px 10px;
    border-right: 1px solid var(--textColor)
  }
  .tagItem .num {
    display: inline-block;
    padding: 5px;
  }
</style>