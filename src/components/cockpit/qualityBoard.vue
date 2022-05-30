<template>
  <div class="qualityBoard">
    <router-link :to="{path:'/qualityBoard'}">
    <div class="title">
      <div class="circle"></div>
      <div>品质看板</div>
      <div class="circle"></div>
    </div>
    </router-link>
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
          <div style="width:5%;">{{index*5+indexIn+1}}</div>
          <div style="width:14%;text-align:start;overflow:hidden;padding-right:0.4rem;">
            <MarqueeTips v-if="itemIn.orderNum&&itemIn.orderNum.length>10" :content="itemIn.orderNum" style="width:100%" :speed=10></MarqueeTips>
              <span v-else>{{itemIn.orderNum?itemIn.orderNum:'-'}}</span>
          </div>
          <div style="width:11%;text-align:start;overflow:hidden;padding-right:0.4rem;">
            <MarqueeTips v-if="itemIn.model&&itemIn.model.length>8" :content="itemIn.model" style="width:100%" :speed=10></MarqueeTips>
            <span v-else>{{itemIn.model?itemIn.model:'-'}}</span>
          </div>
          <div style="width:10%;text-align:start;overflow:hidden;padding-right:0.4rem;">
            <MarqueeTips v-if="itemIn.name&&itemIn.name.length>5" :content="itemIn.name" style="width:100%" :speed=10></MarqueeTips>
            <span v-else>{{itemIn.name?itemIn.name:'-'}}</span>
            </div>
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
import WaterPolo from "../waterPolo";
import Area from "../area";
import MarqueeTips from 'vue-marquee-tips';

export default {
  components: {
    MarqueeTips,
    WaterPolo,
    Area
  },
  data() {
    return {
      todayPassNum: '', // 今日通过数量
      todayNoPassNum: '', // 今日不通过数量
      todayGoodRate: [],
      listAll: [],
      list: [],
      waterPolo: {
        id: "waterPolo",
        name: "良品率",
        decimal: 0.6,
        parent: 'main',
        value: "0%"
      },
      areaChart: {
        yData: [],
        xData: [],
        yUnit: "良品率(%)",
        areaColorStart: "rgba(207, 175, 46, 0.7)",
        areaColorEnd: "rgba(70, 140, 236, 0)",
        color: "rgba(207, 175, 46, 0.7)",
        id: "area1",
        tilt: "0",
       yUnitFontsize: 8,
       girdBottom: "20%",
       girdTop: "22%",
       girdLeft: "10%",
       girdRight: "10%"
      }
    };
  },
  mounted(){
    this.getTable()
    this.getChartMsg()
  },
  methods: {
    getTable(){
      this.axios({
        method: 'get',
        url: '/dtsum/qunli/cockpit/home/quailtyBoardTable',
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.listAll = body.list
          this.list = this.globalFun.splitArray(5, this.listAll)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getChartMsg(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/quailtyBoardChart',
        method: 'get'
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
    }
  }
};
</script>

<style lang="scss" scoped>
.qualityBoard {
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
      overflow: hidden;

      width: 100%;
      height: 9.38rem;
      background: url(../../assets/pictures/quality_top.png) no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      margin-bottom: 0.63rem;
      padding: 0.63rem;
      .content_top_title {
        display: flex;
        border-bottom: 1px solid rgba(70, 140, 236, 0.5019607843137255);
        height: 1rem;
        line-height: 1rem;
        font-size: 0.5rem;
        color: rgba(255, 255, 255, 0.65);
      }
      .content_top_content {
        display: flex;
        height: 1.41rem;
        border-bottom: 1px solid rgba(70, 140, 236, 0.5019607843137255);
        line-height: 1.41rem;
        font-size: 0.5rem;
        color: #ffffff;
      }
    }
    .content_bottom {
      display: flex;
      justify-content: space-between;
      .content_bottom_left {
        width: 8.44rem;
        height: 9.38rem;
        background: url(../../assets/pictures/quality_bottom_left.png) no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        padding: 0.63rem 0.78rem;
        .content_bottom_left_title {
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
        .content_bottom_left_chart {
          width: 100%;
          height: calc(100% - 1.26rem);
        }
        .legend {
          display: flex;
          margin-left: 1rem;
          .pass {
            display: flex;
            margin-right: 1rem;
            font-size: 0.5rem;
            color: #fff;
            .pass_border {
              width: 0.2rem;
              height: 1rem;
              background: #4f93f1;
              margin-right: 0.63rem;
            }
            .pass_data {
              div:nth-child(1) {
                font-size: 0.4rem;
                color: #4f93f1;
              }
            }
          }
          .unpass {
            display: flex;
            margin-right: 0.2rem;
            font-size: 0.5rem;
            color: #fff;
            .unpass_border {
              width: 0.2rem;
              height: 1rem;
              background: #ffcc00;
              margin-right: 0.63rem;
            }
            .unpass_data {
              div:nth-child(1) {
                font-size: 0.4rem;
                color: #ffcc00;
              }
            }
          }
        }
      }
      .content_bottom_right {
        width: 19.69rem;
        height: 9.38rem;
        background: url(../../assets/pictures/quality_bottom_right.png)
          no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        padding: 0.63rem 0.78rem;
        .content_bottom_right_title {
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
        .content_bottom_right_chart {
          width: 100%;
          height: calc(100% - 1.26rem);
        }
      }
    }
  }
}
</style>
<style lang="scss">
  .qualityBoard{
    .el-carousel__container{
      height:7.23rem;
    }
    .el-carousel--horizontal{
      overflow-x:inherit !important;
    }
  }
</style>
