<template>
  <el-row>
    <el-col :span="18" :push="3">
      <el-row class="mb50">
        <el-col>
          <el-input placeholder="请输入内容" v-model="titleInput">
            <template slot="prepend">标题</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="mb50" >
        <el-col>
          <Editor :catchData="catchData" :content="content"/>
        </el-col>
      </el-row>
      <el-row class="mb50">
        <el-col :span="5">
          <el-input placeholder="请输入分类" v-model="titleInput">
            <template slot="prepend">分类</template>
          </el-input>
        </el-col>
        <el-col :span="5" :push="5">
          <el-input placeholder="请输入标签" v-model="titleInput">
            <template slot="prepend">标签</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button>返回</el-button>
          <el-button>保存</el-button>
          <el-button type="primary">发布</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
// wangeditor
import Editor from 'components/Editor/Editor'
export default {
  name: 'Writing',
  data() {
    return {
      titleInput: '',
      content: ''
    }
  },
  components: {
    Editor
  },
  methods: {
    catchData() {}
  }
}
</script>

<style>

</style>