<template>
  <div id="admin">
    <Nav>
      <template slot="left">后台管理</template>
      <div slot="middle"><br></div>
      <el-dropdown slot="right">
        <span class="el-dropdown-link">
          {{$store.state.userInfo.username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="toHome">Home</el-dropdown-item>
          <el-dropdown-item @click.native="loginOut">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </Nav>
    <div class="main">
      <div class="menu">
        <el-switch
          class="menu-switch"
          v-model="isCollapse"
          active-color="#13ce66">
        </el-switch>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen"
          background-color="#545c64"
          text-color="#fff"
          :router="true"
          :unique-opened="true"
          @close="handleClose" :collapse="!isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="user">用户管理</el-menu-item>
              <el-menu-item index="useradd">添加用户</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">博文管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="writing">发布博文</el-menu-item>
              <el-menu-item index="blog">文章管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </div>
      <div class="admin-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'network/index'
import Nav from 'components/Nav/Nav'
export default {
  name: 'Admin',
  data() {
    return {
      isCollapse: false
    }
  },
  components: {
    Nav
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toHome() {
      this.$reuter.push('/home')
    },
    loginOut() {
      // 清除后台session 
      // 清除vuex的userInfo
      this.$store.commit('updateUserInfo', {})
      // 清除cookie
      var exp = new Date()
      exp.setTime(exp.getTime() - 1)
      var cval=this.getCookieObj().userInfo
      if(cval) document.cookie= "userInfo="+cval+";expires="+exp.toGMTString()
      // 跳转登录页面
      this.$message.success('注销登录！');
      setTimeout(() => this.$router.push('/login'), 1000)
    
    },
    /**
     * 获取cookie  并返回一个包含所有cookie信息的对象
     * 但每个cookie的value是一个string
     */
    getCookieObj() {
      var str = document.cookie;
      var arr = str.split('; ');
      var obj = {};
      for(var i=0;i<arr.length;i++){
          var a = arr[i].split('='); 
          obj[a[0]] = a[1];
      }
      return obj
    }
  },
  mounted() {

    // 检查vuex有无登录信息
    if(!this.$store.state.userInfo.username){
      // vuex中无登录信息
      // 再检查cookie有无登录信息
      let cookieUserInfo = this.getCookieObj().userInfo
      if(cookieUserInfo){
        cookieUserInfo = JSON.parse(cookieUserInfo)
        // 用户信息保存到vuex
        this.$store.commit('updateUserInfo', cookieUserInfo)
      }else{
        this.$router.push('/login')
      }
    }

  }
}
</script>

<style scoped>
  .router-link-active {
    text-decoration: none;
  }
  .el-dropdown-link {
    color: #fff;
  }
  .main {
    display: flex;
  }
  .main .menu {
    height: calc(100vh - 60px);
    background: var(--bgColor);
  }
  .main .menu .menu-switch {
    padding: 10px 0 10px 10px;
  }
  .main .el-menu {
    border: 0;
  }
  .main .admin-content {
    flex: 1;
    padding: 30px;
  }
</style>