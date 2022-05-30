<template>
  <div :id="singleLineChart.id"></div>
</template>
<script>
export default {
  // 引用该子组件的名字都叫singleLineChart
  // 父组件传过来的固定数据格式如下：
  //    singleLineChart: {
  //        yData: [120, 200, 150, 80, 70, 110, 130],
  //        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //        yUnit: "高度（米）",
  //        lineColor: "#06D7D8",
  //       id: "singleLineChart1",  一个页面引入多个该文件时，id名字依次往下起
  //       tilt: "1",  // y轴坐标是否倾斜  1：是  0：否
  //        color:'',//折线的颜色
  //     }
  props: ["singleLineChart"],
  data() {
    return {
      resizeTimer: null,
      myChart: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.getsingleLineChart();
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
    getsingleLineChart() {
      const that = this
      const chart = document.getElementById(this.singleLineChart.id);
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
            <div>${params[0].marker}<span>${that.singleLineChart.yUnit}</span><span> ${params[0].data}</span></div>
            </div>`
          }
        },
        grid: {
          bottom: '25%',
          top: '25%',
          right: '2%',
          left: '15%'
        },
        xAxis: {
          // 去掉刻度
          axisTick: {
            show: false
          },
          // 修改刻度线颜色
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          // 刻度值颜色
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          type: "category",
          data: this.singleLineChart.xData
        },
        yAxis: {
            name: this.singleLineChart.yUnit,
            nameTextStyle: {
              // y轴单位的颜色
              color: "rgba(255, 255, 255, 0.65)",
              fontSize: 6
            },
            type: "value",
            // 刻度值颜色
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            },
            // y轴对应刻度背景先颜色
            splitLine: {
              lineStyle: {
                opacity: 0.2,
                type: "dashed",
                color: "#878793"
              }
            }
          },
        series: [
          {
            data: this.singleLineChart.yData,
            type: "line",
            color: this.singleLineChart.color,
            itemStyle: {
              color: this.singleLineChart.lineColor
            }
          }
        ]
      };
      // 坐标轴x文字是否要倾斜
      if (this.singleLineChart.tilt === "1") {
        option.xAxis.axisLabel = { interval: 0, rotate: 30 };
      }
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
#singleLineChart1,
#singleLineChart2 {
  width: 100%;
  height: 100%;
}
</style>
