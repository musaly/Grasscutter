<template>
  <div class="sellBoard">
    <div class="header">
      <div class="back" @click="handleBack">
        <div class="back_icon"></div>
        返回
      </div>
      <div class="title">
      <div class="circle left"></div>
      <div class="title_detail">销售看板</div>
      <div class="circle right"></div>
      </div>
      <!-- <el-select v-model="workShopNumber" placeholder="请选择车间">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
      </el-select> -->
      <div :class="fullscreen?'icon suoxiao':'icon fangda'" @click="fullScreen">
      </div>
    </div>
    <div class="content">
      <div class="top">
        <div class="header_left">
        <div class="block"></div>
        <div class="title">订单授入月统计</div>
        </div>
        <div class="header_right">
        <div class="block"></div>
        <div class="title">发货月统计</div>
        </div>
        <div class="chart_left">
        <DoubleBarDoubleyAxis :doubleBarChart="barChart1"/>
        </div>
        <div class="chart_right">
        <DoubleBarDoubleyAxis :doubleBarChart="barChart2"/>
        </div>
        <div class="divide">
        </div>
      </div>
      <div class="bottom">
        <div class="header_left">
        <div class="block"></div>
        <div class="title">订单达成率</div>
        </div>
        <div class="header_right">
        <div class="block"></div>
        <div class="title">交期达成率</div>
        </div>
        <div class="number_left">
        </div>
        <div class="number_right">
        </div>
        <div class="chart_left">
        <Area :areaChart="areaChart1"/>
        </div>
        <div class="chart_right">
        <Area :areaChart="areaChart2"/>
        </div>
        <div class="divide">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoubleBarDoubleyAxis from '../components/doubleBarDoubleyAxis.vue';
import Area from '../components/area.vue'

