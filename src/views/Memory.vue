<template>
  <div class="memory">
    <Nav :activeIndex=activeIndex />
      <el-row class="m_header">
        <el-col :span="18" :push="3">
          <el-card shadow="always" class="fz18">
            归档
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :push="3">
          <el-card class="box-card mb50 mycard">
            <div slot="header" class="clearfix">
              <span style="font-size: 18px">2020</span>
            </div>
            <!-- 时间线 -->
            <div class="block">
              <el-timeline>
                <el-timeline-item timestamp="2018/4/12" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/12 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/3 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :push="3">
          <el-card class="box-card mb50 mycard">
            <div slot="header" class="clearfix">
              <span style="font-size: 18px">2019</span>
            </div>
            <!-- 时间线 -->
            <div class="block">
              <el-timeline>
                <el-timeline-item timestamp="2018/4/12" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/12 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/3 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :push="3">
          <el-card class="box-card mb50 mycard">
            <div slot="header" class="clearfix">
              <span style="font-size: 18px">2018</span>
            </div>
            <!-- 时间线 -->
            <div class="block">
              <el-timeline>
                <el-timeline-item timestamp="2018/4/12" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/12 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/3 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-card>
        </el-col>
      </el-row>
    <Footer/>
  </div>
</template>

<script>
import Nav from 'components/Nav/Nav'
import Footer from 'components/Footer/Footer'
import BlogItem from 'components/BlogItem/BlogItem'
export default {
  name: 'Memory',
  data() {
    return {
      activeIndex: '1'
    }
  },
  components: {
    Nav,
    Footer,
    BlogItem
  }
}
</script>

<style>
  .m_header {
    margin: 50px 0;
  }
</style>