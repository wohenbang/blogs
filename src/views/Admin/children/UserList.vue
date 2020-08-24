<template>
  <div>
    <!--  -->
    <el-row class="mb50">
      <el-col :span="6">
        <el-button type="primary">添加用户</el-button>
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
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
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
                {{scope.row.create_date}}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">停用</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 页码栏 -->
          <el-row class="page-bar">
            <el-col :span="18">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
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
export default {
  name: '',
  data() {
    return {
      search_title: '',
      search_type: '',
      search_recomend: false,
      userList: []
    }
  },
  methods: {
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

  },
  filter: {

  },
  created() {
    axios({url: '/user-select.php'}).then(res=> this.userList = res.data)

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