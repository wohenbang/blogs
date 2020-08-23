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
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="日期"
              width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="姓名"
              width="180">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.name }}</p>
                  <p>住址: {{ scope.row.address }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                  </div>
                </el-popover>
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
              </template>
            </el-table-column>
          </el-table>
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
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