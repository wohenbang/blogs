<template>
  <div>
    <!-- 搜索 -->
    <el-row class="mb50">
      <el-col :span="6">
        <el-input class="search_input" v-model="search_title" placeholder="标题"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input class="search_input" v-model="search_type" placeholder="类型"></el-input>
      </el-col>
      <el-col :span="2">
        <template>
          <!-- `checked` 为 true 或 false -->
          <el-checkbox class="search_recomend" v-model="search_recomend">推荐</el-checkbox>
        </template>
      </el-col>
      <el-col :span="5">
        <el-button type="primary">搜索</el-button>
      </el-col>
    </el-row>
    <!-- 博文列表 -->
    <el-row>
      <el-col>
        <el-card class="box-card">
          <!-- 表格 -->
          <el-table
            ref="multipleTable"
            :data="blogList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              prop="id"
              label="id"
              width="120">
            </el-table-column>
            <el-table-column
              prop="uid"
              label="作者"
              width="220">
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              width="220">
            </el-table-column>
            <el-table-column
              prop="explainx"
              label="简述"
              width="220">
            </el-table-column>
            <el-table-column label="封面图片" width="220">
              <template slot-scope="scope">
                <img :src="scope.row.img_path" width="120" class="head_pic"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="cid"
              label="所属分类"
              width="220">
            </el-table-column>
            <el-table-column
              prop="create_date"
              label="发布时间"
              show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.create_date | formatData}}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          <el-row class="page-bar">
            <el-col :span="18">
                <el-pagination
                background
                layout="prev, pager, next"
                @prev-click="prevClick"
                @next-click="nextClick"
                @current-change="pageChange"
                :page-size="pagesize"
                :total="totalRow">
              </el-pagination>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'network/index'
import qs from 'qs'
export default {
  name: '',
  data() {
    return {
      search_title: '',
      search_type: '',
      search_recomend: false,
      page: 1,
      pagesize: 5,
      totalRow: 0,
      blogList: []
    }
  },
  methods: {
    handleDelete(index, row) {
      // console.log(index, row.id);
      axios({url: '/blog-delete.php', params: {id: row.id}})
      .then(res => {
        if(res.data == '1'){
          // let index = this.userList.findIndex(i => i.id === row.id)
          // this.userList.splice(index, 1)
          this.$message.success('文章已删除！');
          this.getBlogs()
        }
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getBlogs() {
      axios({url: '/blog-select.php', params: {
        page: this.page,
        pagesize: this.pagesize
      }}).then(res=> {
        console.log(res);
        this.blogList = res.data.data
        this.totalRow = res.data.count
      })
    },
    /**
     * 分页器相关方法
     */ 
    prevClick() {
      this.page--
      this.getBlogs()
    },
    nextClick() {
      this.page++
      this.getBlogs()
    },
    pageChange(page) {
      this.page = page
      this.getBlogs()
    }
  },
  mounted() {
    // 请求数据
    this.getBlogs()
  },
  filters: {
    formatData: function(value) {
      value = value *1000
      var date = new Date(value);
      var YY = date.getFullYear() + '-';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return YY + MM + DD +" "+hh + mm + ss;
    }
  },
}
</script>

<style scoped>
  .search_input {
    width: 80%;
  }
  .search_recomend {
    padding-top: 10px;
  }
  .page-bar {
    padding: 25px 0 0;
  }
</style>