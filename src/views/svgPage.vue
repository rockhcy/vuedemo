<template>
  <div>
    <h3>测试svg地图的使用</h3>
    <div style="width:1000px;height:700px"
         @click="addClickEvent"
         id="svgDiv">
      <img src="http://192.168.50.143:10002/baseResourceFile/hannan.svg"
           style="width:100%;height:100%">
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.addMark()
  },
  methods: {
    mousePosition (ev) {
      if (ev.pageX || ev.pageY) {
        return { x: ev.pageX, y: ev.pageY };
      }
      return {
        x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: ev.clientY + document.body.scrollTop - document.body.clientTop
      };
    },
    // 为svg添加点击事件
    addClickEvent () {
      // var tDiv = document.getElementById("svgDiv");
      //MouseEvent
      const ev = ev || window.event;
      const mousePos = this.mousePosition(ev);
      console.log(mousePos.x, mousePos.y)
      this.addTempMark(mousePos.x, mousePos.y, "测试地址")
    },
    // 添加临时标记点
    addTempMark (x, y, markName) {
      // 获取到 父级DIV
      var tDiv = document.getElementById("svgDiv");
      // 动态创建一个div元素，并设置样式
      var div = document.createElement("div");
      div.className = "NewMark";
      div.style.left = x + "px"
      div.style.top = y + "px";
      tDiv.appendChild(div)
      var ptext = "<p>" + markName + "</p>";
      div.append(ptext)

    },
    addMark () {
      // let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      // svg.setAttribute("width", "800");
      // svg.setAttribute("height", "500");
      // svg.addEventListener("load", function () { alert('loaded'); });
      // document.body.appendChild(svg);
    }
  }
}
</script>

<style>
.NewMark {
  position: absolute;
  width: 32px;
  height: 32px;
  font-size: 0px;
  --background: #ff0000;
  background-size: contain;
  background-image: url(../assets/mark2.png);
  z-index: 99;
}
</style>