<template>
  <div class="abnormalStatisticsDetail">
    <div class="header">
      <div class="back" @click="handleBack">
        <div class="back_icon"></div>
        返回
      </div>
      <div class="title">
        <div class="circle"></div>
        <div>异常事件统计分析</div>
        <div class="circle"></div>
      </div>
      <div :class="fullscreen?'icon suoxiao':'icon fangda'" @click="fullScreen">
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="content_left_top">
          <div class="left_top_title">异常时长</div>
          <div class="left_top_content">{{abnormalTimeSum}}h</div>
          <div class="left_top_table">
            <div class="left_top_table_header">
              <div style="width:30%">
                序号
              </div>
              <div style="width:40%;text-align:left;">
                异常类型
              </div>
              <div style="width:30%;text-align:left;">
                次数
              </div>
            </div>
          <el-carousel style="width:100%;height:100%;" :interval="10000" autoplay indicator-position="none" direction="horizontal">
          <el-carousel-item style="width:100%;height:100%;" v-for="(item,index) in list1" :key="index">
            <div class="left_top_table_content" v-for="(itemIn,indexIn) in item" :key="itemIn.abnormalType">
              <div style="width:30%;overflow:hidden;">{{index*4+indexIn+1}}</div>
              <div style="width:40%;text-align:left;overflow:hidden;">{{itemIn.abnormalType}}</div>
              <div style="width:30%;text-align:left;overflow:hidden;">{{itemIn.num}}</div>
            </div>
          </el-carousel-item>
          </el-carousel>
          </div>
        </div>
        <div class="content_left_bottom">
          <div class="left_bottom_header">
            <div class="block"></div>
            <div class="left_bottom_title">停机&待机事件</div>
          </div>
          <div class="left_bottom_chart">
            <RadarMap :radarMapChart="radarChart"/>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="content_right_top">
          <div class="top_detail">
            <div class="item_left">
              <div class="right_top_header">
                <div class="block"></div>
                <div class="right_top_title">异常类型TOP10(时长)</div>
              </div>
              <div class="right_top_chart">
                <SingleBar :singleBarChart="barChart1"/>
              </div>
            </div>
            <div class="divide"></div>
            <div class="item_right">
              <div class="right_top_header">
                <div class="block"></div>
                <div class="right_top_title">异常类型TOP10(次数)</div>
              </div>
              <div class="right_top_chart">
                <SingleBar :singleBarChart="barChart2"/>
              </div>
            </div>
          </div>
          <div class="bottom_detail">
            <div class="header">
              <div style="width:10%;">
                序号
              </div>
              <div style="width:15%;">
                工单号
              </div>
              <div style="width:10%;">
                机台号
              </div>
              <div style="width:15%;">
                异常时间
              </div>
              <div style="width:30%;">
                异常详情
              </div>
              <div style="width:20%;">
                状态
              </div>
            </div>
          <el-carousel style="width:100%;height:100%;" :interval="10000" autoplay indicator-position="none" direction="horizontal">
          <el-carousel-item style="width:100%;height:100%;" v-for="(item,index) in list2" :key="index">
            <div class="item" v-for="(itemIn,indexIn) in item" :key="itemIn.orderNum">
              <div style="width:10%">{{index*4+indexIn+1}}</div>
              <div style="width:15%;overflow:hidden;">{{itemIn.orderNum?itemIn.orderNum:'-'}}</div>
              <div style="width:10%;overflow:hidden;">{{itemIn.machineNum?itemIn.machineNum:'-'}}</div>
              <div style="width:15%;overflow:hidden;">{{itemIn.abnormalTime?itemIn.abnormalTime:'-'}}</div>
              <div style="width:30%;overflow:hidden;">{{itemIn.abnormalDetail?itemIn.abnormalDetail:'-'}}</div>
              <div style="width:20%;overflow:hidden;">{{itemIn.status?itemIn.status:'-'}}</div>
            </div>
             </el-carousel-item>
          </el-carousel>
          </div>
        </div>
        <div class="content_right_bottom">
          <div class="right_bottom_header">
            <div class="block"></div>
            <div class="right_bottom_title">10日异常时长&次数</div>
          </div>
          <div class="right_bottom_chart">
            <DoubleLineTwoy :doubleLineTwoyChart="doubleLineTwoyChart"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadarMap from '../components/radarMap.vue';
