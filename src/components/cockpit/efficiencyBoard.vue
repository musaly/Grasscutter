<template>
  <div class="efficiencyBoard">
    <div class="title">
      <div class="circle"></div>
      <div>效率看板</div>
      <div class="circle"></div>
    </div>
    <div class="content">
      <div class="content_top">
        <div class="content_top_title">
          <div class="block"></div>
          <div>
            近7日产能图
          </div>
        </div>
        <div class="content_top_content">
          <SingleLine :singleLineChart="singleLineChart1"></SingleLine>
        </div>
      </div>
      <div class="content_bottom">
        <div class="content_bottom_title">
          <div class="block"></div>
          <div>
            近7日进度图
          </div>
        </div>
        <div class="content_bottom_content">
          <SingleLine :singleLineChart="singleLineChart2"></SingleLine>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleLine from "../singleLine";
export default {
  components: {
    SingleLine
  },
  data() {
    return {
      singleLineChart1: {
         yData: [0, 0, 0, 0, 0, 0, 0],
         xData: ["00-00", "00-00", "00-00", "00-00", "00-00", "00-00", "00-00"],
         yUnit: "产能(%)",
         color: "#06D7D8",
         lineColor: "#06D7D8",
        id: "singleLineChart1", // 一个页面引入多个该文件时，id名字依次往下起
        tilt: "0", // y轴坐标是否倾斜  1：是  0：否
      },
       singleLineChart2: {
         yData: [0, 0, 0, 0, 0, 0, 0],
         xData: ["00-00", "00-00", "00-00", "00-00", "00-00", "00-00", "00-00"],
         yUnit: "进度(%)",
         color: "#06D7D8",
         lineColor: "#06D7D8",
        id: "singleLineChart2", // 一个页面引入多个该文件时，id名字依次往下起
        tilt: "0", // y轴坐标是否倾斜  1：是  0：否
      },
    };
  },
  mounted(){
    this.getLastWeekCapacity()
    this.getLastWeekSchedule()
  },
  methods: {
    getLastWeekCapacity(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/lastWeekCapacity',
        method: 'get',
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.singleLineChart1.xData = body.xAxis
          this.singleLineChart1.yData = body.data
        }
      })
    },
    getLastWeekSchedule(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/lastWeekSchedule',
        method: 'get',
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.singleLineChart2.xData = body.xAxis
          this.singleLineChart2.yData = body.data
        }
      })
    }

  }
};
</script>

<style lang="scss" scoped>
.efficiencyBoard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    display: flex;
    justify-content: space-between;
    height: 1.22rem;
    line-height: 1.22rem;
    margin: auto;
    width: 8.63rem;
    background: url(../../assets/pictures/title_bg.png) no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    padding: 0 1.31rem;
    font-size: 0.75rem;
    color: #ffffff;
    .circle {
      width: 0.25rem;
      height: 0.25rem;
      border-radius: 50%;
      background: linear-gradient(209deg, #00fbfc 0%, #468cec 100%);
      margin-top: 0.5rem;
    }
  }
  .content {
    margin-top: 0.63rem;
    .content_top {
      width: 100%;
      height: 9.38rem;
      background: url(../../assets/pictures/efficiency_top.png) no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      margin-bottom: 0.63rem;
      padding: 0.63rem 0.78rem;
      .content_top_title {
        display: flex;
        width: 100%;
        height: 0.63rem;
        line-height: 0.63rem;
        font-size: 0.63rem;
        color: #ffffff;
        .block {
          width: 0.15625rem;
          height: 100%;
          margin-right: 0.84375rem;
          background-color: #4f93f1;
        }
      }
      .content_top_content{
        width: 100%;
        height: calc(100% - 0.63rem);
      }
    }
    .content_bottom {
      width: 100%;
      height: 9.38rem;
      background: url(../../assets/pictures/efficiency_bottom.png) no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      padding: 0.63rem 0.78rem;
      .content_bottom_title {
        display: flex;
        width: 100%;
        height: 0.63rem;
        line-height: 0.63rem;
        font-size: 0.63rem;
        color: #ffffff;
        .block {
          width: 0.15625rem;
          height: 100%;
          margin-right: 0.84375rem;
          background-color: #4f93f1;
        }
      }
      .content_bottom_content{
        width: 100%;
        height: calc(100% - 0.63rem);
      }
    }
  }
}
</style>
