<template>
  <div class="qualityBoard">
    <div class="header">
      <div class="back" @click="handleBack">
        <div class="back_icon"></div>
        返回
      </div>
      <div class="title">
        <div class="circle"></div>
        <div>品质看板</div>
        <div class="circle"></div>
      </div>
       <div :class="fullscreen?'icon suoxiao':'icon fangda'" @click="fullScreen">
      </div>
    </div>
    <div class="content">
      <div class="content_top">
        <div class="content_top_title">
          <div style="width:5%;">序号</div>
          <div style="width:14%;text-align:start">派工单号</div>
          <div style="width:11%;text-align:start">型号</div>
          <div style="width:10%;text-align:start">名称</div>
          <div style="width:20%;text-align:start">规格</div>
          <div style="width:10%;text-align:start">当前工序</div>
          <div style="width:8%;text-align:start">派工数量</div>
          <div style="width:8%;text-align:start">完成数量</div>
          <div style="width:10%;text-align:start">良品率</div>
          <div style="width:8%;text-align:start">状态</div>
        </div>
        <el-carousel style="width:100%;height:100%;" :interval="10000" autoplay indicator-position="none" direction="horizontal">
        <el-carousel-item style="width:100%;height:100%;" v-for="(item,index) in list" :key="index">
        <div class="content_top_content" v-for="(itemIn,indexIn) in item" :key="itemIn.orderNum">
          <div style="width:5%;">{{index*6+indexIn+1}}</div>
          <div style="width:14%;text-align:start;overflow:hidden;">{{itemIn.orderNum?itemIn.orderNum:'-'}}</div>
          <div style="width:11%;text-align:start;overflow:hidden;">{{itemIn.model?itemIn.model:'-'}}</div>
          <div style="width:10%;text-align:start;overflow:hidden;">{{itemIn.name?itemIn.name:'-'}}</div>
          <div style="width:20%;text-align:start;overflow:hidden;">{{itemIn.specification?itemIn.specification:'-'}}</div>
          <div style="width:10%;text-align:start;overflow:hidden;">{{itemIn.process?itemIn.process:'-'}}</div>
          <div style="width:8%;text-align:start;overflow:hidden;">{{itemIn.dispatchNum?itemIn.dispatchNum:'-'}}</div>
          <div style="width:8%;text-align:start;overflow:hidden;">{{itemIn.finishNum?itemIn.finishNum:'-'}}</div>
          <div style="width:10%;text-align:start;overflow:hidden;">{{itemIn.goodRate?itemIn.goodRate:'-'}}</div>
          <div style="width:8%;text-align:start;overflow:hidden;">{{itemIn.status?itemIn.status:'-'}}</div>
        </div>
        </el-carousel-item>
      </el-carousel>
      </div>
      <div class="content_bottom">
        <div class="content_bottom_left">
          <div class="content_bottom_left_title">
            <div class="block"></div>
            <div>
              今日良品检验
            </div>
          </div>
          <div class="content_bottom_left_chart">
            <WaterPolo :waterPolo="waterPolo"></WaterPolo>
          </div>
          <div class="legend">
            <div class="pass">
              <div class="pass_border"></div>
              <div class="pass_data">
                <div>通过</div>
                <div>{{todayPassNum}}次</div>
              </div>
            </div>
            <div class="unpass">
              <div class="unpass_border"></div>
              <div class="unpass_data">
                <div>未通过</div>
                <div>{{todayNoPassNum}}次</div>
              </div>
            </div>
          </div>
        </div>
        <div class="content_bottom_right">
          <div class="content_bottom_right_title">
            <div class="block"></div>
            <div>
              近7日良品率
            </div>
          </div>
          <div class="content_bottom_right_chart">
            <Area :areaChart="areaChart"></Area>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WaterPolo from "../components/waterPolo";
import Area from "../components/area";

