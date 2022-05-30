<template>
  <div :id="singleBarRowChart.id"></div>
</template>
<script>
export default {
  // 引用该子组件的名字都叫singleBarRowChart
  // 父组件传过来的固定数据格式如下：
  //    barChart1: {
  //       yData: [120, 200, 150, 80, 70, 110, 130],
  //       xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //        xUnit:'',
  //       yUnit: "数量（台）",
  //       barColorStart: "#06D7D8",
  //       barColorEnd: "#D0FCFC",
  //       id: "singleBarRow1",  一个页面引入多个该文件时，id名字依次往下起
  //       tilt: "1",  // y轴坐标是否倾斜  1：是  0：否
  //        color:"",//折线的颜色
  //     }
  props: ["singleBarRowChart"],
  data() {
    return {
      resizeTimer: null,
      myChart: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.getsingleBarRowChart();
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
    getsingleBarRowChart() {
      const that = this
      const chart = document.getElementById(this.singleBarRowChart.id);
      const myChart = this.echarts.init(chart);
      this.myChart = myChart;
      const option = {
        tooltip: {
          trigger: "axis",
          textStyle: {
            align: 'left'
          },
          formatter: function(params){
            return `<div>
            <div>${params[0].name}</div>
            <div>${params[0].marker}<span>${that.singleBarRowChart.yUnit}</span><span> ${params[0].data}</span></div>
            </div>`
          }
        },
        grid: {
          left: 30,
          bottom: 25,
          top: 30
        },
        xAxis: {
          name: this.singleBarRowChart.xUnit,
          // 修改刻度线颜色
          axisLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.65)"
            }
          },
          // 刻度值颜色
          axisLabel: {
            textStyle: {
              color: "rgba(255, 255, 255, 0.65)"
            }
          },
          // x轴对应刻度背景先颜色
          splitLine: {
            lineStyle: {
              opacity: 0.2,
              type: "dashed",
              color: "#878793"
            }
          },
          type: "value"
        },
        yAxis: {
          name: this.singleBarRowChart.yUnit,
          nameTextStyle: {
            // y轴单位的颜色
            color: "rgba(255, 255, 255, 0.65)",
            fontSize: 8
          },
          // 去掉刻度
          axisTick: {
            show: false
          },
          // 修改刻度线颜色
          axisLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.65)"
            }
          },
          // 刻度值颜色
          axisLabel: {
            textStyle: {
              color: "rgba(255, 255, 255, 0.65)"
            }
          },
          type: "category",
          data: this.singleBarRowChart.xData
        },
        series: [
          {
            data: this.singleBarRowChart.yData,
            type: "bar",
            color: this.singleBarRowChart.color,
            itemStyle: {
              color: new this.echarts.graphic.LinearGradient(0, 0, 1, 1, [
                { offset: 0, color: this.singleBarRowChart.barColorStart },
                { offset: 1, color: this.singleBarRowChart.barColorEnd }
              ])
            }
          }
        ]
      };
      if (this.singleBarRowChart.tilt === "1") {
        option.xAxis.axisLabel = { interval: 0, rotate: 30 };
      }
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
#singleBarRow1,
#singleBarRow2 {
  width: 100%;
  height: 100%;
}
</style>
