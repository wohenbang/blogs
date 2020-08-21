<template>
  <div id="nav">
    <el-row>
      <el-col :md="3">
        <slot name="left">
          <h1>Blogs</h1>
        </slot>
      </el-col>
      <el-col :md="16">
        <slot name="middle">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <!-- <el-menu-item index="1" class="nopadding"><el-menu-item index="/home">首页</el-menu-item></el-menu-item> -->
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/category">分类</el-menu-item>
            <el-menu-item index="/tags">标签</el-menu-item>
            <el-menu-item index="/memory">归档</el-menu-item>
          </el-menu>
        </slot>
      </el-col>
      <el-col :md="5">
        <slot name="right">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input">
            </el-input>
        </slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      input: ''
    };
  },
  props: {
    activeIndex: {
      type: String
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }

}
</script>

<style scoped>
  #nav {
    background-color: var(--bgColor);
    line-height: 60px;
    padding: 0 50px;
  }
  #nav h1 {
    font-size: 36px;
    font-weight: 600;
    color: var(--textColor);
  }
  .el-menu.el-menu--horizontal {
    border-bottom: 0;
  }
  .nopadding {
    padding: 0;
  }
</style>