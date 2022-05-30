<template>
  <div class="repertoryAnalyseDetail">
    <div class="header">
    <div class="back" @click="handleBack">
        <div class="back_icon"></div>
        返回
      </div>
    <div class="title">
      <div class="circle"></div>
      <div>库存分析</div>
      <div class="circle"></div>
    </div>
      <div :class="fullscreen?'icon suoxiao':'icon fangda'" @click="fullScreen">
      </div>
    </div>
    <div class="content">
      <div class="content_left">
        <div class="content_left_top">
          <div class="content_left_top_title">
            <div class="block"></div>
            <div>
              近7日成品出入库
            </div>
          </div>
           <div class="content_left_top_chart">
            <doubleBarDoubleyAxis :doubleBarChart="barChart1"></doubleBarDoubleyAxis>
          </div>
        </div>
        <div class="content_left_bottom">
          <div class="content_left_bottom_title">
            <div class="block"></div>
            <div>
              近7日原料出入库
            </div>
          </div>
          <div class="content_left_bottom_chart">
            <doubleBarDoubleyAxis :doubleBarChart="barChart2"></doubleBarDoubleyAxis>
          </div>
        </div>
      </div>
      <div class="content_right">
        <div class="content_right_title">
          <div class="block"></div>
          <div>
            库存预警
          </div>
        </div>
        <div class="content_right_table">
          <div class="content_right_table_title">
            <div style="width:15%;">序号</div>
            <div style="width:25%;text-align:start">物料编号</div>
            <div style="width:30%;text-align:start">物料名称</div>
            <div style="width:20%;text-align:start">库存数量</div>
          </div>
          <el-carousel style="width:100%;height:100%;" :interval="10000" autoplay indicator-position="none" direction="horizontal">
          <el-carousel-item style="width:100%;height:100%;" v-for="(item,index) in list" :key="index">
          <div class="content_right_table_data" v-for="(itemIn,indexIn) in item" :key="itemIn.materialNum">
            <div style="width:15%;">{{index*16+indexIn+1}}</div>
            <div style="width:25%;text-align:start;overflow:hidden;">{{itemIn.materialNum}}</div>
            <div style="width:30%;text-align:start;overflow:hidden;">{{itemIn.materialName}}</div>
            <div style="width:20%;text-align:start;overflow:hidden;">{{itemIn.RepertoryAmount}}件</div>
          </div>
          </el-carousel-item>
        </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import doubleBarDoubleyAxis from "../components/doubleBarDoubleyAxis";
export default {
  components: { doubleBarDoubleyAxis },
  name: "repertoryAnalyseDetail",
  data() {
    return {
      listAll: [],
      list: [],
      barChart1: {
        yOneData: [0, 0, 0, 0, 0, 0, 0],
        yTwoData: [0, 0, 0, 0, 0, 0, 0],
        xData: ["00-00", "00-00", "00-00", "00-00", "00-00", "00-00", "00-00"],
        yUnit1: "数量(件)",
        yUnit2: "数量(件)",
        oneBarColorStart: "#EE7213",
        oneBarColorEnd: "#FCBA78",
        twoBarColorStart: "#0787F3",
        twoBarColorEnd: "#9DCEFE",
        legendOne: "出库", // 第一个图例名称
        legendTwo: "入库", // 第二个图例名称
        id: "doubleBar1", // 一个页面引入多个该文件时，id名字依次往下起
        tilt: "0", // y轴坐标是否倾斜  1：是  0：否
        legendFontsize: "1rem", // 设置图例的文字大小
        fontSize: 12, // 字体大小
        yUnitFontsize: 14, // y轴坐标名
      },
       barChart2: {
        yOneData: [0, 0, 0, 0, 0, 0, 0],
        yTwoData: [0, 0, 0, 0, 0, 0, 0],
        xData: ["00-00", "00-00", "00-00", "00-00", "00-00", "00-00", "00-00"],
        yUnit1: "数量(件)",
        yUnit2: "数量(件)",
        oneBarColorStart: "#EE7213",
        oneBarColorEnd: "#FCBA78",
        twoBarColorStart: "#0787F3",
        twoBarColorEnd: "#9DCEFE",
        legendOne: "出库", // 第一个图例名称
        legendTwo: "入库", // 第二个图例名称
        id: "doubleBar2", // 一个页面引入多个该文件时，id名字依次往下起
        tilt: "0", // y轴坐标是否倾斜  1：是  0：否
        legendFontsize: "1rem", // 设置图例的文字大小
         fontSize: 12, // 字体大小
        yUnitFontsize: 14, // y轴坐标名
      }
    };
  },
  computed: {
    fullscreen(){
      return this.$store.state.fullscreen
    }
  },
  mounted(){
    this.getLastWeekProductionOutput()
    this.getLastWeekMaterialOutput()
    this.getProductionRepertoryWarn()
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
    getLastWeekProductionOutput(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/lastWeekProductionOutput',
        method: 'get',
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
    getLastWeekMaterialOutput(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/lastWeekMaterialOutput',
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
    },
    getProductionRepertoryWarn(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/productionRepertoryWarn',
        method: 'get'
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.listAll = body.list
          this.list = this.globalFun.splitArray(16, this.listAll)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.repertoryAnalyseDetail {
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
    display: flex;
    justify-content: space-between;
    margin-top: 1.81rem;
    .content_left {
      .content_left_top {
        width: 57.19rem;
        height: 27.94rem;
        margin-bottom: 1.87rem;
        background: url(../assets/pictures/repertoryAnalyse.png) no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        padding: 2.13rem 1.87rem;
        .content_left_top_title {
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
        .content_left_top_chart{
          width: 100%;
          height: 100%;
        }
      }
      .content_left_bottom {
        width: 57.19rem;
        height: 27.94rem;
        background: url(../assets/pictures/repertoryAnalyse.png) no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        padding: 2.13rem 1.87rem;
        .content_left_bottom_title {
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
        .content_left_bottom_chart{
          width: 100%;
          height: 100%;
        }
      }
    }
    .content_right {
      width: 57.19rem;
      height: 57.81rem;
      background: url(../assets/pictures/activation_right.png) no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      padding: 2.13rem 1.88rem;
      .content_right_title {
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
      .content_right_table {
        padding: 0px 4 .65rem;
        .content_right_table_title {
          display: flex;
          padding-bottom: 0.94rem;
          margin-top: 1.81rem;
          border-bottom: 1px solid rgba(70, 140, 236, 0.5019607843137255);
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.65);
        }
        .content_right_table_data {
          display: flex;
          height: 2.88rem;
          border-bottom: 1px solid rgba(70, 140, 236, 0.5019607843137255);
          line-height: 2.88rem;
          font-size: 1rem;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
<style lang="scss">
  .repertoryAnalyseDetail{
    .content_right{
      .el-carousel__container{
        height:48.81rem;
      }
    }
  }
</style>
