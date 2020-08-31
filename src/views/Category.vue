<template>
  <div class="category">
    <Nav :activeIndex=activeIndex />
    <!-- 分类 -->
    <el-row class="cate-header">
      <el-col :span="18" :push="3">
        <Card>
          <template slot="left">分类</template>
          <template slot="right">共<span class="fz24 textOrange">{{cateList.length}}</span>个</template>
          <template slot="content">
            <div v-for="(item, index) in cateList"  :key="item.id" @click="cateClick(item,index)"
              class="text item tagItem" :class="{'activeCateItem': index===activeCateIndex}">
              <div class="type">{{item.cate_name}}</div>
              <!-- <div class="num">22</div> -->
            </div>
          </template>
        </Card>
      </el-col>
    </el-row>
    <!-- 博客 -->
    <el-row>
      <el-col :span="18" :push="3">
        <Card>
          <template slot="left">blog</template>
          <template slot="right">共<span class="fz24 textOrange">{{blogList.length}}</span>个</template>
          <template slot="content">
            <blog-item v-for="(item, index) in blogList" :key="index" :blogInfo="item" />
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
import axios from 'network/index'
export default {
  name: 'Category',
  data() {
    return {
      activeIndex: '1',
      cateList: [],
      blogList: [],
      activeCateId: 0,
      activeCateIndex: 0
    }
  },
  components: {
    Nav,
    Footer,
    BlogItem,
    Card
  },
  methods: {
    getcateList() {
      axios({url: 'cate-select.php'}).then(res => {
        this.cateList = res.data
        this.activeCateId = res.data[0].id

        this.getblogList()
      })
    },
    getblogList() {
      axios({url: 'blog-cateSelect.php', params: {id:this.activeCateId}}).then(res => {
        this.blogList = res.data
      })
    },
    cateClick(e, i) {
      this.activeCateIndex = i
      this.activeCateId = e.id
      this.getblogList()
    }
  },
  created() {
    this.getcateList()
  },

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
  .activeCateItem {
    background: var(--textColor);
    color: #fff;
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