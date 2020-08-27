<template>
  <el-row>
    <el-col class="main" :span="18" :push="3">
      <el-row>
        <el-col :span="3">用户名：</el-col>
        <el-col :span="5"><el-input @change="changeInput"  class="inputw" v-model="username" placeholder="请输入用户名"></el-input></el-col>
        <el-col :span="5">
          <el-alert
            title="用户已存在"
            type="error"
            show-icon
            v-show="isError"
            >
          </el-alert>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">密码：</el-col>
        <el-col :span="15"><el-input class="inputw" placeholder="请输入密码" v-model="password" show-password></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="3">确认密码：</el-col>
        <el-col :span="15"><el-input class="inputw" placeholder="请输入密码" v-model="password2" show-password></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="3">上传头像：</el-col>
        <el-col :span="15">
          <el-upload
            class="avatar-uploader"
            action="http://192.168.101.27/App/action/upload.php"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3"><el-button @click="btnClick" type="primary">确认</el-button></el-col>
        
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'network/index'
import qs from 'qs'
export default {
  name: 'UserAdd',
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      // 图片显示路径
      imageUrl: '',
      // 发送到数据库的路径
      icon_path: '',
      userList: [],
      // 错误提示框显示
      isError: false
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.icon_path = 'http://192.168.101.27'+res.imgPath
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 检测用户是否已存在
    changeInput() {
      if(this.userList.length == 0) {
        axios({url: '/user-select.php'}).then(res=> this.userList = res.data)
      }
      let index = this.userList.findIndex(i => i.username == this.username)
      if(index!==-1){
        // 用户已存在
        this.isError = true
      }else{
        this.isError = false
      }
    },
    // 确认提交按钮点击
    btnClick() {
      // 有空值不可提交
      if(!(this.username.trim() && this.password.trim() && this.password2.trim() && this.icon_path.trim())){
        this.$message.error('必填项不可为空');
        return
      }
      // 用户已存在
      if(this.isError === true) {
        this.$message.error('该用户已存在');
        return
      }
      // 两次密码不一致
      if(this.password!==this.password2){{
        this.password = this.password2 = ''
        this.$message.error('密码不一致，请重新输入');
        return
      }}
      let postdata = qs.stringify({
        username: this.username,
        password: this.password,
        icon_path: this.icon_path
      })
      // 发送网络请求
      axios({url:'/user-add.php', method: 'post', data: postdata}).then(res =>{
        if(res.data){
          this.$message.success('添加成功！');
          setTimeout(()=>{
            this.$router.push('/admin')
          }, 1000)
        }
      })
    }
  },
  computed: {

  }
}
</script>

<style>
  .main > div {
    margin-bottom: 30px;
    line-height: 40px;
  }
  .inputw{
    width: 180px;
  }
  /* 图片上传 */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /* 错误框样式调整 */
  .el-alert {
    margin-top: 5px;
    height: 30px;
  }
</style>