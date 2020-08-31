<template>
  <div class="loginWrap">
    <div class="loginMain">
      <el-row class="mb10">
        <el-col :span="6"><span class="fz18">用户：</span></el-col>
        <el-col :span="16"><el-input v-model="username" placeholder="请输入内容"></el-input></el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="6"><span class="fz18">密码：</span></el-col>
        <el-col :span="16"><el-input v-model="password" placeholder="请输入内容" show-password></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :push="15"><el-button type="primary" @click="login" >登录</el-button></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'network/index'
import qs from 'qs'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      let postdata = qs.stringify({
        username: this.username,
        password: this.password
      })
      axios({url: '/login.php', method: 'post', data: postdata}).then(res => {
        if(res.data){
          // 用户信息保存到vuex
          this.$store.commit('updateUserInfo', res.data)

          console.log(res.data);
          this.$message.success('登录成功！');
          // 设置cookie
          var exp = new Date();
          exp.setTime(exp.getTime() + 60 * 100000);//过期时间 2分钟
          document.cookie="userInfo="+JSON.stringify(res.data)+";expires=" + exp.toGMTString();

          setTimeout(() => this.$router.push('/admin'), 1000)
        }else {
          this.$message.error('用户名或密码错误，请重新输入');
          this.username = ''
          this.password = ''
        }
      })
    }
  }
}
</script>

<style>
  .loginWrap {
    width: 100%;
    height: 100vh;
    position: relative;
  }
  .loginMain {
    width: 300px;
    height: 200px;
    position: absolute;
    top: -200px;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    padding: 15px 10px;
    line-height: 40px;
    text-align: center;
    border: var(--borderStyle);
    border-radius: 8px;
  }
  .mb10{
    margin-bottom: 10px;
  }
</style>