export default {
  components: {
    DoubleBarDoubleyAxis,
    Area
  },
  name: 'sellBoard',
  data(){
    return {
      workShopNumber: '',
      options: [
        {
          label: '5楼车间',
          value: 5
        }, {
          label: '6楼车间',
          value: 6
        }
      ],
      barChart1: {
        yOneData: [0, 0, 0, 0, 0, 0, 0],
        yTwoData: [0, 0, 0, 0, 0, 0, 0],
        xData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
        yUnit1: "接单数量(单)",
        yUnit2: "接单批次(次)",
        oneBarColorStart: "#9DCEFE",
        oneBarColorEnd: "#0787F3",
        twoBarColorStart: "#D0FCFC",
        twoBarColorEnd: "#06D7D8",
        id: "doubleBar1",
        tilt: "0", // y轴坐标是否倾斜  1：是  0：否
        legendOne: "接单数量",
        legendTwo: "接单批次",
        legendFontsize: "1rem"
       },
       barChart2: {
         yOneData: [0, 0, 0, 0, 0, 0, 0],
        yTwoData: [0, 0, 0, 0, 0, 0, 0],
        xData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
        yUnit1: "发货数量(件)",
        yUnit2: "发货批次(次)",
        oneBarColorStart: "#9DCEFE",
        oneBarColorEnd: "#0787F3",
        twoBarColorStart: "#D0FCFC",
        twoBarColorEnd: "#06D7D8",
        id: "doubleBar2",
        tilt: "0", // y轴坐标是否倾斜  1：是  0：否
        legendOne: "发货数量",
        legendTwo: "发货批次",
        legendFontsize: "1rem"
       },
       areaChart1: {
        yData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        xData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        yUnit: "订单达成率(%)",
        areaColorStart: "rgba(254, 151, 16, 0.8)",
        areaColorEnd: "rgba(70, 140, 236, 0)",
        color: "rgba(254, 151, 16, 0.8)",
        id: "area1",
        tilt: "0", // y轴坐标是否倾斜  1：是  0：否
       yUnitFontsize: 12,
       girdBottom: "20%",
       girdTop: "20%",
       girdLeft: "10%",
       girdRight: "10%"
       },
       areaChart2: {
        yData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        xData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        yUnit: "交期达成率(%)",
        areaColorStart: "rgba(242, 95, 83, 0.8)",
        areaColorEnd: "rgba(242, 70, 66, 0)",
        color: "rgba(242, 95, 83, 0.8)",
        id: "area2",
        tilt: "0", // y轴坐标是否倾斜  1：是  0：否
        yUnitFontsize: 12,
       girdBottom: "20%",
       girdTop: "20%",
       girdLeft: "10%",
       girdRight: "10%"
       }
    }
  },
  computed: {
    fullscreen(){
      return this.$store.state.fullscreen
    }
  },
  mounted(){
    this.getReceiveOrder()
    this.getSendOrder()
    this.getOrderFinishRate()
    this.getPlanFinishRate()
  },
  methods: {
     handleBack(){
      window.history.go(-1)
    },
     fullScreen() {
      // this.qpheight = this.$refs.qpheight.clientHeight +'px';
      const element = document.documentElement
      if (this.$store.state.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.$store.commit('changeFullScreen', !this.$store.state.fullscreen)
    },
    getReceiveOrder(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/receiveOrder',
        method: 'get'
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
        method: 'get'
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
    },
    getOrderFinishRate(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/orderFinishRate',
        method: 'get'
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
        method: 'get'
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
}
</script>

<style lang="scss" scoped>
  .sellBoard{
    width:120rem;
    height:67.5rem;
    background:url(../assets/pictures/background.jpg) no-repeat;
    background-size:100% 100%;
    background-position:center center;
    padding:1.63rem 1.88rem 1.88rem 1.88rem;
    .header{
      position:relative;
      width:100%;
      height:4.38rem;
        .back{
        font-size:1.5rem;
        line-height: 1.56rem;
        color:#FFF;
        display: flex;
        position:absolute;
        top:1.43rem;
        left:2.44rem;
        .back_icon{
        width:1.56rem;
        height:1.56rem;
        margin-right:0.5rem;
        background:url(../assets/pictures/icon_back.svg) no-repeat;
        background-size:100% 100%;
        background-position:center center;
        }
      }
      .title{
        display:flex;
        position:absolute;
        left:50%;
        transform:translateX(-50%);

        width:30.94rem;
        height:100%;
        background:url(../assets/pictures/title_bg.png) no-repeat;
        background-size:100% 100%;
        background-position:center center;

        font-size: 2.5rem;
        font-family: Source Han Sans CN;
        font-weight: bold;
        line-height: 4.38rem;
        color: #FFFFFF;
        .title_detail{
          position:absolute;
          left:50%;
          top:50%;
          transform:translate(-50%,-50%);
        }
        .circle{
          width:0.75rem;
          height:0.75rem;
          background: linear-gradient(151deg, #00FBFC 0%, #468CEC 100%);
          border-radius: 50%;
          position:absolute;
          &.left{
            top:1.76rem;
            left:3.63rem;
          }
          &.right{
            top:1.76rem;
            right:3.63rem;
          }
        }
      }
      .icon{
        width:1.56rem;
        height:1.56rem;
        background:url(../assets/pictures/icon_suoxiao.png) no-repeat;
        background-size:100% 100%;
        background-position:center center;
        position:absolute;
        top:1.43rem;
        right:2.44rem;
         &.suoxiao{
          background:url(../assets/pictures/icon_suoxiao.svg) no-repeat;
          background-size:100% 100%;
          background-position:center center;
        }
        &.fangda{
          background:url(../assets/pictures/icon_fangda.svg) no-repeat;
          background-size:100% 100%;
          background-position:center center;
        }
      }
    }
    .content{
      height:57.82rem;
      margin-top:1.81rem;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      .top{
        width:100%;
        height:27.94rem;

        background:url(../assets/pictures/sellBoard_top_bottom.png) no-repeat;
        background-size:100% 100%;
        background-position:center center;

        position:relative;
        padding:1.5rem 2.5rem;
        .header_left{
          font-weight: 500;
        line-height: 1.69rem;
        font-size:1.5rem;
          position:absolute;
          display:flex;
          top:1.5rem;
          left:2.5rem;
        }
        .header_right{
          font-weight: 500;
        line-height: 1.69rem;
        font-size:1.5rem;
          position:absolute;
          display:flex;
          top:1.5rem;
          left:62.94rem;
        }
        .chart_left{
          width:52rem;
          height:21rem;
          position:absolute;
          top:5rem;
          left:0.4rem;
        }
        .chart_right{
          width:52rem;
          height:21rem;
          position:absolute;
          top:5rem;
          left:61rem;
        }
        .divide{
          width:1px;
          height:14.19rem;
          position:absolute;
          top:9.44rem;
          left:58.19rem;
          background:#4F93F1;
        }
        .block{
          width:0.38rem;
          height:1.5rem;
          background:#4F93F1;
        }
        .title{
          color:#FFF;
          margin-left:0.63rem;
        }
      }
      .bottom{
        width:100%;
        height:27.94rem;

        background:url(../assets/pictures/sellBoard_top_bottom.png) no-repeat;
        background-size:100% 100%;
        background-position:center center;

        position:relative;
        padding:1.5rem 2.5rem;
        .header_left{
          font-weight: 500;
          line-height: 1.69rem;
          font-size:1.5rem;
          position:absolute;
          display:flex;
          top:1.5rem;
          left:2.5rem;
        }
        .header_right{
          font-weight: 500;
          line-height: 1.69rem;
          font-size:1.5rem;
          position:absolute;
          display:flex;
          top:1.5rem;
          left:62.94rem;
        }
        .number_left{
          display:flex;
          position:absolute;
          top:1.81rem;
          left:42.5rem;
        }
        .number_right{
          display:flex;
          position:absolute;
          top:1.81rem;
          left:100rem;
        }
        .chart_left{
          width:50rem;
          height:22rem;
          position:absolute;
          top:4rem;
          left:2.5rem;
        }
        .chart_right{
          width:50rem;
          height:22rem;
          position:absolute;
          top:4rem;
          left:63rem;
        }
        .divide{
          width:1px;
          height:14.19rem;
          position:absolute;
          top:9.44rem;
          left:58.19rem;
          background:#4F93F1;
        }
        .font{
          font-size: 1.13rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 1.69rem;
          color: rgba(255, 255, 255, 0.65);
        }
        .number{
          font-size: 1.5rem;
          font-family: Source Han Sans CN;
          font-weight: bold;
          line-height: 1.69rem;
          color: #FFCC00;
          margin-left:1.25rem;
        }
        .block{
          width:0.38rem;
          height:1.5rem;
          background:#4F93F1;
        }
        .title{
          color:#FFF;
          margin-left:0.63rem;
        }
      }
    }
  }
</style>
<style lang="scss">
  .sellBoard{
    .header{
      .el-select{
        position:absolute;
        top:0.75rem;
        right:8.31rem;

        width:9.88rem;
        height:2.75rem;
      }
      .el-input__inner{
        background:transparent;
        border:1px solid #4F93F1;
      }
      .el-select__caret{
        color:#4F93F1;
      }
    }
  }
</style>
