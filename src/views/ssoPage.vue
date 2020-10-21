<template>
  <div>
    <h3>我是测试儿童医院免密登陆的页面</h3>
  </div>
</template>

<script>
export default {
  created () {
    this.checkSSO()
    //this.testAcross()
  },
  methods: {
    checkSSO () {
      console.log("aaaaaaaa")
      var params = window.GLOBAL_CONFIG_SETTING.SSO_PARAM
      const apiurl = window.GLOBAL_CONFIG_SETTING.BASE_API
      console.log(apiurl)
      this.$api.post(apiurl, params, {
        headers: {
          'Content-Type': "text/xml;charset=UTF-8"
        }
      }).then(res => {
        console.log(res.data)

        let arr = this.getXmlNode(res.data)
        console.log(arr)
        this.rtyyLogin(arr)
      })
    },
    rtyyLogin (arr) {
      console.log(arr)
      var info = new FormData();
      info.append("userLoginName", '00000564')
      info.append("userName", '张建斌')
      info.append("deptName", '泌尿外科病区')
      this.$api.post("/sso/rtyyLogin", info).then(res => {
        // 如果返回 200 就进入用户首页，否则弹出提示信息，进入手动登陆页。因为自动创建用户等逻辑可能出错，比如可使用用户数量不够等
        console.log(res.data)
      })

    },


    getXmlNode (str) {

      //创建文档对象
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(str, "text/xml");

      //提取数据
      var countrys = xmlDoc.getElementsByTagName('RESPONSE');

      var arr = [];

      for (var i = 0; i < countrys.length; i++) {
        arr.push(countrys[i].textContent);
      }
      //console.log(arr);
      return arr;
    }

  }

}
</script>

<style>
</style>