export default {
  components: {
    WaterPolo,
    Area
  },
  data() {
    return {
      listAll: [],
      list: [],
      todayPassNum: 0,
      todayNoPassNum: 0,
      todayGoodRate: [],
      xAxis: [],
      data: [],

      areaChart: {
        yData: [],
        xData: [],
        yUnit: "良品率(%)",
        areaColorStart: "rgba(207, 175, 46, 0.7)",
        areaColorEnd: "rgba(70, 140, 236, 0)",
        id: "area1",
        tilt: "0",
        color: "rgba(207, 175, 46, 0.7)",
        yUnitFontsize: 16,
        girdBottom: "10%",
        girdTop: "15%",
        girdLeft: "10%",
        girdRight: "10%"
      },
      waterPolo: {
        id: "waterPolo",
        name: "良品率",
        decimal: 0,
        parent: 'detail',
        value: '0%'
      }
    };
  },
   computed: {
    fullscreen(){
      return this.$store.state.fullscreen
    }
  },
  mounted(){
    this.getMsg()
    this.getChart()
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
    getMsg(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/quailtyBoardTable',
        method: 'get',
      }).then((res) => {
        if (res.data.success === 1){
          this.listAll = res.data.body.list
          this.list = this.splitArray(6, this.listAll)
        }
      })
    },
    getChart(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/quailtyBoardChart',
        method: 'get',
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.todayPassNum = body.todayPassNum
          this.todayNoPassNum = body.todayNoPassNum
          if (this.todayGoodRate[0].value !== 0){ this.todayGoodRate = (Number(body.todayGoodRate[0].value) / (Number(body.todayGoodRate[0].value) + Number(body.todayGoodRate[1].value))).toFixed(4) } else {
            this.todayGoodRate = 0
          }
          this.waterPolo.decimal = this.todayGoodRate
          this.waterPolo.value = this.todayGoodRate * 100 + '%'
          this.areaChart.xData = body.lastWeekGoodRate.xAxis
          this.areaChart.yData = body.lastWeekGoodRate.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 分割函数
    splitArray(n, array){
      var newArray = []
      for (let i = 0; array.length > 0; i++){
      newArray.push(array.splice(0, n))
      }
      return newArray
    },

  }
};
</script>

<style lang="scss" scoped>
.qualityBoard {
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
  .content {
    .content_top {
      width: 100%;
      height: 23.69rem;
      background: url(../assets/pictures/sellBoard_top_bottom.png) no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      margin-bottom: 1.88rem;
      margin-top: 1.81rem;
      padding: 1.81rem;
      .content_top_title {
        display: flex;
        padding-bottom: 0.94rem;
        border-bottom: 1px solid rgba(70, 140, 236, 0.5019607843137255);
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.65);
      }
      .content_top_content {
        display: flex;
        height: 2.88rem;
        border-bottom: 1px solid rgba(70, 140, 236, 0.5019607843137255);
        line-height: 2.88rem;
        font-size: 1rem;
        color: #ffffff;
      }
    }
    .content_bottom {
      display: flex;
      justify-content: space-between;
      .content_bottom_left {
        width: 33.88rem;
        height: 32.25rem;
        background: url(../assets/pictures/quality_bottom_left.png) no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        padding: 2.13rem 1.87rem;
        .content_bottom_left_title {
          display: flex;
          width: 100%;
          height: 1.5rem;
          line-height: 1.5rem;
          font-size: 1.5rem;
          color: #ffffff;
          .block {
            width: 0.38rem;
            height: 100%;
            margin-right: 0.63rem;
            background-color: #4f93f1;
          }
        }
        .content_bottom_left_chart {
          width: 100%;
          height: 80%;
        }
        .legend {
          display: flex;
          margin-left: 7rem;
          .pass {
            display: flex;
            margin-right: 7rem;
            font-size: 1.5rem;
            color: #fff;
            .pass_border {
              width: 0.5rem;
              height: 3.5rem;
              background: #4f93f1;
              margin-right: 0.63rem;
            }
            .pass_data {
              div:nth-child(1) {
                font-size: 1rem;
                line-height: 1.69rem;
                color: #4f93f1;
              }
            }
          }
          .unpass {
            display: flex;
            margin-right: 7rem;
            font-size: 1.5rem;
            color: #fff;
            .unpass_border {
              width: 0.5rem;
              height: 3.5rem;
              background: #ffcc00;
              margin-right: 0.63rem;
            }
            .unpass_data {
              div:nth-child(1) {
                font-size: 1rem;
                line-height: 1.69rem;
                color: #ffcc00;
              }
            }
          }
        }
      }
      .content_bottom_right {
        width: 80.5rem;
        height: 32.25rem;
        background: url(../assets/pictures/quality_bottom_right.png) no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        padding: 2.13rem 1.87rem;
        .content_bottom_right_title {
          display: flex;
          width: 100%;
          height: 1.5rem;
          line-height: 1.5rem;
          margin-bottom: 3.5rem;
          font-size: 1.5rem;
          color: #ffffff;
          .block {
            width: 0.38rem;
            height: 100%;
            margin-right: 0.63rem;
            background-color: #4f93f1;
          }
        }
        .content_bottom_right_chart {
          width: 100%;
          height: calc(100% - 5rem);
        }
      }
    }
  }
}
</style>
<style lang="scss">
.qualityBoard{
  .el-carousel__container{
    height: 18.23rem;
  }
}
</style>