import SingleBar from '../components/singleBar.vue';
import DoubleLineTwoy from '../components/doubleLineTwoy.vue';
export default {
  components: {
    RadarMap,
    SingleBar,
    DoubleLineTwoy
  },
  name: 'abnormalStatisticsDetail',
  data(){
    return {
        abnormalTimeSum: '',
        list1: [],
        list2: [],

        doubleLineTwoyChart: {
         yOneData: [0, 0, 0, 0, 0, 0, 0],
         yTwoData: [0, 0, 0, 0, 0, 0, 0],
         xData: ["00-00", "00-00", "00-00", "00-00", "00-00", "00-00", "00-00"],
         yUnit1: "时长(时)",
         yUnit2: "次数(次)",
         oneLineColor: "#EE7213",
         twoLineColor: "#FCBA78",
        legendOne: "异常时长", // 第一个图例名称
        legendTwo: "异常次数", // 第二个图例名称
        id: "doubleLineTwoy1", // 一个页面引入多个该文件时，id名字依次往下起
        tilt: "0", // y轴坐标是否倾斜  1：是  0：否
       legendPosition: 'top', // 图例的位置，右边right 和上边 top
       fontSize: "0.2rem"
      },
      barChart1: {
        yData: [0, 0, 0, 0, 0, 0, 0],
        xData: ["00-00", "00-00", "00-00", "00-00", "00-00", "00-00", "00-00"],
        yUnit: "时长(时)",
        barColorStart: "#06D7D8",
        barColorEnd: "#D0FCFC",
        id: "singleBar1", // 一个页面引入多个该文件时，id名字依次往下起
        tilt: "1" // y轴坐标是否倾斜  1：是  0：否
      },
  barChart2: {
        yData: [0, 0, 0, 0, 0, 0, 0],
        xData: ["00-00", "00-00", "00-00", "00-00", "00-00", "00-00", "00-00"],
        yUnit: "次数(次)",
        barColorStart: "#06D7D8",
        barColorEnd: "#D0FCFC",
        id: "singleBar2", // 一个页面引入多个该文件时，id名字依次往下起
        tilt: "1" // y轴坐标是否倾斜  1：是  0：否
      },
      radarChart: {
           indicator: [
             { name: "人", max: 1000 }, // 六个点分别代表什么以及最大值
             { name: "机", max: 1000 },
             { name: "料", max: 1000 },
             { name: "法", max: 1000 },
             { name: "测", max: 1000 },
             { name: "环", max: 1000 }
           ],
           seriesData: [0, 0, 0, 0, 0, 0, 0],
           color: "#FF6E76", // 线条和拐点颜色
        id: "radarMap1", // 一个页面引入多个该文件时，id名字依次往下起
      },
    }
  },
  computed: {
    fullscreen(){
      return this.$store.state.fullscreen
    }
  },
  mounted(){
    this.getTodayAbnormalTop10ForNum()
    this.getTodayAbnormal()
    this.getTodayAbnormalRadar()
    this.getTodayAbnormalTop10ForTime()
    this.getTodayAbnormalDetail()
    this.getLast10DaysAbnormal()
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
    getTodayAbnormalTop10ForNum(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/todayAbnormalTop10ForNum',
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
    // 获取异常时长与类型次数
    getTodayAbnormal(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/todayAbnormal',
        method: 'get'
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.abnormalTimeSum = body.abnormalTimeSum
          this.list1 = this.globalFun.splitArray(body.list)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 雷达图
    getTodayAbnormalRadar(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/todayAbnormalRadar',
        method: 'get'
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.radarChart.seriesData = body.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getTodayAbnormalTop10ForTime(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/todayAbnormalTop10ForTime',
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
    },
    getTodayAbnormalDetail(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/todayAbnormalDetail',
        method: 'get'
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.list2 = this.globalFun.splitArray(4, body.list)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getLast10DaysAbnormal(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/last10DaysAbnormal',
        method: 'get'
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.doubleLineTwoyChart.xData = body.xAxis
          this.doubleLineTwoyChart.yOneData = body.series[0].data
          this.doubleLineTwoyChart.yTwoData = body.series[1].data
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.abnormalStatisticsDetail{
  height: 67.5rem;
  background: url(../assets/pictures/background.jpg) no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  padding: 1.63rem 1.88rem;
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
    .title {
      display: flex;
      justify-content: space-between;
      height: 4.38rem;
      line-height: 4.38rem;
      margin: auto;
      width: 30.94rem;
      background: url(../assets/pictures/title_bg.png) no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      padding: 0 3.63rem;
      font-size: 2.5rem;
      color: #ffffff;
      .circle {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        background: linear-gradient(209deg, #00fbfc 0%, #468cec 100%);
        margin-top: 1.75rem;
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
    height:57.75rem;
    margin-top: 1.81rem;
    display: flex;
    justify-content: space-between;
    .left{
      width:39.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .content_left_top{
        width:100%;
        height:22.19rem;
        background: url(../assets/pictures/abnormalStatistics_top_left.png) no-repeat;
        background-size: 100% 100%;
        padding-top:2.13rem;
        .left_top_title{
          text-align: center;
          font-size: 1.5rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
          line-height: 1.5rem;
          color: #FFFFFF;
          margin-bottom:1.5rem;
        }
        .left_top_content{
          font-size: 2rem;
          font-family: Source Han Sans CN;
          font-weight: bold;
          line-height: 2rem;
          color: #FCBD10;
          margin-bottom:1rem;
        }
        .left_top_table{
          width:26.88rem;
          height:12.8rem;
          margin:auto;
          .left_top_table_header{
            width:100%;
            height:2.56rem;
            display: flex;
            font-size: 1rem;
            font-family: Source Han Sans CN;
            font-weight: 500;
            line-height: 2.56rem;
            color: rgba(255, 255, 255, 0.65);
            border-bottom:1px solid rgba(70, 140, 236, 0.5);
          }
          .left_top_table_content{
            width:100%;
            height:2.56rem;
            display: flex;
            font-size: 1rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 2.56rem;
            color: #FFFFFF;
            border-bottom:1px solid rgba(70, 140, 236, 0.5);
          }
        }
      }
      .content_left_bottom{
        width:100%;
        height:33.75rem;
        background: url(../assets/pictures/abnormalStatistics_bottom_left.png) no-repeat;
        background-size: 100% 100%;
        padding:2.13rem 1.88rem;
        .left_bottom_header{
          display: flex;
          .block{
            width:0.38rem;
            height:1.5rem;
            background-color: #4F93F1;
          }
          .left_bottom_title{
            margin-left:0.63rem;
            font-size: 1.5rem;
            font-family: Source Han Sans CN;
            font-weight: 500;
            line-height: 1.5rem;
            color: #FFFFFF;
          }
        }
        .left_bottom_chart{
          width:35.74rem;
          height:100%;
        }
      }
    }
    .right{
      width:74.88rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .content_right_top{
        width:100%;
        height:35rem;
        background: url(../assets/pictures/abnormalStatistics_top_right.png) no-repeat;
        background-size: 100% 100%;
        padding:2.13rem 1.88rem;
        .top_detail{
          display: flex;
        }
        .bottom_detail{
          .header{
            display: flex;
            font-size: 1rem;
            font-family: Source Han Sans CN;
            font-weight: 500;
            line-height: 2.81rem;
            color: rgba(255, 255, 255, 0.65);
            height:2.81rem;
            border-bottom:1px solid rgba(70, 140, 236, 0.5);
          }
          .item{
            display: flex;
            font-size: 1rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 2.81rem;
            color: #FFFFFF;
            height:2.81rem;
            border-bottom:1px solid rgba(70, 140, 236, 0.5);
          }
        }
        .right_top_chart{
          width:100%;
          height:18rem;
        }
        .divide{
          width:1px;
          height:12.5rem;
          background-color: rgba(#4F93F1,0.5);
          margin-top:2rem;
        }
        .item_left{
          width:50%;
        }
        .item_right{
          width:50%;
          padding-left:2.17rem;
        }
        .right_top_header{
          width:100%;
          display:flex;
          font-size: 1.5rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
          line-height: 1.5rem;
          color: #FFFFFF;
          .right_top_title{
            margin-left:0.63rem;
          }
        }
        .block{
          width:0.38rem;
          height:1.5rem;
          background-color: #4F93F1;
        }
      }
      .content_right_bottom{
        width:100%;
        height:20.94rem;
        background: url(../assets/pictures/abnormalStatistics_top_right.png) no-repeat;
        background-size: 100% 100%;
        padding:2.13rem 1.88rem;
        .right_bottom_header{
          display: flex;
          font-size: 1.5rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
          line-height: 1.5rem;
          color: #FFFFFF;
          .block{
            width:0.38rem;
            height:1.5rem;
            background-color: #4F93F1;
            margin-right:0.63rem;
          }
        }
        .right_bottom_chart{
          width:100%;
          height:100%;
        }
      }
    }
  }
}
</style>
<style lang="scss">
  .abnormalStatisticsDetail{
      .el-carousel__container{
        height:10rem
      }
  }
</style>
