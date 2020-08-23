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
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="uid"
              width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="create_date"
              label="创建日期"
              show-overflow-tooltip>
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
export default {
  name: '',
  data() {
    return {
      search_title: '',
      search_type: '',
      search_recomend: false,
      tableData: [
        {
          date: '1',
          username: '王小虎',
          create_date: '2020-08-23'
        },
        {
          date: '1',
          username: '王小虎',
          create_date: '2020-08-23'
        },
        {
          date: '1',
          username: '王小虎',
          create_date: '2020-08-23'
        },
        {
          date: '1',
          username: '王小虎',
          create_date: '2020-08-23'
        },
        {
          date: '1',
          username: '王小虎',
          create_date: '2020-08-23'
        },
      ]
    }
  }
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