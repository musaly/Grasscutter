<template>
  <div :id="waterPolo.id"></div>
</template>
<script>
export default {
  // waterPolo: {
  //       id: "waterPolo",
  //       decimal: 0.6,
  //       name: "良品率",
  //       parent:'main',  详情页就是detail
  //       value: "60"
  // }
  props: ["waterPolo"],
  data() {
    return {
      resizeTimer: null,
      myChart: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.drawChart();
    }, 1000);
    const _this = this;
    window.addEventListener("resize", function() {
      if (_this.resizeTimer) {
        clearTimeout(_this.resizeTimer);
      }
      if (_this.myChart) {
        _this.myChart.resize();
        _this.resizeTimer = setTimeout(function() {}, 100);
      }
    });
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.echarts.init(document.getElementById("waterPolo"));
      this.myChart = myChart;
      let fontSize = '2rem';
      if (this.waterPolo.parent === "main") {
        fontSize = '0.7rem';
      }
      var option = {
        series: [
          {
            type: "liquidFill",
            data: [this.waterPolo.decimal],
            center: ["50%", "50%"], // 水球图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
            radius: "80%", // 水球图的半径
            outline: {
              show: true,
              borderDistance: 10, // 边框线与图表的距离 数字
              itemStyle: {
                opacity: 1, // 边框的透明度   默认为 1
                borderWidth: 1, // 边框的宽度
                shadowColor: "#fff", // 边框的阴影颜色,
                borderColor: "#4F93F1" // 边框颜色
              }
            },
            itemStyle: {
              color: "#427dd6", // 水球显示的背景颜色
              opacity: 0.5, // 波浪的透明度
              shadowBlur: 10 // 波浪的阴影范围
            },
            backgroundStyle: {
              color: "#26519b", // 水球未到的背景颜色
              opacity: 0.5,
              borderColor: "#4F93F1" // 边框颜色
            },
            // 图形上的文本标签
            label: {
              fontSize: fontSize,
              color: "#fff",
              formatter: this.waterPolo.value + "\n\n" + this.waterPolo.name
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
#waterPolo {
  width: 100%;
  height: 100%;
}
</style>
