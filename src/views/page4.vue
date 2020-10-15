<template>
  <div>
    <h2>开关机分析</h2>
    <el-row>
      <el-input placeholder="mac地址"
                style="width:229px;margin-right:10px"
                prefix-icon="el-icon-s-platform"
                v-model="mac"></el-input>

      <el-input placeholder="使用人"
                style="width:229px;margin-right:10px"
                prefix-icon="el-icon-s-platform"
                v-model="usename"></el-input>
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
      <el-col :span="16">
        <h3>使用时长分析</h3>
        <div id="myChart1"
             :style="{width: '100%', height: '300px'}"></div>
      </el-col>
      <el-col :span="8">
        <h3>开关机日志详情</h3>
        <template>
          <el-table :data="tableData"
                    stripe
                    style="width: 100%">
            <el-table-column prop="mac"
                             label="mac地址"
                             width="180">

            </el-table-column>
            <el-table-column prop="turnOnTime"
                             label="开机时间"
                             width="180">
            </el-table-column>
            <el-table-column prop="turnOffTime"
                             label="关机时间">
            </el-table-column>
            <el-table-column prop="runtime"
                             label="运行时长">
            </el-table-column>
            <el-table-column prop="remark"
                             label="备注">
            </el-table-column>
          </el-table>
          <el-pagination layout="prev, pager, next"
                         :total="1000">
          </el-pagination>
        </template>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  data () {
    return {
      usename: '',
      mac: '',
      strategyTime: '',
      tableData: [
        {
          "mac": "F4:4D:30:F2:23:66",
          "turnOnTime": "2020-09-04T11:26:24.000+0800",
          "turnOffTime": "2020-09-04T11:26:24.000+0800",
          "runtime": 0,
          "remark": 2
        }
      ],
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
    this.drawLine();
  },
  created () {
    this.getVisibleOrgLis()
  },
  methods: {
    getVisibleOrgLis () {
      console.log("获取可见的组织列表")
      this.orgList = [{ orgId: 1, orgName: '武汉和信', orgCode: 'wuhx' }]
    },
    countRuntimeInfo () {
      console.log("执行查询")
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart1'))
      // 绘制图表
      myChart.setOption({
        title: { text: 'PC每日运行时长趋势' },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: {
          data: ['10-12', '10-13', '10-14', '10-15', '10-16', '10-17', '10-18'],
        },
        yAxis: {},
        series: [{
          name: '单位A',
          type: 'line',
          smooth: true, //这句就是让曲线变平滑的
          symbol: 'none', //这句就是去掉点的
          data: [220, 182, 191, 234, 290, 330, 310],
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          }
        },
        ],
        dataZoom: {
          show: true,//是否显示
          realtime: true,//缩放变化是否实时显示，该功能比较消耗资源，尤其是在动态加载数据时
          zoomLock: false,//数据缩放锁，锁定后缩放区域大小不能被改变
          orient: 'horizontal',   // 布局方式，默认为水平布局，可选为：'horizontal' | 'vertical'
          height: 20,
          backgroundColor: 'rgba(221,160,221,0.5)',
          dataBackgroundColor: 'rgba(138,43,226,0.5)',
          fillerColor: 'rgba(38,143,26,0.6)',
          handleColor: 'rgba(128,43,16,0.8)',
          //xAxisIndex:[],//有多个数据时，用来指定组件在拖拽过程中可以控制那些数据。可接受数值和数组，对应series中的数值下标。默认控制全部
          //yAxisIndex:[],
          start: 40,//数据缩放，选择起始比例，默认为0（%），end默认为100%
          end: 80
        },
      });
    },
  }


}
</script>

<style>
</style>