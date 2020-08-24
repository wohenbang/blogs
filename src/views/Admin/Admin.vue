<template>
  <div id="admin">
    <Nav>
      <template slot="left">后台管理</template>
      <div slot="middle"><br></div>
      <el-dropdown slot="right">
        <span class="el-dropdown-link">
          张三<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>home</el-dropdown-item>
          <el-dropdown-item>注销</el-dropdown-item>
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
    }
  }
}
</script>

<style scoped>
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