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
      <el-row class="mb50">
        <el-col :span="3">封面图片：</el-col>
        <el-col :span="15" v-if="!imgPath">
          <el-upload
            class="upload-demo"
            drag
            :on-success="imgUploadSuccess"
            :limit="1"
            action="http://192.168.101.27/App/action/upload.php"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-col>
        <el-col :span="15" v-else class="imgBox">
          <img :src="imgPath" alt="">
          <div>
            <el-button type="danger" @click.native="delImg" plain>重新上传</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="mb50" >
        <el-col :span="1">内容：</el-col>
        <el-col :span="20">
          <Editor :catchData="catchData" :content="content"/>
        </el-col>
      </el-row>
      <el-row class="mb50 w50i">
        <el-col :span="1">简述：</el-col>
        <el-col :span="15">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="blogtext">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="mb50 w50i">
        <el-col :span="8">
          分类：
          <el-autocomplete
            class="inline-input"
            v-model="cateInput"
            :fetch-suggestions="querySearch"
            placeholder="请输入分类名称"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
      </el-row>
      <el-row class="mb50 w50i">
        <el-col>
          标签：
          <el-input v-model="tagInput" placeholder="可添加多个标签"></el-input>
          <el-button @click.native="addTag">添加</el-button>
          <div class="inputTags">
            <div class="tagItem" v-for="(item, index) in tags" :key="index">
              {{item}}
              <div class="del" @click="delTag(index)">x</div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button type="primary" @click.native="subClick">发布博文</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
// wangeditor
import Editor from 'components/Editor/Editor'
import axios from 'network/index'
import qs from 'qs'
export default {
  name: 'Writing',
  data() {
    return {
      // 标题
      titleInput: '',
      // 内容
      content: '',
      // 分类
      category: [],
      // 标签
      tags: [],
      // 图片
      imgPath: '',
      // 简述
      blogtext: '',
      tagInput: '',
      cateInput: '',
      // 分类id
      categoryId: undefined,
    }
  },
  components: {
    Editor
  },
  methods: {
    // 发布博文按钮
    subClick() {
      // 先检测分类是否是已有类型
        if(!this.cateInput.trim()) {return}
        let index = this.category.findIndex(i => i.value === this.cateInput)
        if(index!=-1){
          // 存在
          console.log('存在');
          let id = this.category[index].id
          this.categoryId = id
          
          // 开始发布博文
          let postdata = qs.stringify({
            uid: this.$store.state.userInfo.id,
            title: this.titleInput,
            content: this.content,
            explainx: this.blogtext,
            img_path: this.imgPath,
            cid: this.categoryId,
          })
          axios({url: '/blog-add.php', method: 'post', data: postdata})
          .then(res=>{
            if(res.data=='1'){
              // 发布成功
              this.$message.success('发布成功');
              setTimeout(()=>{
                this.$router.push('/admin/blog')
              }, 1000)
            }
          })

        }else{
          console.log('不存在');
          // 把这个类型插入分类表
          let postdata = qs.stringify({
            cate_name: this.cateInput
          })
          axios({url: '/cate-insert.php', method: 'post', data: postdata})
          .then(res => {
            console.log(res);
            axios({url: '/findCateId.php', params: {cate_name: this.cateInput}})
            .then(res => {
              console.log(res);
              this.categoryId = res.data[0].id
              
              // 开始发布博文
              let postdata = qs.stringify({
                uid: this.$store.state.userInfo.id,
                title: this.titleInput,
                content: this.content,
                explainx: this.blogtext,
                img_path: this.imgPath,
                cid: this.categoryId,
              })
              axios({url: '/blog-add.php', method: 'post', data: postdata})
              .then(res=>{
                if(res.data=='1'){
                  // 发布成功
                  this.$message.success('发布成功');
                  setTimeout(()=>{
                    this.$router.push('/admin/blog')
                  }, 1000)
                }
              })

            })
          })
        }
    },
    //图片上传成功
    imgUploadSuccess(response, file, fileList) {
      this.imgPath = 'http://192.168.101.27'+response.imgPath
    },
    delImg(){
      this.imgPath = ''
    },
    // 富文本输入框内容
    catchData(value) {
      this.content = value
    },
    /**
     * 分类输入框提示相关事件
     */
    querySearch(queryString, cb) {
      var category = this.category;
      var results = queryString ? category.filter(this.createFilter(queryString)) : category;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      // console.log(item);
    },
    /**
     * 标签相关方法
     */
    addTag() {
      if(this.tagInput.trim()){
        this.tags.push(this.tagInput)
        this.tagInput = ''
      }
    },
    delTag(index) {
      this.tags.splice(index, 1)
    }
  },
  mounted() {

    axios({url: '/cate-select.php'})
      .then(res => {
        // console.log(res.data)
        let tagsArr = []
        for(let i=0; i<res.data.length; i++) {
          tagsArr.push({
            id: res.data[i].id,
            value: res.data[i].cate_name
          })

        }
        // console.log(tagsArr);
        this.category = tagsArr
      })
  }
}
</script>

<style>
.w50i .el-input {
  width: 200px;
}
.inputTags {
  padding: 20px;
}
.inputTags .tagItem {
  display: inline-block;
  position: relative;
  border: 1px solid var(--textColor);
  color: var(--textColor);
  border-radius: 5px;
  padding: 8px 14px;
  margin: 0 25px 20px 0;
}
.inputTags .tagItem .del {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  position: absolute;
  right: -10px;
  top: -10px;
  background: orangered;
  color: white;
  cursor: pointer;
}

</style>