<template>
  <div class="orderBoard">
    <router-link :to="{path:'/deliveryRate'}">
    <div class="title">
      <div class="circle"></div>
      <div>订单看板</div>
      <div class="circle"></div>
    </div>
    </router-link>
    <div class="content">
      <div class="content_top">
        <div class="content_top_title">
          <div class="content_top_title_left">
            <div class="block"></div>
            <div>
              订单达成率
            </div>
          </div>
          <div class="content_top_title_right">
          </div>
        </div>
        <div class="content_top_chart">
          <Area :areaChart="areaChart1"></Area>
        </div>
      </div>
      <div class="content_bottom">
        <div class="content_bottom_title">
          <div class="content_bottom_title_left">
            <div class="block"></div>
            <div>
              交期达成率
            </div>
          </div>
          <div class="content_bottom_title_right">
          </div>
        </div>
        <div class="content_bottom_chart">
          <Area :areaChart="areaChart2"></Area>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Area from "../area";
export default {
  components: {
    Area
  },
  data() {
    return {
      areaChart1: {
        yData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        xData: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        xUnit: "",
        yUnit: "达成率(%)",
        areaColorStart: "rgba(254, 151, 16, 0.8)",
        areaColorEnd: "rgba(70, 140, 236, 0)",
        id: "area2",
        color: "rgba(254, 151, 16, 0.8)",
        tilt: "0", // y轴坐标是否倾斜  1：是  0：否
        girdBottom: "20%",
        girdTop: "22%",
        girdLeft: "10%",
        girdRight: "5%",
        yUnitFontsize: 8
      },
      areaChart2: {
        yData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        xData: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ],
        xUnit: "",
        yUnit: "达成率(%)",
        areaColorStart: "rgba(242, 95, 83, 0.8)",
        areaColorEnd: "rgba(242, 70, 66, 0)",
        id: "area3",
        color: "rgba(242, 95, 83, 0.8)",
        tilt: "0", // y轴坐标是否倾斜  1：是  0：否
        girdBottom: "20%",
        girdTop: "22%",
        girdLeft: "10%",
        girdRight: "5%",
        yUnitFontsize: 8
      }
    };
  },
  mounted(){
    this.getOrderFinishRate()
    this.getPlanFinishRate()
  },
  methods: {
    getOrderFinishRate(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/orderFinishRate',
        method: 'get',
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.areaChart1.xData = body.xAxis
          this.areaChart1.yData = body.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getPlanFinishRate(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/planFinishRate',
        method: 'get',
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.areaChart2.xData = body.xAxis
          this.areaChart2.yData = body.data
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.orderBoard {
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
    .content_top {
      width: 100%;
      height: 9.38rem;
      padding: 0.63rem 0.78rem;
      background: url(../../assets/pictures/order_top.png) no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      margin-bottom: 0.63rem;
      .content_top_title {
        display: flex;
        justify-content: space-between;
        .content_top_title_left {
          display: flex;
          height: 0.63rem;
          line-height: 0.63rem;
          margin-bottom: 0.63rem;
          font-size: 0.63rem;
          color: #ffffff;
          .block {
            width: 0.15625rem;
            height: 100%;
            margin-right: 0.84375rem;
            background-color: #4f93f1;
          }
        }
        .content_top_title_right {
          height: 0.5rem;
          font-size: 0.5rem;
          color: rgba(255, 255, 255, 0.65);
          span {
            &:nth-child(2) {
              margin-left: 0.5rem;
              font-size: 0.63rem;
              font-weight: bold;
              color: #ffcc00;
            }
          }
        }
      }
      .content_top_chart {
        width: 100%;
        height: calc(100% - 1.26rem);
      }
    }
    .content_bottom {
      width: 100%;
      height: 9.38rem;
      padding: 0.63rem 0.78rem;
      background: url(../../assets/pictures/order_bottom.png) no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      .content_bottom_title {
        display: flex;
        justify-content: space-between;
        .content_bottom_title_left {
          display: flex;
          height: 0.63rem;
          line-height: 0.63rem;
          margin-bottom: 0.63rem;
          font-size: 0.63rem;
          color: #ffffff;
          .block {
            width: 0.15625rem;
            height: 100%;
            margin-right: 0.84375rem;
            background-color: #4f93f1;
          }
        }
        .content_bottom_title_right {
          height: 0.5rem;
          font-size: 0.5rem;
          color: rgba(255, 255, 255, 0.65);
          span {
            &:nth-child(2) {
              margin-left: 0.5rem;
              font-size: 0.63rem;
              font-weight: bold;
              color: #ffcc00;
            }
          }
        }
      }
      .content_bottom_chart {
        width: 100%;
        height: calc(100% - 1.26rem);
      }
    }
  }
}
</style>
