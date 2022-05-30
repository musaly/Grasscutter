<template>
  <div class="workshopBoard">
    <div class="header">
      <div class="back" @click="handleBack">
        <div class="back_icon"></div>
        返回
      </div>
      <div class="title">
      <div class="circle left"></div>
      <div class="title_detail">车间设备生产看板</div>
      <div class="circle right"></div>
      </div>
      <el-select v-model="type" placeholder="请选择车间">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
      </el-select>
      <div :class="fullscreen?'icon suoxiao':'icon fangda'" @click="fullScreen">
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="facility_header">
          <div class="title">总设备数</div>
          <div class="number">{{machineSum}}台</div>
          <div class="divide"></div>
          <div class="title">
            <div class="circle green"></div>
            <div>运行</div>
          </div>
          <div class="number">{{runSum}}台</div>
          <div class="title">
            <div class="circle yellow"></div>
            <div>待机</div>
          </div>
          <div class="number">{{waitSum}}台</div>
          <div class="title">
            <div class="circle red"></div>
            <div>异常</div>
          </div>
          <div class="number">{{abnormalSum}}台</div>
          <div class="equipment_number"></div>
        </div>
        <div class="equipment">
          <div class="item" :style="selectBg(item.status)" v-for="item in list" :key="item.id">
            <div class="equipment_header">
            {{item.machineNum}}
            </div>
            <div class="equipment_row">
              <div class="equipment_left">
              工单单别:
              </div>
              <div class="equipment_right">
              {{item.orderNum}}
              </div>
            </div>
            <div class="equipment_row">
              <div class="equipment_left">
              产品名称:
              </div>
              <div class="equipment_right">
              {{item.productName}}
              </div>
            </div>
            <div class="equipment_row">
              <div class="equipment_left">
              当前工序:
              </div>
              <div class="equipment_right">
              {{item.process}}
              </div>
            </div>
            <div class="equipment_row">
              <div class="equipment_left">
              当前产量:
              </div>
              <div class="equipment_right">
              {{item.output}}
              </div>
            </div>
            <div class="equipment_row">
              <div class="equipment_left">
              设备利用率:
              </div>
              <div class="equipment_right">
              {{item.machineUseRate}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="top">
          <div class="title">
            <div class="block"></div>
            <div class="detail">产量</div>
          </div>
          <div class="item">
            <div>当天总产量</div>
            <div style="font-size:2.25rem;font-weight:bold;color:#FFCC00;">{{todayOutputSum}}</div>
          </div>
        </div>
        <div class="center">
          <div class="title">
            <div class="block"></div>
            <div class="detail">运行详情</div>
          </div>
          <div class="item">
            <div>运行总时长</div>
            <div>{{runTimeSum}}</div>
          </div>
          <div class="item">
            <div>平均运行总时长</div>
            <div>{{runTimeAverage}}</div>
          </div>
          <div class="title">
            <div class="block"></div>
            <div class="detail">停机详情</div>
          </div>
          <div class="item">
            <div>停机总时长</div>
            <div>{{stopTimeSum}}</div>
          </div>
          <div class="item">
            <div>平均停机时间</div>
            <div>{{stopTimeAverage}}</div>
          </div>
          <div class="item">
            <div>停机总次数</div>
            <div>{{stopTimeNum}}次</div>
          </div>
          <div class="item">
            <div>停机最长设备</div>
            <div>{{mostStopMachine}}</div>
          </div>
        </div>
        <div class="bottom">
          <div class="title">
            <div class="block"></div>
            <div class="detail">设备状态统计</div>
            <div class="number">{{machineSum}}</div>
          </div>
          <div class="table">
            <div class="header_title">
              <div style="width:30%;">
                状态
              </div>
              <div style="width:40%;">
                数量
              </div>
              <div style="width:30%;">
                比例
              </div>
            </div>
            <div class="table_detail" v-for="item in machineStatus" :key="item.status">
              <div style="width:30%;display:flex;justify-content:center;">
                <div :style="selectColor(item.color)"></div>
                <div>{{item.status}}</div>
              </div>
              <div style="width:40%;">
                {{item.num}}
              </div>
              <div style="width:30%;">
                {{item.rate}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'workshopBoard',
  data(){
    return {
      type: '',
      options: [
        {
          label: '全部',
          value: 0
        }, {
          label: '冷镦工位',
          value: 701
        }, {
          label: '搓丝工位',
          value: 702
        }
      ],

      todayOutputSum: 0, // 当天总产量
      productFinishRate: '', // 生产完成率
      runNum: 0, // 运行状态数量
      waitNum: 0, // 待机状态数量
      abnormalNum: 0, // 异常状态数量
      machineSum: 0, // 总设备数

      runTimeSum: '', // 运行总时长
      runTimeAverage: '', // 平均运行时长
      stopTimeSum: '', // 停机总时长
      stopTimeAverage: '', // 平均停机总时长
      stopTimeNum: '', // 停机总次数
      mostStopMachine: '', // 停机最长的设备
      machineStatus: [],

      runSum: 0,
      waitSum: 0,
      abnormalSum: 0,
      list: [],
    }
  },
  computed: {
    fullscreen(){
      return this.$store.state.fullscreen
    }
  },
  mounted(){
    this.getMachineMsg()
    this.getMachineStatus()
    this.getStatus()
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
    selectColor(color){
      return 'width:0.56rem;height:0.56rem;border-radius:50%;margin:1.15rem 0.5rem 0 0;background-color:' + color + ';'
    },
    selectBg(status){
      switch (status){
        case '运行':return 'background:#10BC60';
        case '待机':return 'background:#F57F17';
        case '异常':return 'background:#E14438';
      }
      return 'background:#10BC60'
    },
    // 获取设备相关信息
    getMachineMsg(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/machineMsg',
        method: 'get',
        params: {
          type: this.type
        }
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.machineSum = body.machineSum
          this.runSum = body.runSum
          this.waitSum = body.waitSum
          this.abnormalSum = body.abnormalSum
          this.list = body.list
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取设备状态
    getMachineStatus(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/machineStatus',
        parmas: {
          type: this.type
        }
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.todayOutputSum = body.todayOutputSum
          this.productFinishRate = body.productFinishRate
          this.runNum = body.runNum
          this.waitNum = body.waitNum
          this.abnormalNum = body.abnormalNum
          this.machineSum = body.machineSum
        }
      })
    },
    getStatus(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/getStatus',
        method: 'get',
        params: {
          type: this.type
        }
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.runTimeSum = body.runTimeSum
          this.runTimeAverage = body.runTimeAverage
          this.stopTimeSum = body.stopTimeSum
          this.stopTimeAverage = body.stopTimeAverage
          this.stopTimeNum = body.stopTimeNum
          this.mostStopMachine = body.mostStopMachine
          this.machineStatus = body.machineStatus
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .workshopBoard{
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
          width:20rem;
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
      margin-top:1.81rem;
      width:100%;
      height:57.81rem;
      display:flex;
      justify-content:space-between;
      .left{
        width:90.13rem;
        height:100%;
        background:url(../assets/pictures/workshopBoard_left.png) no-repeat;
        background-size:100% 100%;
        background-position:center center;

        padding:2.06rem 2.44rem;
        .facility_header{
          position:relative;
          display:flex;
          font-size: 1.13rem;
          font-family: Source Han Sans CN;
          font-weight: bold;
          line-height: 1.69rem;
          color: #FFFFFF;
          .title{
            margin-right:1.56rem;
            display:flex;
            .circle{
              width:0.69rem;
              height:0.69rem;
              border-radius:50%;
              margin:0.53rem 0.63rem 0 0;
              &.green{
                background:#10BC60;
              }
              &.yellow{
                background:#F57F17;
              }
              &.red{
                background:#E14438;
              }
            }
          }
          .number{
            margin-right:3.75rem;
          }
          .divide{
            width:1px;
            height:1.38rem;
            background:#FFF;
            margin-right:3.75rem;
          }
          .equipment_number{
            position:absolute;
            right:0;
            top:0;
            font-size: 1.13rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 1.69rem;
            color: rgba(255, 255, 255, 0.65);
          }
        }
        .equipment{
          margin-top:1.01rem;
          width:85.25rem;
          height:51.27rem;
          text-align:start;
          .item{
            display:inline-block;
            width:20.38rem;
            height:11.88rem;
            margin:0 1.2rem 1.2rem 0;
            vertical-align:bottom;

            font-size: 1rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 1.69rem;
            color: rgba(255, 255, 255, 0.65);
            .equipment_header{
              width:13.76rem;
              height:2.75rem;
              margin:0 3.31rem;
              border-bottom:1px solid #FFF;

              font-size: 1.25rem;
              font-weight: bold;
              line-height: 3.2rem;
              color: #FFF;
              text-align:center;
            }
            .equipment_row{
              width:100%;
              height:0.9rem;
              margin:0.63rem 0;
              display:flex;
              justify-content:center;
              .equipment_left{
                width:10.19rem;
                text-align:end;
                padding:0 0.4rem;
              }
              .equipment_right{
                width:10.19rem;
                text-align:start;
                padding:0 0.4rem;
              }
            }
          }
          .item:nth-of-type(4n){
            margin-right:0;
          }
        }
      }
      .right{
        width:24.25rem;
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        .top{
          width:100%;
          height:11.63rem;

          background:url(../assets/pictures/workshopBoard_right_top.png) no-repeat;
          background-size:100% 100%;
          background-position:center center;

          padding:1.88rem 2.5rem;
        }
        .center{
          width:100%;
          height:22.63rem;

          background:url(../assets/pictures/workshopBoard_right_center.png) no-repeat;
          background-size:100% 100%;
          background-position:center center;

          padding:1.88rem 2.5rem;
          .title{
            margin-bottom:1rem;
          }
          .item{
            margin:0.8rem 0 0.8rem 1.06rem;

            font-size: 1rem;
            font-weight: 400;
            line-height: 1.69rem;
            color: rgba(255, 255, 255, 0.85);
          }
        }
        .bottom{
          width:100%;
          height:19.81rem;

          background:url(../assets/pictures/workshopBoard_right_bottom.png) no-repeat;
          background-size:100% 100%;
          background-position:center center;

          padding:1.88rem 2.5rem;
        }
        .title{
          display:flex;
          width:100%;
          height:1.5rem;
          margin-bottom:1.8rem;
          .block{
            width:0.38rem;
            height:1.5rem;
            background:#4F93F1;
          }
          .detail{
            margin-left:0.69rem;

            font-size: 1.5rem;
            font-family: Source Han Sans CN;
            font-weight: 500;
            line-height: 1.69rem;
            color: #FFF;
          }
          .number{
            margin-left:7rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.69rem;
            color: #FFF;
          }
        }
        .table{
          text-align:center;
          font-size: 1rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 2.88rem;
          color:#FFF;
          .header_title{
            width:100%;
            height:2.88rem;
            display:flex;
            border-bottom: 1px solid rgba(70, 140, 236, 0.5);
          }
          .table_detail{
            width:100%;
            height:2.88rem;
            display:flex;

            border-bottom: 1px solid rgba(70, 140, 236, 0.5);
          }
        }
        .item{
          margin:1.5rem 0 1.5rem 1.06rem;
          display:flex;
          justify-content:space-between;

          font-size: 1.13rem;
          font-family: Source Han Sans CN;
          font-weight: 500;
          line-height: 1.69rem;
          color: #FFFFFF;
        }
      }
    }
  }

</style>
<style lang="scss">
  .workshopBoard{
    .header{
      .el-input{
        color:#FFF;
      }
      .el-select{
        position:absolute;
        top:0.75rem;
        right:8.31rem;

        width:10.88rem;
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
