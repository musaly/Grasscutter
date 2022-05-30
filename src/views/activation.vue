<template>
  <div class="qualityBoard">
    <div class="header">
      <div class="back" @click="handleBack">
        <div class="back_icon"></div>
        返回
      </div>
      <div class="title">
        <div class="circle"></div>
        <div>稼动率</div>
        <div class="circle"></div>
      </div>
       <div :class="fullscreen?'icon suoxiao':'icon fangda'" @click="fullScreen">
      </div>
    </div>
    <div class="content">
      <div class="content_left">
        <div class="content_left_top">
          <div>数采设备数</div>
          <div class="number">{{machineNum}}</div>
        </div>
        <div class="content_left_bottom">
          <div class="content_left_bottom_title">
            <div class="block"></div>
            <div>
              稼动率分布
            </div>
          </div>
          <div class="content_left_bottom_chart">
            <SingleBar :singleBarChart="singleBar"></SingleBar>
          </div>
        </div>
      </div>
      <div class="content_right">
        <div class="content_right_title">
          <div class="block"></div>
          <div>
            设备稼动率详情
          </div>
        </div>
        <div class="content_right_table">
          <div class="content_right_table_title">
            <div style="width:15%;">序号</div>
            <div style="width:20%;text-align:start;overflow:hidden;">编号</div>
            <div style="width:20%;text-align:start;overflow:hidden;">名称</div>
            <div style="width:25%;text-align:start;overflow:hidden;">设备类型</div>
            <div style="width:20%;text-align:start;overflow:hidden;">设备稼动率</div>
          </div>
        <el-carousel style="width:100%;height:100%;" :interval="10000" autoplay indicator-position="none" direction="horizontal">
          <el-carousel-item style="width:100%;height:100%;" v-for="(item,index) in list" :key="index">
          <div class="content_right_table_data" v-for="(itemIn,indexIn) in item" :key="itemIn.num">
            <div style="width:15%;">{{index*16+indexIn+1}}</div>
            <div style="width:20%;text-align:start;overflow:hidden;">{{itemIn.num?itemIn.num:'-'}}</div>
            <div style="width:20%;text-align:start;overflow:hidden;">{{itemIn.machineType?itemIn.machineType:'-'}}</div>
            <div style="width:25%;text-align:start;overflow:hidden;">{{itemIn.name?itemIn.name:'-'}}</div>
            <div style="width:20%;text-align:start;overflow:hidden;">{{itemIn.activation?itemIn.activation:'-'}}</div>
          </div>
          </el-carousel-item>
        </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleBar from "../components/singleBar";
export default {
  components: { SingleBar },
  data() {
    return {
      list: [],
      machineDetail: '',
      machineNum: '',
      singleBar: {
        yData: [0, 0, 0, 0, 0, 0, 0],
        xData: [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        xUnit: "稼动率(%)",
        yUnit: "设备(台)",
        barColorStart: "#D0FCFC",
        barColorEnd: "#06D7D8",
        id: "singleBar1",
        tilt: "0"
      }
    };
  },
  computed: {
    fullscreen(){
      return this.$store.state.fullscreen
    }
  },
  mounted(){
    this.getActivationMsg()
    this.getMachineActivation()
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
    // 获取稼动率信息
    getActivationMsg(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/activationMsg',
        method: 'get'
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.singleBar.yData = body.yAxis
          this.singleBar.xData = body.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取稼动率详情的表格信息
    getMachineActivation(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/machineActivation',
        method: 'get'
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.machineDetail = body.machineDetail
          this.list = this.globalFun.splitArray(16, this.machineDetail)
          this.machineNum = body.machineNum
        }
      })
    }
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
    display: flex;
    justify-content: space-between;
    margin-top: 1.81rem;
    .content_left {
      width: 57.19rem;
      margin-right: 1rem;
      .content_left_top {
        width: 57.19rem;
        height: 12.75rem;
        background: url(../assets/pictures/activation_left_top.png) no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        padding-top: 3.05rem;
        margin-bottom: 1.87rem;
        text-align: center;
        font-size: 1.5rem;
        color: #ffffff;
        .number {
          margin-top: 1.25rem;
          font-size: 2.5rem;
          font-weight: bold;
          color: #fcbd10;
        }
      }
      .content_left_bottom {
        width: 57.19rem;
        height: 43.19rem;
        background: url(../assets/pictures/activation_left_bottom.png) no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        padding: 2.13rem 1.88rem;
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
        .content_left_bottom_chart {
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
        padding: 0px 3.65rem;
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
  .qualityBoard{
    .el-carousel__container{
      height:48.23rem
    }
  }
</style>
