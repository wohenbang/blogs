<template>
  <el-row>
    <el-col class="main" :span="18" :push="3">
      <el-row>
        <el-col :span="3">用户名：</el-col>
        <el-col :span="15"><el-input  class="inputw" v-model="username" placeholder="请输入用户名"></el-input></el-col>
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
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.icon_path = res.imgPath
      console.log(file);
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
    // 确认提交按钮点击
    btnClick() {
      // 有空值不可提交
      if(!(this.username.trim() && this.password.trim() && this.password2.trim() && this.icon_path.trim())){
        this.$message.error('必填项不可为空');
        return
      }
      // 两次密码不一致
      if(this.password!==this.password2){{
        this.password = this.password2 = ''
        this.$message.error('密码不一致，请重新输入');
        return
      }}
      let data = {
        username: this.username,
        password: this.password,
        icon_path: this.icon_path
      }
      // 发送网络请求
      axios({url:'/user-add.php', method: 'post', data: data}).then(res =>{
        console.log(res);
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
</style>