<template>
  <div class="sellBoard">
   <router-link :to="{path:'/sellBoard'}">
    <div class="title">
      <div class="circle"></div>
      <div>销售看板</div>
      <div class="circle"></div>
    </div>
    </router-link>
    <div class="content_order">
      <div class="content_order_top">
        <div class="block"></div>
        <div>
          订单授入月统计
        </div>
      </div>
      <div class="chart">
        <DoubleBarDoubleyAxis
          :doubleBarChart="barChart1"
        ></DoubleBarDoubleyAxis>
      </div>
    </div>
    <div class="content_goods">
      <div class="content_goods_top">
        <div class="block"></div>
        <div>
          发货月统计
        </div>
      </div>
      <div class="chart">
        <DoubleBarDoubleyAxis
          :doubleBarChart="barChart2"
        ></DoubleBarDoubleyAxis>
      </div>
    </div>
  </div>
</template>

<script>
import DoubleBarDoubleyAxis from "../doubleBarDoubleyAxis";
export default {
  components: {
    DoubleBarDoubleyAxis
  },
  data() {
    return {
      barChart1: {
        yOneData: [0, 0, 0, 0, 0, 0],
        yTwoData: [0, 0, 0, 0, 0, 0],
        xData: ["00-00", "00-00", "00-00", "00-00", "00-00", "00-00"],
        yUnit1: "接单数量(单)",
        yUnit2: "接单批次(次)",
        oneBarColorStart: "#9DCEFE",
        oneBarColorEnd: "#0787F3",
        twoBarColorStart: "#D0FCFC",
        twoBarColorEnd: "#06D7D8",
        legendOne: "接单数量",
        legendTwo: "接单批次",
        id: "doubleBar1",
        tilt: "0",
        legendFontsize: "0.5rem",
        fontSize: 2,
        yUnitFontsize: 6
      },
      barChart2: {
        yOneData: [0, 0, 0, 0, 0, 0],
        yTwoData: [0, 0, 0, 0, 0, 0],
        xData: ["00-00", "00-00", "00-00", "00-00", "00-00", "00-00"],
        yUnit1: "发货数量(件)",
        yUnit2: "发货批次(次)",
        oneBarColorStart: "#FCBA78",
        oneBarColorEnd: "#EE7213",
        twoBarColorStart: "#E2B1FE",
        twoBarColorEnd: "#8931EE",
        legendOne: "发货数量",
        legendTwo: "发货批次",
        id: "doubleBar2",
        tilt: "0",
        legendFontsize: "0.5rem",
        fontSize: 2,
        yUnitFontsize: 6
      }
    };
  },
  mounted(){
    this.getrceiveOrder()
    this.getSendOrder()
  },
methods: {
  // 获取订单授入月统计的信息
  getrceiveOrder(){
    this.axios({
      method: 'get',
      url: '/dtsum/qunli/cockpit/home/receiveOrder',
    }).then((res) => {
      if (res.data.success === 1){
        const body = res.data.body
        this.barChart1.xData = body.xAxis
        this.barChart1.yOneData = body.series[0].data
        this.barChart1.yTwoData = body.series[1].data
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  getSendOrder(){
    this.axios({
      url: '/dtsum/qunli/cockpit/home/sendOrder',
      method: 'get',
    }).then((res) => {
      if (res.data.success === 1){
        const body = res.data.body
        this.barChart2.xData = body.xAxis
        this.barChart2.yOneData = body.series[0].data
        this.barChart2.yTwoData = body.series[1].data
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}
};
</script>

<style lang="scss" scoped>
.sellBoard {
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
  .content_order {
    width: 100%;
    height: 9.16rem;
    background: url(../../assets/pictures/sale_top.png) no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    margin-bottom: 0.63rem;
    padding: 0.63rem 0.78rem;
    box-sizing: border-box;
    .content_order_top {
      display: flex;
      width: 100%;
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
    .chart {
      width: 100%;
      height: calc(100% - 1.26rem);
    }
  }
  .content_goods {
    width: 100%;
    height: 9.16rem;
    background: url(../../assets/pictures/sale_bottom.png) no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    padding: 0.63rem 0.78rem;
    box-sizing: border-box;
    .content_goods_top {
      display: flex;
      width: 100%;
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
    .chart {
      width: 100%;
      height: calc(100% - 1.26rem);
    }
  }
}
</style>
