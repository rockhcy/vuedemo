<template>
  <div>
    <h2>硬件分布</h2>
    <el-row>
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
      <el-select v-model="region"
                 placeholder="请选择分析维度">
        <el-option label="操作系统"
                   value="1"></el-option>
        <el-option label="CPU类型"
                   value="2"></el-option>
        <el-option label="品牌"
                   value="3"></el-option>
        <el-option label="主板型号"
                   value="4"></el-option>
        <el-option label="设备类型"
                   value="5"></el-option>
      </el-select>
      <el-button icon="el-icon-search"
                 type="primary"
                 @click="countRuntimeInfo">查找</el-button>
    </el-row>
    <el-row>
      <el-col :span="12">
        <h3>设备占比统计</h3>
        <div id="myChart1"
             :style="{width: '100%', height: '600px'}"></div>
      </el-col>
      <el-col :span="11">
        <h3>占比详情</h3>
        <template>
          <el-table :data="tableData"
                    stripe
                    style="width: 100%">
            <el-table-column prop="date"
                             :label="label"
                             width="180">
            </el-table-column>
            <el-table-column prop="orgCode"
                             label="单位编码"
                             width="180">
            </el-table-column>
            <el-table-column prop="row1"
                             label="型号">
            </el-table-column>
            <el-table-column prop="row2"
                             label="数量">
            </el-table-column>
            <el-table-column prop="row2"
                             label="占比">
            </el-table-column>
          </el-table>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orgList: [],
      orgCode: [],
      region: '',
      label: '动态label', //请根据分析维度动态改变，分别为系统\CPU\品牌、型号、PC类型
      tableData: [
        { orgCode: 'hcy', row1: 'Windows 10 Home China 1909 18363', row2: 10, analyze: 'cpu' },
        { orgCode: 'hcy', row1: 'Windows 10 Home China 1909 18363', row2: 10, analyze: 'cpu' }
      ],
      title: '动态title' //请根据分析维度动态改变，分别为系统\CPU\品牌、型号、PC类型
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
        title: {
          text: this.title,
          left: 'center',
          top: '49%',
          textStyle: {
            fontSize: 16,
            color: '#3C4353',
            fontStyle: 'normal',
            fontWeight: '400',
            fontFamily: 'PingFangSC-Regular,PingFang SC;',
          }
        },
        color: ['#7eacea', '#e15777', '#95ea71', '#ea9b4f', '#7577df', '#be72d8', '#fff'],
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/>数量:{c}(台) <br/> 占比：({d}%)' //控制鼠标移入时的样式
        },
        series: [{
          name: '统计',
          type: 'pie',
          // radius: [30, 110],// 控制饼图大小
          center: ['50%', '50%'],
          roseType: 'radius',
          label: {
            show: true,
            formatter: '{b}:{d}%',
          },
          emphasis: {
            label: {
              show: true
            }
          },
          data: [{
            value: 25,
            name: 'Intel(R) Core(TM) i5-7400 CPU @ 3.00GHz'
          },
          {
            value: 20,
            name: 'Intel(R) Xeon(R) CPU E5-2650 v4 @ 2.20GHz'
          },
          {
            value: 15,
            name: 'Intel(R) Core(TM) i3-7100 CPU @ 3.90GHz'
          },
          {
            value: 10,
            name: 'Intel(R) Core(TM) i5-9400 CPU @ 2.90GHz'
          },
          {
            value: 8,
            name: 'Intel(R) Core(TM) i7-9400 CPU @ 2.90GHz'
          },
          {
            value: 3,
            name: 'Intel(R) Core(TM) i3-9400 CPU @ 2.90GHz'
          },
          ]
        }, {
          name: '占位',
          type: 'pie',
          silent: true,
          center: ['50%', '50%'],
          radius: 45,
          hoverAnimation: false,
          label: {
            show: false,
            position: 'center'
          },
          data: [{
            value: 1,
            name: '中间的占位环'
          },

          ],
          itemStyle: {

            normal: {
              color: '#fff',
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10,
            },
          }
        },]
      };
      myChart.setOption(option)
    }
  }

}
</script>

<style>
</style>