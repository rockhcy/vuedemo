<template>
  <div>
    <h2>软件使用分析</h2>
    <el-row>
      <el-input placeholder="软件进程名"
                style="width:229px;margin-right:10px"
                prefix-icon="el-icon-s-platform"
                v-model="areaCode"></el-input>
      <template>
        <el-select v-model="orgCode"
                   multiple
                   collapse-tags
                   style="margin-left: 20px;margin-right:20px"
                   placeholder="部署单位">
          <el-option v-for="item in orgList"
                     :key="item.orgId"
                     :label="item.orgName"
                     :value="item.orgCode"></el-option>
        </el-select>
      </template>
      <el-date-picker v-model="strategyTime"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions">
      </el-date-picker>
      <el-button icon="el-icon-search"
                 type="primary"
                 @click="countRuntimeInfo">查找</el-button>
    </el-row>
    <el-row>
      <!-- 软件使用饼图 -->
      <el-col :span="12">
        <div id="myChart1"
             :style="{width: '100%', height: '600px'}"></div>
      </el-col>
      <!-- 使用详情table -->
      <el-col :span="10">
        <h3>使用记录详情</h3>
        <template>
          <el-table :data="tableData"
                    stripe
                    style="width: 100%">
            <!-- <span>执行文件可以通过截取最后一个\来获得，因为window下的文件名称是不允许使用\的，因此\只能出现在路径中。linux的问题以后再说</span> -->
            <el-table-column prop="softName"
                             label="执行文件"
                             width="180">
            </el-table-column>
            <el-table-column prop="software"
                             label="安装路径"
                             width="180">
            </el-table-column>
            <el-table-column prop="mac"
                             label="mac地址">
            </el-table-column>
            <el-table-column prop="turnOnTime"
                             label="开机时间">
            </el-table-column>
            <el-table-column prop="useNumber"
                             label="使用次数">
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination layout="prev, pager, next"
                           :total="1000">
            </el-pagination>
          </div>
        </template>

      </el-col>
    </el-row>
    <el-row>
      <!-- 每日使用详细信息 -->
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { mac: '18:60:24:80:31:03', useNumber: 20, software: 'C:\\Windows\\System32\\conhost.exe', turnOnTime: '2020-09-25 08:04:53', softName: 'conhost.exe' },
        { mac: '18:60:24:80:31:03', useNumber: 20, software: 'C:\\Windows\\System32\\conhost.exe', turnOnTime: '2020-09-25 08:04:53', softName: 'conhost.exe' },
        { mac: '18:60:24:80:31:03', useNumber: 20, software: 'C:\\Windows\\System32\\conhost.exe', turnOnTime: '2020-09-25 08:04:53', softName: 'conhost.exe' }
      ],
      areaCode: '',
      orgList: [],
      orgCode: [],
      strategyTime: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  mounted () {
    this.drawChar1();
  },
  created () {
    this.getVisibleOrgLis()
  },
  methods: {
    getVisibleOrgLis () {
      console.log("获取可见的组织列表: /admin/getSubordinateOrgByToken")
      this.orgList = [{ orgId: 1, orgName: '武汉和信', orgCode: 'wuhx' }]
    },
    countRuntimeInfo () {
      console.log("准备获取数据")
    },
    drawChar1 () {
      console.log("获取软件使用占比: /admin/getSubordinateOrgByToken")
      let myChart = this.$echarts.init(document.getElementById('myChart1'))
      let option = {
        title: { text: '软件使用占比' },
        color: ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea'],
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
          show: true,
        },
        legend: {
          type: "scroll",
          orient: 'vertical',
          left: '10%',
          align: 'left',
          top: 'middle',
          textStyle: {
            color: '#8C8C8C'
          },
          height: 150
        },
        series: [
          {
            name: '软件使用',
            type: 'pie',
            radius: [0, 150],
            data: [
              { value: 20, name: 'qq' },
              { value: 30, name: 'weixing' },
              { value: 25, name: 'a li ba ba' },
              { value: 25, name: 'lol' },
              { value: 20, name: 'vecode' },
              { value: 35, name: 'postman' },
              { value: 30, name: '有道词典' },
              { value: 40, name: '百度网盘' }
            ]
          }
        ]
      };
      myChart.setOption(option)
    }
  }

}
</script>

<style>
</style>