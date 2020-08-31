<template>
  <div>
    <!--  -->
    <el-row class="mb50">
      <el-col :span="6">
        <el-button @click="adduser" type="primary">添加用户</el-button>
      </el-col>

    </el-row>
    <!-- 博文列表 -->
    <el-row>
      <el-col>
        <el-card class="box-card">
          <!-- 表格 -->
          <el-table
            ref="multipleTable"
            :data="userList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <!-- <el-table-column
              type="selection"
              @selection-change="itemSelect"
              width="55">
            </el-table-column> -->
            <el-table-column
              prop="id"
              label="id"
              width="120">
              <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名"
              width="220">
            </el-table-column>
            <el-table-column label="头像" width="120">
              <template slot-scope="scope">
                <img :src="scope.row.icon_path" width="40" height="40" class="head_pic"/>
              </template>
            </el-table-column>
            <el-table-column
              label="使用状态"
              show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.used==='1'?"启用中":"停用中"}}
              </template>
            </el-table-column>
            <el-table-column
              label="权限"
              show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.is_admin==='1'?"系统管理员":"普通用户"}}
              </template>
            </el-table-column>
            <el-table-column
              prop="create_date"
              label="创建日期"
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
                  :disabled="isdisabled"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                <el-button
                  size="mini"
                  :type="scope.row.used==='1'?'danger':'success'"
                  :disabled="isdisabled"
                  @click="handleBlockUp(scope.$index, scope.row)">
                    {{scope.row.used==='1'?"停用":"启用"}}
                  </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 页码栏 -->
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
            <el-col :span="6">
              <el-button>新增</el-button>
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
      userList: [],
      page: 1,
      pagesize: 5,
      totalRow: 0
    }
  },
  methods: {
    adduser() {
      this.$router.push('/admin/useradd')
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
    /**
     * 删除用户
     */
    handleDelete(index, row) {
      // console.log(index, row.id);
      axios({url: '/user-delete.php', params: {id: row.id}})
      .then(res => {
        if(res.data == '1'){
          // let index = this.userList.findIndex(i => i.id === row.id)
          // this.userList.splice(index, 1)
          this.$message.success('用户已删除！');
          this.getUserList()
        }
      })
    },
    /**
     * 用户停用
     */
    handleBlockUp(index, row) {
      console.log(index, row.used);
      let status = row.used=='1'?'0':'1'
      let postData = qs.stringify({
        id: row.id,
        used: status
      })
      axios({url: '/changeStatus.php', method: 'post', data: postData})
      .then(res => {
        // console.log(res);
        if(res.data == '1') {
          let index = this.userList.findIndex(i => i.id === row.id)
          this.userList[index].used = status
        }
      })
    },
    /**
     * 请求数据
     */
    getUserList() {
      axios({url: '/user-select.php', params: {
        page: this.page,
        pagesize: this.pagesize
      }}).then(res=> {
        this.userList = res.data.data
        this.totalRow = res.data.count
      })
    },
    /**
     * 分页器相关方法
     */ 
    prevClick() {
      this.page--
      this.getUserList()
    },
    nextClick() {
      this.page++
      this.getUserList()
    },
    pageChange(page) {
      this.page = page
      this.getUserList()
    }
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
  computed: {
    isdisabled(){
      return this.$store.state.userInfo.is_admin==='0'?true:false
    }
  },
  created() {
    // 请求数据
    this.getUserList()
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