<template>
  <div>
    <h3>全国地图添加标记点页面</h3>
    <el-row>
      <el-col :span="24">
        <el-row>
          <el-input v-model="input"
                    style="width:60%"
                    placeholder="请输入内容"></el-input>
          <el-button type="primary"
                     @click="selectlocal">主要按钮</el-button>
        </el-row>
        <el-row>
          <baidu-map id="allmap"
                     mapType="BMAP_NORMAL_MAP"
                     :auto-resize="true"
                     :center="{lng: 116.404, lat: 39.915}"
                     :zoom="15"
                     :scroll-wheel-zoom="true"
                     @ready="mapReady">
            <bm-marker :position="markerPoint"
                       :dragging="dragging"
                       @click="infoWindowOpen"
                       @dblclick="addMarkDialogVisible = true"
                       @dragend="resetPoint"
                       animation="BMAP_ANIMATION_BOUNCE"
                       :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}">

              <bm-info-window :show="show"
                              @close="infoWindowClose"
                              @open="infoWindowOpen">{{coordinatesInfo}}</bm-info-window>
            </bm-marker>
          </baidu-map>
        </el-row>
      </el-col>
      <el-dialog title="添加标记点"
                 :visible.sync="addMarkDialogVisible"
                 width="30%"
                 :before-close="handleClose">
        <el-form ref="form"
                 :model="form"
                 label-width="100px">
          <el-form-item label="标记点名称">
            <el-input v-model="form.markName"></el-input>
          </el-form-item>
          <el-form-item label="绑定单位">
            <el-select v-model="form.orgId"
                       placeholder="请选择">
              <el-option v-for="item in orgList"
                         :key="item.orgCode"
                         :label="item.orgName"
                         :value="item.orgCode">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 在百度地图中默认选择 标记类型为 全国地图，不可修改 -->
          <el-form-item label="标记类型">
            <el-radio-group v-model="form.markTypeLab"
                            disabled>
              <el-radio label="全国地图"></el-radio>
              <el-radio label="自绘地图"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标记点坐标">
            <el-input v-model="form.markXY"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="转跳地址">
            <el-input v-model="form.url"
                      placeholder="配置WEB MAP中点击标记点后转跳的地址"></el-input>
          </el-form-item>
          <el-form-item label="属性配置">
            <el-checkbox-group v-model="form.checkboxVal">
              <el-checkbox label="在地图中隐藏"
                           name="type"></el-checkbox>
              <el-checkbox label="显示修正数据"
                           name="type"></el-checkbox>
            </el-checkbox-group>

          </el-form-item>
          <el-form-item label="修正终端数量">
            <el-input v-model="form.am_pc_total"></el-input>
          </el-form-item>
          <el-form-item label="修正在线数量">
            <el-input v-model="form.am_pc_online"></el-input>
          </el-form-item>
          <el-form-item label="管理员">
            <el-input v-model="form.principal"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload class="avatar-uploader"
                       action="https://jsonplaceholder.typicode.com/posts/"
                       :show-file-list="false"
                       :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl"
                   :src="imageUrl"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="addMarkDialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="addMarkDialogVisible = false">提交</el-button>
        </span>
      </el-dialog>

    </el-row>

  </div>
</template>

<script>
export default {
  data () {
    return {
      addMarkDialogVisible: false,
      imageUrl: '',
      form: {
        markName: '',
        orgId: '',
        markTypeLab: '全国地图',
        markType: '1',
        markXY: '',
        markX: "",
        markY: '',
        url: '',
        isShow: '',
        isAmend: '',
        checkboxVal: '',
        amPcTotal: '',
        amPcOnline: '',
        principal: '',
        phone: '',
        photo: "",
        areaName: ''
      },
      orgList: [{
        orgCode: '0',
        orgName: '暂不绑定'
      }, {
        orgCode: 'hcy',
        orgName: '武汉和信'
      }],
      input: '武汉',
      map: {},
      BMap: {},
      markerPoint: '',
      local: '',
      dragging: true,  //标记点是否允许拖拽
      show: false, //提示信息框
      coordinatesInfo: '' //坐标提示信息

    }
  },
  mounted () {
    //this.mapReady()
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          console.log(_)
          done();
        })
        .catch(_ => {
          console.log(_)
        });
    },
    addMark () {
      console.log("添加标记点url:/mark/addMark")
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    resetPoint (type, target, pixel, point) {
      console.log(type, target, pixel, point)
      this.coordinatesInfo = '经度:' + type.point.lat + ',纬度:' + type.point.lng
      this.form.markXY = type.point.lat + ',' + type.point.lng
      this.form.markX = type.point.lat
      this.form.markY = type.point.lng
    },
    infoWindowClose () {
      this.show = false
    },
    infoWindowOpen () {
      this.show = true
    },
    selectlocal () {
      //调整地图显示中心
      // this.map.setCenter(this.markerPoint)
      console.log(this.local)
      // 设置搜索范围
      this.local.setLocation(this.form.areaName)
      // 设置搜索回调
      const self = this
      this.local.setSearchCompleteCallback(function (LocalResult) {
        console.log(LocalResult)
        console.log(LocalResult.city)
        self.form.areaName = LocalResult.city
        // console.log(LocalResult.getPoi(0))
        //完成搜索后将坐标点写入data中并一定地图中心到指定的坐标上
        console.log(LocalResult.Hr)
        self.markerPoint = LocalResult.Hr[0].point
        // self.map.setCenter(LocalResult.getPoi(0).point)
        self.coordinatesInfo = '经度:' + LocalResult.Hr[0].point.lat + ',纬度:' + LocalResult.Hr[0].point.lng
        self.form.markXY = LocalResult.Hr[0].point.lat + ',' + LocalResult.Hr[0].point.lng
        self.form.markX = LocalResult.Hr[0].point.lat
        self.form.markY = LocalResult.Hr[0].point.lat
        self.map.setCenter(LocalResult.Hr[0].point)
        // console.log(LocalResult.city)
        // self.markForm.areaCode = LocalResult.city
      })
      //执行搜索
      this.local.search(this.input)


    },
    mapReady ({ BMap, map }) {
      console.log(BMap, map)
      // 选择一个经纬度作为中心点
      this.point = new BMap.Point(113.27, 23.13);
      // 根据中心加载地图，第二个参数为地图缩进比率，最大为19，最小为0。
      map.centerAndZoom(this.point, 19);
      // 添加 地图类型控件
      //map.addControl(new BMap.MapTypeControl());
      map.addControl(new BMap.MapTypeControl(
        {
          mapTypes: [global.BMAP_NORMAL_MAP, global.BMAP_SATELLITE_MAP, global.BMAP_HYBRID_MAP]
        }
      ));
      // 添加比例尺控件
      map.addControl(new BMap.ScaleControl());
      // 添加缩放平移控件
      map.addControl(new BMap.NavigationControl());
      // 添加缩略图控件
      map.addControl(new BMap.OverviewMapControl());
      this.map = map
      console.log("初始中心：", map.getCenter())
      let local = new BMap.LocalSearch(this.map);
      this.local = local
    }
  }

}
</script>

<style>
#allmap {
  width: 1500px;
  height: 800px;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
</style>