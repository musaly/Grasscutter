<template>
  <div class="productionBoard">
    <div class="header">
      <div class="back" @click="handleBack">
        <div class="back_icon"></div>
        返回
      </div>
      <div class="title">
      <div class="circle left"></div>
      <div class="title_detail">生产看板</div>
      <div class="circle right"></div>
      </div>
      <div :class="fullscreen?'icon suoxiao':'icon fangda'" @click="fullScreen">
      </div>
    </div>
    <div class="content">
      <div class="top">
        <div class="detail">
          <div class="header">
            <div style="width:5%;text-align:center;">
            序号
            </div>
            <div style="width:7%;">
            派工单号
            </div>
            <div style="width:7%;">
            型号
            </div>
            <div style="width:7%;">
            名称
            </div>
            <div style="width:9%;">
            规格
            </div>
            <div style="width:14%;">
            产品信息
            </div>
            <div style="width:5%;">
            当前工序
            </div>
            <div style="width:5%;">
            派工数量
            </div>
            <div style="width:10%;">
            上机时间
            </div>
            <div style="width:7%;">
            达成率
            </div>
            <div style="width:7%;">
            良品率
            </div>
            <div style="width:7%;">
            状态
            </div>
            <div style="width:10%;">
            预计完成时间
            </div>
          </div>
        <el-carousel style="width:100%;height:100%;" :interval="10000" autoplay indicator-position="none" direction="horizontal">
        <el-carousel-item style="width:100%;height:100%;" v-for="(item,index) in list" :key="index">
          <div class="item" v-for="(itemIn,indexIn) in item" :key="itemIn.dispatchOrder">
            <div style="width:5%;text-align:center;">
              {{index*8+indexIn+1}}
            </div>
            <div style="width:7%;overflow:hidden;">
              {{itemIn.dispatchOrder?itemIn.dispatchOrder:'-'}}
            </div>
            <div style="width:7%;overflow:hidden;">
              {{itemIn.model?itemIn.model:'-'}}
            </div>
            <div style="width:7%;overflow:hidden;">
              {{itemIn.name?itemIn.name:'-'}}
            </div>
            <div style="width:9%;overflow:hidden;">
              {{itemIn.specification?itemIn.specification:'-'}}
            </div>
            <div style="width:14%;overflow:hidden;">
              {{itemIn.productionMsg?itemIn.productionMsg:'-'}}
            </div>
            <div style="width:5%;overflow:hidden;">
              {{itemIn.process?itemIn.process:'-'}}
            </div>
            <div style="width:5%;overflow:hidden;">
              {{itemIn.dispatchNum?itemIn.dispatchNum:'-'}}
            </div>
            <div style="width:10%;overflow:hidden;">
              {{itemIn.startTime?itemIn.startTime:'-'}}
            </div>
            <div style="width:7%;overflow:hidden;">
              {{itemIn.finishRate?itemIn.finishRate:'-'}}
            </div>
            <div style="width:7%;overflow:hidden;">
              {{itemIn.goodRate?itemIn.goodRate:'-'}}
            </div>
            <div style="width:7%;overflow:hidden;">
              {{itemIn.status?itemIn.status:'-'}}
            </div>
            <div style="width:10%;overflow:hidden;">
              {{itemIn.planFinishTime?itemIn.planFinishTime:'-'}}
            </div>
          </div>
           </el-carousel-item>
      </el-carousel>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <div class="header">
            <div class="block"></div>
            <div class="font">近7日产能图</div>
          </div>
          <div class="chart_left">
          <singleBar :singleBarChart="barChart1"/>
          </div>
        </div>
        <div class="right">
         <div class="header">
            <div class="block"></div>
            <div class="font">近7日进度图</div>
          </div>
          <div class="chart_right">
          <singleBar :singleBarChart="barChart2"/>
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
  name: 'productionBoard',
  data(){
    return {
      workshop: 0, // 字符串格式，0为全部，01为备料车间，02为红镦车间，03为金工车间，
              // 04为热处理车间，05为质检科，06为包装，07为冷镦，99为委外
      list: [],
      listAll: [],
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
        yData: [0, 0, 0, 0, 0, 0, 0],
        xData: ["00-00", "00-00", "00-00", "00-00", "00-00", "00-00", "00-00"],
        xUnit: '',
        yUnit: "产能(%)",
        barColorStart: "#06D7D8",
        barColorEnd: "#D0FCFC",
        id: "singleBar1", // 一个页面引入多个该文件时，id名字依次往下起
        tilt: "0" // y轴坐标是否倾斜  1：是  0：否
      },
      barChart2: {
        yData: [0, 0, 0, 0, 0, 0, 0],
        xData: ["00-00", "00-00", "00-00", "00-00", "00-00", "00-00", "00-00"],
        xUnit: '',
        yUnit: "进度(%)",
        barColorStart: "#06D7D8",
        barColorEnd: "#D0FCFC",
        id: "singleBar2", // 一个页面引入多个该文件时，id名字依次往下起
        tilt: "0" // y轴坐标是否倾斜  1：是  0：否
      },
    }
  },
   computed: {
    fullscreen(){
      return this.$store.state.fullscreen
    }
  },
  mounted(){
    this.getTable()
    this.getLastWeekCapacity()
    this.getLastWeekSchedule()
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
    getTable(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/productBoard',
        method: 'get',
        params: {
          workshop: this.workshop
        }
      }).then((res) => {
        if (res.data.success === 1){
          this.listAll = res.data.body.list
          this.list = this.splitArray(8, this.listAll)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 分割数组，n为分割的数组长度，array为分割的数组
    splitArray(n, array){
      var newArray = []
      for (let i = 0; array.length > 0; i++){
      newArray.push(array.splice(0, n))
      }
      return newArray
    },
    // 获取近7天的产能图
    getLastWeekCapacity(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/lastWeekCapacity',
        method: 'get',
        params: this.workshop
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.barChart1.yData = body.data
          this.barChart1.xData = body.xAxis
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取近7天的进度图
    getLastWeekSchedule(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/lastWeekSchedule',
        method: 'get',
        params: this.workshop
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.barChart2.yData = body.data
          this.barChart2.xData = body.xAxis
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .productionBoard{
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
      width:100%;
      height:57.81rem;
      margin-top:1.8rem;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      .top{
        width:100%;
        height:23.69rem;
        background:url(../assets/pictures/productionBoard_top.png) no-repeat;
        background-size:100% 100%;
        background-position:center center;

        padding:2.12rem 1.87rem;
        .detail{
          .header{
            width:100%;
            height:2.78rem;
            display:flex;

            font-size: 1rem;
            font-family: Source Han Sans CN;
            font-weight: 500;
            line-height: 2.78rem;
            color: rgba(255, 255, 255, 0.65);
            text-align:start;

            border-bottom: 1px solid rgba(70, 140, 236, 0.5);
          }
          .item{
            width:100%;
            height:2.78rem;
            display:flex;

            font-size: 1rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 2.78rem;
            color: #FFF;
            text-align:start;

            border-bottom: 1px solid rgba(70, 140, 236, 0.5);
          }
        }
      }
      .bottom{
        width:100%;
        height:32.25rem;
        display:flex;
        justify-content:space-between;
        .left{
          position:relative;
          width:57.19rem;
          background:url(../assets/pictures/productionBoard_bottom_left.png) no-repeat;
          background-size:100% 100%;
          background-position:center center;
        }
        .right{
          position:relative;
          width:57.19rem;
          background:url(../assets/pictures/productionBoard_bottom_right.png) no-repeat;
          background-size:100% 100%;
          background-position:center center;
        }
        .header{
          display:flex;
          position:absolute;
          left:1.87rem;
          top:2.12rem;
        }
        .chart_left{
          position:absolute;
          width:55rem;
          height:25rem;
          top:5rem;
          left:0rem;
        }
        .chart_right{
          position:absolute;
          width:55rem;
          height:25rem;
          top:5rem;
          left:0rem;
        }
        .block{
          width:0.38rem;
          height:1.5rem;
          background:#4F93F1;
        }
        .font{
          margin-left:0.62rem;
          font-size: 1.5rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
          line-height: 1.69rem;
          color:#FFF;
        }
      }
    }
  }

</style>
<style lang="scss">
  .productionBoard{
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
