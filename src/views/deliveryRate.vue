<template>
  <div class="deliveryRate">
    <div class="header">
      <div class="back" @click="handleBack">
        <div class="back_icon"></div>
        返回
      </div>
      <div class="title">
      <div class="circle left"></div>
      <div class="title_detail">准时交付率</div>
      <div class="circle right"></div>
      </div>
      <div :class="fullscreen?'icon suoxiao':'icon fangda'" @click="fullScreen">
      </div>
    </div>
    <div class="content">
      <div class="top">
        <div class="item">
          <div class="title">
            本月新增订单
          </div>
          <div class="detail">
            <div class="detail_left">
              <div class="detail_title">订单数</div>
              <div class="detail_content">{{currentMouthAddOrderNum}}</div>
            </div>
            <div class="divide"></div>
            <div class="detail_right">
              <div class="detail_title">产品数（千件）</div>
              <div class="detail_content">{{currentMouthAddProductionNum}}</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="title">
            今日需交付订单
          </div>
          <div class="detail">
            <div class="detail_left">
              <div class="detail_title">订单数</div>
              <div class="detail_content">{{todayDeliveryOrderNum}}</div>
            </div>
            <div class="divide"></div>
            <div class="detail_right">
              <div class="detail_title">产品数</div>
              <div class="detail_content">{{todayDeliveryProductionNum}}</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="title">
            7日内需交付订单
          </div>
          <div class="detail">
            <div class="detail_left">
              <div class="detail_title">订单数</div>
              <div class="detail_content">{{lastWeekDeliveryOrderNum}}</div>
            </div>
            <div class="divide"></div>
            <div class="detail_right">
              <div class="detail_title">产品数</div>
              <div class="detail_content">{{lastWeekDeliveryProductionNum}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom_left">
          <div class="header">
            <div class="block"/>
            <div class="header_title">
              近6月完成量
            </div>
          </div>
          <div class="chart">
            <SingleBar :singleBarChart="barChart1" class="chart_detail"/>
          </div>
        </div>
        <div class="divide"></div>
        <div class="bottom_right">
          <div class="header">
          <div class="block"/>
          <div class="header_title">
            近6月交付率
          </div>
        </div>
        <div class="chart">
          <SingleBar :singleBarChart="barChart2" class="chart_detail"/>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleBar from '../components/singleBar.vue'
export default {
  components: {
    SingleBar
  },
  name: 'deliveryRate',
  data(){
    return {
    currentMouthAddOrderNum: '', // 本月新增订单
    currentMouthAddProductionNum: '', // 本月新增产品数（千件）
    todayDeliveryOrderNum: '', // 今日已交付的订单数/今日需交付订单数
    todayDeliveryProductionNum: '', // 今日已交付的产品数/今日需交付的产品数
    lastWeekDeliveryOrderNum: '', // 7日内已交付的订单数/7日内需交付的订单数
    lastWeekDeliveryProductionNum: '', // 7日内已交付的产品数/7日内需交付的产品数
      barChart1: {
        yData: [0, 0, 0, 0, 0, 0, 0],
        xData: ["00-00", "00-00", "00-00", "00-00", "00-00", "00-00", "00-00"],
        xUnit: "月份",
        yUnit: "完成量(个)",
        barColorStart: "#06D7D8",
        barColorEnd: "#D0FCFC",
        id: "singleBar1", // 一个页面引入多个该文件时，id名字依次往下起
        tilt: "0" // y轴坐标是否倾斜  1：是  0：否
      },
    barChart2: {
        yData: [0, 0, 0, 0, 0, 0, 0],
        xData: ["00-00", "00-00", "00-00", "00-00", "00-00", "00-00", "00-00"],
        xUnit: "月份",
        yUnit: "交付率(%)",
        barColorStart: "#06D7D8",
        barColorEnd: "#D0FCFC",
        id: "singleBar2", // 一个页面引入多个该文件时，id名字依次往下起
        tilt: "0" // y轴坐标是否倾斜  1：是  0：否
      }
  }
  },
  computed: {
    fullscreen(){
      return this.$store.state.fullscreen
    }
  },
  mounted(){
    this.getOrderDetail()
    this.getLastSixMouthFinishRate()
    this.getLastSixMouthDeliveryRate()
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
    getOrderDetail(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/orderDetail',
        method: 'get'
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.currentMouthAddOrderNum = body.currentMouthAddOrderNum
          this.currentMouthAddProductionNum = body.currentMouthAddProductionNum
          this.todayDeliveryOrderNum = body.todayDeliveryOrderNum
          this.todayDeliveryProductionNum = body.todayDeliveryProductionNum
          this.lastWeekDeliveryOrderNum = body.lastWeekDeliveryOrderNum
          this.lastWeekDeliveryProductionNum = body.lastWeekDeliveryProductionNum
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getLastSixMouthFinishRate(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/lastSixMouthFinishRate',
        method: 'get'
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.barChart1.xData = body.xAxis
          this.barChart1.yData = body.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getLastSixMouthDeliveryRate(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/lastSixMouthDeliveryRate',
        method: 'get'
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.barChart2.xData = body.xAxis
          this.barChart2.yData = body.data
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .deliveryRate{
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
      width:100%;
      height:57.82rem;
      margin-top:1.81rem;
      .top{
        width:100%;
        height:14.75rem;
        display: flex;
        justify-content: space-between;
        .item{
          width:37.5rem;
          height:14.75rem;
          padding:3.13rem 0;
          &:nth-of-type(1){
            background: url(../assets/pictures/deliveryRate_top_left.png) no-repeat;
            background-size:100% 100%;
            background-position: center center;
          }
          &:nth-of-type(2){
            background: url(../assets/pictures/deliveryRate_top_center.png) no-repeat;
            background-size:100% 100%;
            background-position: center center;
          }
          &:nth-of-type(3){
            background: url(../assets/pictures/deliveryRate_top_right.png) no-repeat;
            background-size:100% 100%;
            background-position: center center;
          }
          .title{
            font-size: 1.5rem;
            font-family: Source Han Sans CN;
            font-weight: 500;
            line-height: 1.5rem;
            color: #FFF;
            margin-bottom:1.81rem;
          }
          .detail{
            display: flex;
            justify-content: center;
            text-align: left;
            height:5.13rem;
            color:#FFF;
            .detail_left{
              width:50%;
              padding-right:2.09rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              text-align:right;
            }
            .divide{
              width:1px;
              height:4.38rem;
              margin-top:0.2rem;
              background-color: rgba(#4F93F1,0.5);
            }
            .detail_right{
              width:50%;
              padding-left:2.09rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            .detail_title{
              font-size: 1.25rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: rgba(255, 255, 255, 0.85);
            }
            .detail_content{
              font-size: 2rem;
              font-family: Source Han Sans CN;
              font-weight: 500;
            }
          }
        }
      }
      .bottom{
        margin-top:1.88rem;
        width:100%;
        height:41.19rem;
        background: url(../assets/pictures/deliveryRate_bottom.png) no-repeat;
        background-size: 100% 100%;
        padding:3.13rem 2.5rem;
        display: flex;
        .divide{
          width:1px;
          height:32.5rem;
          background-color: rgba(#4F93F1,0.5);
        }
        .bottom_left{
          width:50%;
          height:100%;
        }
        .bottom_right{
          width:50%;
          height:100%;
          padding-left:3.78rem;
        }
        .block{
          width:0.38rem;
          height:1.5rem;
          background-color: #4F93F1;
          margin-right:0.63rem;
        }
        .header{
          display: flex;
        }
        .header_title{
          font-size: 1.5rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
          line-height: 1.69rem;
          color: #FFF;
          text-align: left;
        }
        .chart{
          width:100%;
          height:100%;
          .chart_detail{
            width:100%;
            height:100%;
          }
        }
      }
    }
  }
</style>
