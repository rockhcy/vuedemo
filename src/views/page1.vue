<template>
  <div>
    <h2>终端运行概览</h2>
    <el-row>
      <!-- <el-input placeholder="mac地址"
                style="width:229px;margin-right:10px"
                prefix-icon="el-icon-s-platform"
                v-model="areaCode"></el-input> -->
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
      <div id="myChart"
           :style="{width: '100%', height: '500px'}"></div>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div id="myChart2"
             :style="{width: '100%', height: '400px'}"></div>
      </el-col>
      <el-col :span="10">
        <h3>各单位终端数量详细信息</h3>

        <template>
          <el-table :data="tableData"
                    stripe
                    style="width: 100%">
            <el-table-column prop="orgName"
                             label="组织名称"
                             width="180">
              <!-- <span> 请将组织名称设置为a标签样式，点击时自动转跳到【终端管理】页面，并查询这个组织的全部设备</span> -->
            </el-table-column>
            <el-table-column prop="orgCode"
                             label="组织编码"
                             width="180">
            </el-table-column>
            <el-table-column prop="total"
                             label="终端总数">
            </el-table-column>
            <el-table-column prop="2"
                             label="故障数">
            </el-table-column>
            <el-table-column prop="3"
                             label="未分配设备数">
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
      // areaCode: '',
      orgList: [],
      orgCode: [],
      strategyTime: '',
      tableData: [
        { orgName: 'hcy测试点', orgCode: 'hcy', total: 4, 2: 0, 3: 0 },
        { orgName: 'hcy测试点', orgCode: 'hcy', total: 4, 2: 0, 3: 0 },
        { orgName: 'hcy测试点', orgCode: 'hcy', total: 4, 2: 0, 3: 0 },
        { orgName: 'hcy测试点', orgCode: 'hcy', total: 4, 2: 0, 3: 0 }
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
    this.drawChar2();
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
      console.log("获取运行时长统计信息:/admin/countRuntimeInfo")
    },
    countTertimalNum () {
      console.log("统计各个单位的各种类型的终端数量：" + "/admin/countTertimalNum")
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '终端运行时长统计分析' },
        legend: {
          data: ['单位A', '单位B']
        },
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
        {
          name: '单位B',
          type: 'line',
          smooth: true, //这句就是让曲线变平滑的
          symbol: 'none', //这句就是去掉点的
          data: [230, 122, 111, 224, 230, 130, 210],
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

        },],
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
    drawChar2 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart2'))

      let bgColor = '#fff';
      let title = '在线终端总数';
      let color = ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'];
      let echartData = [{
        name: "单位A",
        value: "3720"
      },
      {
        name: "单位B",
        value: "2920"
      },
      {
        name: "单位C",
        value: "2200"
      },
      {
        name: "单位D",
        value: "1420"
      }
      ];

      let formatNumber = function (num) {
        let reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ',');
      }
      let total = echartData.reduce((a, b) => {
        return a + b.value * 1
      }, 0);

      let option = {
        backgroundColor: bgColor,
        color: color,
        // tooltip: {
        //     trigger: 'item'
        // },
        title: [{
          text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
          top: 'center',
          left: 'center',
          textStyle: {
            rich: {
              name: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#666666',
                padding: [10, 0]
              },
              val: {
                fontSize: 32,
                fontWeight: 'bold',
                color: '#333333',
              }
            }
          }
        }, {
          text: '在线终端占比',
          top: 20,
          left: 20,
          textStyle: {
            fontSize: 14,
            color: '#666666',
            fontWeight: 400
          }
        }],
        series: [{
          type: 'pie',
          radius: ['45%', '60%'],
          center: ['50%', '50%'],
          data: echartData,
          hoverAnimation: false,
          itemStyle: {
            normal: {
              borderColor: bgColor,
              borderWidth: 2
            }
          },
          labelLine: {
            normal: {
              length: 20,
              length2: 120,
              lineStyle: {
                color: '#e6e6e6'
              }
            }
          },
          label: {
            normal: {
              formatter: params => {
                return (
                  '{icon|●}{name|' + params.name + '}{value|' +
                  formatNumber(params.value) + '}'
                );
              },
              padding: [0, -100, 25, -100],
              rich: {
                icon: {
                  fontSize: 16
                },
                name: {
                  fontSize: 14,
                  padding: [0, 10, 0, 4],
                  color: '#666666'
                },
                value: {
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#333333'
                }
              }
            }
          },
        }]
      };

      // 绘制图表
      myChart.setOption(option);
    }
  }

}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>